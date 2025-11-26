import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";

//interface Props {
  //searchParams: Promise<{ page?: string }>;
//}

export default async function Home(/*{searchParams}: Props*/) {

  //const resolvedSearchParams = await searchParams;

  //const pageNumber = parseInt(resolvedSearchParams.page || "1") || 1;

  return (
    //<Pagination itemCount={100} pageSize={10} currentPage={pageNumber} />
    <LatestIssues />
  );
}
