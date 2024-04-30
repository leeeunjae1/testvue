<template>
  <div class="finding-password">
    <h2>개인정보 수집 및 이용 안내</h2>
    <p>
      한국관광공사 관광기업 혁신바우처 홈페이지는 아래와 같이 개인정보를
      수집·이용 하고자 합니다. 1. 개인정보의 수집·이용 목적 <br />
      ○ 회원가입 및 관리<br />
      ○ 홈페이지 서비스 제공<br />
      2. 개인정보의 수집·이용 항목<br />
      ○ 필수: 성명, 아이디, 비밀번호, 이메일, 휴대폰번호<br />
      ○ 선택: 주소, 전화번호, 생년월일<br />
      ※ 아이핀, 휴대전화 인증시 개인식별정보<br />
      DI (Duplication Information : 중복가입확인정보)<br />
      CI (Connection information : 사용자 교유 식별자)<br />
      3. 수집방법: 홈페이지 회원 가입<br />
      4. 개인정보 보유·이용기간: 동의일로부터 동의철회(직권해지)시 까지
    </p>
    <!-- 약관 내용 계속 -->
    <button @click="$emit('close')">닫기</button>
  </div>
</template>
  
  <script>
export default {
  name: "FindingPassword",
};
</script>
  
  <style scoped>
.personal-information {
  max-height: 150px; /* 예시로 지정한 최대 높이입니다. 필요에 따라 조정하세요. */
  overflow-y: auto; /* 세로 스크롤을 만들기 위한 속성 */
}
</style>
  