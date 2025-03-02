interface VolumeProps {
  volume: number;
  setVolume: (value: number) => void;
};

const Volume = ({ volume, setVolume }: VolumeProps) => {

  // Give the volume slider a more natural feel
  // by applying a quadratic curve
  const currentVolume = Math.sqrt(volume);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _ = parseFloat(e.target.value);
    setVolume(_ * _);
  };

  return (
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={currentVolume}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
      className="mt-5 w-48"
    />
  );
};

export default Volume;
