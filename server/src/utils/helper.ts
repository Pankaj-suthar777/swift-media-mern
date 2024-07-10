import { UserDocument } from "#/@types/user";

export const formatProfile = (user: UserDocument) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar?.url,
    followers: user.followers.length,
    followings: user.followings.length,
  };
};
