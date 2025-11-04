import { Link, Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-base-200">
      <header className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Todoアプリ
          </Link>
        </div>
        <div className="flex-none">
          <nav className="menu menu-horizontal px-1">
            <li>
              <Link to="/kanban">カンバンボード</Link>
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
