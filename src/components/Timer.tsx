import { useState } from 'react';
import { Plus, Clock } from 'lucide-react';
import { TimerList } from './TimerList';
import { AddTimerModal } from './AddTimerModal';
import { Toaster } from 'sonner';

function Timer() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Toaster position="top-right" />
            <div className="container mx-auto px-4 py-8">
                <div>
                    <div className="flex items-center gap-3">
                        <Clock className="w-8 h-8 text-green-600" />
                        <h1 className="text-3xl font-bold text-gray-900">Timer</h1>
                    </div>
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
        </div>
    );
}

export default Timer;