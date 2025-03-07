import record from '../../assets/record.png';

interface RecordProps {
  playing: boolean;
  togglePlaying: () => void;
}

const Record = ({ playing, togglePlaying }: RecordProps) => {
  return (
    <div 
      onClick={togglePlaying} 
      className="m-5 w-32 cursor-pointer group relative"
    >
      <img
        src={record}
        alt="record"
        className={`${playing ? 'animate-[spin_10s_linear_infinite]' : ''}`}
      />
      <div
        className="absolute right-full top-1/2 -translate-y-1/2 mr-5
                   opacity-0 group-hover:opacity-100 transition-all
                   duration-300 h-25 w-10 bg-gray-400 rounded-full
                   transform group-hover:scale-110"
      />
      <div
        className="absolute left-full top-1/2 -translate-y-1/2 ml-5
                   opacity-0 group-hover:opacity-100 transition-all
                   duration-300 h-25 w-10 bg-gray-400 rounded-full
                   transform group-hover:scale-110"
      />
    </div>
  );
};

export default Record;
