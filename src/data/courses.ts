import { Course, CourseDetail } from "@/types/course";

export const featuredCourses: Course[] = [
  {
    id: "1",
    title: "[보부상xN잡연구소 2기] 건강식품으로 월 수익 천만원 번 노하우",
    instructor: "보부상",
    thumbnail:
      "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-f8fbe073-7f0d-4349-ad84-919357a2db6a-2025-06-26&w=3840&q=75",
    badges: [
      { text: "NEW", color: "bg-violet-500" },
      { text: "HOT", color: "bg-red-500" },
    ],
    category: "Class",
    link: "/course/ceo-youtube",
  },
  {
    id: "2",
    title:
      "[CEOXN잡 연구소] 4개 영상 구독자 1만! 시니어 유튜브로 돈 버는 시크릿 노하우",
    instructor: "옆집CEO",
    thumbnail:
      "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-84768907-013f-4498-b925-10c50f9fd7e2-2025-06-05&w=3840&q=75",
    badges: [
      { text: "NEW", color: "bg-violet-500" },
      { text: "BEST", color: "bg-yellow-500" },
    ],
    category: "Webinar",
    link: "/course/senior-youtube",
  },
  {
    id: "3",
    title: "[사뚜xN잡연구소2기] 하루 1시간 일하고 월3억 로켓그로스 완벽가이드",
    instructor: "사업하는 뚜벅이",
    thumbnail:
      "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-16cec2af-7c6d-4f41-bedc-3e4bc0363718-2025-06-11&w=3840&q=75",
    badges: [{ text: "BEST", color: "bg-yellow-500" }],
    category: "이커머스",
    link: "/course/ecommerce",
  },
  {
    id: "4",
    title: "[콘텐츠농부XN잡 연구소]1년 안에 5억 버는 AI 활용 컨텐츠 제작 방법",
    instructor: "콘텐츠농부",
    thumbnail:
      "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-274ef5af-02f9-4a52-a105-082b7ca8ac4a-2025-06-23&w=3840&q=75",
    badges: [{ text: "HOT", color: "bg-red-500" }],
    category: "부업",
    link: "/course/ai-content",
  },
  {
    id: "5",
    title:
      "[토리맘XN잡 연구소]45살 육아맘도 하루 3시간으로 월 1000만원 벌었던 유튜브 노하우",
    instructor: "토리맘",
    thumbnail:
      "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-ad0e8f24-856f-4e3d-8812-3ca5b56973fc-2025-06-19&w=3840&q=75",
    badges: [],
    category: "부업",
    link: "/course/mom-youtube",
  },
  {
    id: "6",
    title:
      "[홍시삼분xN잡연구소] 노베이스 초보자도 고매출까지 수동해외구매대행 올인원",
    instructor: "홍시삼분",
    thumbnail:
      "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-9cd879f9-7836-4f1c-80a1-f2fdbdd49d77-2025-06-17&w=3840&q=75",
    badges: [],
    category: "이커머스",
    link: "/course/overseas-purchasing",
  },
];

export const courseData: { [key: string]: CourseDetail } = {
  "ceo-youtube": {
    id: "ceo-youtube",
    title:
      "[옆집CEOXN잡 연구소]28만 유튜버 옆집CEO! 정보성 유튜브로 돈 버는 시크릿 노하우",
    instructor: "옆집CEO",
    thumbnail: "https://ext.same-assets.com/3372314287/1831476161.jpeg",
    introImage:
      "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-2f411110-0ee6-4780-82d7-f3a97a5d8bb1-2025-06-17&w=1920&q=100",
    badges: [
      { text: "마감임박", color: "bg-red-600" },
      { text: "NEW", color: "bg-violet-500" },
      { text: "HOT", color: "bg-red-500" },
    ],
    category: "유튜브",
    price: 3211000,
    startDate: new Date("2025-07-28T11:00:00"),
    deadline: new Date("2025-07-25T16:00:00"),
    instructor_info:
      "28만 구독자를 보유한 정보성 유튜브 채널 운영자로, 실제 유튜브 수익화 경험을 바탕으로 체계적인 노하우를 전수합니다.",
    link: "/course/ceo-youtube",
  },
  "senior-youtube": {
    id: "senior-youtube",
    title:
      "[CEOXN잡 연구소] 4개 영상 구독자 1만! 시니어 유튜브로 돈 버는 시크릿 노하우",
    instructor: "옆집CEO",
    thumbnail: "https://ext.same-assets.com/3372314287/2850793629.png",
    introImage:
      "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-162d9952-dbc2-4d83-a3f8-2dd65e0b99f7-2025-06-23&w=1920&q=100",
    badges: [
      { text: "NEW", color: "bg-violet-500" },
      { text: "BEST", color: "bg-yellow-500" },
    ],
    category: "유튜브",
    price: 2900000,
    startDate: new Date("2025-07-05T14:00:00"),
    deadline: new Date("2025-07-02T16:00:00"),
    instructor_info:
      "시니어 유튜브 전문가로, 효율적인 콘텐츠 제작을 통한 빠른 성장 노하우를 보유하고 있습니다.",
    link: "/course/senior-youtube",
  },
  ecommerce: {
    id: "ecommerce",
    title: "[사뚜xN잡연구소2기] 하루 1시간 일하고 월3억 로켓그로스 완벽가이드",
    instructor: "사업하는 뚜벅이",
    thumbnail: "https://ext.same-assets.com/3372314287/3971821261.png",
    introImage:
      "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-30cd6363-efbf-4564-b9b2-915a89750589-2025-06-23&w=1920&q=100",
    badges: [{ text: "BEST", color: "bg-yellow-500" }],
    category: "이커머스",
    price: 3500000,
    startDate: new Date("2025-07-12T10:00:00"),
    deadline: new Date("2025-07-09T16:00:00"),
    instructor_info:
      "이커머스 분야에서 월 3억 매출을 달성한 전문가로, 효율적인 운영 시스템을 통한 성공 노하우를 보유하고 있습니다.",
    link: "/course/ecommerce",
  },
  "ai-content": {
    id: "ai-content",
    title: "[콘텐츠농부XN잡 연구소]1년 안에 5억 버는 AI 활용 컨텐츠 제작 방법",
    instructor: "콘텐츠농부",
    thumbnail: "https://ext.same-assets.com/3372314287/2106109505.png",
    introImage:
      "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-30cd6363-efbf-4564-b9b2-915a89750589-2025-06-23&w=1920&q=100",
    badges: [{ text: "HOT", color: "bg-red-500" }],
    category: "부업",
    price: 2800000,
    startDate: new Date("2025-07-19T15:00:00"),
    deadline: new Date("2025-07-16T16:00:00"),
    instructor_info:
      "AI 기술을 활용한 콘텐츠 제작 전문가로, 다양한 플랫폼에서 성공적인 수익화를 이뤄낸 실무진입니다.",
    link: "/course/ai-content",
  },
  "mom-youtube": {
    id: "mom-youtube",
    title:
      "[토리맘XN잡 연구소]45살 육아맘도 하루 3시간으로 월 1000만원 벌었던 유튜브 노하우",
    instructor: "토리맘",
    thumbnail: "https://ext.same-assets.com/3372314287/1720825279.png",
    introImage:
      "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-30cd6363-efbf-4564-b9b2-915a89750589-2025-06-23&w=1920&q=100",
    badges: [],
    category: "부업",
    price: 2400000,
    startDate: new Date("2025-07-26T13:00:00"),
    deadline: new Date("2025-07-23T16:00:00"),
    instructor_info:
      "45살에 유튜브를 시작해서 월 1000만원 수익을 달성한 육아맘 유튜버로, 시간 효율성을 극대화한 운영 노하우를 보유하고 있습니다.",
    link: "/course/mom-youtube",
  },
  "overseas-purchasing": {
    id: "overseas-purchasing",
    title:
      "[홍시삼분xN잡연구소] 노베이스 초보자도 고매출까지 수동해외구매대행 올인원",
    instructor: "홍시삼분",
    thumbnail: "https://ext.same-assets.com/3372314287/3328582778.png",
    introImage:
      "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-30cd6363-efbf-4564-b9b2-915a89750589-2025-06-23&w=1920&q=100",
    badges: [],
    category: "이커머스",
    price: 2200000,
    startDate: new Date("2025-08-02T11:00:00"),
    deadline: new Date("2025-07-30T16:00:00"),
    instructor_info:
      "해외구매대행 전문가로, 초보자도 쉽게 따라할 수 있는 체계적인 시스템을 구축한 실무 전문가입니다.",
    link: "/course/overseas-purchasing",
  },
};
