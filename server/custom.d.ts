// custom.d.ts
export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  followers: number;
  followings: number;
  role: string;
  about: string;
  backgroundImage: string;
};

declare global {
  namespace Express {
    interface Request {
      user: User; // Use the previously defined User type here
    }
  }
}
