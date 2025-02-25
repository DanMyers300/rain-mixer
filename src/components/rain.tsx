import { useEffect, useRef } from 'react';
import rain from '../../assets/rain.mp3';

interface RainProps {
  play: boolean;
}

const Rain = ({ play }: RainProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      play ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [play]);

  return (
    <audio ref={audioRef} loop>
      <source src={rain} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default Rain;
