import TerserPlugin from "terser-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

export const resolve = ({
  configFile = "tsconfig.json",
  extensions = [".ts", ".tsx", ".js"]
}: {
  readonly configFile?: string;
  readonly extensions?: string[];
} = {}) => ({
  extensions,
  plugins: [new TsconfigPathsPlugin({ configFile })]
});

export const optimizationMinimizer = () => new TerserPlugin({ parallel: 2 });

