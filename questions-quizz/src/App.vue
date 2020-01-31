<template>
  <div id="app" class="container">
    <div class="Header">
      <h1 class="Header-title">
        Le meilleur site de Q <span>du monde</span>
      </h1>

      <p>On est un peu obsédés par les Q, du coup on a décidé de créer un site dédié à ça.</p>
      <p>On espère que vous aimerez tout autant que nous. Cliquez sur le bouton et découvrer<br />des Q du monde entier, et votez pour vos préférés !</p>
    </div>

    <router-view/>

    <Footer />
  </div>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator';
  import Footer from '@/components/Footer.vue';

  @Component({
    components: {
      Footer
    }
  })
  export default class App extends Vue {}
</script>
<style lang="scss">
  .Header {
    background-color: $white;
    font-size: 1.2rem;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 0 1rem 0 rgba(0,0,0,0.75);
    line-height: 0;

    &-title {
      font-size: 2.4rem;
      color: $green;
      margin-top: 0;

      span {
        text-decoration: underline;
      }
    }
  }
</style>

