import { cloudflare } from "@cloudflare/vite-plugin";
import path from "node:path";
import { defineConfig } from "vite";

// The repository index.html is the Pages site. Vite must not compile it.
// The client build input is an empty module so the root HTML is not an entry.
// Public files are copied as-is. The empty module is removed from the output.
export default defineConfig({
	appType: "custom",
	plugins: [
		cloudflare(),
		{
			name: "drop-vite-fallback",
			generateBundle(_options, bundle) {
				for (const [fileName, item] of Object.entries(bundle)) {
					if (item.type === "chunk" && item.facadeModuleId?.endsWith("vite-fallback.js")) {
						delete bundle[fileName];
					}
				}
			},
		},
		{
			// Vite serves public files and the project root before the Worker.
			// Skip public HTML so html_handling can redirect, and do not serve
			// repository files that are not in public/.
			name: "assets-dev-routing",
			configureServer(server) {
				return () => {
					const patched = new Set();
					for (const layer of server.middlewares.stack) {
						if (
							layer.handle.name === "viteServeStaticMiddleware" ||
							layer.handle.name === "viteServeRawFsMiddleware"
						) {
							patched.add(layer.handle.name);
							layer.handle = (_req, _res, next) => {
								next();
							};
						}
						if (layer.handle.name === "viteServePublicMiddleware") {
							patched.add(layer.handle.name);
							const servePublic = layer.handle;
							layer.handle = (req, res, next) => {
								const requestPath = req.url?.split("?")[0] ?? "";
								if (requestPath.endsWith(".html")) {
									next();
									return;
								}
								servePublic(req, res, next);
							};
						}
						if (layer.handle.name === "viteTransformMiddleware") {
							patched.add(layer.handle.name);
							const transform = layer.handle;
							layer.handle = (req, res, next) => {
								const requestPath = req.url?.split("?")[0] ?? "";
								if (requestPath.startsWith("/@fs")) {
									next();
									return;
								}
								if (
									requestPath.startsWith("/@") ||
									requestPath.startsWith("/node_modules") ||
									requestPath.startsWith("/__")
								) {
									transform(req, res, next);
									return;
								}
								next();
							};
						}
					}
					for (const name of [
						"viteServePublicMiddleware",
						"viteServeStaticMiddleware",
						"viteServeRawFsMiddleware",
						"viteTransformMiddleware",
					]) {
						if (!patched.has(name)) {
							throw new Error(`Could not patch Vite middleware ${name}`);
						}
					}
				};
			},
		},
	],
	publicDir: "public",
	environments: {
		client: {
			build: {
				rollupOptions: {
					input: path.resolve("scripts/vite-fallback.js"),
				},
			},
		},
	},
	server: {
		port: 8787,
		strictPort: true,
	},
});
