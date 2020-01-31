<template>
  <div class="Picture">
    <span class="Picture-id">#{{ syncedIndex + 1 || syncedData._id }}</span>
    <div class="Picture-vote">
      <span class="Picture-dislike">{{ syncedData.dislike }}</span>
      <span class="Picture-like">{{ syncedData.like }}</span>
    </div>
    <img class="Picture-img" :src="syncedData.picture" :alt="syncedData.id">
  </div>
</template>

<script>
  import {  Component, Vue, PropSync } from 'vue-property-decorator';

  @Component
  export default class Picture extends Vue {
    @PropSync('index', { type: Number }) syncedIndex
    @PropSync('data', { type: Object }) syncedData
  }
</script>

<style scoped lang="scss">
  .Picture {
    background-color: $white;
    border-radius: .5rem;
    text-align: center;
    position: relative;
    overflow: hidden;

    &-id,
    &-vote {
      position: absolute;
      top: 1rem;
    }

    &-id {
      color: $black;
      font-weight: bold;
      font-size: 1.2rem;
      left: 1rem;
    }

    &-vote {
      right: 1rem;
    }

    &-like {
      @include label($green)
    }

    &-dislike {
      @include label()
    }

    &-img {
      max-width: 100%;
      display: block;
    }
  }
</style>
