import { useState } from 'react';

// Components
import PlaybackHandler from './PlaybackHandler.tsx';

//Assets
import record from '../../assets/record.png';
import rain from '../../assets/rain.mp3'

const Record = () => {
  const [spin, setSpin] = useState(false);

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
      <PlaybackHandler playing={spin} track={rain}/>
    </div>
  );
};

export default Record;
