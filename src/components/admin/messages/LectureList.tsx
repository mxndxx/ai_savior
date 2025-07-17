import Image from "next/image";

interface Lecture {
  id: string;
  title: string;
  thumbnail: string;
}

interface LectureListProps {
  lectures: Lecture[];
  activeLectureId: string | null;
  onLectureSelect: (lectureId: string) => void;
}

export default function LectureList({
  lectures,
  activeLectureId,
  onLectureSelect,
}: LectureListProps) {
  return (
    <div className="w-1/3 overflow-y-auto border-r border-gray-200">
      <nav className="space-y-1 p-2">
        {lectures.map((lecture) => (
          <button
            key={lecture.id}
            onClick={() => onLectureSelect(lecture.id)}
            className={`group flex w-full items-center rounded-md p-2 text-sm font-medium ${
              activeLectureId === lecture.id
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
}
