import React from 'react';
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/Reducer/authReducer';
const AdminSideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeLogout = () => {
        dispatch(logout());
        dispatch(clearCart())
        navigate('/');
    }

    return (
        <div className='p-6'>
            <div className="mb-6">
                <Link to='/admin' className='text-white text-lg font-semibold'>HuyAnh</Link>
            </div>
            <h2 className='text-xl font-medium mb-6 text-center'>Admin Dashboard</h2>
            <nav className='flex flex-col space-y-2'>
                <NavLink to='/admin/users' className={({ isActive }) =>
                    isActive ?
                        'bg-yellow-500 text-white py-3 px-4 rounded flex items-center space-x-2'
                        : 'text-gray-400 hover:bg-yellow-200 hover:text-white py-3 px-4 rounded flex items-center space-x-2'}>
                    <FaUser />
                    <span>Users</span>
                </NavLink>
                <NavLink to='/admin/products' className={({ isActive }) =>
                    isActive ?
                        'bg-yellow-500 text-white py-3 px-4 rounded flex items-center space-x-2'
                        : 'text-gray-400 hover:bg-yellow-200 hover:text-white py-3 px-4 rounded flex items-center space-x-2'}>
                    <FaBoxOpen />
                    <span>Products</span>
                </NavLink>
                <NavLink to='/admin/orders' className={({ isActive }) =>
                    isActive ?
                        'bg-yellow-500 text-white py-3 px-4 rounded flex items-center space-x-2'
                        : 'text-gray-400 hover:bg-yellow-200 hover:text-white py-3 px-4 rounded flex items-center space-x-2'}>
                    <FaClipboardList />
                    <span>Orders</span>
                </NavLink>
                <NavLink to='/' className={({ isActive }) =>
                    isActive ?
                        'bg-yellow-500 text-white py-3 px-4 rounded flex items-center space-x-2'
                        : 'text-gray-400 hover:bg-yellow-200 hover:text-white py-3 px-4 rounded flex items-center space-x-2'}>
                    <FaStore />
                    <span>Shop</span>
                </NavLink>
            </nav>
            <div className='text-right mt-6'>
                <button
                    onClick={handleChangeLogout}
                    className='bg-red-500 text-white w-full py-2 px-4 rounded hover:bg-red-700 flex items-center justify-center space-x-2'>
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}

export default AdminSideBar