<template>
  <div class="containor">
  <div class="courseButton">
        <button type="button" @click="coursebutton('A')"> A 코스 </button>
        <button type="button" @click="coursebutton('B')"> B 코스 </button>
        <button type="button" @click="coursebutton('C')"> C 코스 </button>
        <button type="button" @click="coursebutton('D')"> D 코스 </button>
        <button type="button" @click="coursebutton('E')"> E 코스 </button>
        <button type="button" @click="coursebutton('F')"> F 코스 </button>
        <button type="button" @click="coursebutton('G')"> G 코스 </button>
        <button type="button" @click="coursebutton('H')"> H 코스 </button>
        <button type="button" @click="coursebutton('I')"> I 코스 </button>
        <button type="button" @click="coursebutton('J')"> J 코스 </button>
  </div>

<div class="line5"></div>

    <div class="tag-area">
      <div class="icon-group">
        <div class="icon-circle">
          <img src="@/assets/images/schedule.png" alt="Calendar Icon"/>
        </div>
        <div class="icon-text">
          <p class="tag-category">일정</p>
          <p class="tag-content">{{ currentSchedule }}</p>
        </div>
      </div>

      <div class="icon-group">
        <div class="icon-circle">
          <img src="@/assets/images/tag.png" alt="People Icon"/>
        </div>
        <div class="icon-text">
          <p class="tag-category">테마</p>
          <p class="tag-content">{{ currentTheme }}</p>
        </div>
      </div>

      <div class="icon-group">
        <div class="icon-circle">
          <img src="@/assets/images/budget.png" alt="People Icon"/>
        </div>
        <div class="icon-text">
          <p class="tag-category">총 예산</p>
          <p class="tag-content">{{ currentBudget }}</p>
        </div>
      </div>

    </div>


<div class="line5"></div>

<div class="course-description">
  <p>{{currentDescription}}</p>
</div>

  <div class="map-container">
  <div class="main-map" ref="map">
    <div class="map-text">
  <div class="line-container">
  <div class="line"></div>
  <span class="description">1일차</span>
</div>
<div class="line-container">
  <div class="line2"></div>
  <span class="description">2일차</span>
</div>
<div class="line-container">
  <div class="line3"></div>
  <span class="description">3일차</span>
</div>
<div class="line-container">
  <div class="line4"></div>
  <span class="description">4일차</span>
</div>
</div>
  </div>
</div>

</div>
</template>
<script>
import OlLayerTile from 'ol/layer/Tile.js';
import OlView from 'ol/View.js';
import OlMap from 'ol/Map.js';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj.js'
import {defaults} from 'ol/control.js';
import {toLonLat} from 'ol/proj.js'
import axios from 'axios'
import { EventBus } from '@/EventBus';
import Geocoder from 'ol-geocoder'
import OlVectorSource from 'ol/source/Vector.js'
import OlVectorLayer from 'ol/layer/Vector.js'
import OlFeature from 'ol/Feature.js';
import OlPoint from 'ol/geom/Point.js';
import OlStyle from 'ol/style/Style.js';
import {Fill, Stroke, Text} from 'ol/style';
import OlIcon from 'ol/style/Icon.js';

import markerImage from '@/assets/images/haru.png';

import OlLineString from 'ol/geom/LineString';



export default {
  name: 'MainMap',
  data() {
    return {
      olMap: undefined,
      address: '',
      iconsSource: undefined,
      locations: [],
      title: '',
      grade: 0,
      review: '',
      mapTag: '#',
      course: '',
      budget: 0,
      category: '',
      lastFeature: undefined,
      lastClickedFeature: undefined,
      dates: [],
      budgetSummary: {},
      showModal: false,
      currentSchedule:'',
      currentTheme:'',
      currentDescription:'코스설명',
      currentBudget:'',
      budgetTotal: 0,  // 총 예산을 저장할 변수
    }
  },
  mounted() {
    this.initializeMap();
    this.fetchBudgets();
    EventBus.$on('courseClick', (course) => {
    this.course = course;
    this.updateMapIcons();  // 코스에 맞는 아이콘을 다시 불러옵니다.
  });
},

methods: {

  fetchBudgets() {
    this.$axios.get('http://ec2-3-34-189-167.ap-northeast-2.compute.amazonaws.com:8080/api/map/listMap')
      .then(response => {
        // response.data 형태가 [{ date: '1일차', budget: 111 }, ...]라고 가정
        this.dates = response.data;
        this.calculateTotalBudgets();  // 데이터를 받아온 후 총 예산을 계산
      })
      .catch(error => {
        console.error('Error fetching budgets:', error);
      });
  },

  calculateTotalBudgets() {
    const budgetSummary = {};

    // 각 코스별 예산 객체 초기화
    budgetSummary['A'] = 0;
    budgetSummary['B'] = 0;
    budgetSummary['C'] = 0;
    budgetSummary['D'] = 0;
    budgetSummary['E'] = 0;
    budgetSummary['F'] = 0;
    budgetSummary['G'] = 0;
    budgetSummary['H'] = 0;
    budgetSummary['I'] = 0;
    budgetSummary['J'] = 0

    this.dates.forEach((date) => {
      const course = date.course; // 코스 구분값
      const budget = date.budget; // 해당 날짜의 예산
      budgetSummary[course] += budget; // 코스별 예산 누적
    });

    this.budgetSummary = budgetSummary; // 리액티브하게 데이터 업데이트
  },
  
  formatCurrency(amount) {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
  },

  coursebutton(course) {
    this.course = course;
    this.calculateTotalBudgets(); // 선택한 코스에 따른 예산 계산
    this.currentBudget = this.formatCurrency(this.budgetSummary[course]); // 선택한 코스의 예산을 형식화하여 currentBudget에 저장

    switch (course) {
      case 'A':
        this.currentSchedule = '3박 4일';
        this.currentTheme = '제주 투어';
        this.currentDescription = '코스설명1';
        break;
      case 'B':
        this.currentSchedule = '2박 3일';
        this.currentTheme = '올레길 탐방';
        this.currentDescription = '제주 올레길은 골목길들이 크게 하나로 이어지는 제주도 도보 여행 코스이다. 총 26코스 425km으로 이어진 올레길은 겉으로 잘 보이지 않는 제주의 아름다운 속살을 다채롭게 보여준다. 길 따라 걷다 보면 신천 바다목장의 주황색 귤 꽃밭, 제주도 명소인 민물과 바닷물이 만나는 쇠소깍도 만날 수 있다. 제주도가 사시사철 매 순간 다양한 모습을 보여주듯 천천히 걸을수록 더 많은 것을 볼 수 있다.';
        break;
      case 'C':
        this.currentSchedule = '당일여행';
        this.currentTheme = '드라이브 코스';
        this.currentDescription = '제주여행의 매력은 뭐니 뭐니 해도 해안 따라 드라이브를 즐기는 것이다. 사면이 바다로 둘러싸여 있기 때문이다. 제주의 해안도로는 비경과 특징이 각기 다르다. 그중 산과 섬, 바다가 한데 어우러지며 빼어난 경관을 간직한 곳이 바로 사계해안도로이다. 사계해안도로는 제주 안덕면 사계리(산방산)~대정읍 상모리(송악산)를 연결하는 도로로 빼어난 해안절경과 섬과 산의 절묘한 어우러짐이 펼쳐진다. 해안을 둘러싸듯 우뚝 솟은 산방산과 송악산이 해안의 양쪽 끝에 버티고 있어 포근함과 안정감을 주는 서귀포시의 대표적인 해안도로이다. 낮은 지대로 달리다보니 해안 조망이 눈높이에 있어 디테일하게 비경을 담을 수 있다. 해안과 산, 도로가 합의일체로 그려내는 빼어난 광경 외에도 바다를 붉게 물드는 환상적인 낙조까지 자연이 만들어낸 모든 것이 아름답고 황홀하다';
        break;
      case 'D':
        this.currentSchedule = '1박2일';
        this.currentTheme = '로컬 여행';
        this.currentDescription = '제주의 아름다운 명소는 다 알고 있다면 이제 제주 여행은 제주의 경치가 아니라 제주 사람들의 삶을 느껴보러 떠나 보자. ‘어멍아방잔치마을’이라는 정다운 이름을 가진 신풍리농촌체험휴양마을에 가면 제주 사람들의 생활과 문화를 만나볼 수 있다. 제주의 참모습을 알 수 있는 기회가 된다.';
        break;
      case 'E':
        this.currentSchedule = '당일치기';
        this.currentTheme = '가족 코스';
        this.currentDescription = '제주도는 휴양의 도시고 가족이 함께 떠나 즐기기 좋은 체험지이기도 하다. 어린 아이를 데리고도 여행이 가능한 중문단지의 볼기리, 체험거리, 맛볼거리를 두루섭렵해 보자. 여기만 보아도 아쉬울 것이 없다.';
        break;
      case 'F':
        this.currentSchedule = '1박2일';
        this.currentTheme = '캠핑 코스';
        this.currentDescription = '한라산 기슭 1100도로 변에 자리한 서귀포자연휴양림은 삼림욕과 생태탐방은 물론 여름철 물놀이와 캠핑을 위한 야영장까지 고루 갖추고 있다. 편백나무 숲 속에 펼친 텐트에 모여 앉아 밤하늘 총총히 뜬 별빛을 바라보며 보내는 하룻밤은 평생 간직할 추억으로 남는다. 휴양림에서 멀지 않은 거리에 한라수목원과 어승생악 탐방로가 있어 반나절 코스로 잡으면 좋다.';
        break;
      case 'G':
        this.currentSchedule = '당일여행';
        this.currentTheme = '익사이팅 여행';
        this.currentDescription = '제주도 서귀포시 강정동에는 야구박물관에서 부터 절벽과 조화를 이루는 폭포, 서귀포의 비경을 만나볼 수 있는 강정천과 하루에 두번 바닷길이 열리는 신비의 섬 서건도 까지 아름다움을 만끽할 수 있는 여행지가 있다. 혼자만의 시간, 커플과의 데이트, 가족과 함께하는 시간, 누구와 함께 해도 좋을 것만 같은 제주 서귀포 강정으로 여행을 떠나보는건 어떨까?';
        break;
      case 'H':
        this.currentSchedule = '당일여행';
        this.currentTheme = '카페 투어';
        this.currentDescription = '제주에는 다양한 먹거리 볼거리들이 너무 많지만 그 중에서도 특별히 즐길 수 있는 맛있는 찻집을 찾아가 보자. 제주 도민만이 알 수 있는 디저트 카페와 특별한 체험을 즐겨볼 수 있는 이색적인 카페를 소개한다. 특히 동백꽃군락 인근의 와랑와랑의 소담스런 분위기와 따뜻한 커피는 잊혀지지 않는 제주의 추억을 선사할 것이다.';
        break;
      case 'I':
        this.currentSchedule = '1박2일';
        this.currentTheme = '로컬여행';
        this.currentDescription = '세계자연유산에 빛나는 거문오름 탐방로와 따라비 오름은 제주 화산탐방로라 할 수 있겠다. 화산이 분출한 자국을 따라 다른 어느 지역에서도 볼 수 없는 용암지구의 특이한 절경을 만끽할 수 있다. 제주도에 왔다면 조랑말을 타볼 수 있는 기회도 놓치지 말자';
        break;
      case 'J':
        this.currentSchedule = '당일여행';
        this.currentTheme = '힐링코스';
        this.currentDescription = '회색빛 도시의 일상에 지친 이들에게 제주의 숲과 바다는 천연 치유제가 된다. 천년의 숲 비자림에 들어서면 영혼까지 맑아지는 기분이다. 평화로움 가득한 중산간 도로, 잘 가꿔진 허브동산, 망망대해가 펼쳐진 해안 절벽까지 천천히 쉬어가는 동안 스트레스로 찌들었던 몸과 마음이 한결 가벼워진다. 비워진 공간엔 맑고 따스한 기운이 가득 찬다.';
        break;
      default:
        this.currentSchedule = '당일여행';
        this.currentTheme = '문화탐방';
        this.currentDescription = '여행은 제주도의 절묘한 자연경관과 특별한 맛을 느낄 수 있는 여행이다. 세계자연유산으로 등재된 만장굴과 돌과 더불어 살아 사는 제주인의 삶이 오롯이 녹아든 제주돌문화공원을 방문하고, 제주도만의 민속자연을 볼 수 있는 민속자연사박물관을 돌아보자.';
        break;
    }
    EventBus.$emit('courseClick', course);
  },
  groupAndDrawLines() {
    const groupedByDate = {};
    // 현재 코스에 해당하는 위치 데이터만 날짜별로 그룹화
    this.locations.forEach(location => {
      if (location.course === this.course) {
        if (!groupedByDate[location.date]) {
          groupedByDate[location.date] = [];
        }
        groupedByDate[location.date].push(fromLonLat([location.lonCopy, location.latCopy]));
      }
    });

    // 각 그룹에 대해 선을 그립니다
    Object.keys(groupedByDate).forEach(date => {
      const coordinates = groupedByDate[date];
      if (coordinates.length > 1) {
        const lineFeature = new OlFeature({
          geometry: new OlLineString(coordinates)
        });
        const lineColor = this.getColorForDay(date);
        lineFeature.setStyle(new OlStyle({
          stroke: new Stroke({
            color: lineColor,
            width: 2
          })
        }));
        this.vectorSource.addFeature(lineFeature);
      }
    });
  },

  getColorForDay(date) {
    switch (date) {
      case '1일차':
        return '#ff0000'; // 빨간색
      case '2일차':
        return '#00ff00'; // 초록색
      case '3일차':
        return '#006eff'; // 파란색
      case '4일차':
        return '#ffa200';
      default:
        return '#FFFFFF'; // 기본 색상
    }
  },
  updateMapIcons() {
    this.vectorSource.clear();  // 기존 벡터 소스 클리어 (마커와 선 모두 제거됩니다)

    // 새로운 코스에 해당하는 마커들만 추가
    this.locations.forEach(location => {
      if (location.course === this.course) {
        const point = fromLonLat([location.lonCopy, location.latCopy]);
        const feature = new OlFeature({
          geometry: new OlPoint(point),
          id: location.id
        });

        feature.setStyle(new OlStyle({
          image: new OlIcon({
            scale: 0.125,
            src: markerImage 
          }),

        text: new Text({
        text: String(location.id), // 위치 순서를 문자열로 변환
        font: '14px Calibri,sans-serif',
        offsetY: -25,
        fill: new Fill({
          color: '#ff0000'
        }),
        stroke: new Stroke({
          color: '#ffffff',
          width: 3
        }),
        
      })
        }));

        feature.set('data', location);
        this.vectorSource.addFeature(feature);

        feature.on('click', () => this.onMarkerClick(feature));
      }
    });
    this.groupAndDrawLines();
  },

  onMarkerClick(clickedFeature) {

  if (this.lastClickedFeature) {
    this.lastClickedFeature.setStyle(new OlStyle({
      image: new OlIcon({
        scale: 0.125,
        src: markerImage
      })
    }));
  }

  const clickedStyle = new OlStyle({
    image: new OlIcon({
      scale: 0.15,
      src: markerImage
    }),
    zIndex: 1000 
  });

  clickedFeature.setStyle(clickedStyle);
  this.lastClickedFeature = clickedFeature;
},

  initializeMap() {
    this.vectorSource = new OlVectorSource();
 
    this.fetchLocations();
    const vectorLayer = new OlVectorLayer({
      source: this.vectorSource
    });
    this.olMap = new OlMap({
      target: this.$refs.map,
      controls: defaults({
      attribution: false,
      zoom: false,
      rotate: false,
    }),
  
  layers: [
    new OlLayerTile({
      source: new OSM()
    }),
    vectorLayer
  ],
  view: new OlView({
    center: fromLonLat([126.52919839098948, 33.361753442616674]), // 경기도 성남
    zoom: 11
  })
});
this.olMap.on('click', async (e) => {
  geocoder.getSource().clear();
  this.clearLocationData();

  if (this.lastFeature) {
    this.vectorSource.removeFeature(this.lastFeature);
    this.lastFeature = null;
  }

  const [lon, lat] = toLonLat(e.coordinate);
  const addressInfo = await this.getAddress(lon, lat);
  console.log(addressInfo)
  if (addressInfo) {
    const displayAddress = this.getUiAddress(addressInfo.data.display_name);
    const point = fromLonLat([lon, lat]);
    console.log(lon , lat)
    const featureId = `feature-${lon}-${lat}`;  // Example of generating a unique feature ID
    let feature = this.vectorSource.getFeatureById(featureId);
    if (!feature) {
      feature = new OlFeature({
        geometry: new OlPoint(point),
        id: featureId
      });
      feature.setStyle(new OlStyle({
        image: new OlIcon({
          scale: 0.7,
          src: '//cdn.rawgit.com/jonataswalker/map-utils/master/images/marker.png'
        })
      }));
      this.vectorSource.addFeature(feature);
      this.lastFeature = feature;
    } else {
      feature.setGeometry(new OlPoint(point));
      this.lastFeature = feature;
    }
  
    EventBus.$emit('mapClick', {
      title: this.title,
      address: displayAddress,
      grade: this.grade,
      review: this.review,
      lonCopy: lon,
      latCopy: lat,
      image: this.image,
      mapTag: this.mapTag,
      course: this.course,
      budget: this.budget,
      category: this.category,
    });
  } else {
    console.error('Failed to fetch address information');
  }
});

  const geocoder = new Geocoder('nominatim', {
    provider: 'osm',
    lang: 'kr',
    placeholder: '주소 검색',
    limit: 5, // 자동 완성 결과 최대 개수
    autoComplete: true,
    keepOpen: true
  });
    this.olMap.addControl(geocoder);
    geocoder.on('addresschosen', (evt) => {
      this.setUiAddress(evt.address.details.name);
  });
      this.olMap.once('rendercomplete', () => {
      this.fetchLocations(); // 지도 렌더링이 완료된 후에 위치 데이터를 가져오고 마커를 추가합니다.
  });
  },

  clearLocationData() {
    // UI에 표시된 정보 초기화
    this.title = '';
    this.addressCopy = '';
    this.grade = null;
    this.review = '';
    this.image = '';
    this.mapTag = '';
    this.course = '';
    this.budget = null;
    this.category = '';
  },

  coordi4326To3857([lon, lat]) {
      // 좌표 변환 로직 구현
      const x = lon * 20037508.34 / 180;
      let y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
      y = y * 20037508.34 / 180;
      return [x, y];
    },

  getUiAddress(str) {
      return str.split(', ').reverse().join(' ');
    },

  async addUiAddress(coordinate) {
      const lonLatArr = toLonLat(coordinate);
      const lon = lonLatArr[0];
      const lat = lonLatArr[1];
      const addressInfo = await this.getAddress(lon, lat);
      EventBus.$emit('mapClick', addressInfo.data.display_name.split(', ').reverse().join(' '));
      this.drawMapIcon(coordinate);
    },

  drawMapIcon(coordinate) {
    const vectorSource = this.olMap.getLayers().item(1).getSource(); // Get vector source from the second layer
    vectorSource.clear();
    const feature = new OlFeature({
    geometry: new OlPoint(coordinate)
  });
      feature.setStyle(
      new OlStyle({
        image: new OlIcon({
        scale: 0.7,
        src: '//cdn.rawgit.com/jonataswalker/map-utils/master/images/marker.png'
      })
    })
  );
      vectorSource.addFeature(feature);
  },
  async fetchLocations() {
    try {
      const response = await axios.get('http://ec2-3-34-189-167.ap-northeast-2.compute.amazonaws.com:8080/api/map/listMap');
        this.locations = response.data; // 응답 데이터를 locations 배열에 저장
        this.addMapIcons(); // 가져온 위치 정보를 기반으로 지도에 아이콘을 추가
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
        console.log('Received locations:', this.locations);
  },
  
  getAddress (lon, lat) {.0
    return axios.get(
        'https://nominatim.openstreetmap.org/reverse',
        {
          params: {
            format: 'json', 
            lon: lon,
            lat: lat
          }
        })
  },

  setUiAddress(str) {
    this.address = str.split(', ').reverse().join(' ');
  },

  addMapIcons() {
    const vectorLayer = this.olMap.getLayers().item(1); // 두 번째 레이어 가져오기
    const vectorSource = vectorLayer.getSource();
    const coordinates = [];

  // DB에서 가져온 각 위치 정보에 대해 아이콘을 추가합니다.
  this.locations.forEach(location => {
    if (location.course === this.course){
      const point = fromLonLat([location.lonCopy, location.latCopy]);
       coordinates.push(point);

      const feature = new OlFeature({
       geometry: new OlPoint(fromLonLat([location.lonCopy, location.latCopy]))
        ,id: location.id
    });

  feature.setStyle(new OlStyle({
    image: new OlIcon({
    scale: 0.05,
    src: markerImage 
  })

  }));

  feature.set('data', location);
  vectorSource.addFeature(feature);
  }});

  this.olMap.on('click', (evt) => {
    const feature = this.olMap.forEachFeatureAtPixel(evt.pixel, (feature) => {
      return feature;
    });
    if (feature) {
      this.onMarkerClick(feature);
      const data = feature.get('data');
    if (data) {
      this.displayLocationData(data);
    }
  }});
},

  displayLocationData(data) {
    // DB에서 가져온 데이터를 UI에 표시
    this.title = data.title;
    this.addressCopy = data.address;
    this.grade = data.grade;
    this.review = data.review;
    this.image = data.image;
    this.mapTag = data.mapTag;
    this.course = data.course;
    this.budget = data.budget;
    this.category = data.category;
    // 이외에 필요한 UI 업데이트 로직
  }

  }
}
</script>
<style>
@import "@/assets/css/main_map_style.css";
</style>