import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import AdminSideBar from './AdminSideBar';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    return (
        <div className='min-h-screen flex flex-col md:flex-row relative'>
            {/* mobile*/}
            <div className='flex md:hidden justify-between items-center bg-gray-800 text-white p-4'>
                <button onClick={toggleSidebar}>
                    <FaBars className='size-10' />
                </button>
                <h1 className='ml-4 text-xl font-medium'>Admin DashBoard</h1>
            </div>
            {/* overlay */}
            {isSidebarOpen && (
                <div className='fixed inset-0 w-full h-full bg-black opacity-50 z-50 md:hidden' onClick={toggleSidebar}></div>
            )}
            {/* sidebar */}
            <div className={`w-64 bg-gray-600 min-h-screen text-white absolute md:relative transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}>
                <AdminSideBar />
            </div>
            {/* main content*/}
            <div className="flex-grow p-6 overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout