import Vue from 'vue'
import VueRouter from 'vue-router'

import Instructions from '../Instructions.vue'
import Game from '../Game.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Instructions, name: 'instructions' },
    { path: '/game', component: Game, name: 'game' }
  ]
})
