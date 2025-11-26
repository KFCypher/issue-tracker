import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import { Label } from '@radix-ui/themes/components/context-menu'
import { Value } from '@radix-ui/themes/components/data-list'
import React from 'react'
import Link from 'next/link';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({open, inProgress, closed}: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status
  }[] = [
    { label: 'open Issues', value: open, status: 'OPEN'},
    { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS'},
    { label: 'Closed Issues', value: closed, status: 'CLOSED'}
  ]
 
  return (
    <Flex gap='4'>
      {containers.map(container =>(
        <Card key={container.label}>
          <Flex direction='column' gap='1'>
            <Link className='text-sm font-medium' href={`/issues/list?status=${container.status}`}>{container.label}</Link>
            <Text className='font-bold' size='5'>{container.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}

export default IssueSummary