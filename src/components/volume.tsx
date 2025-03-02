interface VolumeProps {
  volume: number;
  setVolume: (value: number) => void;
}

const Volume = ({ volume, setVolume }: VolumeProps) => {
  const currentVolume = Math.sqrt(volume);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value * value);
  };

  return (
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={currentVolume}
      onInput={handleChange}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
      className="mt-5 w-48 h-2 rounded-full
        appearance-none bg-gradient-to-r from-transparent
        via-current to-transparent cursor-pointer
        [&::-webkit-slider-container]:bg-transparent
        [&::-webkit-slider-runnable-track]:rounded-[100px/1px]
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-white"
    />
  );
};

export default Volume;
