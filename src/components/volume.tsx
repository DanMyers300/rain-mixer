interface VolumeProps {
  volume: number;
  setVolume: (value: number) => void;
};

const Volume = ({ volume, setVolume }: VolumeProps) => {
  return (
    <input
      type="range"
      min="0"
      max="1"
      step="0.1"
      value={volume}
      onChange={(e) => setVolume(parseFloat(e.target.value))}
      onClick={(e) => e.stopPropagation()}
      className="
        absolute
        bottom-4
        left-1/2
        transform
        -translate-x-1/2
        w-32
        h-2
        bg-gray-200
        rounded-lg
        appearance-none
        cursor-pointer
        hover:opacity-100
        opacity-80
        transition-opacity
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-white
      "
    />
  );
};

export default Volume;
