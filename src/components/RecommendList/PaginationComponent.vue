// eslint-disable-next-line
/* eslint-disable */

<template>
  <div class="pagination-wrap">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <!-- Prevent the default anchor behavior and handle page change manually -->
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="goToPrevPage">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
            :class="{ 'active': pageNumber === currentPage }">
          <!-- Direct page selection should also prevent default behavior -->
          <a class="page-link" href="#" @click.prevent="goToPage(pageNumber)">
            {{ pageNumber }}
          </a>
        </li>
        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="goToNextPage">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: Number,
    currentPage: Number
  },
  methods: {
    goToPage(pageNumber) {
      this.$emit('changePage', pageNumber);
    },
    goToPrevPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 1);
      }
    }
  }
}
</script>
