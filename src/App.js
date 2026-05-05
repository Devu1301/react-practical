import React, { useState, useEffect } from "react";
 
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    fontFamily: "'Courier New', Courier, monospace",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "32px",
    padding: "60px 70px",
    textAlign: "center",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "36px",
  },
  label: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "11px",
    letterSpacing: "6px",
    textTransform: "uppercase",
    margin: 0,
  },
  ringWrapper: {
    position: "relative",
    width: "200px",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: "rotate(-90deg)",
  },
  timeDisplay: {
    color: "#ffffff",
    fontSize: "52px",
    fontWeight: "700",
    letterSpacing: "4px",
    lineHeight: 1,
    zIndex: 1,
    textShadow: "0 0 30px rgba(168,85,247,0.6)",
  },
  msDisplay: {
    color: "rgba(255,255,255,0.35)",
    fontSize: "14px",
    letterSpacing: "2px",
    marginTop: "4px",
    zIndex: 1,
  },
  timeInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 1,
  },
  buttons: {
    display: "flex",
    gap: "16px",
  },
  btn: (color, bg) => ({
    padding: "14px 32px",
    fontSize: "13px",
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: "600",
    letterSpacing: "3px",
    textTransform: "uppercase",
    border: `1px solid ${color}`,
    borderRadius: "50px",
    background: bg,
    color: color,
    cursor: "pointer",
    transition: "all 0.2s ease",
  }),
};
 
const RING_RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
 
export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
 
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime((p) => p + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
 
  const hrs = String(Math.floor(time / 3600)).padStart(2, "0");
  const mins = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const secs = String(time % 60).padStart(2, "0");
 
  // Ring animates every 60s cycle
  const progress = (time % 60) / 60;
  const dashOffset = CIRCUMFERENCE * (1 - progress);
 
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <p style={styles.label}>Stopwatch</p>
 
        {/* Animated Ring + Time */}
        <div style={styles.ringWrapper}>
          <svg
            width="200"
            height="200"
            style={styles.svg}
            viewBox="0 0 200 200"
          >
            {/* Track */}
            <circle
              cx="100"
              cy="100"
              r={RING_RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="6"
            />
            {/* Progress */}
            <circle
              cx="100"
              cy="100"
              r={RING_RADIUS}
              fill="none"
              stroke="url(#grad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 0.8s ease" }}
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
 
          <div style={styles.timeInner}>
            <div style={styles.timeDisplay}>
              {hrs}:{mins}:{secs}
            </div>
            <div style={styles.msDisplay}>hr : min : sec</div>
          </div>
        </div>
 
        {/* Status indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: isRunning ? "#22c55e" : "rgba(255,255,255,0.2)",
              boxShadow: isRunning ? "0 0 10px #22c55e" : "none",
              transition: "all 0.3s ease",
            }}
          />
          <span
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            {isRunning ? "Running" : time > 0 ? "Paused" : "Ready"}
          </span>
        </div>
 
        {/* Buttons */}
        <div style={styles.buttons}>
          <button
            style={styles.btn(
              isRunning ? "rgba(255,255,255,0.2)" : "#a855f7",
              isRunning ? "transparent" : "rgba(168,85,247,0.15)"
            )}
            onClick={() => setIsRunning(true)}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            style={styles.btn("#06b6d4", "rgba(6,182,212,0.1)")}
            onClick={() => setIsRunning(false)}
          >
            Pause
          </button>
          <button
            style={styles.btn("rgba(255,255,255,0.3)", "transparent")}
            onClick={() => {
              setTime(0);
              setIsRunning(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
