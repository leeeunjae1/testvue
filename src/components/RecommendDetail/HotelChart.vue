<template>
    <Bar
      v-if="loaded"
      :data="chartData"
      :options="chartOptions"
    />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    recommendHotelId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [],
        datasets: [{
          label: '평점',
          data: [],
          fill: false,
          backgroundColor: [
            'rgba(18, 117, 214, 0.3)',
            'rgba(101, 183, 243, 0.3)',
            'rgba(142, 223, 253, 0.4)',
            'rgba(142, 223, 253, 0.2)',
            'rgba(142, 223, 253, 0.1)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(43, 53, 175, 0.5)',
            'rgb(101, 183, 243)',
            'rgb(142, 223, 253)',
            'rgb(142, 223, 253, 0.5)',
            'rgb(142, 223, 253, 0.5)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
          }]
      },
      chartOptions: {
        indexAxis: 'y',
        responsive: true,
        borderColor: '#000', // 기본 테두리 색상을 검정으로 설정
        scales: {
          x: {  // X축의 경우
            beginAtZero: true,
            grid: {
              drawBorder: false, // X축 경계선 숨김
              display: false  // X축 격자 선 숨김
            },
            ticks: {
              display: false // X축의 숫자를 숨깁니다.
            },
          },
          y: {  // Y축의 경우
            beginAtZero: true,
            grid: {
              drawBorder: false, 
              display: false  
            }
          }
        },
            plugins: {
        legend: {
          display: false, // 범례(legend)도 숨기고 싶은 경우 사용합니다.
        }
      }
      }
    }
  },
  async mounted() {
    // 컴포넌트가 마운트 되었을 때 console.log로 recommendHotelId를 출력합니다.
    console.log('HotelChart 컴포넌트의 recommendHotelId:', this.recommendHotelId);
    try {
      const response = await this.$axios.get(`/api/recommendreply/hotel/reads/tag-counting/${this.recommendHotelId}`);
      if (response.data) {
        this.chartData.labels = response.data.map(tag => Object.keys(tag)[0]);
        this.chartData.datasets[0].data = response.data.map(tag => tag[Object.keys(tag)[0]]);
      }
      this.loaded = true;
    } catch (error) {
      console.error('API 데이터 로드 중 에러:', error);
    }
  }
}
</script>