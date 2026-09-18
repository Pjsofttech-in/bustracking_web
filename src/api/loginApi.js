import api from "./axios";

/**
 * Login user
 *
 * POST:
 * /api/auth/login
 *
 * Production:
 * https://shrishahuprabodhini.in/bus-api/api/auth/login
 */
export const login = async (credentials) => {
    const response = await api.post(
        "/api/auth/login",
        credentials
    );

    return response.data;
};


/**
 * Register user
 */
export const register = async (userData) => {
    const response = await api.post(
        "/api/auth/register",
        userData
    );

    return response.data;
};


/**
 * Logout
 */
export const logout = async () => {
    try {
        const response = await api.post(
            "/api/auth/logout"
        );

        return response.data;

    } finally {

        clearAuthToken();

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("roleId");
    }
};


/**
 * Set JWT token in Axios defaults.
 */
export const setAuthToken = (token) => {

    if (token) {

        api.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;

    } else {

        delete api.defaults.headers.common[
            "Authorization"
        ];
    }
};


/**
 * Clear JWT token from Axios defaults.
 */
export const clearAuthToken = () => {

    delete api.defaults.headers.common[
        "Authorization"
    ];
};


/**
 * Restore token after browser refresh.
 */
export const initializeAuthToken = () => {

    const token =
        localStorage.getItem("token");

    if (token) {
        setAuthToken(token);
    }
};