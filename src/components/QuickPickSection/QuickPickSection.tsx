import QuickPickCard from "../QuickPickCard/QuickPickCard";

export default function QuickPickSection() {
  return (
    <section className="flex justify-center bg-orange-50 py-10">
      <div className="w-full max-w-4xl px-4">
        <h3 className="text-2xl text-left">Quick Picks</h3>
        <p className="text-left text-sm text-gray-600 mb-8">
          Curated recipes to get you cooking fast
        </p>
        <div
          className="
            max-w-sm mx-auto
            grid grid-cols-2 gap-3 place-items-center
            md:max-w-none md:mx-0
            md:flex md:flex-wrap md:gap-6
          "
        >
          <QuickPickCard />
          <QuickPickCard />
          <QuickPickCard />
          <QuickPickCard />
        </div>
      </div>
    </section>
  );
}