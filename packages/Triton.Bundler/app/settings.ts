import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { IResolve } from "./Interfaces";

const resolvers: IResolve = {
  resolve: ({
    configFile = "tsconfig.json",
    extensions = [".ts", ".tsx", ".js"]
  }: {
    configFile?: string;
    extensions?: string[];
  }) => ({
    extensions,
    plugins: [new TsconfigPathsPlugin({ configFile })]
  })
};

export default resolvers;
