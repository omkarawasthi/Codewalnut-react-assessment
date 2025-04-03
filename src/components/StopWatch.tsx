import { useState, useRef } from 'react';

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTime(0);
  };

  // Format time into HH:MM:SS.xx
  const formatTime = (ms: number): string => {
    const milliseconds = ('00' + Math.floor((ms % 1000) / 10)).slice(-2);
    const seconds = ('0' + (Math.floor(ms / 1000) % 60)).slice(-2);
    const minutes = ('0' + (Math.floor(ms / 60000) % 60)).slice(-2);
    const hours = ('0' + Math.floor(ms / 3600000)).slice(-2);
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Stopwatch</h2>
      <div className="text-4xl font-bold mb-6">{formatTime(time)}</div>
      <div className="flex space-x-4">
        {!isRunning && (
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Start
          </button>
        )}
        {isRunning && (
          <button
            onClick={handleStop}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Stop
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
