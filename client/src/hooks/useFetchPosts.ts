import { Post } from "@/@types/post";
import { getClient } from "@/api/client";
import { useEffect, useState } from "react";

const useFetchPosts = (page: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(false);
      try {
        const client = await getClient();
        const response = await client.get<{ posts: Post[] }>(
          `/post/feed-post?page=${page}`
        );
        setPosts((prevPosts) => {
          const newPosts = response.data?.posts.filter(
            (post) => !prevPosts.some((prevPost) => prevPost.id === post.id)
          );
          return [...prevPosts, ...newPosts];
        });
        setHasMore(response.data.posts.length > 0);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [page]);

  const refetchSinglePost = async (id: number): Promise<Post> => {
    const client = await getClient();
    const response = await client.get<{ post: Post }>(`/post/${id}`);
    return response.data.post;
  };

  return { loading, error, posts, hasMore, refetchSinglePost };
};

export default useFetchPosts;
