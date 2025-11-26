import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Grid, Flex } from "@radix-ui/themes";

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
    <Grid columns={{initial: '1', md: '2'}} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
