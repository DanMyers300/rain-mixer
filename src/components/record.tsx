import record from '../../assets/record.png';

interface RecordProps {
  playing: boolean;
  togglePlaying: () => void;
}

const Record = ({ playing, togglePlaying }: RecordProps) => (
  <div className="flex flex-row group">
    <div
      className="relative opacity-0 group-hover:opacity-100 transition-all
                 duration-300 h-25 w-10 bg-gray-400 rounded-full mt-8
                 transform group-hover:scale-110 flex flex-col
                 z-20 group-hover:pointer-events-auto pointer-events-none"
    >
      <h1 className="w-full h-1/2 ml-2.5 mt-3"> 🎵</h1>
      <hr className="h-px border-0 bg-stone-950" />
      <h1 className="w-full h-1/2 ml-2.5 mt-3"> 🎵</h1>
    </div>
    <div
      onClick={togglePlaying}
      className="m-5 w-32 cursor-pointer relative z-10"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          togglePlaying();
        }
      }}
    >
      <img
        src={record}
        alt="record"
        className={`${playing ? 'animate-[spin_10s_linear_infinite]' : ''}`}
      />
    </div>
    <div
      className="relative opacity-0 group-hover:opacity-100 transition-all
                 duration-300 h-25 w-10 bg-gray-400 rounded-full mt-8
                 transform group-hover:scale-110 flex flex-col
                 z-20 group-hover:pointer-events-auto pointer-events-none"
    >
      <h1 className="w-full h-1/2 ml-2.5 mt-3"> 🎵</h1>
      <hr className="h-px border-0 bg-stone-950" />
      <h1 className="w-full h-1/2 ml-2.5 mt-3"> 🎵</h1>
    </div>
  </div>
);

export default Record;
