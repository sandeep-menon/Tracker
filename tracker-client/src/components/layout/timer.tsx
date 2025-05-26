import { useState } from "react";

function Timer() {
    setInterval(() => {
        setTime(new Date().toLocaleString());
    }, 1000);

    const [time, setTime] = useState(new Date().toLocaleString());

    return (
        <>{time}</>
    )
}

export default Timer;