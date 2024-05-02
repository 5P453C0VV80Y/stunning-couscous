import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("./wholePage"), {
  ssr: false,
});

//? this is needed to disable SSR
DynamicComponentWithNoSSR.displayName = "pasha";
const superPage = () => <DynamicComponentWithNoSSR />;
export default superPage;
