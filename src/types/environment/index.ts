export type Environment = "development" | undefined;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_NODE_ENV: Environment;
    }
  }
}

export type EnvironmentPathParameters = {
  path: string;
  api: {
    url: string;
  };
};

export type EnvironmentPath = {
  development: EnvironmentPathParameters;
};
