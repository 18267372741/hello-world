/**
 * Created by apple on 2016/10/26.
 */

require('bootstrap.min.css')
require('bootstrap.min.js')
require('./assets/selfStyle.css')
require('daterangepicker.css')
require('./assets/style.less')

import Vue from 'vue'
import VueRouter from 'vue-router'
import lockPage from './module/common/lockPage.vue'

var Rxports = {
    Vue,VueRouter,lockPage
};

module.exports = Rxports
