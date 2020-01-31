<template>
  <div v-if="item" class="Vote">
    <div>
      <Like @success-vote="updatePicture" :question-id="item._id" />
    </div>
    <div class="Vote-picture">
      <Picture :data="item" />
    </div>
    <div>
      <Dislike @success-vote="updatePicture" :question-id="item._id" />
    </div>
  </div>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator';
  import Like from '@/components/actions/Like.vue'
  import Dislike from '@/components/actions/Dislike.vue'
  import Picture from '@/components/Picture.vue';
  import {VoteService} from "@/services/vote-service";

  @Component({
    components: {
      Dislike,
      Like,
      Picture,
    }
  })
  export default class PictureVote extends Vue {
    data() {
      return {
        $voteService: null,
        item: null,
      }
    }

    created() {
      if (!this.$voteService) {
        this.$voteService = new VoteService();
      }
    }
    mounted() {
      this.updatePicture();
    }

    async updatePicture () {
      this.item = await this.$voteService.getRandomPicture();
    }
  }
</script>

<style scoped lang="scss">
  .Vote {
    display: flex;
    flex-flow: row;
    align-items: center;

    &-picture {
      margin: 0 1rem;
      width: 100%;

      /deep/ .Picture-img {
        margin: 0 auto;
      }
    }
  }
</style>
