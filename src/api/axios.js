import axios from "axios";


/*
 * ============================================================
 * API BASE URL
 * ============================================================
 *
 * Development:
 * http://localhost:9090
 *
 * Production:
 * https://shrishahuprabodhini.in/bus-api
 *
 */

const RAW_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:9090";


const BASE_URL =
    RAW_BASE_URL.replace(/\/+$/, "");


/*
 * ============================================================
 * AXIOS INSTANCE
 * ============================================================
 */

const api = axios.create({

    baseURL: BASE_URL,

    timeout: 30000,

    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});


/*
 * ============================================================
 * REQUEST INTERCEPTOR
 * ============================================================
 */

api.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem("token");

        const url =
            config.url || "";


        /*
         * Login/register must NOT receive an old JWT.
         *
         * This is important when an expired token remains
         * in localStorage.
         */

        const isAuthEndpoint =
            url.includes("/api/auth/login") ||
            url.includes("/api/auth/register");


        if (
            token &&
            !isAuthEndpoint
        ) {

            config.headers =
                config.headers || {};

            config.headers.Authorization =
                `Bearer ${token}`;

        } else if (
            isAuthEndpoint &&
            config.headers
        ) {

            delete config.headers.Authorization;
        }


        /*
         * Development logging
         */

        if (import.meta.env.DEV) {

            console.log(
                `API REQUEST: ${(
                    config.method || "GET"
                ).toUpperCase()} ${BASE_URL}${url}`
            );
        }


        return config;
    },


    (error) => {

        console.error(
            "Axios request error:",
            error
        );

        return Promise.reject(error);
    }
);


/*
 * ============================================================
 * RESPONSE INTERCEPTOR
 * ============================================================
 */

api.interceptors.response.use(

    (response) => {

        if (import.meta.env.DEV) {

            console.log(
                `API RESPONSE: ${response.status}`,
                response.config.url
            );
        }

        return response;
    },


    (error) => {

        const status =
            error.response?.status;

        const data =
            error.response?.data;

        const url =
            error.config?.url || "";


        console.error(
            "API ERROR:",
            status,
            url,
            data
        );


        /*
         * ------------------------------------------------------
         * 401 - Unauthorized
         * ------------------------------------------------------
         */

        if (status === 401) {

            const isAuthEndpoint =
                url.includes("/api/auth/login") ||
                url.includes("/api/auth/register");


            /*
             * Do NOT clear login credentials when the
             * login request itself fails.
             */

            if (!isAuthEndpoint) {

                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("roleId");

                delete api.defaults.headers.common[
                    "Authorization"
                ];


                const basePath =
                    import.meta.env.VITE_APP_BASE_PATH ||
                    "/bustracking";


                const loginPath =
                    `${basePath}/login`
                        .replace(/\/{2,}/g, "/");


                if (
                    !window.location.pathname.includes(
                        "/login"
                    )
                ) {

                    window.location.href =
                        loginPath;
                }
            }
        }


        /*
         * ------------------------------------------------------
         * 403 - Forbidden
         * ------------------------------------------------------
         */

        if (status === 403) {

            console.error(
                "Forbidden API request:",
                url
            );
        }


        /*
         * ------------------------------------------------------
         * 404 - Not Found
         * ------------------------------------------------------
         */

        if (status === 404) {

            console.error(
                "API endpoint not found:",
                url
            );
        }


        /*
         * ------------------------------------------------------
         * 500 - Server Error
         * ------------------------------------------------------
         */

        if (status >= 500) {

            console.error(
                "Backend server error:",
                data
            );
        }


        return Promise.reject(error);
    }
);


export default api;