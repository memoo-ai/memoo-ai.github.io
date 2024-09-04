// vite.config.ts
import { defineConfig } from "file:///D:/web3/memoo-ai.github.io/node_modules/.pnpm/vite@5.4.2_@types+node@20.16.1_sass@1.77.8/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import react from "file:///D:/web3/memoo-ai.github.io/node_modules/.pnpm/@vitejs+plugin-react@4.3.1_vite@5.4.2/node_modules/@vitejs/plugin-react/dist/index.mjs";
import eslint from "file:///D:/web3/memoo-ai.github.io/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.57.0_vite@5.4.2/node_modules/vite-plugin-eslint/dist/index.mjs";
import tailwindcss from "file:///D:/web3/memoo-ai.github.io/node_modules/.pnpm/tailwindcss@3.4.10/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///D:/web3/memoo-ai.github.io/node_modules/.pnpm/autoprefixer@10.4.20_postcss@8.4.41/node_modules/autoprefixer/lib/autoprefixer.js";
import { visualizer } from "file:///D:/web3/memoo-ai.github.io/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import viteCompression from "file:///D:/web3/memoo-ai.github.io/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.4.2/node_modules/vite-plugin-compression/dist/index.mjs";
import { nodePolyfills } from "file:///D:/web3/memoo-ai.github.io/node_modules/.pnpm/vite-plugin-node-polyfills@0.22.0_vite@5.4.2/node_modules/vite-plugin-node-polyfills/dist/index.js";
var pathResolve = (path) => resolve(process.cwd(), path);
var vite_config_default = defineConfig({
  base: "/",
  envDir: "./env",
  resolve: {
    alias: {
      "@": pathResolve("src"),
      "#": pathResolve("types")
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  server: {
    proxy: {
      "/backend/api/v1": {
        // target: 'https://xapp.memoo.ai',
        target: "https://app-beta.memoo.ai",
        changeOrigin: true
      },
      "/api/v1/merkel-tree": {
        target: "http://8.130.122.217:3001",
        changeOrigin: true
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/mixin.scss";'
      }
    },
    modules: {
      localsConvention: "camelCaseOnly"
    },
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  plugins: [
    react(),
    eslint(),
    visualizer({ open: false }),
    {
      ...viteCompression(),
      apply: "build"
    },
    nodePolyfills({
      include: ["crypto"]
    })
  ],
  build: {
    target: ["esnext"],
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          rainbowkit: ["@rainbow-me/rainbowkit"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3ZWIzXFxcXG1lbW9vLWFpLmdpdGh1Yi5pb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd2ViM1xcXFxtZW1vby1haS5naXRodWIuaW9cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3dlYjMvbWVtb28tYWkuZ2l0aHViLmlvL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IGVzbGludCBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ3RhaWx3aW5kY3NzJztcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJztcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnO1xuY29uc3QgcGF0aFJlc29sdmUgPSAocGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHJlc29sdmUocHJvY2Vzcy5jd2QoKSwgcGF0aCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6ICcvJyxcbiAgZW52RGlyOiAnLi9lbnYnLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aFJlc29sdmUoJ3NyYycpLFxuICAgICAgJyMnOiBwYXRoUmVzb2x2ZSgndHlwZXMnKSxcbiAgICB9LFxuICAgIGV4dGVuc2lvbnM6IFsnLmpzJywgJy5qc3gnLCAnLnRzJywgJy50c3gnXSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcHJveHk6IHtcbiAgICAgICcvYmFja2VuZC9hcGkvdjEnOiB7XG4gICAgICAgIC8vIHRhcmdldDogJ2h0dHBzOi8veGFwcC5tZW1vby5haScsXG4gICAgICAgIHRhcmdldDogJ2h0dHBzOi8vYXBwLWJldGEubWVtb28uYWknLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICB9LFxuICAgICAgJy9hcGkvdjEvbWVya2VsLXRyZWUnOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly84LjEzMC4xMjIuMjE3OjMwMDEnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFwiQC9hc3NldHMvc3R5bGVzL21peGluLnNjc3NcIjsnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIG1vZHVsZXM6IHtcbiAgICAgIGxvY2Fsc0NvbnZlbnRpb246ICdjYW1lbENhc2VPbmx5JyxcbiAgICB9LFxuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFt0YWlsd2luZGNzcywgYXV0b3ByZWZpeGVyXSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBlc2xpbnQoKSxcbiAgICB2aXN1YWxpemVyKHsgb3BlbjogZmFsc2UgfSksXG4gICAge1xuICAgICAgLi4udml0ZUNvbXByZXNzaW9uKCksXG4gICAgICBhcHBseTogJ2J1aWxkJyxcbiAgICB9LFxuICAgIG5vZGVQb2x5ZmlsbHMoe1xuICAgICAgaW5jbHVkZTogWydjcnlwdG8nXSxcbiAgICB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6IFsnZXNuZXh0J10sXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxNjAwLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ3N0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnc3RhdGljL1tleHRdL1tuYW1lXS1baGFzaF0uW2V4dF0nLFxuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICByZWFjdDogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxuICAgICAgICAgIHJhaW5ib3draXQ6IFsnQHJhaW5ib3ctbWUvcmFpbmJvd2tpdCddLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNRLFNBQVMsb0JBQTZCO0FBQzVTLFNBQVMsZUFBZTtBQUN4QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sa0JBQWtCO0FBQ3pCLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8scUJBQXFCO0FBQzVCLFNBQVMscUJBQXFCO0FBQzlCLElBQU0sY0FBYyxDQUFDLFNBQXlCLFFBQVEsUUFBUSxJQUFJLEdBQUcsSUFBSTtBQUV6RSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFlBQVksS0FBSztBQUFBLE1BQ3RCLEtBQUssWUFBWSxPQUFPO0FBQUEsSUFDMUI7QUFBQSxJQUNBLFlBQVksQ0FBQyxPQUFPLFFBQVEsT0FBTyxNQUFNO0FBQUEsRUFDM0M7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLG1CQUFtQjtBQUFBO0FBQUEsUUFFakIsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsTUFDQSx1QkFBdUI7QUFBQSxRQUNyQixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxrQkFBa0I7QUFBQSxJQUNwQjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsU0FBUyxDQUFDLGFBQWEsWUFBWTtBQUFBLElBQ3JDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsV0FBVyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQUEsSUFDMUI7QUFBQSxNQUNFLEdBQUcsZ0JBQWdCO0FBQUEsTUFDbkIsT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLFNBQVMsQ0FBQyxRQUFRO0FBQUEsSUFDcEIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVEsQ0FBQyxRQUFRO0FBQUEsSUFDakIsdUJBQXVCO0FBQUEsSUFDdkIsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsY0FBYztBQUFBLFVBQ1osT0FBTyxDQUFDLFNBQVMsYUFBYSxrQkFBa0I7QUFBQSxVQUNoRCxZQUFZLENBQUMsd0JBQXdCO0FBQUEsUUFDdkM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
