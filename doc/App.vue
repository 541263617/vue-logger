<template>
  <div id="app">
    <top-header></top-header>
    <div class="main">
      <left-nav @change-nav="changeNav"></left-nav>
      <div class="content-wrapper">
        <router-view />
      </div>
      <div class="iframe-case">
        <iframe :src="src" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from './views/topheader/TopHeader.vue'
import LeftNav from './views/leftnav/LeftNav.vue'
import url from 'url'
export default {
  name: 'App',
  data(){
    return {
      src: ''
    }
  },
  mounted(){
    let path = url.parse(location.href).hash.replace('#', '')
    this.src = examplePath + path
  },
  methods: {
    changeNav(src){
      this.src = examplePath + src
    }
  },
  components: {
    TopHeader,
    LeftNav
  }
}
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }

  .main {
    height: 100%;
    padding-top: 60px;
    overflow: hidden;
    display: flex;
    flex-flow: nowrap row;
    box-sizing: border-box;
  }

  .content-wrapper{
    flex: 1;
    text-align: left;
    height: 100%;
    padding-right: 400px;
    overflow-y: auto;
  }

  .iframe-case{
    position: absolute;
    right: 20px;
    top: 80px;
    width: 333px;
    height: 667px;
    background-image: url(./images/phone.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
    padding: 100px 15px;
    box-sizing: border-box;
    overflow: hidden;
  }

  iframe{
    width: 273px;
    height: 100%;
    margin: 0 15px;
    border: none;
    background: white;
  }
</style>
