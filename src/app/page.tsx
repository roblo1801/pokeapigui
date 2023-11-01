import Endpoint from "@/components/custom/endpoints";
// import Footer from "@/components/footer";
import content from "@/data/content.json";

const { endpoints: endpointsData } = content;

export default function Home() {
  return (
    <>
      <h2 className="text-center">
        Welcome to Pokedex Replica. Choose a Card to explore.
      </h2>
      <div className="flex flex-row flex-wrap justify-evenly gap-4">
        {endpointsData.map((endpoint, index) => (
          <Endpoint key={index} endpoint={endpoint} />
        ))}
      </div>
    </>
  );
}
