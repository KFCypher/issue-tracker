'use client';

import React, { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider as ReactQueryClientProvider  } from '@tanstack/react-query';

const queryClient = new QueryClient();

const QueryClientProvider = ({children}: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={new QueryClient}>
      {children}
    </ReactQueryClientProvider>
  )
}

export default QueryClientProvider