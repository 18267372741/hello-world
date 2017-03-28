import routeMap from './route.photoStudio'
import photoStudio from './photoStudio.vue'
import mainTop from './module/common/top.vue'
import mainSideBar from './module/common/sideBar.vue'
import myHead from './module/common/head.vue'

const main = require('./main')
const Vue = main.Vue
const VueRouter = main.VueRouter
const lockPage = main.lockPage

Vue.use(VueRouter)
Vue.component('main-top', mainTop);
Vue.component('my-head', myHead);
Vue.component('main-side-bar', mainSideBar);
Vue.component('lock-page', lockPage);

var router = new VueRouter({
    hashbang: false,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: false
})

routeMap(router)
router.start(photoStudio, '#photoStudio')
