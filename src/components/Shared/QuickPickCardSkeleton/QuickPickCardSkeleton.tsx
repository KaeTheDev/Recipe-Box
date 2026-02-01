export default function QuickPickCardSkeleton() {
    return (
      <div
        className="
          flex flex-col items-center justify-center gap-2
          bg-gray-300 dark:bg-gray-700
          p-4 rounded-lg shadow-sm
          h-37.5
          w-full
          animate-pulse
        "
      >
        {/* Icon */}
        <div className="h-6 w-6 rounded-full bg-gray-400 dark:bg-gray-600" />
  
        {/* Title */}
        <div className="h-4 w-24 bg-gray-400 dark:bg-gray-600 rounded" />
  
        {/* Count */}
        <div className="h-3 w-16 bg-gray-400 dark:bg-gray-600 rounded" />
  
        {/* Description */}
        <div className="h-3 w-32 bg-gray-400 dark:bg-gray-600 rounded" />
      </div>
    );
  }  