<template>
    <div>
        <div id="map" style="width:190px; height:190px; border-radius: 12px;"></div>
    </div>
</template>
<style scoped>

</style>
<script>``
export default {
    name: "KakaoMap",
    data() {
        return{
            map:null,
            overlay: null  // 오버레이를 저장할 변수 추가
        };
    },
    props: {
        latitude: Number,
        longitude: Number,
        placeTitle: String
    },
    watch: {
        // 위도 또는 경도가 변경되면 마커 업데이트
        latitude(newLat, oldLat) {
            if(newLat !== oldLat) {
                this.loadMaker();
            }
        },
        longitude(newLng, oldLng) {
            if(newLng !== oldLng) {
                this.loadMaker();
            }
        }
    },
    setup() {},
    created() {},
    mounted() {
        this.initMap();

        if (window.kakao && window.kakao.maps) {
            //카카오 객체가 있고, 카카오 맵을 그릴 준비가 되어있다면 맵 실행
            this.loadMap();
        } else {
            //없다면 카카오 스크립트 추가 후 맵 실행
            this.loadScript();
        }
    },
    methods: {
        loadScript() {
            const script = document.createElement("script");
            script.src=
            //&autoload=false api를 로드한 후 맵을 그리는 함수가 실행되도록 구현
            // 카카오 개발자 javascript 코드
            "//dapi.kakao.com/v2/maps/sdk.js?appkey=652bc7bf611ac245081578c73084c7df&autoload=false";
            // 스크립트 로드가 끝나면 지도를 실행 될 준비가 되어 있다면 지도가 실행되도록 구현
            script.onload = () => window.kakao.maps.load(this.initMap); 

            document.head.appendChild(script); // html>head 안에 스크립트 소스를 추가
        },
        
        initMap() {
            if (!this.map && window.kakao && window.kakao.maps) {
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(this.latitude || 33.50611873726319, this.longitude || 126.51317667644368),
                    level: 2,
                };
                this.map = new window.kakao.maps.Map(container, options);
            }
            this.loadMaker();
        },
        loadMaker() {
            if (!this.map) return;

            // 마커 위치 설정
            const markerPosition = new window.kakao.maps.LatLng(this.latitude, this.longitude);
            const marker = new window.kakao.maps.Marker({
                position: markerPosition
            });

            // 오버레이 콘텐츠 정의
            const content = `<div class="custom-overlay">
                                <p class="info-title">${this.placeTitle}</p>
                            </div>`;

            // CustomOverlay 객체 생성 및 지도에 추가
            this.overlay = new window.kakao.maps.CustomOverlay({
                content: content,
                map: this.map,
                position: marker.getPosition(),
                yAnchor:-0.2
            });

            // 마커 지도에 추가
            marker.setMap(this.map);
        },
    },
};
</script>

<style >
.custom-overlay {
    border: 3px solid #1275D6;  /* 테두리 색상 및 두께 */
    background-color: rgba(255, 255, 255, 0.9);  /* 배경색 및 투명도 */
    border-radius: 20px;  /* 모서리의 둥근 정도 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  /* 그림자 추가 */
    color: #333;  /* 글자 색상 */
    font-size: 14px;  /* 글자 크기 */
    text-align: center;  /* 텍스트 중앙 정렬 */
    line-height: 1.5;  /* 줄 간격 */
}

.info-title {
    padding-top: 15px;
    padding-left: 5px;
    padding-right: 5px;
    font-weight: 600;
}

</style>
