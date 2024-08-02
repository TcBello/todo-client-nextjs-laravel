/**
 * Handles the normal validation input
 * @param value 
 */
export function validateInput(value: string): string | null {
    if(value.trim().length == 0) {
        return "Missing field!";
    }

    return null;
}

/**
 * Handles the email validation input
 * @param value 
 */
export function validateEmail(value: string): string | null {
    if(value.trim().length == 0) {
        return "Missing field!";
    }

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!value.match(validRegex)) {
        return "Invalid email";
    }

    return null;
}

/**
 * Handles the password validation input
 * @param value 
 */
export function validatePassword(value: string): string | null {
    if(value.length == 0) {
        return "Missing field!";
    }

    if(value.length < 6) {
        return "Password must be at least 6 characters";
    }

    return null;
}

/**
 * Handles the confirm password validation input
 * @param value 
 * @param password
 */
export function validateConfirmPassword(value: string, password: string): string | null {
    if(value.length == 0) {
        return "Missing field!";
    }

    if(value.length < 6) {
        return "Password must be at least 6 characters";
    }

    if(value != password) {
        return "Password does not match";
    }

    return null;
}
