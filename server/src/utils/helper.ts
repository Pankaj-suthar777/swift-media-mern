import { UserDocument } from "#/@types/user";

export const formatProfile = (user: UserDocument) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    followers: user.followers.length,
    followings: user.followings.length,
  };
};

export function convertDaysToDate(daysString: string) {
  const days = parseInt(daysString);
  const currentDate = new Date();
  const targetDate = new Date(
    currentDate.getTime() - days * 24 * 60 * 60 * 1000
  );
  return targetDate;
}
