import { defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "alexhatzenbuhler",
		compatibilityDate: "2026-10-07",
		domains: ["alexhatzenbuhler.com"],
		workersDev: true,
		observability: {
			enabled: true,
			logs: {
				enabled: true,
				headSamplingRate: 1,
			},
			traces: {
				enabled: true,
				headSamplingRate: 0.01,
			},
		},
		assets: {
			// Pages redirects /file.html to /file and /file/ to /file.
			htmlHandling: "auto-trailing-slash",
			// No 404.html, so Pages serves index.html with status 200 for unknown paths.
			notFoundHandling: "single-page-application",
		},
	},
});
