import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';

const GenealogyPage = lazy(() => import('./pages/GenealogyPage'));
const SamuelKingsPage = lazy(() => import('./pages/SamuelKingsPage'));
const TimelinePage = lazy(() => import('./pages/samuel-kings/TimelinePage'));
const EventsPage = lazy(() => import('./pages/samuel-kings/EventsPage'));
const RelationshipsPage = lazy(() => import('./pages/samuel-kings/RelationshipsPage'));
const ArcsPage = lazy(() => import('./pages/samuel-kings/ArcsPage'));
const EasterPage = lazy(() => import('./pages/EasterPage'));
const PassionWeekPage = lazy(() => import('./pages/easter/PassionWeekPage'));
const ProphecyPage = lazy(() => import('./pages/easter/ProphecyPage'));
const LastWordsPage = lazy(() => import('./pages/easter/LastWordsPage'));

function Lazy({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-dvh w-screen bg-stone-900">
        <div className="w-8 h-8 border-2 border-stone-600 border-t-blue-500 rounded-full animate-spin" />
      </div>
    }>
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/genealogy" replace /> },
  { path: '/genealogy', element: <Lazy><GenealogyPage /></Lazy> },
  {
    path: '/samuel-kings',
    element: <Lazy><SamuelKingsPage /></Lazy>,
    children: [
      { index: true, element: <Navigate to="timeline" replace /> },
      { path: 'timeline', element: <Lazy><TimelinePage /></Lazy> },
      { path: 'events', element: <Lazy><EventsPage /></Lazy> },
      { path: 'relationships', element: <Lazy><RelationshipsPage /></Lazy> },
      { path: 'arcs', element: <Lazy><ArcsPage /></Lazy> },
    ],
  },
  {
    path: '/easter',
    element: <Lazy><EasterPage /></Lazy>,
    children: [
      { index: true, element: <Navigate to="passion-week" replace /> },
      { path: 'passion-week', element: <Lazy><PassionWeekPage /></Lazy> },
      { path: 'prophecy', element: <Lazy><ProphecyPage /></Lazy> },
      { path: 'last-words', element: <Lazy><LastWordsPage /></Lazy> },
    ],
  },
]);
