/**
 * Handles the loading logic of redux state from the local storage
 */
export function loadReduxState(): any {
    try {
        const reduxState = localStorage.getItem("redux-state");

        if(reduxState === null) return undefined;

        return JSON.parse(reduxState);
    } catch (error) {
        return undefined;
    }
}

/**
 * Handles the logic of saving redux state in local storage
 * for data persistence
 * @param state 
 */
export function saveReduxState(state: any) {
    try {
        const stringifiedState = JSON.stringify(state);
        localStorage.setItem('redux-state', stringifiedState);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Handles the remove logic of redux state in local storage
 */
export function removeReduxState() {
    localStorage.removeItem('redux-state');
}
