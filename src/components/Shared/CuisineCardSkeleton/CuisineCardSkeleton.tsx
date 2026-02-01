export default function CuisineCardSkeleton() {
    return (
      <div
        className="
          relative
          w-40 sm:w-48 md:w-56
          h-32 sm:h-36 md:h-40
          rounded-xl
          overflow-hidden
          shadow-md
          bg-gray-300 dark:bg-gray-700
          animate-pulse
        "
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/10 to-transparent" />
  
        {/* Text placeholders */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-3 gap-1">
          <div className="h-4 w-20 bg-gray-400 dark:bg-gray-600 rounded" />
          <div className="h-3 w-16 bg-gray-400 dark:bg-gray-600 rounded" />
        </div>
      </div>
    );
  }  