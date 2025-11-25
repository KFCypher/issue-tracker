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

  const handleValueChange = (status: string) => {
    console.log('Selected status:', status); // Debug log
    
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (searchParams.get('orderBy'))
      params.append('orderBy', searchParams.get('orderBy')!);
    
    const query = params.size ? '?' + params.toString() : '';
    if (status === 'ALL') {
      router.push('/issues/list' + query);
    } else {
      router.push(`/issues/list?status=${status}` + query);
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

export default IssueStatusFilter*/




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
    const params = new URLSearchParams();
    
    // Add status if it's not "ALL"
    if (status !== 'ALL') {
      params.append('status', status);
    }
    
    // Preserve the orderBy parameter if it exists
    const orderBy = searchParams.get('orderBy');
    if (orderBy) {
      params.append('orderBy', orderBy);
    }
    
    // Build the final URL - this creates: /issues/list?status=OPEN&orderBy=title
    const query = params.toString() ? '?' + params.toString() : '';
    router.push('/issues/list' + query);
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