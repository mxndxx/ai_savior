import Image from "next/image";
import { useMessageSettingsContext } from "./MessageSettingsContext";

export const LectureList = () => {
  const { lectures, activeLectureId, setActiveLectureId } = useMessageSettingsContext();
  return (
    <div className="w-1/3 flex-shrink-0 overflow-y-auto">
      <nav className="space-y-1 p-2">
        {lectures.map((lecture) => (
          <button
            key={lecture.id}
            onClick={() => setActiveLectureId(lecture.id)}
            className={`group flex w-full items-center rounded-md p-2 text-sm font-medium ${
              activeLectureId === lecture.id
                ? "bg-gray-100 text-black"
                : "text-white hover:bg-gray-50 hover:text-black"
            }`}
          >
            <Image
              src={lecture.thumbnail}
              alt={lecture.title}
              className="mr-3 h-10 w-16 flex-shrink-0 rounded-md object-cover"
              width={64}
              height={40}
            />
            <span className="line-clamp-2 flex-1 text-left">
              {lecture.title}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};