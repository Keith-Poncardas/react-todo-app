import { useState, useEffect } from 'react';

/**
 * Custom React hook for synchronizing state with localStorage.
 *
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {*} initialValue - The initial value to use if no value is found in localStorage.
 * @returns {[any, Function]} An array containing the current value and a setter function.
 */
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (err) {
            console.error(err);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (err) {
            console.error(err);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}
