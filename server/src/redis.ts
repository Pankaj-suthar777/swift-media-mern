import { createClient } from "redis";
import { REDIS_HOST, REDIS_PASSWORD } from "./utils/variables";

let redisClient;
try {
  redisClient = createClient({
    password: REDIS_PASSWORD,
    socket: {
      host: REDIS_HOST,
      port: 12199,
    },
  });
  console.log("Redis client initialized.");

  redisClient?.on("connect", () => {
    console.log("Redis client connecting...");
  });

  redisClient?.on("ready", () => {
    console.log("Redis client connected and ready!");
  });

  redisClient?.on("error", (err) => {
    console.error("Redis client error:", err);
  });

  redisClient?.on("end", () => {
    console.log("Redis client disconnected.");
  });
} catch (error) {
  console.error("Error initializing Redis client:", error);
}

async function connectRedisClient() {
  if (!redisClient?.isOpen) {
    try {
      await redisClient.connect();
      console.log("Redis client connected successfully.");
    } catch (err) {
      console.error("Failed to connect to Redis:", err);
    }
  }
}

// Call the connectRedisClient function to ensure the connection
connectRedisClient().catch(console.error);

export default redisClient;
