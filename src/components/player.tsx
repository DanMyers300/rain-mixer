import { useState } from 'react';

// Components
import PlaybackHandler from './playbackHandler.tsx';

// Assets
import record from '../../assets/record.png';
import rain from '../../assets/rain.mp3'

const Record = () => {
  const [spin, setSpin] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const toggleSpin = () => {
    setSpin(!spin);
  };

  return (
    <div
      onClick={toggleSpin}
      className="
        m-3
        flex
        h-80
        w-80
        items-center
        justify-center
        rounded-full
        cursor-pointer
        overflow-hidden
        relative
      "
    >
      <img
        src={record}
        alt="record"
        className={`
          absolute
          inset-0
          h-full
          w-full
          object-cover
          ${spin ? 'animate-[spin_10s_linear_infinite]' : ''}
        `}
      />
      
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

      <PlaybackHandler playing={spin} track={rain} volume={volume} />
    </div>
  );
};

export default Record;
