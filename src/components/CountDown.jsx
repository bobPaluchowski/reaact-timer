import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [eventName, setEventName] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showTimerUpCard, setShowTimerUpCard] = useState(false);

  useEffect(() => {
    if (countdownStarted && timeRemaining > 0) {
      const countdownInterval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(countdownInterval);
            handleTimerComplete();
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [countdownStarted, timeRemaining]);

  useEffect(() => {
    if (countdownStarted) {
      document.title = eventName;
    } else {
      document.title = "Countdown Timer";
    }
  }, [countdownStarted, eventName]);

  const handleSetCountdown = () => {
    const totalMilliseconds = (parseInt(hours) * 3600 + parseInt(minutes) * 60) * 1000;
    if (totalMilliseconds > 0) {
      setTimeRemaining(totalMilliseconds);
      setCountdownStarted(true);
    } else {
      alert("Please enter a valid time (at least 1 minute)");
    }
  };

  const handleStopCountdown = () => {
    setCountdownStarted(false);
  };

  const handleResetCountdown = () => {
    setCountdownStarted(false);
    setEventName("");
    setHours("");
    setMinutes("");
    setTimeRemaining(0);
    setShowTimerUpCard(false);
  };

  const handleTimerComplete = () => {
    setShowTimerUpCard(true);
    setCountdownStarted(false);
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    return (
      <div className="countdown-display">
        <div className="countdown-value">
          {hours.toString().padStart(2, "0")} <span>hours</span>
        </div>
        <div className="countdown-value">
          {minutes.toString().padStart(2, "0")} <span>minutes</span>
        </div>
        <div className="countdown-value">
          {seconds.toString().padStart(2, "0")} <span>seconds</span>
        </div>
      </div>
    );
  };

  const TimerUpCard = () => (
    <div className="timer-up-card">
      <h2>Timer is UP</h2>
      <p>{eventName} has finished!</p>
      <button onClick={handleResetCountdown}>Close</button>
    </div>
  );

  return (
    <div className="countdown-timer-container">
      <h2 className="countdown-name">
        {countdownStarted ? eventName : "Countdown Timer"}
      </h2>

      {showTimerUpCard ? (
        <TimerUpCard />
      ) : !countdownStarted ? (
        <form className="countdown-form">
          <label htmlFor="title">Event Name</label>
          <input
            name="title"
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />

          <label htmlFor="hours">Hours</label>
          <input
            name="hours"
            type="number"
            min="0"
            placeholder="Enter hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />

          <label htmlFor="minutes">Minutes</label>
          <input
            name="minutes"
            type="number"
            min="0"
            max="59"
            placeholder="Enter minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
          <button type="button" onClick={handleSetCountdown}>Start Countdown</button>
        </form>
      ) : (
        <>
          {formatTime(timeRemaining)}
          <div className="control-buttons">
            <button onClick={handleStopCountdown}>Stop</button>
            <button onClick={handleResetCountdown}>Reset</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
