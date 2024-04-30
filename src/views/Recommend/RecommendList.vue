<template>
  <section>
    <!-- 헤더 크기만큼 패딩 -->
    <div class="divider" />
    <div class="fixedTop">
      <div class="recommend-location">
        <span>지금 보고 있는 지역은
          <!-- selectedRegion에 바인딩하기 위해 v-model ㅎㅎ-->
          <select v-model="selectedRegion">
            <option value="">전체</option>
            <option value="제주시">제주시</option>
            <option value="서귀포시">서귀포시</option>
            <option value="섬 속의 섬">섬 속의 섬</option>
          </select>
          입니다.
        </span>
      </div>
      <div class="category_box">
        <div class="category_menu">
          <ul>
            <!-- RecommendListFood에 selectedRegion prop으로 전달 -->
            <!-- <li :class="{ 'active': activeSection === 'all' }" @click="setActiveSection('all')">전체</li> -->
            <li :class="{ 'active': activeSection === 'listplace' }" @click="setActiveSection('listplace')">관광지</li>
            <li :class="{ 'active': activeSection === 'listfood' }" @click="setActiveSection('listfood')">음식점</li>
            <li :class="{ 'active': activeSection === 'listhotel' }" @click="setActiveSection('listhotel')">숙박</li>
            <li :class="{ 'active': activeSection === 'listevent' }" @click="setActiveSection('listevent')">축제/행사</li>
            <!--
            <li @click="setActiveSection('all')">전체</li>
            <li @click="setActiveSection('listfood')">음식점</li>
            <li @click="setActiveSection('listplace')">관광지</li>
            <li @click="setActiveSection('listhotel')">숙박</li>
            <li @click="setActiveSection('listevent')">축제/행사</li>
            -->
          </ul>
        </div>
      </div>
    </div>
    <!-- 각 컴포넌트는 activeSection이 해당 섹션을 가리키거나 'all'일 때만 표시됩니다.
    각 섹션을 표시하는 컴포넌트에는 v-if나 v-show를 사용하여 
    activeSection의 값에 따라 표시 여부를 결정합니다 -->
    <!-- <RecommendFood v-if="activeSection === 'food' || activeSection === 'all'" />  -->
    <RecommendListPlace v-if="activeSection === 'listplace'" :region="selectedRegion" />
    <RecommendListFood v-if="activeSection === 'listfood'" :region="selectedRegion"/>
    <RecommendListHotel v-if="activeSection === 'listhotel'" :region="selectedRegion" />
    <RecommendListEvent v-if="activeSection === 'listevent'" :region="selectedRegion" />

   

  </section>
</template>

<script>
// import RecommendFood from '../components/RecommendFood.vue';
import RecommendListFood from '../../components/RecommendList/RecommendListFood.vue';
import RecommendListHotel from '../../components/RecommendList/RecommendListHotel.vue';
import RecommendListPlace from '../../components/RecommendList/RecommendListPlace.vue';
import RecommendListEvent from '../../components/RecommendList/RecommendListEvent.vue';

export default {
  components: {
    RecommendListFood,
    RecommendListHotel,
    RecommendListPlace,
    RecommendListEvent,
  },
  data() {
    return {
      activeSection: 'listplace',
      selectedRegion: '' // 초기값을 설정합니다.
    };
  },
  methods: {
    setActiveSection(section) {
      this.activeSection = section;
      if (section === 'listplace') {
        this.selectedRegion = ''; // "음식점"이 선택되었을 때만 selectedRegion 초기화
      }
    },
  }
}
</script>
<style scoped>
.divider {
  padding: 50px;
}
</style>