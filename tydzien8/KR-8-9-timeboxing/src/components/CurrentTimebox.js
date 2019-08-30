import React, { useState, useRef, useEffect } from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import { getMinutesAndSecondsFromDurationInSeconds } from "../lib/time";

function CurrentTimebox({ title, totalTimeInMinutes, isEditable, onEdit }) {
  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [pausesCount, setPausesCount] = useState(0);
  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);
  const intervalId = useRef();
  const minutesLeft = useRef();
  const secondsLeft = useRef();
  const progressInPercent = useRef();

  useEffect(() => {
    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
    [
      minutesLeft.current,
      secondsLeft.current
    ] = getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);
    progressInPercent.current =
      (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;

    return () => stopTimer();
  }, [elapsedTimeInSeconds]);

  function handleStart() {
    setIsRunning(true);

    startTimer();
  }
  function handleStop(event) {
    setIsRunning(false);
    setIsPaused(false);
    setPausesCount(0);
    setElapsedTimeInSeconds(0);

    stopTimer();
  }
  function startTimer() {
    if (intervalId === null) {
      intervalId.current = window.setInterval(() => {
        setElapsedTimeInSeconds(
          prevElapsedTimeInSeconds => prevElapsedTimeInSeconds + 0.1
        );
      }, 100);
    }
  }
  function stopTimer() {
    window.clearInterval(intervalId);
    intervalId.current = null;
  }
  function togglePause() {
    let newIsPaused;

    setIsPaused(prevIsPaused => {
      newIsPaused = !prevIsPaused;

      if (newIsPaused) {
        stopTimer();
      } else {
        startTimer();
      }

      return newIsPaused;
    });
    setPausesCount(prevPausesCount =>
      newIsPaused ? prevPausesCount + 1 : prevPausesCount
    );
  }

  return (
    <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
      <h1>{title}</h1>
      <Clock
        minutes={minutesLeft.current}
        seconds={secondsLeft.current}
        className={isPaused ? "inactive" : ""}
      />
      <ProgressBar
        percent={progressInPercent.current}
        className={isPaused ? "inactive" : ""}
        color="red"
        big
      />
      <button onClick={onEdit} disabled={isEditable}>
        Edytuj
      </button>
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={togglePause} disabled={!isRunning}>
        {isPaused ? "Wznów" : "Pauzuj"}
      </button>
      Liczba przerw: {pausesCount}
    </div>
  );
}

export default CurrentTimebox;
