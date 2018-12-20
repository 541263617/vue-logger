import Vue from 'vue'
import FireScroll from '@/components/HelloWorld'

describe('HelloWorld.vue', () => {
  it('第一个单元测试用例', () => {
    const Constructor = Vue.extend(FireScroll)
    expect('1').to.equal('1')
  })
})
