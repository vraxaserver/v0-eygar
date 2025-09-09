import { useDispatch, useSelector } from "react-redux";
import { loginUser, checkStoredAuth, logout, clearError } from '@/store/slices/authSlice';

// Custom auth hook
export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    return {
        ...auth,
        login: (credentials) => dispatch(loginUser(credentials)),
        logout: () => dispatch(logout()),
        clearError: () => dispatch(clearError()),
        checkStoredAuth: () => dispatch(checkStoredAuth()),
    };
};

// Permission checking hook
export const usePermissions = () => {
    const { user } = useSelector((state) => state.auth);

    const hasPermission = (permission) => {
        return user?.permissions?.includes(permission) || false;
    };

    const hasAnyPermission = (permissions) => {
        return permissions.some((permission) => hasPermission(permission));
    };

    const hasAllPermissions = (permissions) => {
        return permissions.every((permission) => hasPermission(permission));
    };

    return {
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        userRole: user?.role,
        userPermissions: user?.permissions || [],
    };
};
