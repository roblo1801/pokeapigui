import Endpoint from "@/components/custom/endpoints";
import content from "@/data/content.json";

const { endpoints: endpointsData } = content;

export default function Home() {
  return (
    <>
      <h2>Endpoints</h2>
      <div className="flex flex-row flex-wrap justify-evenly gap-4">
        {endpointsData.map((endpoint, index) => (
          <Endpoint key={index} endpoint={endpoint.name} />
        ))}
      </div>
    </>
  );
}
