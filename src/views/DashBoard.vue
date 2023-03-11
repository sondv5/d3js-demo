<template>
  <div class="dashboard">
    <DashBoardLayout />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DashBoardLayout from '@/components/DashBoardLayout.vue';

@Options({
  components: {
    DashBoardLayout
  },
})
export default class Home extends Vue {}
</script>
