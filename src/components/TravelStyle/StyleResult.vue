
<template>
    <div class="survey-container" v-if="results">
      <div class="borderLine">
      <img :src="mbtiProfile.imageUrl" alt="MBTI Image" class="mbtiImage"/>
      <div class="styleModal">
      <p class="mbtiType">{{ mbtiType }}</p> <br/>
      <p class="mbtiStyle"> {{ mbtiProfile.style }}</p>
      <div class="mbtiProfile-description">
      <p><font-awesome-icon icon="fa-solid fa-plane" />  {{ mbtiProfile.description }}</p>
      <p><font-awesome-icon icon="fa-solid fa-plane" />  {{ mbtiProfile.description2 }}</p>
      <p><font-awesome-icon icon="fa-solid fa-plane" />  {{ mbtiProfile.description3 }}</p>
      <p><font-awesome-icon icon="fa-solid fa-plane" />  {{ mbtiProfile.description4 }}</p>
      <p><font-awesome-icon icon="fa-solid fa-plane" />  {{ mbtiProfile.description5 }}</p>
      <p><font-awesome-icon icon="fa-solid fa-plane" />  {{ mbtiProfile.description6 }}</p>
      <p><font-awesome-icon icon="fa-solid fa-plane" />  {{ mbtiProfile.description7 }}</p>
      <p>여행 찰떡 조합 : {{ mbtiProfile.soulMate }}</p>
      <p>여행 멸망 조합 : {{ mbtiProfile.hateMate }}</p>
      </div>
      </div>
      <router-link to="/traveltest">
      <button class="restart-button">테스트 다시하기</button><br/>
      </router-link>
      <router-link to="/">
      <button class="home-button">메인페이지로</button>
      </router-link>
      </div>
    </div>
    <div v-else>
      <p>결과 데이터를 불러오는데 실패했습니다.</p>
    </div>
</template>
  
  <script>
  export default {
    data() {
    return {
      results: null,
      mbtiProfiles: {
        "ENFJ": {
          description: "계획을 중시하지만, 친구들과의 여행에서 친구들이 어떻게 여행하느냐에 따라 달라져요.",
          description2: "혼자 가는 여행보다 내가 좋아하는 사람들과 다 같이 여행하는 걸 제일 좋아해요.",
          description3: "여행지에 도착했을 때 내가 좋아하는 숙소/분위기/그리고 같이 온 사람과 함께 했다는 사실에 혼자 감동하곤 해요.",
          description4: "평소 배려심이 깊어 여행지를 고를 때도 친구들이 가고 싶은 여행지로 가려고 합니다.",
          description5: "내 나름대로 열심히 찾은 장소를 얘기했을 때 반응 없으면 나 홀로 토라져 있어요.",
          description6: "낯선 여행지에 가서도 말이 통하지 않는 현지 분들과 친하게 지내며 모두의 텐션을 업 시켜줍니다.",
          description7: "좋아하는 게 너무 많고 감수성이 풍부하며 다니는 곳마다 감동하고 분위기에 취합니다.",
          imageUrl: require("@/assets/images/ENFJ.png"), // 예시 경로
          style: "프로 여행러",
          soulMate: "로맨틱 여행파(INFP)",
          hateMate: "프로 혼행러(ISTP)"
        },
        "ENFP": {
          description: "무계획 여행이 진정한 여행의 재미! 예상치 못한 여행이 추억이 더 오래 남아요!",
          description2: "여행에 대부분 계획을 세우지 않고 출발하며 대략적인 목적지만 파악해서 출발해요.",
          description3: "가끔 계획러들과 있으면 준비할 땐 귀찮아서 미뤄두지만, 또 반드시 챙길 건 챙기거나 맛집을 찾아봐요.",
          description4: "여유로운 일정을 느끼며 자유를 만끽하고 즐길 수 있는 여유로운 일정의 여행이 좋아요.",
          description5: "감정 기복이 커 액티비티와 같은 신나는 여행을 즐기다가 급 다운 되어 휴식 시간이 필요할 때가 있어요.",
          description6: "가는 곳마다 SNS용 사진 스팟을 잘 찾으며 여행지에서 처음 보는 사람들과도 금방 친해져요.",
          description7: "남들이 가는 곳이 아닌 새로운 장소나 새로운 코스에 도전하는 스타일입니다.",
          imageUrl: require("@/assets/images/ENFP.png"), // 예시 경로
          style: "여행 무계획러",
          soulMate: "감성 여행자(INFJ)",
          hateMate: "프로 엑셀러(ISTJ)"
        },
        "ENTJ": {
          description: "다 같이 가는 여행을 위해 상세 날짜나 장소를 투표를 정하고 그 결정 사항에 대한 이의는 없어요.",
          description2: "여행에서 가장 중요한 건 경비, 모든 경비는 빠르게 입금하려고 합니다.",
          description3: "여행 시 쓸데없는 감정 낭비는 하지 않고 여행에서도 효율적인 모두가 만족할 만한 여행 계획을 세우려고 노력합니다.",
          description4: "여행계획 시간 별로 계획표를 만들고 여행 정산할 때도 깔끔하고 모두가 보기 쉽게 정리해서 보내요.",
          description5: "늘 여행을 갈 때 나도 모르게 총무 역할을 하거나 리더가 되어있습니다.",
          description6: "에너지 넘치는 모험가 스타일로 험하고 힘든 여행을 해도 어려운 여행을 완수했다는 성취감을 느낍니다.",
          imageUrl: require("@/assets/images/ENTJ.png"), // 예시 경로
          style: "효율 로보트",
          soulMate: "한적 스팟러(INTP)",
          hateMate: "힐링 여행러(ISFP)"
        },
        "ENTP": {
          description: "늘 똑같은 반복적인 인생의 지루함을 느껴 즉흥적으로 여행 약속을 잡는 경우가 많아요.",
          description2: "계획 없이 무작정 떠나는 여행이라 기다림이 많고 순간 화나는 경우도 많지만, 이 또한 추억이라며 웃어넘기는 경우가 많아요.",
          description3: "즉흥 여행러이긴 하지만 돈이 많이 나가는 비행기나 내가 잘 숙소는 반드시 잡고 떠나요.",
          description4: "위기 상황이나 예상치 못한 상황에서 잘 판단하며 웃으며 넘어가요.",
          description5: "감성적인 여행을 좋아하고 숙소는 깔끔하 게 좋아요.",
          description6: "내가 그곳에 꼭 가야 하는 이유가 있어요.",
          description7: "친구들과 여행 계획을 할 때 정말 아니라고 생각하는 곳은 어떻게든 가지 않으려고 해요.",
          imageUrl: require("@/assets/images/ENTP.png"), // 예시 경로
          style: "위기 탈출넘버원",
          soulMate: "효율 계획러(INTJ)",
          hateMate: "여행 한정인싸(ISFJ)"
        },
        "ESFJ": {
          description: "혹시나 내가 그 장소에 갔는데 그 식당이 맛없을까 봐/숙소에 자리가 없을까 봐 즉흥 여행은 상상할 수 없어요.",
          description2: "계획이 없는 것보다 넘쳐나는 계획적인 여행은 선택지가 많아 후회하지 않아요.",
          description3: "감성적인 것을 중요하게 생각하기 때문에 식당/카페/숙소 분위기를 잘 보고 선택해요.",
          description4: "내가 좋아하고 계획한 여행에서 인생샷을 건지고 싶어해 인생샷 스팟을 잘 찾아요.",
          description5: "같이 가는 친구들을 세심하게 챙겨주고 배려해주며 여행을 즐겨요.",
          description6: "여행 내내 웃음이 사라지지 않고 친구들에게 적극적인 리액션과 호응해 분위기 메이커를 담당해요.",
          description7: "친구들이 다 가고 싶은 여행지로 여행을 계획하기 때문에 단톡방에 투표를 자주 올려요",
          imageUrl: require("@/assets/images/ESFJ.png"), // 예시 경로
          style: "프로 핫스팟러",
          soulMate: "힐링 여행러(ISFP)",
          hateMate: "한적 스팟러(INTP)"
        },
        "ESFP": {
          description: "여행을 떠날 때 친구와 카톡 하다 갈까? 가볼까? 하며 즉흥으로 여행 약속을 잡는 경우가 많아요.",
          description2: "만약 다 같이 여행 계획을 잡을 때 내가 못 가는 날짜를 말하면 제일 속상해합니다.",
          description3: "여행을 가서도 넘치는 에너지로 숙소에 내내 있기보다 돌아다닐 수 있는 곳은 다 가보려고 해요.",
          description4: "가보고 싶은 곳만 알아보고 계획이라는 게 딱히 없어 휴무일에 방문하는 때도 있지만 개의치 않아요.",
          description5: "친한 친구들과 펜션을 잡고 놀러 가거나 요즘 핫한 핫플레이스를 방문하는 것도 좋아해요.",
          description6: "평소 가고 싶었던 여행지의 할인 이벤트를 보고 굉장히 신나해요",
          description7: "같이 놀러 간 친구가 힘들어 보이면 응원을 해주며 마지막으로 한 번만 가자고 어떻게든 설득해요.",
          imageUrl: require("@/assets/images/ESFP.png"), // 예시 경로
          style: "여행 즉흥론자",
          soulMate: "여행 한정인싸(ISFJ)",
          hateMate: "효율 계획러(INTJ)"
        },
        "ESTJ": {
          description: "여행을 가고자 확실하게 마음을 먹으면 엄청난 추진력으로 깔끔하게 여행 계획을 세워요.",
          description2: "사전에 모든 예약할 곳을 알아본 뒤 기다리지 않고 바로바로 할 수 있도록 예약해둬요.",
          description3: "여행 시 몇 분 열차인지 몇 분 버스인지 이동수단을 미리 파악 하고 이동하는 동안 갈 수 있는 곳을 파악해요.",
          description4: "여행 계획을 분 단위로 나눠서 각 이동 수단 별/장소별/ 세부 예산까지 엑셀에 정리해두며 뿌듯해합니다.",
          description5: "예기치 못한 상황이 발생할 것을 대비하여 플랜B도 미리 계획해 둡니다.",
          description6: "이렇게까지 계획을 세우는 이유는 시간 낭비를 줄이고 돈 낭비를 줄이기 위해서입니다.",
          imageUrl: require("@/assets/images/ESTJ.png"), // 예시 경로
          style: "엑셀 마스터",
          soulMate: "프로 혼행러(ISTP)",
          hateMate: "로맨틱 여행파(INFP)"
        },
        "ESTP": {
          description: "친구들과 여행을 갈 때 각자 가고 싶은 여행지가 다를 경우중재를 하며 해결책을 마련해줍니다.",
          description2: "계획적이기보다 즉흥적으로 여행을 떠나는 스타일! 미 여행을 떠났을 때 즉흥적이고 다양한 경험을 많이 하고 싶어 아낌없이 돈을 써요.",
          description3: "분위기에 취해 잡생각 따위는 던져버리고 오늘! 바로 지금 이 여행지에 집중해요!",
          description4: "여행 계획이 틀어져도 했다 치고 다른 계획으로 과감하게 넘어가려고 해요.",
          description5: "어느 여행지에 가서도 특유의 친화력으로 여행지 사람과 맞팔하거나 친하게 지내요.",
          description6: "그 여행지의 맛집에 방문하거나 신박한 아이템이 있으면 이걸로 장사하면 잘될 것 같은데 왜 안하지? 라고 생각하며 즐겨요.",
          imageUrl: require("@/assets/images/ESTP.png"), // 예시 경로
          style: "프로 플렉서",
          soulMate: "프로 엑셀러(ISTJ)",
          hateMate: "감성 여행자(INFJ)"
        },
        "INFJ": {
          description: "숙소에 감성이 가득하며 돌아다니기보다 그 안에서 모든 걸 해결할 수 있는 여행이 좋아요.",
          description2: "여행의 마무리로 숙소에서 내가 좋아하는 영화 한 편을 틀어놓는 감성을 좋아해요.",
          description3: "계획을 짤 때, 속으로 불만이 있어도 말하지 않고 겉으로 호응해줘요.",
          description4: "이쁘고 차분한 말로 상대방을 설득해 결국 내가 의도한 여행을 하게 만들어요.",
          description5: "여행지에 있는 특유의 감성이 가득한 소품 가게나 카페에 가는 것을 좋아해요.",
          description6: "혼자 여행을 가면 충동적으로 하거나 계획과 다르게 변경 되기도 하지만, 친구들과 같이 가는 여행에서는 친구들의 일정에 맞추고 다같이 만족할 만한 계획을 짜요.",
          description7: "빠르고 활기찬 여행보다 그곳 특유의 감성을 느끼며 천천히 여행하며 힐링 하는 것을 좋아해요.",
          imageUrl: require("@/assets/images/INFJ.png"), // 예시 경로
          style: "감성여행자",
          soulMate: "여행무계획러(ENTP)",
          hateMate: "프로플렉서(ESTP)"
        },
        "INFP": {
          description: "집 밖에 나가는 걸 좋아하지 않고 여행을 가기 전까지도 고민하지만 떠밀려서 가도 세상 제일 즐거워해요.",
          description2: "편하다고 생각하는 친한 친구들과 함께하는 여행에선 절대 웃음이 끊기질 않아요.",
          description3: "감성적이고 섬세한 성격이라 로맨틱하고 감성 가득한 여행지를 좋아해요.",
          description4: "여유로운 분위기 가득한 호캉스에서 완벽하게 만들어줄 이쁘고 맛있는 음식을 찾아다니며 책과 음악이 함께 하는 여행을 즐기곤 해요.",
          description5: "다 같이 하는 여행도 좋지만 혼자 있길 좋아하고 혼자만의 시간이 필요해 혼자 떠나는 여행도 좋아해요.",
          description6: "여행 계획을 짤 때 완벽한 계획이길 원하지만, 너무 빈틈없는 꼼꼼한 여행보다 융통성이 있는 계획을 선호해요.",
          imageUrl: require("@/assets/images/INFP.png"), // 예시 경로
          style: "로맨틱 여행파",
          soulMate: "프로 여행러(ENFJ)",
          hateMate: "프로 핫스팟러(ESFJ)"
        },
        "INTJ": {
          description: "남들이 다 가는 유명한 여행지보다 사람이 적고 조용한 여행을 선호해요.",
          description2: "여행 장소를 정할 땐 뭔가를 좋아해 그것에 대해 더 잘 알고 싶다고는 생각이 들면 여행 계획을 세우기도 해요.",
          description3: "여행지에서 어떤 일이 발생할지 모르니 세세한 계획보다 꼭 가보고 싶은 곳이나 하고 싶은 리스트 몇 개만 적어 둬요.",
          description4: "친구들과 함께하는 여행에서 다른 사람의 감정을 빨리 캐치하기 때문에 나도 상대방도 모두 만족할 만한 효율적인 여행 계획을 하려고 노력해요.",
          description5: "계획이 디테일 할수록 본인이 가장 뿌듯해하며 같이 가는 사람들에게 정리한 파일을 공유하는 것도 좋아합니다.",
          description6: "다 같이 여행을 갈 때도 모두가 꼭 방문하고 싶은 메인 관광지를 선정해 장소를 취합하고 그 관광지의 주변 맛집과 쇼핑할 것 구경할 만한 곳을 찾아봐요.",
          imageUrl: require("@/assets/images/INTJ.png"), // 예시 경로
          style: "효율 계획러",
          soulMate: "위기탈출 넘버원(ENTP)",
          hateMate: "여행 즉흥론자(ESFP)"
        },
        "INTP": {
          description: "사람들에게 많이 알려지지 않은 여행 장소를 좋아합니다.",
          description2: "조용하고 한적한 자연 같은 곳에서 혼자만의 시간과 여유를 가지고 힐링하는 여행 스타일을 좋아해요.",
          description3: "여행 계획에서 가장 중요한 것은 효율적인 이동 수단! 가는 방법에 대해 먼저 고민해요!",
          description4: "여행에서도 어떻게 해야 가장 효율적으로 놀 것인지 고민하고 가장 나은 해결책을 제시해줘요.",
          description5: "누군가 계획을 잡거나 스케줄을 알려주면 세부적인 것들을 정리해요. (맛집/카페/놀 것 찾기)",
          description6: "사람이 많이 없는 카페 같은 곳에서 그곳의 한적함을 느끼며, 나만의 감성 사진을 찍을 수 있는 곳으로 떠나고 싶어요.",
          imageUrl: require("@/assets/images/INTP.png"), // 예시 경로
          style: "한적 스팟러",
          soulMate: "효율 로보트(ENTJ)",
          hateMate: "프로 핫스팟러(ESFJ)"
        },
        "ISFJ": {
          description: "평소에도 미리 가고 싶은 여행지, 숙소, 맛집 등이 메모장에 적혀있어요.",
          description2: "여행 가기 전 동선을 미리 파악해 최적의 여행루트를 만들고 세세하게 계획을 짭니다.",
          description3: "감각적이며 가성비 좋은 여행지를 가고 싶어 해요.",
          description4: "함께 가는 친구들의 의견을 모아 다수가 만족할 수 있게 정리하며 여행을 계획해요.",
          description5: "리적으로 편하다고 생각하는 친구들과 여행 가길 좋아 하며 그 친구들과 함께 할 땐 뜬금없이 친구들을 웃게 해요.",
          description6: "여행 짐을 챙길 때도 부족함 없이 '누군가는 쓰겠지' 라며 넉넉하게 짐을 챙겨요.",
          imageUrl: require("@/assets/images/ISFJ.png"), // 예시 경로
          style: "여행 한정인싸",
          soulMate: "여행 즉흥론자(ESFP)",
          hateMate: "위기탈출 넘버원(ENTP)"
        },
        "ISFP": {
          description: "스트레스를 받고 있을 때 여행을 떠나고 싶어 즉흥으로 친구들과 여행 약속을 잡아요.",
          description2: "작은 디테일이 중요해서 숙소나 카페는 감정이 가득한 곳을 찾고 계획 다 세웠다면 스스로 만족해요.",
          description3: "친구들과 여행 계획을 세울 때 이것도 저것도 괜찮은 것 같다며 호응해줘요.",
          description4: "여행 자체 분위기에 취하는 타입으로 내가 좋아하는 장소에 가면 여행에 취해요.",
          description5: "친구들과 여행하는 것도 좋지만 가끔 혼자만의 여유로운 여행 시간도 좋아해요.",
          description6: "여행을 하며 돌아다니는 것도 좋지만 나를 위한 힐링의 시간이기 때문에 너무 타이트한 여행은 힘들어요.",
          description7: "여행을 통해 여태껏 받아왔던 나의 스트레스를 풀어요.",
          imageUrl: require("@/assets/images/ISFP.png"), // 예시 경로
          style: "힐링 여행러",
          soulMate: "프로 핫스팟러(ESFJ)",
          hateMate: "효율 로보트(ENTJ)"
        },
        "ISTJ": {
          description: "여행을 간다고 하면 누가 시키지 않아도 스스로 알아서 일정을 계획하고 정리해요.",
          description2: "꼼꼼한 성격이고 계획에 맞춰 마무리하는 것을 좋아하기 때문에 여행지에 대해 모든 걸 알아가려고 해요.",
          description3: "계획적으로 여행하길 좋아해서 여행 가기 전 분 단위로 엑셀에 정리해요.",
          description4: "사람이 많이 없고 조용한 힐링 여행지를 좋아하며 혼자 떠나는 여행을 좋아해요.",
          description5: "숙소나 그 여행지의 할인 방법을 정리하며 최고의 가성비 여행을 준비해요.",
          description6: "친구들과 여행에 갈 때도 계획을 세우며 블로그, 카페 등 후기와 정보들을 다 찾아봐요.",
          imageUrl: require("@/assets/images/ISTJ.png"), // 예시 경로
          style: "프로 엑셀러",
          soulMate: "프로 플렉서(ESTP)",
          hateMate: "프로 여행러(ENFJ)"
        },
        "ISTP": {
          description: "평소에는 내성적이지만 여행할 땐 대담한 모습을 보여줘요.",
          description2: "원래 성격도 느긋해서 여행에서 필요한 것만 최대한 나중에 예약하고 바로 떠나버려요.",
          description3: "여행할 때 어떤 상황이 와도 '어떻게든 되겠지 하며, 무난하게 해결하고 넘어가요.",
          description4: "하지만 여행이라도 피곤한 건 싫어서 줄이 긴 맛집이나 핫한 장소는 피하려고 해요.",
          description5: "취미 생활과 힐링 나만을 위한 여행을 준비하며 꽂힌 것에는 돈이 아깝지 않아 가끔 여행지에서 플렉스 해버려요.",
          description6: "남들이 다하는 여행에 만족감을 느끼기보다 나만의 여행 속 즐거움이 따로 있어요.",
          description7: "여행을 좋아하긴 하지만 집에서 조용히 혼자만의 시간을 보내는 것을 더 좋아해요.",
          imageUrl: require("@/assets/images/ISTP.png"), // 예시 경로
          style: "프로 혼행러",
          soulMate: "효율 로보트(ENTJ)",
          hateMate: "프로 여행러(ENFJ)"
        },
        // 추가 유형...
      }
    };
  },
  created() {
    if (this.$route.query.surveyResults) {
      this.results = JSON.parse(this.$route.query.surveyResults);
    }
  },
  computed: {
    mbtiType() {
      if (!this.results) return '';
      return `${this.results.EI}${this.results.SN}${this.results.FT}${this.results.PJ}`;
    },
    mbtiProfile() {
      return this.mbtiProfiles[this.mbtiType] || {
        description: "MBTI 유형에 대한 설명을 찾을 수 없습니다.",
        imageUrl: "@/assets/images/default.png", // 기본 이미지
        style: "style 유형에 대한 설명을 찾을 수 없습니다."
      };
    }
  }
  };
  </script>
  
  <style scoped>
   @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
 
 .survey-container {
    font-family: "Nanum Gothic", sans-serif;
    font-style: normal;
    font-weight: bold; /* 글자 두께 */
    /*background-image: url('@/assets/images/travel2.jpg'); /* 여기에 이미지 파일의 경로를 넣으세요 */
    background-size: contain; /* 이미지가 컨테이너를 꽉 채우도록 설정 */
    background-position: center; /* 이미지가 컨테이너의 중앙에 위치하도록 설정 */
    background-repeat: no-repeat; /* 이미지가 반복되지 않도록 설정 */
    background-color: #8EDFFD;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 80px;
  }

  .mbtiType {
    color: #65B7F3; /* 글자 색상 */
    font-size: 2rem; /* 글자 크기 */
    text-shadow: 
    2px 2px 0px #8EDFFD, /* 글자의 오른쪽과 아래쪽에 황금색 그림자 */
    -1px -1px 0 #8EDFFD, /* 글자의 왼쪽과 위쪽에 황금색 그림자 */
    3px 3px 10px rgba(0, 0, 0, 0.1); /* 글자 주변에 부드러운 검은색 그림자로 깊이감 추가 */
    margin-bottom: 0%;
  }
  .mbtiStyle {
    color: #F7C347; /* 글자 색상 */
    font-size: 3rem; /* 글자 크기 */
    text-shadow: 
    2px 2px 0px #F7EC1D, /* 글자의 오른쪽과 아래쪽에 황금색 그림자 */
    -1px -1px 0 #F7EC1D, /* 글자의 왼쪽과 위쪽에 황금색 그림자 */
    3px 3px 10px rgba(0, 0, 0, 0.1); /* 글자 주변에 부드러운 검은색 그림자로 깊이감 추가 */
    margin-bottom: 30px;
    margin-top: 0%;
  }
  .mbtiImage{
    height: 300px;
    width: 300px;
    margin-bottom: 50px;
    margin-top: 60px;
  }
  .mbtiProfile-description{
    text-align: start;
  }
  .mbtiProfile-description p {
    margin-bottom: 30px;
  }

  .styleModal {
    background-color: #ffffff;
    padding: 20px 30px;
    border-radius: 8%;
    max-width: 550px;
     box-shadow: 
    0px 4px 6px rgba(0, 0, 0, 0.1),    /* 부드러운 그림자 */
    0px 1px 3px rgba(0, 0, 0, 0.08),   /* 작은 세부 그림자 */
    0px 10px 20px rgba(0, 0, 0, 0.06); /* 큰 퍼진 그림자 */
  }

  .borderLine{
    background: linear-gradient(#8EDFFD, #FFFFFF);
    width: 650px;
    padding-left: 50px;
    box-shadow: 
    5px 5px 15px rgba(58, 145, 195, 0.2),  /* 오른쪽 그림자 */
    -5px 5px 15px rgba(58, 145, 195, 0.2); /* 왼쪽 그림자 */
  }

    .restart-button {
    font-family: "Nanum Gothic", sans-serif;
    font-style: normal;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    color: #ffffff;
    background-color: #8EDFFD;
    border: none;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease;
    width: 400px;
    margin-top: 50px;
    margin-bottom: 25px;
    margin-right: 60px;
  }

      .home-button {
    font-family: "Nanum Gothic", sans-serif;
    font-style: normal;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    color: #ffffff;
    background-color: #8EDFFD;
    border: none;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease;
    width: 400px;
    margin-bottom: 25px;
    margin-right: 60px;
  }
  
  .start-button:hover {
    transform: scale(1.05);
  }
  </style>
  