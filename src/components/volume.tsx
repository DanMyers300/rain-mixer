interface VolumeProps {
  volume: number;
  setVolume: (value: number) => void;
}

const Volume = ({ volume, setVolume }: VolumeProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lv = parseFloat(e.target.value);
    setVolume(lv * lv);
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
      className="volume-slider mt-5 mb-5 w-full h-4 rounded-full
        appearance-none cursor-pointer
        [&::-webkit-slider-container]:bg-transparent
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-white
        [&::-webkit-slider-thumb]:relative
        [&::-webkit-slider-thumb]:z-20
        [&::-moz-range-track]:h-4
        [&::-moz-range-track]:rounded-full
        [&::-moz-range-track]:bg-gray-200
        [&::-moz-range-progress]:h-4
        [&::-moz-range-progress]:rounded-full
        [&::-moz-range-progress]:bg-blue-500
        [&::-moz-range-thumb]:appearance-none
        [&::-moz-range-thumb]:h-4
        [&::-moz-range-thumb]:w-4
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:border-none
        [&::-moz-range-thumb]:bg-white"
      style={{
        '--volume': `${Math.sqrt(volume) * 100}%`,
      } as React.CSSProperties}
    />
  );
};

export default Volume;
