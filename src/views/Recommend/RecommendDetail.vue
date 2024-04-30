<template>
  <div>
    <RecommendDetailFood />
    <RecommendDetailPlace />
    <RecommendDetailHotel />
    <RecommendDetailEvent />
  </div>
  

</template>

<script>
import RecommendDetailFood from '../../components/RecommendDetail/RecommendDetailFood.vue';
import RecommendDetailPlace from '../../components/RecommendDetail/RecommendDetailPlace.vue';
import RecommendDetailHotel from '../../components/RecommendDetail/RecommendDetailHotel.vue';
import RecommendDetailEvent from '../../components/RecommendDetail/RecommendDetailEvent.vue';

export default {
  components: {
    RecommendDetailFood,
    RecommendDetailPlace,
    RecommendDetailHotel,
    RecommendDetailEvent
  },
  data() {
    return {

    };
  },
  methods: {
   
    },
}
</script>
