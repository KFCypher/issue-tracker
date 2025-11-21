'use client';

import { Select } from '@radix-ui/themes';

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder='Assignee...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value='1'>Kelvin Fordjour</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect