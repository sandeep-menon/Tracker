import { useState } from "react";

function Timer() {
    setInterval(() => {
        setTime(new Date().toDateString() + " " + new Date().toLocaleTimeString());
    }, 1000);

    const [time, setTime] = useState(new Date().toDateString() + " " + new Date().toLocaleTimeString());

    return (
        <>{time}</>
    )
}

export default Timer;