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
      user: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
        followers: number;
        followings: number;
        role: string;
        about: string;
        backgroundImage: string;
      }; // Force the 'user' type to be non-optional
    }
  }
}
