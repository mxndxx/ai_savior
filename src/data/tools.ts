export const categories = [
  "전체",
  "직장인 자동화",
  "N잡러 수익 시스템",
  "시니어 AI 부업",
  "셀러 / 쇼핑몰 자동화",
  "프리랜서 자동화",
  "AI 콘텐츠 창작",
  "투자 자동화 도구",
  "AI 시스템 복제",
  "AI 마켓 & 제작자",
  "무료 도구 체험존",
];

export interface Tool {
  name: string;
  description: string;
}

export interface ToolSection {
  title: string;
  description: string;
  tools: Tool[];
}

export const toolsData: Record<string, ToolSection> = {
  "직장인 자동화": {
    title: "직장인 자동화",
    description: "회사를 다니면서도 자동으로 수익이 나는 구조",
    tools: [
      {
        name: "AI 퇴사 시뮬레이터",
        description: "퇴사 시나리오를 AI로 시뮬레이션",
      },
      { name: "보고서 요약 AI", description: "긴 보고서를 핵심만 요약" },
      {
        name: "블로그 자동 글쓰기 AI",
        description: "SEO 최적화된 블로그 포스트 자동 생성",
      },
      {
        name: "이메일 마케팅 카피 AI",
        description: "효과적인 마케팅 이메일 작성",
      },
      {
        name: "PPT 목차 자동 생성 AI",
        description: "프레젠테이션 구조를 자동으로 설계",
      },
    ],
  },
  "N잡러 수익 시스템": {
    title: "N잡러 수익 시스템",
    description: "투잡·부업을 자동화된 구조로 수익화",
    tools: [
      {
        name: "전자책 자동 집필 AI",
        description: "주제만 입력하면 전자책 완성",
      },
      { name: "쿠팡파트너스 카피 AI", description: "상품 소개글 자동 생성" },
      {
        name: "스마트스토어 상세페이지 AI",
        description: "매력적인 상품 상세페이지 제작",
      },
      {
        name: "쇼핑몰 후킹 문구 AI",
        description: "구매욕을 자극하는 카피 생성",
      },
      {
        name: "블로그 키워드 글쓰기 AI",
        description: "SEO 키워드 기반 포스팅",
      },
    ],
  },
  "시니어 AI 부업": {
    title: "시니어 AI 부업",
    description: "40~60대를 위한 쉬운 AI 기반 수익 구조",
    tools: [
      {
        name: "시니어 전용 부업 추천 AI",
        description: "연령대별 맞춤 부업 추천",
      },
      {
        name: "유튜브 얼굴 안 나오는 주제 AI",
        description: "익명으로 운영 가능한 채널 기획",
      },
      {
        name: "블로그 일기 스타일 콘텐츠 AI",
        description: "자연스러운 일상 블로그 포스팅",
      },
      {
        name: "전자책 챕터 자동화 AI",
        description: "체계적인 전자책 구성 도움",
      },
    ],
  },
  "셀러 / 쇼핑몰 자동화": {
    title: "셀러 / 쇼핑몰 자동화",
    description: "상세페이지, 리뷰, 마케팅까지 자동 생성",
    tools: [
      {
        name: "상세페이지 카피 자동화 AI",
        description: "매력적인 상품 설명 자동 생성",
      },
      {
        name: "경쟁 상품 분석 요약 AI",
        description: "시장 경쟁력 분석 리포트",
      },
      {
        name: "리뷰 감정 분석 AI",
        description: "고객 리뷰의 감정과 만족도 분석",
      },
      { name: "가격 경쟁력 요약 AI", description: "적정 가격 책정 도움" },
    ],
  },
  "프리랜서 자동화": {
    title: "프리랜서 자동화",
    description: "제안서, 계약서, 작업물까지 템플릿화",
    tools: [
      {
        name: "제안서 자동 작성 AI",
        description: "프로젝트별 맞춤 제안서 생성",
      },
      {
        name: "포트폴리오 요약 AI",
        description: "임팩트 있는 포트폴리오 작성",
      },
      { name: "견적 안내문 자동화 AI", description: "전문적인 견적서 작성" },
      {
        name: "클라이언트용 이메일 AI",
        description: "비즈니스 커뮤니케이션 최적화",
      },
    ],
  },
  "AI 콘텐츠 창작": {
    title: "AI 콘텐츠 창작",
    description: "영상·전자책·뉴스레터까지 자동화 수익 구조",
    tools: [
      {
        name: "유튜브 쇼츠 스크립트 AI",
        description: "바이럴 쇼츠 대본 생성",
      },
      {
        name: "유튜브 롱폼 대본 AI",
        description: "구조적인 긴 영상 대본 작성",
      },
      { name: "전자책 목차·서문 AI", description: "체계적인 전자책 구성" },
      {
        name: "뉴스레터 자동 편집 AI",
        description: "정기 뉴스레터 콘텐츠 생성",
      },
    ],
  },
  "투자 자동화 도구": {
    title: "투자 자동화 도구",
    description: "주식·코인·부동산 투자 정보 요약 도구",
    tools: [
      { name: "리포트 요약 AI (주식)", description: "투자 리포트 핵심 요약" },
      {
        name: "트위터 시황 분석 AI (코인)",
        description: "소셜 미디어 시장 감정 분석",
      },
      { name: "공시 해석 AI", description: "복잡한 기업 공시 쉽게 해석" },
      {
        name: "상가 수익률 시뮬레이터 AI",
        description: "부동산 투자 수익률 계산",
      },
      {
        name: "경매 권리 분석 요약 AI",
        description: "경매 물건 권리 관계 분석",
      },
    ],
  },
  "AI 시스템 복제": {
    title: "AI 시스템 복제",
    description: "수익이 난 시스템을 통째로 복제 설치",
    tools: [
      {
        name: "200만원 AI 설치 시스템",
        description: "검증된 수익 시스템 복제",
      },
      {
        name: "유튜브 자동화 시스템 AI",
        description: "유튜브 채널 운영 자동화",
      },
      {
        name: "스마트스토어 운영 시스템 AI",
        description: "온라인 스토어 통합 관리",
      },
      {
        name: "AI 마켓 판매용 도구 템플릿",
        description: "AI 도구 판매 템플릿",
      },
      { name: "AI 리셀러 프로그램", description: "AI 도구 재판매 시스템" },
    ],
  },
  "AI 마켓 & 제작자": {
    title: "AI 마켓 & 제작자",
    description: "유저가 직접 AI 도구를 만들고 판매",
    tools: [
      { name: "AI 제작 도우미", description: "나만의 AI 도구 제작 가이드" },
      { name: "AI 네이밍 추천", description: "AI 도구명 자동 생성" },
      {
        name: "AI 등록 템플릿 자동 생성기",
        description: "도구 등록용 템플릿 생성",
      },
      {
        name: "AI 판매 페이지 자동 구성",
        description: "마케팅 페이지 자동 제작",
      },
    ],
  },
  "무료 도구 체험존": {
    title: "무료 도구 체험존",
    description: "처음 써보는 사람을 위한 추천 체험 AI",
    tools: [
      {
        name: "나에게 맞는 AI 추천",
        description: "개인별 맞춤 AI 도구 추천",
      },
      { name: "초보자용 블로그 AI", description: "쉬운 블로그 글쓰기 도구" },
      { name: "초보자용 유튜브 AI", description: "간단한 유튜브 기획 도구" },
      { name: "3분 전자책 AI", description: "빠른 전자책 제작 체험" },
    ],
  },
};
