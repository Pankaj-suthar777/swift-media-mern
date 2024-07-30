import React from "react";

export function GridSmallBackgroundDemo({
  children,
  height,
  heading,
}: {
  children?: React.ReactNode;
  height?: string;
  heading?: string;
}) {
  return (
    <>
      <div
        className={`${
          height ? height : "h-[50rem]"
        } w-full bg-black bg-grid-small-white/[0.2]  relative flex items-center justify-center flex-col`}
      >
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>

        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
          {heading}
        </p>
        {children}
      </div>
    </>
  );
}
