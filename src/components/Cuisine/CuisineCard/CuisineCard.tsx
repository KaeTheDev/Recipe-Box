import { Link } from "react-router-dom";

interface CuisineCardProps {
  cuisine: string;
  image: string;
  count: number;
}

export default function CuisineCard({
  cuisine,
  image,
  count,
}: CuisineCardProps) {
  return (
    <Link
      to={`/recipes?cuisine=${encodeURIComponent(cuisine)}`}
      className="
        relative
        w-full                  
        h-37.5               
        sm:h-42.5
        md:h-45
        rounded-xl
        overflow-hidden
        shadow-md
        cursor-pointer
        group
      "
    >
      {/* Image */}
      <img
        src={image}
        alt={`${cuisine} cuisine`}
        className="
          absolute inset-0
          w-full h-full
          object-cover
          transition-transform
          group-hover:scale-105
        "
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

      {/* Text */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-3 text-center">
        <h2 className="text-white font-semibold text-sm sm:text-base line-clamp-1">
          {cuisine}
        </h2>
        <span className="text-white/80 text-xs sm:text-sm">
          {count} recipe{count !== 1 && "s"}
        </span>
      </div>
    </Link>
  );
}