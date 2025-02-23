import { Loader } from "lucide-react";
import { useCallback, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import Post from "@/components/post/PostItem";
import FriendOfFriend from "@/components/post/FriendOfFriend";
import SearchBox from "@/components/SearchBox";
import { useLocation } from "react-router-dom";
import { getClient } from "@/api/client";
import { Post as PostType } from "@/@types/post";

const fetchPosts = async ({
  pageParam = 0,
}): Promise<{ posts: PostType[] }> => {
  const client = await getClient();
  const response = await client.get<{ posts: PostType[] }>(
    `/post/feed-post?page=${pageParam}`
  );
  return response.data;
};

const Posts = () => {
  const { pathname } = useLocation();
  const observer = useRef<IntersectionObserver | null>(null);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["posts"], fetchPosts, {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.posts.length > 0 ? allPages.length : undefined;
    },
  });

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return (
    <div className="h-screen w-full flex flex-col items-center border border-r-0">
      <div className="flex gap-4 w-full h-full overflow-hidden">
        <div className="sm:w-[90%] w-full">
          <div className="sticky top-0 w-full h-[50px] flex flex-col gap-4 justify-center items-center bg-white bg-opacity-10 backdrop-blur-lg border-b border-opacity-30 rounded-lg">
            <h1>Your Feed</h1>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto h-[calc(100vh-50px)] items-center md:px-0 px-2 md:w-full w-[calc(100vw-60px)]">
            {data?.pages[0]?.posts.length === 0 && !isLoading && (
              <div className="px-4">
                <div className="flex w-full py-24 justify-center items-center">
                  <p>Follow people to get feed</p>
                </div>
              </div>
            )}
            {data?.pages.map((page, i) => (
              <div key={i} className="w-full flex flex-col gap-4">
                {page.posts.map((post, index) => {
                  const isLastElement = page.posts.length === index + 1;
                  return (
                    <div
                      className=""
                      key={post.id}
                      ref={isLastElement ? lastElementRef : null}
                    >
                      <Post post={post} />
                    </div>
                  );
                })}
              </div>
            ))}

            {isFetchingNextPage && (
              <div className="w-full h-[100px] overflow-hidden flex justify-center items-center py-4">
                <Loader className="animate-spin" size={30} />
              </div>
            )}

            {isError && <p>Error loading posts...</p>}
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
