'use client';

import { TextField, Button } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Callout } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createIssueSchema } from '../../validationSchemas';
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForm = z.infer<typeof createIssueSchema>;


const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

//interface IssueForm{
//  title: string;
//  description: string;
//}

const NewIssuePage = () => {
  const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });

  const router = useRouter();
  const [error, setError] = useState('');

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Icon>
		        <InfoCircledIcon />
	        </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>)}
      <form className='space-y-3' 
        onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data);
          router.push('/issues');
        } catch (error) {
          setError('Unexpected error occurred');
        }
        })}>
        <TextField.Root placeholder="Title" {...register('title')}>
          <TextField.Slot />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller name="description" control={control} render={({field}) => (
        <SimpleMDE placeholder="Description" value={field.value}
          onChange={field.onChange} />
        )}/>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
