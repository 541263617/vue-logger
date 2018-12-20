<template>
  <div class="left-nav">

    <div class="title">开发指南</div>
    <ul>
      <li @click="changeNav('/Introduce')" :class="{active: currentPath === '/Introduce'}">
        <router-link to="/introduce">使用指南</router-link>
      </li>
      <li @click="changeNav('/Develop')" :class="{active: currentPath === '/Develop'}">
        <router-link to="/develop">开发指南</router-link>
      </li>
    </ul>

    <div class="title">UI组件</div>
    <ul class="left-nav-ul">
      <li v-for="(item, $index) in componentsList"
          @click="changeNav(item.path)"
          :key="$index">
        <router-link :to="item.path" :class="{active: currentPath === item.path}">
          {{item.name}}
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
import { routes } from '../../router'
export default {
  name: 'LeftNav',
  data() {
    return {
      componentsList: routes.splice(3),
      currentPath: ''
    }
  },
  methods: {
    changeNav(path){
      console.log(path)
      this.currentPath = path
      this.$emit('change-nav', path)
    }
  },
  components: {}
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

  .left-nav{
    background-color: #f9fafb;
    width: 250px;
    height: 100%;
    margin-right: 50px;
    padding: 25px 0 25px 25px;
    overflow: auto;
    text-align: left;
    float: left;

    .title{
      margin-left: 40px;
      margin-bottom: 20px;
      color: #455a64;
      font-size: 16px;
      font-weight: bold;
    }

    li{
      font-size: 14px;
      font-weight: 500;
      line-height: 42px;
      padding-left: 40px;
      opacity: 0.6;

      a{
        text-decoration: none;
        color: #4c555a;

        &:hover, &.router-link-active{
          color: #4078c0 !important;
        }
      }
    }
  }

</style>

