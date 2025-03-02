import { useState } from 'react';

import Record from './record.tsx';
import Volume from './volume.tsx';

const Player = () => {
  const [volume, setVolume] = useState(0.05);
  const [playing, setPlaying] = useState(false);

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  return (
   <div id="Player" className="flex flex-col w-64 items-center">
     <Record
       volume={volume}
       playing={playing}
       togglePlaying={togglePlaying}
     />
     <Volume
       volume={volume}
       setVolume={setVolume}
     />
   </div>
  );
};

export default Player;
