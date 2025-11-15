'use client';

import { TextField, Button, Spinner } from '@radix-ui/themes';
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
import { Issue } from '@prisma/client';

type IssueFormData = z.infer<typeof createIssueSchema>;

interface Props {
  issue?: Issue
}


const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

//interface IssueForm{
//  title: string;
//  description: string;
//}

const IssueForm = ({issue}: {issue?: Issue}) => {
  const {register, control, handleSubmit, formState: { errors }} = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema)
  });

  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
        try {
          setSubmitting(true);
          await axios.post('/api/issues', data);
          router.push('/issues');
        } catch (error) {
          setSubmitting(false);
          setError('Unexpected error occurred');
        }
        })

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
        onSubmit={onSubmit}>
        <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register('title')}>
          <TextField.Slot />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller name="description" control={control} defaultValue={issue?.description} render={({field}) => (
        <SimpleMDE placeholder="Description" value={field.value}
          onChange={field.onChange} />
        )}/>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>
      </form>
    </div>
  )
}

export default IssueForm
