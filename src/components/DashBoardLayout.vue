<template>
  <div class="dashboardlayout">
    dashboardlayout works
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {}
})
export default class DashBoardLayout extends Vue {

  mounted() {
    console.log('mounted')
  }
}
</script>
