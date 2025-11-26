import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";

//interface Props {
  //searchParams: Promise<{ page?: string }>;
//}

export default async function Home(/*{searchParams}: Props*/) {

  const open = await prisma.issue.count({where: {status: 'OPEN'}});
  const inProgress = await prisma.issue.count({where: {status: 'IN_PROGRESS'}});
  const closed = await prisma.issue.count({where: {status: 'CLOSED'}});

  //const resolvedSearchParams = await searchParams;

  //const pageNumber = parseInt(resolvedSearchParams.page || "1") || 1;

  return (
    //<Pagination itemCount={100} pageSize={10} currentPage={pageNumber} />
    //<LatestIssues />
    <IssueSummary open={open} inProgress={inProgress} closed={closed} />
  );
}
