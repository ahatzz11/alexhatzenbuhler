import { defineWranglerConfig } from "wrangler/experimental-config";

export default defineWranglerConfig({
	// Pages serves the repository root and has no build command.
	// .assetsignore in that directory keeps repository internals out of the upload.
	assetsDirectory: "./",
});
