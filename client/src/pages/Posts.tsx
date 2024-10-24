import Post from "@/components/post/PostItem";
import FriendOfFriend from "@/components/post/FriendOfFriend";
import { Loader } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import useFetchPosts from "@/hooks/useFetchPosts";
import SearchBox from "@/components/SearchBox";
import { useLocation } from "react-router-dom";

const Posts = () => {
  const [page, setPage] = useState(0);
  const {
    loading: isLoading,
    error,
    posts,
    hasMore,
    refetchSinglePost,
  } = useFetchPosts(page);
  const { pathname } = useLocation();
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
    <div className="h-screen w-full flex flex-col items-center border border-r-0">
      <div className="flex gap-4 w-full h-full overflow-hidden">
        <div className="sm:w-[90%] overflow-auto w-full">
          <div className="sticky top-0 w-full h-[50px] flex flex-col gap-4 justify-center items-center bg-white bg-opacity-10 backdrop-blur-lg border-b border-opacity-30 rounded-lg">
            <h1>Your Feed</h1>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto h-[calu(100vh-50px)] items-center md:px-0 px-2 md:w-full w-[calc(100vw-60px)]">
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
              <div className="w-full overflow-hidden flex justify-center items-center py-4">
                <Loader className="animate-spin" size={30} />
              </div>
            )}
            {error && <p>Error loading posts...</p>}
            <div className="h-4"></div>
          </div>
        </div>

        <div className="w-[50%] hidden mt-4 lg:flex h-fit justify-center overflow-hidden mx-auto">
          <div className="flex flex-col gap-2 w-full">
            <div className="mb-4">
              {pathname === "/user/posts" || pathname === "/user/search" ? (
                <SearchBox />
              ) : null}
            </div>

            <div className="">
              <FriendOfFriend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
