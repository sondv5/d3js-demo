<template>
  <div class="home">
    home works {{ count }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({})
export default class Home extends Vue {
  @Prop({ default: 0 }) count!: number;
}
</script>
