import { useState, useEffect } from "react";

export default function useCountDown(){
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const timeout = setTimeout(() =>{
            setSecondsLeft(prevState => prevState - 1);
        },1000);

        return () => clearTimeout(timeout);
    },[secondsLeft]);

    function start(seconds){
        setSecondsLeft(seconds);
    }

    return {secondsLeft,start};
}