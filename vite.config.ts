import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import glsl from "vite-plugin-glsl";
import { templateCompilerOptions } from "@tresjs/core";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			...templateCompilerOptions,
			template: {
				compilerOptions: {
					isCustomElement: (tag) =>
						(tag.startsWith("Tres") && tag !== "TresCanvas") ||
						tag === "primitive",
				},
			},
		}),
		glsl(),
	],
});
