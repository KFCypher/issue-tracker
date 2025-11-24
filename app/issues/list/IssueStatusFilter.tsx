'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

const statuses: { label: string, value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
]

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status');

  const handleValueChange = (status: string) => {
    console.log('Selected status:', status); // Debug log
    
    if (status === 'ALL') {
      router.push('/issues/list');
    } else {
      router.push(`/issues/list?status=${status}`);
    }
  };

  return (
    <Select.Root 
      defaultValue={currentStatus || 'ALL'}
      onValueChange={handleValueChange}
    >
      <Select.Trigger placeholder='Filter by status...'/>
      <Select.Content>
        {statuses.map(status => (
            <Select.Item 
              key={status.value || "ALL"} 
              value={status.value || "ALL"}
            >
              {status.label}
            </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter




/*'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

const statuses: { label: string, value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
]

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status');

  return (
    <Select.Root 
      defaultValue={currentStatus || 'ALL'}
      onValueChange={(status) => {
        const query = status !== 'ALL' ? `?status=${status}` : '';
        router.push('/issues/list' + query);
      }}
    >
      <Select.Trigger placeholder='Filter by status...'/>
      <Select.Content>
        {statuses.map(status => (
            <Select.Item 
              key={status.value || "ALL"} 
              value={status.value || "ALL"}
            >
              {status.label}
            </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter*/




/*'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

const statuses: { label: string, value?: Status }[] = [
    {label: 'All'},
    {label: 'Open', value: 'OPEN' },
    {label: 'In Progress', value: 'IN_PROGRESS' },
    {label: 'Closed', value: 'CLOSED' },
]

const IssueStatusFilter = () => {
  const router = useRouter();

  return (
    <Select.Root onValueChange={(status) => {
       const query = status ? `?status=${status}` : '';
       router.push('/issues/list' + query);
    }}>
      <Select.Trigger placeholder='Filter by status...'/>
      <Select.Content>
        {statuses.map(status => (
            <Select.Item 
              key={status.value || "ALL"} 
              value={status.value || "ALL"}>
              {status.label}
            </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter*/