import CreatedBy from "@/components/CreatedBy";
import MapComponent from "@/components/MapComponent";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen px-8 py-4 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-24 row-start-2 items-start">
        <CreatedBy />
        <MapComponent longitude={-48.65} latitude={-26.88} zoom={14} />
      </main>
    </div>
  );
}
