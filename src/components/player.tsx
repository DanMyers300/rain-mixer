import { useState } from 'react';
import record from '../../assets/record.png';
import Rain from './rain.tsx';

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
      <Rain play={spin} />
    </div>
  );
};

export default Record;
