<template>
<div class="all-container">
  <div class="app-container">
    <div class="divider" ></div>
  <div class="title-container">
  <!-- 타이틀 -->
    <h1>여행 <span class="highlight" style="font-size:47px">조인</span> 게시판</h1>
    <p class="write-text" @click="showModal = true">
  <font-awesome-icon icon="fa-solid fa-pen-to-square" /> 글쓰기
</p>
  </div>


<!-- 모달창 내용 -->
<div v-if="showModal" class="chat-modal" @click.self="showModal = false">
  <div class="chat-modal-content" @click.stop>
    <h2>채팅방 게시하기<font-awesome-icon icon="fa-solid fa-pen-to-square" /></h2>
    <div class="modal-header">
      <div class="profile-picture">
        <div v-if="userImages.length > 0">
          <img v-for="(image, index) in userImages" :src="image" :key="index" :alt="`${userName}'s profile image ${index + 1}`" />
        </div>
      </div>
      <p class="name-input">{{userName}}
        <img v-if="userGender === 'M'" :src="require('@/assets/images/male.png')" alt="Male" style="height: 25px; width: 25px;"/>
          <img v-else :src="require('@/assets/images/female.png')" alt="Female" style="height: 25px; width: 25px;"/>
        </p>
      <p class="name-input">{{userAge}} 살</p>
    </div>
    
    <!-- 제목 입력 부분 -->
    <div class="input-group">
      <div class="input-group">
        <label for="title" class="form-label">제목</label>
        <input type="text" id="title" v-model="newChatRoomTitle" placeholder="제목을 입력하세요" class="text-input">        
      </div>
    </div>

    <!-- 드롭다운 필터 -->
    <div class="input-group">
      <div for="reviewLocation" class="filter-body1">
        <label for="reviewLocation" class="form-label">지역</label>
        <select id="reviewLocation" v-model="reviewLocation" @change="handleLocationChange" class="dropdown-select">
          <option value="">선택하세요</option>
          <option value="전체지역">전체지역</option>
          <option value="제주북부">제주북부</option>
          <option value="제주남부">제주남부</option>
          <option value="제주동부">제주동부</option>
          <option value="제주서부">제주서부</option>
          <!-- 추가 지역 옵션을 여기에 더 추가할 수 있습니다. -->
        </select>
      </div>
    </div>


    <div class="input-group">
      <div class="input-group">
        <label for="travelStyle" class="form-label">태그</label>
        <input type="text" id="travelStyle" placeholder="원하는 여행 스타일 태그를 입력해주세요" class="text-input">
        <button class="btn-add" @click="addTravelStyle">추가</button>
      </div>
    <!-- 입력된 태그 표시 -->
    <div class="tags">
      <span v-for="(style, index) in travelStyles" :key="index" class="tag">
      {{ style }}
      <button class="remove-tag" @click="removeTravelStyle(index)">x</button>
      </span>
    </div>
  </div>
  <div class="input-group textarea-group">
  <label for="exampleFormControlTextarea1" class="form-label">내용</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model="newChatRoomContent"></textarea>
  </div>
  <div class="submit-group">
    <button class="btn-down" @click="showModal = false">닫기</button>
    <button class="btn-submit" @click="submitChatRoom">게시하기</button>
  </div>
  </div>
</div>

  <!-- 서브타이틀 -->
  <p style="text-align: left; margin-left:50px;">당신의 여행이 더욱 특별해질 수 있게 여행메이트를 찾아보세요.</p>

  <!-- 검색 폼 -->
  <div class="d-flex justify-content-center pb-5 pt-5">
  <input class="form-control me-2" style="flex-grow: 1; max-width: 80%;" type="text" v-model="searchQuery" placeholder="채팅방 이름을 입력해주세요" aria-label="default input example">
  <button type="button" class="btn btn-primary">검색</button>
  </div>

    <!-- 채팅방 목록 -->
    <div class="chatting-background">
      <div class="chatroom-header">
        <!-- 채팅방 목록 가운데 정렬을 위한 래퍼 -->
        <div class="title-wrapper">
        <h2>채팅방 목록</h2>
        </div>
        <div class="filter-text" @click="showFilterModal = true">
          <font-awesome-icon icon="fa-solid fa-sliders" /> 필터
        </div>
      </div>

      <!-- 채팅방 카드 목록 -->
      <div v-for="room in filteredAndSortedChatRooms" :key="room.chatRoomId" class="card-container">
          <div class="profile-picture">
              <img :src="room.creatorImage || require('@/assets/images/profile.png')" alt="Profile Picture">
              <p class="profile-name">{{ room.creatorName }}
                <img v-if="room.creatorGender === 'M'" :src="require('@/assets/images/male.png')" alt="Male" style="height: 25px; width: 25px;"/>
                <img v-else :src="require('@/assets/images/female.png')" alt="Female" style="height: 25px; width: 25px;"/>
              </p> <!-- 작성자 이름 -->
              <p class="profile-detail">{{ room.creatorAge }}살</p> <!-- 작성자 나이 -->
          </div>
          <div class="text-content">
              <h3 class="chatroom-name">[{{ room.reviewLocation }}]  {{ room.chatRoomName }}</h3>
              <p class="subtitle">{{ room.chatRoomContent }}</p>
              <div class="tag">
                  <span v-for="tag in room.travelStyleTags" :key="tag" class="travel-style-tag">
                      #{{ tag }}
                  </span>
              </div>
              <div class="button-group">
                  <button class="btn-submit" @click="enterChatRoom(room.chatRoomId)">입장</button>
                  <button v-if="room.memberId === currentUserId" class="btn-down" @click="deleteChatRoom(room.chatRoomId)">삭제</button>
              </div>
          </div>
      </div>
    </div>

    <!-- 필터 모달창 내용 -->
    <div v-if="showFilterModal" class="chat-modal" @click.self="showFilterModal = false">
      <div class="chat-modal-content" @click.stop>
        <h2>필터 옵션<font-awesome-icon icon="fa-solid fa-sliders" /></h2>
          <!-- 나이 슬라이더 필터 -->
          <div class="input-group">
            <div for="ageFilter" class="filter-body">
              <span>나이</span>
              <span class="filter-font">{{ ageFilter }}세</span>
            </div>
            <input type="range" id="ageFilter" v-model="ageFilter" min="18" max="50" class="slider">
          </div>

          <!-- 거리 슬라이더 필터 -->
          <div class="input-group">
            <div for="distanceFilter" class="filter-body">
              <span>거리</span>
              <span class="filter-font">{{ distanceFilter }}km 이내</span>
            </div>
            <input type="range" id="distanceFilter" v-model="distanceFilter" min="1" max="100" class="slider">
          </div>

          <!-- 드롭다운 필터 -->
          <div class="input-group">
            <div for="regionSelect" class="filter-body">
              <span>지역</span>
              <select id="regionSelect" v-model="selectedRegion" class="dropdown-select">
              <option value="">선택하세요</option>
              <option value="전체지역">전체지역</option>
              <option value="제주북부">제주북부</option>
              <option value="제주남부">제주남부</option>
              <option value="제주동부">제주동부</option>
              <option value="제주서부">제주서부</option>
              <!-- 추가 지역 옵션을 여기에 더 추가할 수 있습니다. -->
            </select>
            </div>
          </div>

          <div class="filter-tip">
            <ul>
              <li>거리는 실제 위치를 기준으로 가까운 친구를 보여줘요</li>
              <li>나이는 내 또래 친구들을 찾을수 있어요</li>
            </ul>
          </div>

        <div class="submit-group">
        <button class="btn-down" @click="showFilterModal = false">닫기</button>
        <button class="btn-submit" @click="applyFilters">적용</button>
        </div>
      </div>
    </div>
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      chatRooms: [], // 채팅방 목록을 저장할 배열
      newChatRoomName: '',
      showModal: false, // 모달 창 표시 여부
      travelStyles: [], // 사용자가 입력한 여행 스타일 태그를 저장할 배열
      newChatRoomTitle: '',  // 채팅방 제목
      newChatRoomContent: '', // 채팅방 내용
      reviewLocation: '',
      creatorGender:'',
      searchQuery: '', // 사용자의 검색 쿼리를 저장할 새로운 데이터 속성
      showFilterModal: false, // 필터 모달 창 표시 여부
      ageFilter: 25, // 기본 나이 필터 값을 설정
      distanceFilter: 10, // 기본 거리 필터 값을 설정
      regionFilter: [], // 체크된 지역을 담을 배열
      selectedRegion: '', // 선택된 지역을 저장할 데이터 속성
      userName: '',  // 사용자 이름
      userEmail:'',
      userGender:'',
      userAge:'',
      userImages: [], // 사용자 이미지 URL을 저장할 배열
      isLoading: true, // 로딩 상태 추가
    };
  },
  computed: {
    filteredAndSortedChatRooms() {
      let filtered = this.chatRooms.filter(room =>
        room.chatRoomName.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.selectedRegion === '' || room.reviewLocation === this.selectedRegion) // 지역 필터 추가
      );

      filtered.sort((a, b) => new Date(b.regDate) - new Date(a.regDate));
      return filtered;
    }
  },
  async mounted() {
    await this.fetchUserInfo(); // 사용자 정보를 먼저 불러옵니다.
    await this.fetchChatRooms(); // 그 다음 채팅방 목록을 불러옵니다.
    this.isLoading = false; // 로딩 완료
  },
  methods: {
    submitChatRoom() {
        const chatRoomData = {
      chatRoomName: this.newChatRoomTitle,
      chatRoomContent: this.newChatRoomContent,
      travelStyleTags: this.travelStyles,
      reviewLocation: this.reviewLocation,
      creatorGender: this.creatorGender
    };
    
    console.log('Sending:', chatRoomData);

    // Axios를 통해 서버에 채팅방 생성 요청
    this.$axios.post('http://jejurang.site:8080/api/v1/chat/create', chatRoomData)
      .then(response => {
        // 성공적으로 응답을 받으면 실행될 코드
        console.log("채팅방 생성 성공:", response.data);
        this.newChatRoomTitle = ''; // 채팅방 이름 입력 필드 초기화
        this.newChatRoomContent = ''; // 채팅방 내용 입력 필드 초기화
        this.reviewLocation = '';
        this.creatorGender = '';
        this.travelStyles = []; // 채팅방 태그 목록 초기화
        this.showModal = false; // 모달 창 닫기
        this.userGender = '';
        this.fetchChatRooms(); // 채팅방 목록 다시 불러오기
      })
      .catch(error => {
        // 요청에 실패하면 실행될 코드
        console.error("채팅방 생성 실패:", error.response?.data || error.message);
        alert('채팅방 생성에 실패했습니다: ' + (error.response?.data || error.message));
      });
    },
    handleLocationChange() {
        console.log('Selected location:', this.reviewLocation);
    },
    addTravelStyle() {
    const input = document.getElementById('travelStyle');
    if (input.value.trim() !== '') {
      this.travelStyles.push(input.value);
      input.value = ''; // 입력 필드 초기화
      }
    },
    applyFilters() {
      this.showFilterModal = false; // 필터 모달창 닫기
      console.log('적용된 필터:', this.ageFilter, this.distanceFilter, this.selectedRegion);
    },
    removeTravelStyle(index) {
    this.travelStyles.splice(index, 1); // 인덱스를 사용하여 배열에서 태그 삭제
    },

    async fetchChatRooms() {
      try {
        const response = await this.$axios.get('http://jejurang.site:8080/api/v1/chat/list');
        console.log('API Response:', response.data); // 응답 데이터 로그
        const sortedRooms = response.data.sort((a, b) => new Date(b.regDate) - new Date(a.regDate));
        this.chatRooms = [...sortedRooms];
      } catch (error) {
        console.error("채팅방 목록을 불러오는데 실패했습니다:", error);
      }
    },
    deleteChatRoom(roomId) {
      this.$axios.delete(`http://jejurang.site:8080/api/v1/chat/room/${roomId}`)
        .then(() => {
          alert("채팅방이 삭제되었습니다.");
          this.fetchChatRooms(); // 채팅방 목록을 다시 불러옵니다.
        })
        .catch(error => {
          console.error("채팅방 삭제 중 오류가 발생했습니다:", error);
        });
    },
    enterChatRoom(roomId) {
      // Vue Router를 사용하여 해당 채팅방의 상세 페이지로 이동!
      this.$router.push({ name: 'ChatRoom', params: { roomId: roomId } });
    },
    async fetchUserInfo() {
      try {
        const response = await this.$axios.get('http://jejurang.site:8080/api/v1/user/info/detail');
        const data = response.data;
        this.userName = data.userName;  // "userName" 키에 접근
        this.userEmail = data.email;    // "email" 키에 접근
        this.userGender = data.gender;  // "gender" 키에 접근
        this.userAge = data.age;        // "age" 키에 접근
        this.userAddress = data.address;// "address" 키에 접근
        this.userImages = data.images;  // 이미지 URL 리스트 저장
        this.currentUserId = data.memberId;  // 현재 사용자 ID 저장
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류가 발생했습니다:", error);
      }
    },
  }
};
</script>
<style scoped>
@import "@/assets/css/chatting_view_style.css";
</style>