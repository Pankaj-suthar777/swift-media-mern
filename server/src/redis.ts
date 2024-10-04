import { createClient } from "redis";

const redisClient = createClient({
  password: "yz1iiyZNe5kbubKaMD83q4q9jqru8t9g",
  socket: {
    host: "redis-12199.c44.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 12199,
  },
});

redisClient.on("connect", () => {
  console.log("Redis client connecting...");
});

redisClient.on("ready", () => {
  console.log("Redis client connected and ready!");
});

redisClient.on("error", (err) => {
  console.error("Redis client error:", err);
});

redisClient.on("end", () => {
  console.log("Redis client disconnected.");
});

// Connect the Redis client when the app starts
async function connectRedisClient() {
  if (!redisClient.isOpen) {
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
