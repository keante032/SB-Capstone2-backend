import { useState, useEffect } from "react";

/** Custom hook for keeping state data synced with localStorage. */

function useLocalStorage(key, firstValue = null) {
    // make piece of state based off of value in localStorage (or default, probably null)
    const initialValue = localStorage.getItem(key) || firstValue;

    const [item, setItem] = useState(initialValue);

    // use useEffect to update localStorage when state changes
    useEffect(function setKeyInLocalStorage() {
        if (item === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, item);
        }
    }, [key, item]);

    return [item, setItem];
}

export default useLocalStorage;
