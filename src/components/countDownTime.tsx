"use client";
import React, { useState } from "react";
import { useEffect } from "react";
const CountDown: React.FC = () => {
    const [init, setInit] = useState(0); // Initial countdown value
    const [running, setRunning] = useState(false); // Whether the countdown is active
    const [remainingTime, setRemainingTime] = useState(0); // Time left in the countdown

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (running && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime((prev) => prev - 1); // Decrement remaining time
            }, 1000);
        }

        // Cleanup interval when the component unmounts or conditions change
        return () => {
            clearInterval(timer);
        };
    }, [running, remainingTime]); // Effect runs whenever `running` or `remainingTime` changes

    const startCountdown = () => {
        setRemainingTime(init);
        setRunning(true);
    };

    const stopCountdown = () => {
        setRunning(false);
    };

    const resetCountdown = () => {
        setRunning(false);
        setRemainingTime(0);
        setInit(0)
    };


return(
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-4">
    <h1 className="text-4xl font-bold text-gray-800 mb-6">Countdown Timer</h1>
    <input
        type="number"
        value={init}
        onChange={(e) => setInit(Number(e.target.value))}
        placeholder="Enter countdown time"
        className="mb-4 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <div className="flex gap-4 mb-6">
        <button
            onClick={startCountdown}
            disabled={running}
            className={`px-4 py-2 rounded-lg font-semibold ${
                running
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
            }`}
        >
            Start
        </button>
        <button
            onClick={stopCountdown}
            disabled={!running}
            className={`px-4 py-2 rounded-lg font-semibold ${
                !running
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
            }`}
        >
            Stop
        </button>
        <button
            onClick={resetCountdown}
            className="px-4 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600"
        >
            Reset
        </button>
    </div>
    <h2 className="text-2xl font-medium text-gray-700">
        Time Remaining: {remainingTime} seconds
    </h2>
</div>
);
};
    

export default CountDown;