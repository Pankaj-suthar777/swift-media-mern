const { env } = process as {
  env: {
    [key: string]: string;
  };
};

export const { SECRET, CLIENT_URL, PORT } = env;
