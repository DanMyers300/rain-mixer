import React, { useState, useRef, useEffect } from 'react';

interface CurvedSliderProps {
  value: number;
  onChange: (value: number) => void;
  radius?: number;
}

const Volume: React.FC<CurvedSliderProps> = ({
  value,
  onChange,
  radius = 100,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<SVGSVGElement>(null);
  const width = radius * 2;
  const height = radius;

  const getAngleFromValue = (val: number) => {
    return ((val / 100) * Math.PI) - Math.PI / 2;
  };

  const getValueFromAngle = (angle: number) => {
    let normalized = (angle + Math.PI / 2) / Math.PI;
    return Math.min(100, Math.max(0, Math.round(normalized * 100)));
  };

  const getCoordinatesFromValue = (val: number) => {
    const angle = getAngleFromValue(val);
    const x = radius + radius * Math.cos(angle);
    const y = radius + radius * Math.sin(angle);
    return { x, y };
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
  
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - radius;
    const y = e.clientY - rect.top - radius;
    let angle = Math.atan2(y, x);
    
    // Clamp angle between -π/2 and π/2
    angle = Math.max(-Math.PI / 2, Math.min(angle, Math.PI / 2));
    
    onChange(getValueFromAngle(angle));
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const { x: thumbX, y: thumbY } = getCoordinatesFromValue(value);

  return (
    <svg
      ref={containerRef}
      width={width}
      height={height}
      style={{ touchAction: 'none' }}
    >
      {/* Background track */}
      <path
        d={`M ${radius} ${radius} 
           A ${radius} ${radius} 0 0 1 ${radius * 2} ${radius}
           A ${radius} ${radius} 0 0 1 ${radius} ${radius}`}
        fill="none"
        stroke="#ddd"
        strokeWidth="4"
      />
      
      {/* Progress track */}
      <path
        d={`M ${radius} ${radius} 
           A ${radius} ${radius} 0 ${value > 50 ? 1 : 0} 1 ${thumbX} ${thumbY}`}
        fill="none"
        stroke="#4a90e2"
        strokeWidth="4"
      />
      
      {/* Thumb */}
      <circle
        cx={thumbX}
        cy={thumbY}
        r="10"
        fill="#ffffff"
        stroke="#4a90e2"
        strokeWidth="2"
        onMouseDown={handleMouseDown}
        style={{ cursor: 'pointer', transition: isDragging ? 'none' : 'all 0.2s' }}
      />
    </svg>
  );
};

export default Volume;
