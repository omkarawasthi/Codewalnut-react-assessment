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
    <div className="relative stopwatch-card bg-white md:top-[30px] md:left-[370px] mx-auto md:mx-0 rounded-xl shadow-lg w-full md:w-[400px] p-4 md:p-6 transition-transform hover:scale-102 overflow-hidden">
      <div className="flex flex-col items-center mt-4 md:mt-6">
        <div className="text-3xl md:text-4xl font-mono font-bold text-gray-800 mb-4">
          {formatTime(elapsedTime)}
        </div>

        <TimerProgress progress={0} />

        <div className="flex stopwatch-buttons gap-3 md:gap-5 mt-4">
          <TimerControls
            isRunning={isRunning}
            remainingTime={elapsedTime}
            duration={0}
            onToggle={handleToggle}
            onRestart={handleReset}
          />
          <button
            onClick={handleLap}
            className="flex items-center p-2 hover:cursor-pointer rounded-full w-10 md:w-12 hover:bg-blue-50 bg-[#f3f4f6] text-blue-500 transition-colors"
            title="Add Lap"
            disabled={!isRunning}
          >
            <Flag className="w-6 h-6 md:w-7 relative left-[3px]  md:h-7" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-full w-10 md:w-12 hover:bg-green-50 bg-[#f3f4f6] transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-6 h-6 md:w-7 relative left-[2px] hover:cursor-pointer md:h-7" />
          </button>
        </div>

        {laps.length > 0 && (
          <div className="w-full overflow-x-auto mt-4">
            <table className="border stopwatch-lap-table w-full min-w-[300px]">
              <thead>
                <tr>
                  <th className="text-sm md:text-base">Lap</th>
                  <th className="text-sm md:text-base">Split Time</th>
                  <th className="text-sm md:text-base">Total Time</th>
                </tr>
              </thead>
              <tbody>
                {laps.map((lap, index) => (
                  <tr key={index} className='mx-2'>
                    <td className="text-sm md:text-base">{index + 1}</td>
                    <td className="text-sm md:text-base">{formatTime(index === 0 ? lap : lap - laps[index - 1])}</td>
                    <td className="text-sm md:text-base">{formatTime(lap)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
  
};
