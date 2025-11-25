import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import NextLink from 'next/link';
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: Promise<{ status?: Status, orderBy?: keyof Issue }>
}

const IssuesPage = async ({ searchParams }: Props) => {
  // AWAIT the searchParams Promise
  const params = await searchParams;

  const columns: { 
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    {label: 'Issue', value: 'title'},
    {
      label: 'Status', 
      value: 'status', 
      className: 'hidden md:table-cell'
    },
    {
      label: 'Created', 
      value: 'createdAt', 
      className: 'hidden md:table-cell'
    }
  ]
  
  // Build the where clause
  const whereClause = params.status 
    ? { status: params.status } 
    : {};

  const orderBy = params.orderBy && columns
    .map(column => column.value)
    .includes(params.orderBy)
    ? {[params.orderBy]: 'asc'}
    : undefined;
  
  const issues = await prisma.issue.findMany({
    where: whereClause, 
    orderBy
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell 
                key={column.value}
                className={column.className}
              >
                <NextLink 
                  href={{
                    pathname: '/issues/list',
                    query: {
                      ...(params.status && { status: params.status }),
                      orderBy: column.value
                    }
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === params.orderBy && (
                  <ArrowUpIcon className="inline"/>
                )}
              </Table.ColumnHeaderCell> 
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;





/*import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";

interface Props {
  searchParams: {status?: Status}
}

const IssuesPage = async ({
  searchParams,
  } : Props) => {
  const issues = await prisma.issue.findMany({
    where: {
      status: searchParams.status  ...(searchParams.status && { status: searchParams.status })
    }
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;*/


