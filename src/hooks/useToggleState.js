/**
 * Custom React hook to manage a boolean toggle state.
 *
 * @param {boolean} isOpen - The initial state value.
 * @returns {[boolean, function]} An array containing the current state and a function to toggle the state.
 *
 */
import { useState } from "react";

export default function useToggleState(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    function handleIsOpen() {
        setIsOpen((isOpen) => !isOpen);
    };

    return [isOpen, handleIsOpen];
}