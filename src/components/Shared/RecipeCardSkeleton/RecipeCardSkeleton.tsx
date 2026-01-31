interface RecipeCardSkeletonProps {
  className?: string; // optional
}

export default function RecipeCardSkeleton({ className }: RecipeCardSkeletonProps) {
  return (
    <div
      className={`w-full max-w-[320px] h-90 flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse ${className || ""}`}
    >
      {/* Image */}
      <div className="h-40 w-full bg-gray-300 dark:bg-gray-700" />

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 sm:p-4 gap-2">
        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />

        {/* Description */}
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-600 rounded" />

        {/* Tags */}
        <div className="h-3 w-2/3 bg-gray-300 dark:bg-gray-600 rounded" />

        {/* Stats row */}
        <div className="mt-auto pt-2 flex justify-between">
          <div className="h-3 w-12 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-3 w-12 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-3 w-12 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
      </div>
    </div>
  );
}