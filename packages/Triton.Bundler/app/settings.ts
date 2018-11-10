import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

export const resolve = ({
  configFile = "tsconfig.json",
  extensions = [".ts", ".tsx", ".js"]
}: {
  configFile?: string;
  extensions?: string[];
} = {}) => ({
  extensions,
  plugins: [new TsconfigPathsPlugin({ configFile })]
});

export const optimizationMinimizer = () => new TerserPlugin({ parallel: 2 });
