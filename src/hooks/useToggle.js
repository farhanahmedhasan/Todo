import { useState } from "react";

function useToggle(initialState = true) {
    const [visible, setVisible] = useState(initialState);

    function toggle() {
        setVisible((preVisible) => !preVisible);
    }

    return [visible, toggle];
}

export default useToggle;
