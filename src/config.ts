import { EnvironmentPath, EnvironmentPathParameters } from "./types";

const config: EnvironmentPath = {
  development: {
    path: "api",
    api: {
      url: "http://localhost:4001/api",
    },
  },
};

export default config[
  process.env.REACT_APP_NODE_ENV ?? "development"
] as EnvironmentPathParameters;
