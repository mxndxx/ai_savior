import { createClient } from "@supabase/supabase-js";

// Supabase 환경변수 검증
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL과 Anon Key가 환경변수에 설정되어 있지 않습니다.",
  );
}

// Supabase 클라이언트 인스턴스 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 인증 관련 헬퍼 함수들
export const auth = {
  // 로그인
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  // 로그아웃
  signOut: async () => {
    return await supabase.auth.signOut();
  },

  // 비밀번호 재설정
  resetPassword: async (email: string, redirectTo?: string) => {
    return await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  },

  // 현재 사용자 정보 가져오기
  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  // 인증 상태 변화 감지
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};
