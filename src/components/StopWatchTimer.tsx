import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Flag } from 'lucide-react';
import { formatTime } from '../utils/time';
import { TimerControls } from './TimerControls';
import { TimerProgress } from './TimerProgress';

export const StopWatchTimer: React.FC = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleLap = () => {
    setLaps([...laps, elapsedTime]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  return (
    <div className="relative flex flex-col left-[358px] top-[100px] bg-white rounded-xl shadow-lg w-[400px] p-6 transition-transform hover:scale-102 overflow-hidden">
      <div className="flex flex-col items-center mt-6">
        <div className="text-4xl font-mono font-bold text-gray-800 mb-4">
          {formatTime(elapsedTime)}
        </div>

        <TimerProgress progress={0} /> {/* No progress needed for stopwatch mode */}

        <div className="flex gap-4 mt-4">
          <TimerControls
            isRunning={isRunning}
            remainingTime={elapsedTime}
            duration={0} // Stopwatch has no fixed duration
            onToggle={handleToggle}
            onRestart={handleReset}
          />

          <button
            onClick={handleLap}
            className="p-2 rounded-lg hover:bg-blue-50 bg-[#f3f4f6] text-blue-500 transition-colors"
            title="Add Lap"
            disabled={!isRunning}
          >
            <Flag className="w-5 h-5" />
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-full hover:bg-green-50 bg-[#f3f4f6] transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {laps.length > 0 && (
          <table className="mt-4 border w-full text-center">
            <thead>
              <tr>
                <th>Lap</th>
                <th>Split Time</th>
                <th>Total Time</th>
              </tr>
            </thead>
            <tbody>
              {laps.map((lap, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatTime(index === 0 ? lap : lap - laps[index - 1])}</td>
                  <td>{formatTime(lap)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
