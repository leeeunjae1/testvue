<template>
  <div class="rating">
    <span
      v-for="(star, index) in stars"
      :key="index"
      @click="rate(index + 1)"
      :class="{ 'filled': index < internalValue }"
      :style="{ cursor: readOnly ? 'default' : 'pointer' }"
    >
    </span>
  </div>
</template>

<script>
export default {
  props: {
    grade: {
      type: Number,
      default: 0
    },
    readOnly: {
    type: Boolean,
    default: false
  }
  },
  mounted() {
  // 부모 컴포넌트로부터 전달된 초기값 설정
  this.internalValue = this.grade;
},
  data() {
    return {
      stars: 5,
      internalValue: this.grade
    };
  },
  methods: {
    rate(grade) {
    if (!this.readOnly) {
      this.internalValue = grade;
      this.$emit('update:grade', grade);
    }
  }
},
  watch: {
  grade(newgrade) {
    // 외부에서 전달된 등급이 변경되면 내부 등급을 업데이트합니다.
    this.internalValue = newgrade;
  }
}
};
</script>

<style scoped>
.rating {
  font-size: 30px; /* 별의 크기를 설정합니다. */
  font-weight: bold;
}

.rating span {
  cursor: pointer; /* 마우스를 가져다 대면 손가락 모양의 커서가 표시됩니다. */
}

.rating span::after {
  content: '☆'; /* 별 모양의 평점 기본 값으로 설정합니다. */
  color: #ccc; /* 비활성화된 별의 색상을 설정합니다. */
  text-shadow: 0 0 3px #000; /* 검은색 테두리를 추가합니다. */
}

.rating span.filled::after {
  content: '★'; /* 활성화된 별의 색상을 설정합니다. */
  color: gold; /* 활성화된 별의 색상을 설정합니다. */
  text-shadow: 0 0 3px #000; /* 활성화된 별에도 검은색 테두리를 추가합니다. */
}
</style>