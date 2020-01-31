<template>
  <div class="HomeView">
    <div class="PictureList">
      <Picture v-for="(item, index) in items" :key="index" :data="item" :index="index" />
    </div>
    <button class="PictureList-Button" v-if="loadItems < limitItems" @click="loadMore">Je veux plus de Q</button>
    <router-link to="/vote" class="PictureList-Button">
      Voter
    </router-link>
  </div>
</template>

<script>

import {  Component, Vue } from 'vue-property-decorator';
import Picture from '@/components/Picture.vue'
import {VoteService} from "@/services/vote-service";

@Component({
  components:{
    Picture
  }
})
export default class HomeViews extends Vue {

  data () {
    return {
      $voteService: null,
      limitItems: 65,
      loadItems: 0,
      items: [],
      page: 1,
    }
  }

  created() {
    if (!this.$voteService) {
      this.$voteService = new VoteService()
    }
  }

  mounted() {
    this.getPicturesList();
  }

  async getPicturesList() {
    const pictureList = await this.$voteService.getAllPicture(this.page)
    this.items = this.items.concat(pictureList);
    this.loadItems = this.items.length;
  }

  loadMore () {
    this.page += 1;
    this.getPicturesList();
  }

}
</script>
<style lang="scss" scoped>
  .PictureList {
    display: flex;
    flex-flow: row wrap;
    padding-bottom: 1rem;

    & > div {
      margin: 1rem .5rem 0;
      max-width: calc(25% - 1rem);

      @include breakpoint('tablet') {
        max-width: calc(50% - 1rem);
      }
    }

    &-Button {
      @include button();
      display: block;
      margin: 1rem auto;
      width: fit-content;
      text-decoration: none;
    }
  }
</style>
