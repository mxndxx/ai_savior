export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold">
        개인정보 수집 및 이용동의
      </h1>
      <hr className="mb-8" />
      <div className="prose max-w-none space-y-8">
        <section>
          <h2 className="mb-4 text-xl font-semibold">
            1. 개인정보 수집목적 및 이용목적
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-lg font-semibold">
                (1) 홈페이지 회원 가입 및 관리
              </h3>
              <p className="leading-relaxed text-gray-700">
                회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증,
                회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인,
                서비스 부정 이용 방지, 만 14세 미만 아동의 개인정보 처리시
                법정대리인의 동의 여부 확인, 각종 고지·통지, 고충 처리 등의 목적
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold">
                (2) 재화 또는 서비스 제공
              </h3>
              <p className="leading-relaxed text-gray-700">
                물품 배송, 서비스 제공, 계약서·청구서 발송, 콘텐츠 제공, 맞춤
                서비스 제공, 본인인증, 연령인증, 요금 결제 및 정산, 채권추심
                등의 목적
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold">(3) 고충 처리</h3>
              <p className="leading-relaxed text-gray-700">
                민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지,
                처리 결과 통보 등
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">
            2. 수집하는 개인정보 항목
          </h2>
          <p className="leading-relaxed text-gray-700">
            ID, 성명, 비밀번호, 주소, 휴대폰 번호, 이메일, 14세 미만 가입자의
            경우 법정대리인 정보
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">
            3. 개인정보 보유 및 이용기간
          </h2>
          <p className="leading-relaxed text-gray-700">
            회원탈퇴 시까지 (단, 관계 법령에 보존 근거가 있는 경우 해당 기간
            시까지 보유, 개인정보처리방침에서 확인 가능)
          </p>
        </section>
      </div>
    </main>
  );
}
