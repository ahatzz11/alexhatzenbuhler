import { cpSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dest = path.join(root, "dist");

// The Worker serves this directory. It must not contain the repository root,
// or local dev watches files that Wrangler itself writes and reloads forever.
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

// Wrangler reads .assetsignore from the assets directory, which is dist.
cpSync(path.join(root, ".assetsignore"), path.join(dest, ".assetsignore"));
