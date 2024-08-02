/**
 * Handles the get token logic from local storage
 */
export function getToken(): string | null {
    return localStorage.getItem('token');
}

/**
 * Handles the inserting logic of token to local storage
 * @param token 
 */
export function setToken(token: string) {
    localStorage.setItem('token', token);
}

/**
 * Handles the remove logic of token to local storage
 */
export function removeToken() {
    localStorage.removeItem('token');
}
