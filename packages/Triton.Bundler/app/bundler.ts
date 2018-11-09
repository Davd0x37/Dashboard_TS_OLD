import modules from "./modules";
import plugins from "./plugins";
import webpackConfig from "./webpack.config";
import resolvers from "./settings";

export default async () => {
  const mode = "development";
  const target = "web";
  const config = webpackConfig({
    mode,
    context: process.cwd(),
    target,
    output: {},
    module: {
      rules: [modules.graphql(), modules.html({})]
    },
    plugins: [plugins.ForkTS()],
    resolve: resolvers.resolve({})
  });
  console.log(config);
};
