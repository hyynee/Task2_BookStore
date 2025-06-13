import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ children, role }) => {
    const authState = useSelector(state => state.auth);
    const { user, loading } = authState;
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user || (role && user.role?.trim().toLowerCase() !== role.trim().toLowerCase())) {
        return <Navigate to='/login' replace />;
    }
    return children;
};

export default AdminPrivateRoute;