export const CONVERTKIT_CONFIG = {
  API_KEY: process.env.CONVERTKIT_API_KEY,
  BASE_URL: "https://api.kit.com/v4",
  HEADERS: {
    CONTENT_TYPE: "application/json",
    API_KEY_HEADER: "X-Kit-Api-Key",
  },
  ENDPOINTS: {
    EMAIL_TEMPLATES: "/email_templates",
    TAGS: "/tags",
  },
  PAGINATION: {
    DEFAULT_PER_PAGE: 10,
  },
} as const;

export const CONVERTKIT_ERROR_MESSAGES = {
  NO_API_KEY: "ConvertKit API 키가 설정되지 않았습니다.",
  INVALID_API_KEY: "ConvertKit API 키가 유효하지 않습니다. API 키를 확인해주세요.",
  NO_PERMISSION: "ConvertKit API 접근 권한이 없습니다. 계정 권한을 확인해주세요.",
  EMAIL_TEMPLATES_FETCH_ERROR: "ConvertKit 이메일 템플릿을 가져오는 중 오류가 발생했습니다.",
  TAG_CREATION_ERROR: "ConvertKit 태그 생성 중 오류가 발생했습니다.",
  UNKNOWN_ERROR: "알 수 없는 오류",
} as const;