// StopWatch.tsx
import { useState } from 'react';
import { StopWatchTimer } from './StopWatchTImer';
import "./Style.css";

const Stopwatch: React.FC = () => {
    const [timers] = useState([
        {
            id: '1',
            title: '',
            description: '',
            duration: 0,
            remainingTime: 0,
            isRunning: false,
            createdAt: 0
        },
    ]);

    return (
        <div className="stopwatch-container">
            {timers.map((timer) => (
                <div key={timer.id} className="stopwatch-card">
                    <StopWatchTimer timer={timer} />
                </div>
            ))}
        </div>
    );
    
};

export default Stopwatch;