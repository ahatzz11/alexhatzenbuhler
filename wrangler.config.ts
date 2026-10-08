import { defineWranglerConfig } from "wrangler/experimental-config";

export default defineWranglerConfig({
	// Copy site files into dist. Serving the repository root makes cf dev
	// reload forever, because it watches the same directory it writes into.
	build: {
		command: "node scripts/copy-site.mjs",
		watchDir: [
			"documents",
			"fullscreen",
			"images",
			"javascript",
			"stylesheets",
		],
	},
	// dist holds only site files, plus .assetsignore, which Wrangler does not upload.
	assetsDirectory: "./dist",
});
