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
    />
  );
};

export default Volume;
