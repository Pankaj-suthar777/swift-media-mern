// import PostItem from "@/components/post/PostItem";
// import useFetchSavedPosts from "@/hooks/useFetchSavedPosts";
// import { Loader } from "lucide-react";
// import { useCallback, useRef, useState } from "react";
// const SavedPosts = () => {
//   const [page, setPage] = useState(0);
//   const {
//     loading: isLoading,
//     error,
//     posts,
//     hasMore,
//     refetchSavedSinglePost,
//   } = useFetchSavedPosts(page);

//   const observer = useRef<IntersectionObserver | null>(null);

//   const lastElementRef = useCallback(
//     (node: HTMLElement | null) => {
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
//       <div className="px-4">
//         <div className="flex w-full py-24 justify-center items-center">
//           <Loader className="animate-spin" size={30} />
//         </div>
//       </div>
//     );
//   }

//   if (posts?.length === 0) {
//     return (
//       <div className="px-4">
//         <div className="flex w-full py-24 bg-white justify-center items-center">
//           <p>No Saved Post</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="pl-2 pr-2 lg:pl-4 lg:pr-4 overflow-y-auto h-viewport-minus-80px ">
//       <div className="grid lg:grid-cols-2 grid-cols-1 lg:p-4 lg:gap-8 gap-4 ">
//         {posts &&
//           posts?.map((post, i: number) => {
//             const isLastElement = posts.length === i + 1;
//             return isLastElement ? (
//               <>
//                 <div key={i} ref={lastElementRef} className="">
//                   <PostItem
//                     post={post}
//                     key={i}
//                     refetchSinglePost={refetchSavedSinglePost}
//                   />
//                 </div>
//                 <div className="h-6"></div>
//               </>
//             ) : (
//               <div key={i} className="">
//                 <PostItem
//                   post={post}
//                   key={i}
//                   refetchSinglePost={refetchSavedSinglePost}
//                 />
//               </div>
//             );
//           })}
//         <div className="lg:col-span-2">
//           <div className="h-2"></div>
//           {isLoading && (
//             <div className="w-full overflow-hidden flex justify-center items-center py-12">
//               <Loader className="animate-spin" size={30} />
//             </div>
//           )}
//           {error && <p>Error loading posts...</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SavedPosts;

// import PostItem from "@/components/post/PostItem";
// import useFetchSavedPosts from "@/hooks/useFetchSavedPosts";
// import { Loader } from "lucide-react";
// import { useCallback, useRef, useState } from "react";
// const SavedPosts = () => {
//   const [page, setPage] = useState(0);
//   const {
//     loading: isLoading,
//     error,
//     posts,
//     hasMore,
//     refetchSavedSinglePost,
//   } = useFetchSavedPosts(page);

//   const observer = useRef<IntersectionObserver | null>(null);

//   const lastElementRef = useCallback(
//     (node: HTMLElement | null) => {
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
//       <div className="px-4">
//         <div className="flex w-full py-24 justify-center items-center">
//           <Loader className="animate-spin" size={30} />
//         </div>
//       </div>
//     );
//   }

//   if (posts?.length === 0) {
//     return (
//       <div className="px-4">
//         <div className="flex w-full py-24 bg-white justify-center items-center">
//           <p>No Saved Post</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="pl-2 pr-2 lg:pl-4 lg:pr-4 overflow-y-auto h-viewport-minus-80px ">
//       <div className="grid lg:grid-cols-2 grid-cols-1 lg:p-4 lg:gap-8 gap-4 ">
//         {posts &&
//           posts?.map((post, i: number) => {
//             const isLastElement = posts.length === i + 1;
//             return isLastElement ? (
//               <>
//                 <div key={i} ref={lastElementRef} className="">
//                   <PostItem
//                     post={post}
//                     key={i}
//                     refetchSinglePost={refetchSavedSinglePost}
//                   />
//                 </div>
//                 <div className="h-6"></div>
//               </>
//             ) : (
//               <div key={i} className="">
//                 <PostItem
//                   post={post}
//                   key={i}
//                   refetchSinglePost={refetchSavedSinglePost}
//                 />
//               </div>
//             );
//           })}
//         <div className="lg:col-span-2">
//           <div className="h-2"></div>
//           {isLoading && (
//             <div className="w-full overflow-hidden flex justify-center items-center py-12">
//               <Loader className="animate-spin" size={30} />
//             </div>
//           )}
//           {error && <p>Error loading posts...</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SavedPosts;

import Post from "@/components/post/PostItem";
import FriendOfFriend from "@/components/post/FriendOfFriend";
import { Loader } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import SearchBox from "@/components/SearchBox";
import useFetchSavedPosts from "@/hooks/useFetchSavedPosts";

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

  return (
    <div className="h-screen w-full flex flex-col items-center border border-r-0">
      <div className="flex gap-4 w-full h-full overflow-hidden">
        <div className="sm:w-[90%] overflow-auto">
          <div className="sticky top-0 w-full h-[50px] flex flex-col gap-4 justify-center items-center bg-white bg-opacity-10 backdrop-blur-lg border-b border-opacity-30 rounded-lg">
            <h1>Saved Posts</h1>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto h-[calu(h-[100vh]-50px)] w-full items-center">
            {posts.length === 0 && isLoading === false ? (
              <div className="px-4">
                <div className="flex w-full py-24 justify-center items-center">
                  <p>No saved posts.</p>
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
                      refetchSinglePost={refetchSavedSinglePost}
                    />
                  </div>
                ) : (
                  <div key={i} className="w-full">
                    <Post
                      key={i}
                      post={post}
                      refetchSinglePost={refetchSavedSinglePost}
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

        <div className="w-[50%] mt-4 sm:flex h-fit justify-center overflow-hidden hidden mx-auto">
          <div className="flex flex-col gap-2 w-full">
            <div className="mb-4">
              <SearchBox />
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

export default SavedPosts;
