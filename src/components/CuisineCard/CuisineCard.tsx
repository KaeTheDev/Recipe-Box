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
        w-40 sm:w-48 md:w-56
        h-32 sm:h-36 md:h-40
        rounded-xl
        overflow-hidden
        shadow-md
        cursor-pointer
        group
      "
    >
      <img
        src={image}
        alt={`${cuisine} cuisine`}
        className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-3 text-center">
        <span className="text-white font-semibold text-sm sm:text-base">
          {cuisine}
        </span>
        <span className="text-white/80 text-xs sm:text-sm">
          {count} recipe{count !== 1 && "s"}
        </span>
      </div>
    </Link>
  );
}
