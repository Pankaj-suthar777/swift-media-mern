import Post from "@/components/post/PostItem";
import CreatePost from "@/components/post/CreatePost";
import FriendOfFriend from "@/components/post/FriendOfFriend";
import { Loader } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import useFetchPosts from "@/hooks/useFetchPosts";
import { Button } from "@/components/custom/button";

const Posts = () => {
  const [page, setPage] = useState(0);
  const {
    loading: isLoading,
    error,
    posts,
    hasMore,
    refetchSinglePost,
  } = useFetchPosts(page);
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

  return (
    <div className="h-viewport-minus-80px w-full flex flex-col items-center pl-2 pr-2 lg:pl-4 lg:pr-4">
      <div className="flex gap-4 w-full h-full">
        <div className="sm:w-[60%] bg-slate-5 w-full flex flex-col gap-4 justify-center items-center border pt-4 pb-1 overflow-y-auto h-full">
          <h1>Your Feed</h1>
          <div className="flex flex-col gap-4 overflow-y-auto border-t h-full w-full items-center">
            {posts.length === 0 && isLoading === false ? (
              <div className="px-4">
                <div className="flex w-full py-24 justify-center items-center">
                  <p>Follow peoples to get feed</p>
                </div>
              </div>
            ) : null}
            <div className="h-2"></div>
            {posts &&
              posts?.map((post, i: number) => {
                const isLastElement = posts.length === i + 1;
                return isLastElement ? (
                  <div key={i} ref={lastElementRef} className="w-full">
                    <Post
                      key={i}
                      post={post}
                      refetchSinglePost={refetchSinglePost}
                    />
                    <div className="h-16"></div>
                  </div>
                ) : (
                  <div key={i} className="w-full">
                    <Post
                      key={i}
                      post={post}
                      refetchSinglePost={refetchSinglePost}
                    />
                  </div>
                );
              })}
            {isLoading && (
              <div className="w-full overflow-hidden flex justify-center items-center py-12">
                <Loader className="animate-spin" size={30} />
              </div>
            )}
            {error && <p>Error loading posts...</p>}
          </div>
        </div>

        <div className="w-[30%] sm:flex h-fit justify-center hidden mx-auto">
          <div className="flex flex-col gap-2 w-full">
            <CreatePost>
              <Button className="mt-5 rounded-md w-full">Create Post</Button>
            </CreatePost>
            <h2 className="py-4 text-lg text-center">People You May Know</h2>
            <div className="bg-slate-50">
              <FriendOfFriend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
