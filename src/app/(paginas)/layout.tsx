import React from 'react';
import Sidebar from '../../components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode}) {
    return (
        <div className="flex bg-[#603BB0] min-h-screen">
            <Sidebar />
            <main className="ml-20 lg:ml-60 w-full">{children}</main>
        </div>
    )     
}