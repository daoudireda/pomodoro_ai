import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Coffee, Brain, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const TIMER_PRESETS = {
  pomodoro: { work: 25, break: 5 },
  short: { work: 15, break: 3 },
  long: { work: 50, break: 10 },
  custom: { work: 45, break: 15 },
};

type TimerMode = keyof typeof TIMER_PRESETS;

interface TimerProps {
  compact?: boolean;
}

export function Timer({ compact = false }: TimerProps) {
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [minutes, setMinutes] = useState(TIMER_PRESETS[mode].work);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = window.setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            setIsBreak(!isBreak);
            setMinutes(
              isBreak ? TIMER_PRESETS[mode].work : TIMER_PRESETS[mode].break
            );
            return;
          }
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(TIMER_PRESETS[mode].work);
    setSeconds(0);
    setIsBreak(false);
  };

  const switchToBreakTimer = () => {
    setIsActive(false);
    setMinutes(TIMER_PRESETS[mode].break);
    setSeconds(0);
    setIsBreak(true);
  };

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setMinutes(TIMER_PRESETS[newMode].work);
    setSeconds(0);
    setIsBreak(false);
    setIsActive(false);
  };

  return (
    <div className={`text-center space-y-${compact ? "6" : "8"}`}>
      {!compact && (
        <Tabs defaultValue="pomodoro" className="w-full max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="pomodoro"
              onClick={() => handleModeChange("pomodoro")}
            >
              {/* <Brain className="w-4 h-4 mr-2" /> */}
              25/5
            </TabsTrigger>
            <TabsTrigger
              value="short"
              onClick={() => handleModeChange("short")}
            >
              {/* <Zap className="w-4 h-4 mr-2" /> */}
              15/3
            </TabsTrigger>
            <TabsTrigger value="long" onClick={() => handleModeChange("long")}>
              {/* <Coffee className="w-4 h-4 mr-2" /> */}
              50/10
            </TabsTrigger>
            <TabsTrigger
              value="custom"
              onClick={() => handleModeChange("custom")}
            >
              45/15
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      <div className="space-y-4">
        <h2
          className={`${
            compact ? "text-lg" : "text-2xl"
          } font-semibold flex items-center justify-center gap-2`}
        >
          {isBreak ? (
            <>
              <Coffee
                className={`${compact ? "w-5 h-5" : "w-6 h-6"} text-green-500`}
              />
              <span className="text-white">Break Time</span>
            </>
          ) : (
            <span className="text-white">Focus Session</span>
          )}
        </h2>

        <div
          className={`${
            compact ? "text-4xl" : "text-7xl"
          } font-bold font-mono tracking-wider text-white`}
        >
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>

        <div className="w-full max-w-md mx-auto">
          {/* Timer display would go here */}
          <div className="flex justify-between items-center gap-4 mt-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={resetTimer}
              className="text-muted-foreground"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>

            <Button
              size={compact ? "default" : "lg"}
              onClick={toggleTimer}
              className="gap-2"
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" /> Start
                </>
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={switchToBreakTimer}
              className="text-muted-foreground"
            >
              <Coffee className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
