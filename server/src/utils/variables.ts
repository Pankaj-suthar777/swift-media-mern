const { env } = process as {
  env: {
    [key: string]: string;
  };
};

export const {
  SECRET,
  CLIENT_URL,
  PORT,
  REDIS_PASSWORD,
  REDIS_HOST,
  GOOGLE_SESSION_SECRET,
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
} = env;
