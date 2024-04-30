<template>
    <div id="carouselExampleCaptions" class="carousel slide">
    <!-- Slide icon -->
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
    </div>
  <div class="carousel-inner">
    <!-- 1st 제주랑 소개-->
    <div class="carousel-item active">
      <img src="@/assets/images/main01.jpg" class="d-block w-100" alt="...">
      <div class="swiper-slide">
        <div class="tit-wrap">
            <div >
              <p class="tit-main"><strong>제주도</strong>여행 갈땐</p>
                <p class="tit-main"><strong>제주랑</strong>에서</p>
            </div>
            <div class="tit-wrap-sub">
              <p class="tit-sub">제주 여행 시작과 끝을</p>
                <p class="tit-sub">제주랑에서 함께 해보세요:)</p>
            </div>
            <router-link to="/travel" class="btn btn-outline-light">더보기</router-link>
        </div>
      </div>
    </div>
    <!-- 2nd 여행 메이트 -->
    <div class="carousel-item">
      <img src="@/assets/images/main03.jpg" class="d-block w-100" alt="...">
      <div class="swiper-slide">
        <div class="tit-wrap">
            <div>
                <p class="tit-main"><strong>같이</strong> 하는 여행</p>
                <p class="tit-main"><strong>함께</strong> 하는 여행</p>
            </div>
            <div class="tit-wrap-sub">
                <p class="tit-sub">여행 장소와 날짜부터 1:1 채팅까지</p>
                <p class="tit-sub">나와 꼭 맞는 여행 친구 찾기</p>
            </div>
            <router-link to="/chatting" class="btn btn-outline-light">더보기</router-link>
        </div>
      </div>
    </div>
    <!--3rd 여행 후기 -->
    <div class="carousel-item">
      <img src="@/assets/images/main02.jpg" class="d-block w-100" alt="...">
      <div class="swiper-slide">
        <div class="tit-wrap">
            <div >
                <p class="tit-main"><strong>제주랑</strong>에서</p>
                <p class="tit-main">제주 관한<strong>모든 것</strong></p>
            </div>
            <div class="tit-wrap-sub">
                <p class="tit-sub">제주도 여행 정보를 싶다면?</p>
                <p class="tit-sub">지금 제주랑에서 찾아보기</p>
            </div>
            <router-link to="/list" class="btn btn-outline-light">더보기</router-link>
        </div>
      </div>
    </div>
    <!--4th 여행 코스 -->
    <div class="carousel-item">
      <img src="@/assets/images/main11.jpg" class="d-block w-100" alt="...">
      <div class="swiper-slide">
        <div class="tit-wrap">
            <div >
              <p class="tit-main">제주도 <strong>여행후기</strong></p>
              <p class="tit-main"><strong>제주랑</strong>에 다있다</p>
            </div>
            <div class="tit-wrap-sub">
              <p class="tit-sub">제주 관광객 1300만명 돌파</p>
              <p class="tit-sub">지금 여행 후기 구경 해보세요</p>
            </div>
            <router-link to="/reviews" class="btn btn-outline-light">더보기</router-link>
        </div>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div> <!-- carouselExampleCaptions -->
</template>