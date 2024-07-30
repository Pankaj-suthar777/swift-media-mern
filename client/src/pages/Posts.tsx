// import Post from "@/components/post/PostItem";
// import CreatePost from "@/components/post/CreatePost";
// import FriendOfFriend from "@/components/post/FriendOfFriend";
// import { useGetFeedPostQuery } from "@/store/api/postApi";
// import { Loader } from "lucide-react";
// import { useCallback, useEffect, useRef, useState } from "react";
// import useFetchPosts from "@/hooks/useFetchPosts";

// const Posts = () => {
//   //const { data, isLoading } = useGetFeedPostQuery({});
//   const [page, setPage] = useState(1);
//   const { loading: isLoading, error, posts, hasMore } = useFetchPosts(page);
//   const loader = useRef(null);

//   const observer = useRef<any>(); // (*)
//   const lastBookElementRef = useCallback(
//     // (*)
//     (node: any) => {
//       if (isLoading) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           setPage((prev) => prev + 1);
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [isLoading, hasMore]
//   );

//   if (isLoading) {
//     return (
//       <div className="w-full overflow-hidden flex justify-center items-center py-12">
//         <Loader className="animate-spin" size={30} />
//       </div>
//     );
//   }

//   return (
//     <div className="h-viewport-minus-80px w-full flex flex-col items-center pl-4 pr-4">
//       <div className="flex gap-4 w-full h-full">
//         <div className="sm:w-[60%] bg-slate-50 w-full flex flex-col gap-4 justify-center items-center border pt-4 pb-1 overflow-y-auto h-full ">
//           <h1>Your Feed</h1>
//           <div className="flex flex-col gap-4 overflow-y-auto border-t border-slate-300 h-full w-full px-4 items-center">
//             <div className="h-2"></div>
//             {posts?.map((post, i: number) => {
//               const isLastElement = posts.length === i + 1;
//               isLastElement ? (
//                 <div key={i} ref={lastBookElementRef}>
//                   <Post key={i} post={post} />
//                 </div>
//               ) : (
//                 <div key={i}>
//                   <Post key={i} post={post} />
//                 </div>
//               );
//             })}
//             <div className="h-2"></div>
//           </div>
//         </div>

//         <div className="w-[30%] sm:flex h-fit justify-center hidden mx-auto">
//           <div className="flex flex-col gap-2 w-full">
//             <CreatePost />
//             <h2 className="py-4 text-lg text-center">People You May Know</h2>

//             <div className="bg-slate-50">
//               <FriendOfFriend />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Posts;
import Post from "@/components/post/PostItem";
import CreatePost from "@/components/post/CreatePost";
import FriendOfFriend from "@/components/post/FriendOfFriend";
import { Loader } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import useFetchPosts from "@/hooks/useFetchPosts";

const Posts = () => {
  const [page, setPage] = useState(0);
  const {
    loading: isLoading,
    error,
    posts,
    hasMore,
    refetch,
  } = useFetchPosts(page);
  const observer = useRef<IntersectionObserver | null>(null);

  console.log(hasMore);

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
    <div className="h-viewport-minus-80px w-full flex flex-col items-center pl-4 pr-4">
      <div className="flex gap-4 w-full h-full">
        <div className="sm:w-[60%] bg-slate-50 w-full flex flex-col gap-4 justify-center items-center border pt-4 pb-1 overflow-y-auto h-full">
          <h1>Your Feed</h1>
          <div className="flex flex-col gap-4 overflow-y-auto border-t border-slate-300 h-full w-full px-4 items-center">
            <div className="h-2"></div>
            {posts &&
              posts?.map((post, i: number) => {
                const isLastElement = posts.length === i + 1;
                return isLastElement ? (
                  <div key={i} ref={lastElementRef}>
                    <Post key={i} post={post} refetch={refetch} />
                  </div>
                ) : (
                  <div key={i}>
                    <Post key={i} post={post} refetch={refetch} />
                  </div>
                );
              })}
            <div className="h-2"></div>
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
            <CreatePost />
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
