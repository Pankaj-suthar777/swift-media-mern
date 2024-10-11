import useFetchUserPosts from "@/hooks/useFetchUsersPosts";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import PostItem from "@/components/post/PostItem";
import { Loader } from "lucide-react";

interface Props {
  userId?: number | string;
  setTotalPosts?: (count: number) => void;
  isEditable?: boolean;
}

const PostsTab = ({ userId, setTotalPosts, isEditable = false }: Props) => {
  const { id } = useParams();

  if (!userId && id) {
    userId = id;
  }

  const [page, setPage] = useState(0);

  const {
    loading: isLoading,
    error,
    posts,
    hasMore,
    refetchSinglePost,
  } = useFetchUserPosts(String(userId), page);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    if (posts && setTotalPosts) {
      setTotalPosts(posts.length);
    }
  }, [posts, setTotalPosts]);

  return (
    <div className="w-full mt-6 px-4 space-y-8">
      {posts &&
        posts?.map((post, i: number) => {
          const isLastElement = posts.length === i + 1;
          return isLastElement ? (
            <>
              <div key={i} ref={lastElementRef}>
                <PostItem
                  isEditable={isEditable}
                  post={post}
                  key={i}
                  refetchSinglePost={refetchSinglePost}
                />
              </div>
              <div className="h-2"></div>
            </>
          ) : (
            <div key={i}>
              <PostItem
                isEditable={isEditable}
                post={post}
                key={i}
                refetchSinglePost={refetchSinglePost}
              />
            </div>
          );
        })}
      {!isLoading && posts.length === 0 && (
        <h1 className="text-center">No post yet.</h1>
      )}
      {isLoading ? (
        <div className="w-full flex justify-center items-center py-4 md:col-span-2">
          <Loader className="animate-spin h-8 w-8" />
        </div>
      ) : null}
      <div className="">{error && <p>Error loading posts...</p>}</div>
    </div>
  );
};

export default PostsTab;
