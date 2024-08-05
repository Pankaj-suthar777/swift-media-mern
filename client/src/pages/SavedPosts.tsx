import PostItem from "@/components/post/PostItem";
import useFetchSavedPosts from "@/hooks/useFetchSavedPosts";
import { Loader } from "lucide-react";
import { useCallback, useRef, useState } from "react";
const SavedPosts = () => {
  const [page, setPage] = useState(0);
  const {
    loading: isLoading,
    error,
    posts,
    hasMore,
    refetchSavedSinglePost,
  } = useFetchSavedPosts(page);

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

  if (isLoading) {
    return (
      <div className="px-4">
        <div className="flex w-full py-24 justify-center items-center">
          <Loader className="animate-spin" size={30} />
        </div>
      </div>
    );
  }

  if (posts?.length === 0) {
    return (
      <div className="px-4">
        <div className="flex w-full py-24 bg-white justify-center items-center">
          <p>No Saved Post</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pl-2 pr-2 lg:pl-4 lg:pr-4 overflow-y-auto h-viewport-minus-80px ">
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:p-4 lg:gap-8 gap-4 ">
        {posts &&
          posts?.map((post, i: number) => {
            const isLastElement = posts.length === i + 1;
            return isLastElement ? (
              <>
                <div key={i} ref={lastElementRef} className="">
                  <PostItem
                    post={post}
                    key={i}
                    refetchSinglePost={refetchSavedSinglePost}
                  />
                </div>
                <div className="h-6"></div>
              </>
            ) : (
              <div key={i} className="bg-white">
                <PostItem
                  post={post}
                  key={i}
                  refetchSinglePost={refetchSavedSinglePost}
                />
              </div>
            );
          })}
        <div className="lg:col-span-2">
          <div className="h-2"></div>
          {isLoading && (
            <div className="w-full overflow-hidden flex justify-center items-center py-12">
              <Loader className="animate-spin" size={30} />
            </div>
          )}
          {error && <p>Error loading posts...</p>}
        </div>
      </div>
    </div>
  );
};

export default SavedPosts;
