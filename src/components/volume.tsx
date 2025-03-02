interface VolumeProps {
  volume: number;
  setVolume: (value: number) => void;
}

const Volume = ({ volume, setVolume }: VolumeProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const linearValue = parseFloat(e.target.value);
    const quadraticValue = linearValue * linearValue;
    setVolume(quadraticValue);
  };

  return (
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={Math.sqrt(volume)}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
      className="volume-slider mt-5 w-48 h-4 rounded-full
        appearance-none cursor-pointer
        [&::-webkit-slider-container]:bg-transparent
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-white
        [&::-webkit-slider-thumb]:relative
        [&::-webkit-slider-thumb]:z-20"
      style={{
        '--volume': `${Math.sqrt(volume) * 100}%`,
      } as React.CSSProperties}
    />
  );
};

export default Volume;
