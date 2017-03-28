import routeMap from './route.backstage'
import App from './backstage.vue'
import mainTop from './module/common/top.vue'
//import mainSideBar from './module/common/sideBar.vue'
import bSidebar from './backstage/bSideBar.vue'

const main = require('./main')
const Vue = main.Vue
const VueRouter = main.VueRouter
const lockPage = main.lockPage

Vue.use(VueRouter)
Vue.component('main-top', mainTop);
Vue.component('b-sidebar', bSidebar);
Vue.component('lock-page', lockPage);

const router = new VueRouter({
    hashbang: false,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: false
})

routeMap(router)
router.start(App, '#app')
