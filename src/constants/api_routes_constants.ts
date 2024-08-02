export const BASE_API_URL = "http://localhost:8000";
export const API_VERSION = "v1";

// AUTH ROUTES
export const API_LOGIN_ROUTE = `${BASE_API_URL}/api/${API_VERSION}/login`;
export const API_REGISTER_ROUTE = `${BASE_API_URL}/api/${API_VERSION}/register`;
export const API_REFRESH_TOKEN_ROUTE = `${BASE_API_URL}/api/${API_VERSION}/refresh-token`;
export const API_LOGOUT_ROUTE = `${BASE_API_URL}/api/${API_VERSION}/logout`;

export const API_USER_ROUTE = `${BASE_API_URL}/api/${API_VERSION}/users`;
export const API_CURRENT_USER_ROUTE = `${BASE_API_URL}/api/${API_VERSION}/current-user`;

// TODOS ROUTE
export const API_GET_TODOS_ROUTE = (userId: string) => `${BASE_API_URL}/api/${API_VERSION}/users/${userId}/todos`;
export const API_CREATE_TODO_ROUTE = `${BASE_API_URL}/api/${API_VERSION}/todos`;
export const API_UPDATE_TODO_ROUTE = (id: string) => `${BASE_API_URL}/api/${API_VERSION}/todos/${id}`;
export const API_DELETE_TODO_ROUTE = (id: string) => `${BASE_API_URL}/api/${API_VERSION}/todos/${id}`;
