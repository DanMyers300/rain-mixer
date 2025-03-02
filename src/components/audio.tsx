import { useEffect, useRef } from 'react';

interface PlaybackHandlerProps {
  playing: boolean;
  track: string;
  volume: number;
}

const Audio = ({ playing, track, volume }: PlaybackHandlerProps) => {
  const audio = useRef<HTMLAudioElement>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const source = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    const initAudioContext = async () => {
      if (!audioContext.current && audio.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNode.current = audioContext.current.createGain();
        source.current = audioContext.current.createMediaElementSource(audio.current);
        source.current.connect(gainNode.current);
        gainNode.current.connect(audioContext.current.destination);
      }
    };

    const handlePlay = async () => {
      if (!audio.current) return;

      if (playing) {
        try {
          // Initialize audio context on first play (user gesture)
          if (!audioContext.current) {
            await initAudioContext();
          }
          
          if (audioContext.current?.state === 'suspended') {
            await audioContext.current.resume();
          }
          
          await audio.current.play();
        } catch (err) {
          console.error('Error playing audio:', err);
        }
      } else {
        audio.current.pause();
      }
    };

    handlePlay();
  }, [playing]);

  useEffect(() => {
    if (gainNode.current) {
      gainNode.current.gain.value = volume;
    }
  }, [volume]);

  return (
    <audio ref={audio} controls={false} loop>
      <source src={track} type="audio/mpeg" />
    </audio>
  );
};

export default Audio;
