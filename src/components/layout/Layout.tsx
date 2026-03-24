import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar.tsx';
import { Navbar } from './Navbar.tsx';
import { ReactNode } from 'react';

type LayoutProps = {
  title?: string;
  children?: ReactNode;
};

export function Layout({ title = 'Dashboard', children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title={title} />
        <main className="flex-1 p-6">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
}