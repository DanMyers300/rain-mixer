import { useState } from 'react';

import Record from './components/record.tsx';
import Volume from './components/volume.tsx';

const Home = () => {
  const [volume, setVolume] = useState(0.25);
  const [playing, setPlaying] = useState(false);

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  return (
    <main className="flex flex-col w-screen h-screen items-center justify-center" >
      <div id="Player" className="flex flex-col w-64 items-center">
        <Record volume={volume} playing={playing} togglePlaying={togglePlaying} />
        <Volume volume={volume} setVolume={setVolume} />
      </div>
    </main>
  );
};

export default Home;
