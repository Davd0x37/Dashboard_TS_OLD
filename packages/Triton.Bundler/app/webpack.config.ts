import { IWebpackConfigFile } from "./Interfaces";

export default ({
  mode,
  target,
  context,
  output: { path = "build/app", filename = "[name].js" },
  plugins,
  resolve,
  module: { rules }
}: IWebpackConfigFile) => {
  return {
    mode,
    target,
    context,
    output: {
      path,
      filename
    },
    resolve,
    module: {
      rules
    },
    plugins
  };
};
