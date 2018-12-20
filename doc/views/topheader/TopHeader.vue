<template>
  <div class="header-wrapper">
    <div class="header_logo"></div>
    <span>vue-ui</span>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {}
  },
  created(){

  },
  mounted() {

  },
  methods: {},
  components: {}
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

  .header-wrapper{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #eaeefb;
    text-align: left;
    padding-left: 60px;
    color: #333;
    font-size: 20px;
    font-weight: 500;
    box-sizing: border-box;

    .header_logo{
      background-size: cover;
    }
  }
</style>

