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
