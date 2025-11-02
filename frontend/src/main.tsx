import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryProvider } from '@/lib/query/QueryProvider';
import '@/styles/global.css';
import RootLayout from '@/routes/root';
import KanbanPage from '@/routes/kanban';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <div className="hero min-h-[60vh]">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">Welcome to Todo App</h1>
                <p className="py-6">
                  A simple and intuitive Kanban board to manage your daily tasks efficiently.
                </p>
                <a href="/kanban" className="btn btn-primary">
                  Go to Kanban Board
                </a>
              </div>
            </div>
          </div>
        ),
      },
      {
        path: 'kanban',
        element: <KanbanPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </StrictMode>
);
