import { useEffect, useState } from 'react';

const LoadingBar = ({ isLoading }: { isLoading: boolean }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let interval: any;

    if (isLoading) {
      setWidth(0);
      interval = setInterval(() => {
        setWidth((old) => (old >= 90 ? old : old + 10));
      }, 100);
    } else {
      setWidth(100);
      setTimeout(() => setWidth(0), 300);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: `${width}%`,
        backgroundColor: '#facc15', // Tailwind yellow-400
        transition: 'width 0.2s ease-out',
        zIndex: 9999,
      }}
    />
  );
};

export default LoadingBar;
