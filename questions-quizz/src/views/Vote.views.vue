<template>
  <div class="VoteView">
    <PictureVote />

    <router-link to="/" class="VoteView-Button">
      Le classement qui pue pas du Q
    </router-link>
  </div>
</template>

<script>

import {  Component, Vue } from 'vue-property-decorator';
import PictureVote from '@/components/PictureVote.vue'

@Component({
  components: {
    PictureVote,
  }
})
export default class VoteViews extends Vue {}
</script>
<style lang="scss">
  .VoteView {
    &-Button {
      margin-top: 2rem;
      @include button();
      text-decoration: none;
    }
  }
</style>
