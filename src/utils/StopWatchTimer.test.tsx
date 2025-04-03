import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StopWatchTimer } from '../components/StopWatchTimer';
import { formatTime } from '../utils/time';
import { act } from '@testing-library/react'; // Update this import
import '@testing-library/jest-dom';

jest.mock('../utils/time', () => ({
  formatTime: jest.fn((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.00`;
  })
}));

describe('StopWatchTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('renders initial state correctly', () => {
    render(<StopWatchTimer />);
    expect(screen.getByText('00:00.00')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  test('starts and stops the stopwatch', () => {
    render(<StopWatchTimer />);
    
    // Start the stopwatch
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();

    // Advance time by 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(formatTime).toHaveBeenCalledWith(3);

    // Stop the stopwatch
    fireEvent.click(screen.getByRole('button', { name: /pause/i }));
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(formatTime).toHaveBeenCalledWith(3); // Time should stay at 3 seconds
  });

  test('records laps correctly', () => {
    render(<StopWatchTimer />);
    
    // Start and record laps
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    
    act(() => {
      jest.advanceTimersByTime(2500);
    });
    fireEvent.click(screen.getByTitle(/add lap/i));

    act(() => {
      jest.advanceTimersByTime(1500);
    });
    fireEvent.click(screen.getByTitle(/add lap/i));

    const laps = screen.getAllByRole('row');
    expect(laps).toHaveLength(2);
    
    expect(laps[0]).toHaveTextContent('100:02.00'); // Split time
    expect(laps[0]).toHaveTextContent('200:02.00'); // Total time
    expect(laps[1]).toHaveTextContent('100:01.00');
    expect(laps[1]).toHaveTextContent('200:04.00');
  });

  test('resets the stopwatch completely', () => {
    render(<StopWatchTimer />);
    
    // Start and record activity
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    fireEvent.click(screen.getByTitle(/add lap/i));
    
    // Reset everything
    fireEvent.click(screen.getByTitle(/reset timer/i));

    expect(screen.getByText('00:00.00')).toBeInTheDocument();
    expect(screen.queryByRole('row')).not.toBeInTheDocument();
  });

  test('prevents lap recording when stopped', () => {
    render(<StopWatchTimer />);
    
    // Try to record lap when stopped
    fireEvent.click(screen.getByTitle(/add lap/i));
    expect(screen.queryByRole('row')).not.toBeInTheDocument();
    
    // Start and then stop
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    fireEvent.click(screen.getByRole('button', { name: /pause/i }));
    
    // Try to record lap again
    fireEvent.click(screen.getByTitle(/add lap/i));
    expect(screen.queryByRole('row')).not.toBeInTheDocument();
  });

  test('handles button state correctly', () => {
    render(<StopWatchTimer />);
    
    // Initial state
    expect(screen.getByRole('button', { name: /start/i })).toBeEnabled();
    expect(screen.getByTitle(/add lap/i)).toBeDisabled();
    
    // After starting
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    expect(screen.getByTitle(/add lap/i)).toBeEnabled();
    
    // After stopping
    fireEvent.click(screen.getByRole('button', { name: /pause/i }));
    expect(screen.getByTitle(/add lap/i)).toBeDisabled();
  });
});