import redisClient from "#/redis";
// import { promisify } from "util";

// const setAsync = promisify(redisClient.set).bind(redisClient);
// const getAsync = promisify(redisClient.get).bind(redisClient);
// const delAsync = promisify(redisClient.del).bind(redisClient);

export async function connectRedis() {
  // if (!redisClient.isOpen) {
  //   await redisClient.connect();
  // }
}

// Cache user profile data
export async function cachePostComment(
  postId: number | string,
  commentData: object
) {
  // await connectRedis();
  // const key = `post:${postId}:comments`;
  // await setAsync(key, JSON.stringify(commentData), "EX", 3600); // Expire after 1 hour
  // // await redisClient.set(key, JSON.stringify(commentData), "EX", 3600); // Expire after 1 hour
  // console.log(`Comment for post ${postId} cached.`);
}

// Fetch user profile from cache
export async function getCachePostComment(postId: number | string) {
  // await connectRedis();
  // const key = `post:${postId}:comments`;
  // // const commentData = await redisClient.get(key);
  // const commentData = await getAsync(key);
  // if (commentData) {
  //   return JSON.parse(commentData);
  // } else {
  //   console.log(`No cached comments for post ${postId}.`);
  //   return null;
  // }
}

// Invalidate user profile cache
export async function invalidatePostCommentCache(postId: number | string) {
  // await connectRedis();
  // const key = `post:${postId}:comments`;
  // await redisClient.del(key);
  // console.log(`Cache for comments of post ${postId} invalidated.`);
}
