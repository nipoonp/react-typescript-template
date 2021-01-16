// @flow
import React, { Suspense } from 'react';
import { APIProvider } from './context/api-context';
import { RoutesProvider, useRoutes } from './context/routes-context';
import { QueryClient, QueryClientProvider } from "react-query";
import './assets/scss/Saas.scss';
import Routes from './routes/Routes';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <APIProvider>
          <RoutesProvider>
            <Routes />
          </RoutesProvider>
        </APIProvider>
      </QueryClientProvider>
    </Suspense>
  )
}