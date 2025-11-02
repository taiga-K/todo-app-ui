import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-base-200">
      <header className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost text-xl">
            Todo App
          </a>
        </div>
        <div className="flex-none">
          <nav className="menu menu-horizontal px-1">
            <li>
              <a href="/kanban">Kanban Board</a>
            </li>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
