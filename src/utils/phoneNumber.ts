/**
 * 전화번호를 010 형식으로 포맷팅하는 유틸리티 함수
 * 
 * @param phoneNumber - 포맷팅할 전화번호 (예: "+82 10-8013-3731", "+821080133731", "010-8013-3731")
 * @returns 010-XXXX-XXXX 형식의 전화번호
 */
export function formatPhoneNumberToKorean(phoneNumber: string): string {
  if (!phoneNumber) {
    return "";
  }

  // 모든 공백, 하이픈, 괄호 제거하고 숫자만 추출
  const numbersOnly = phoneNumber.replace(/[\s\-\(\)]/g, "");

  // +82로 시작하는 경우 (한국 국가번호)
  if (numbersOnly.startsWith("+82")) {
    const withoutCountryCode = numbersOnly.substring(3);
    
    // +82 10으로 시작하는 경우
    if (withoutCountryCode.startsWith("10") && withoutCountryCode.length === 10) {
      return `010-${withoutCountryCode.substring(2, 6)}-${withoutCountryCode.substring(6)}`;
    }
  }
  
  // 82로 시작하는 경우 (국가번호에서 + 제외)
  if (numbersOnly.startsWith("82")) {
    const withoutCountryCode = numbersOnly.substring(2);
    
    if (withoutCountryCode.startsWith("10") && withoutCountryCode.length === 10) {
      return `010-${withoutCountryCode.substring(2, 6)}-${withoutCountryCode.substring(6)}`;
    }
  }

  // 010으로 시작하는 경우 (이미 한국 형식)
  if (numbersOnly.startsWith("010") && numbersOnly.length === 11) {
    return `010-${numbersOnly.substring(3, 7)}-${numbersOnly.substring(7)}`;
  }

  // 10으로 시작하고 10자리인 경우 (010에서 0 누락)
  if (numbersOnly.startsWith("10") && numbersOnly.length === 10) {
    return `010-${numbersOnly.substring(2, 6)}-${numbersOnly.substring(6)}`;
  }

  // 포맷팅할 수 없는 경우 원본 반환
  console.warn(`Unable to format phone number: ${phoneNumber}`);
  return phoneNumber;
}

/**
 * 전화번호가 유효한 한국 휴대폰 번호 형식인지 검증
 * 
 * @param phoneNumber - 검증할 전화번호
 * @returns 유효한 한국 휴대폰 번호인지 여부
 */
export function isValidKoreanMobileNumber(phoneNumber: string): boolean {
  const formatted = formatPhoneNumberToKorean(phoneNumber);
  
  // 010-XXXX-XXXX 형식인지 확인
  const koreanMobilePattern = /^010-\d{4}-\d{4}$/;
  return koreanMobilePattern.test(formatted);
}