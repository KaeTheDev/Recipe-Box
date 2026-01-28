import American from "../../assets/American.png";

export default function CuisineCard() {
  return (
    <div
      className="
        relative
        w-40 sm:w-48 md:w-56
        h-32 sm:h-36 md:h-40
        rounded-xl
        overflow-hidden
        shadow-md
      "
    >
      {/* Background image */}
      <img
        src={American}
        alt="American cuisine"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay (better than flat black) */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

      {/* Text overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-3 text-center">
        <span className="text-white font-semibold text-sm sm:text-base leading-tight">
          American
        </span>
        <span className="text-white/80 text-xs sm:text-sm">
          1 recipe
        </span>
      </div>
    </div>
  );
}