import { cpSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dest = path.join(root, "public");

// Vite copies this directory into the client build as-is. It must contain
// only site files, because cloudflare.config.ts cannot name an assets directory.
rmSync(dest, { recursive: true, force: true });
mkdirSync(dest);

const directories = [
	"documents",
	"fullscreen",
	"images",
	"javascript",
	"stylesheets",
];

for (const directory of directories) {
	cpSync(path.join(root, directory), path.join(dest, directory), {
		recursive: true,
	});
}

for (const name of readdirSync(root)) {
	const source = path.join(root, name);
	if (!statSync(source).isFile()) {
		continue;
	}
	if (name.endsWith(".html") || name === "sitemap.xml") {
		cpSync(source, path.join(dest, name));
	}
}
