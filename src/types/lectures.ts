// TODO: 추후 삭제 예정
export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  badges: { text: string; color: string }[];
  category: string;
  link: string;
}

export interface CourseDetail {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  badges: { text: string; color: string }[];
  category: string;
  link: string;
  introImage?: string;
  price?: number;
  startDate?: Date;
  deadline?: Date;
  instructor_info?: string;
}

// 새로운 Lecture 타입 추가
export interface Lecture {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  content_image: string;
  content_url: string;
  content_text: string;
  url: string;
  start_date: string; // ISO string format
  price: string;
  coach_id: string; // 강사 ID 추가
  updated_at?: string;
}

export interface CreateLectureForm {
  title: string;
  description: string;
  thumbnail: string | null;
  content_image: string | null;
  content_url?: string;
  content_text?: string;
  url: string;
  start_date: string;
  price: string;
  coach_id: string; // 강사 ID 추가
}

// 강의 목록 조회 시 coach 정보를 포함한 타입
export interface LectureWithCoach extends Lecture {
  coach: {
    id: string;
    name: string;
    bio?: string;
    career?: string;
  };
}
