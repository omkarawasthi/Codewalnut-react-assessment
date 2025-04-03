import { useState } from 'react';
import { Plus, Clock, Timer, Watch } from 'lucide-react';
import { Toaster } from 'sonner';
import { TimerList } from './components/TimerList';
import {AddTimerModal} from './components/AddTimerModal';
import Stopwatch from './components/StopWatch';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'timer' | 'stopwatch'>('timer');

  return (
    <div className="min-h-screen flex">
      <Toaster position="top-right" />

      {/* Left Navigation Sidebar */}
      <div className="w-64 bg-white shadow-md p-6">
        <div className="flex items-center gap-3 mb-8">
          <Clock className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Timerr</h1>
        </div>

        <nav className="flex flex-col gap-4">
          <button
            onClick={() => setActiveTab('timer')}
            className="px-1 py-2 flex gap-2 rounded-lg text-black text-left "
          >
            <Timer className={`${activeTab === 'timer'
                ? ' text-green-600'
                : 'text-gray-800'
              }`} />
            <span className={`${activeTab === 'timer'
                ? ' text-green-600'
                : 'text-gray-800'
              }`}>Timer</span>
          </button>

          <button
            onClick={() => setActiveTab('stopwatch')}
            className="px-1 py-2 flex gap-2 rounded-lg text-black text-left "
          >
            <Watch className={`${activeTab === 'stopwatch'
                ? ' text-green-600'
                : 'text-gray-800'
              }`}/>
           <span className={`${activeTab === 'stopwatch'
                ? ' text-green-600'
                : 'text-gray-800'
              }`}>Stopwatch</span>
          </button>
        </nav>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 container mx-auto px-8 py-8">
        {activeTab === 'timer' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Timers</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Timer
              </button>
            </div>

            <TimerList />

            <AddTimerModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        )}

        {activeTab === 'stopwatch' && <Stopwatch />}
      </div>
    </div>
  );
};

export default Home;
