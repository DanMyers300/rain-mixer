import { useEffect, useRef } from 'react';

interface PlaybackHandlerProps {
  playing: boolean;
  track: string;
}

const PlaybackHandler = ({ playing, track }: PlaybackHandlerProps) => {
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audio.current) {
      playing ? audio.current.play() : audio.current.pause();
    }
  }, [playing]);

  return (
    <audio ref={audio} loop>
      <source src={track} type="audio/mpeg" />
    </audio>
  );
};

export default PlaybackHandler;
