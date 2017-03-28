/**
 * Created by apple on 16/9/8.
 */

export default function(router) {
	router.map({
		'/': {
			name: '登录',
			component: function index(resolve) {
				require(['./repairDivision/login'], resolve)
			},
			subRoutes: {  }
		},
		'/forget': {
			name: '找回密码',
			component: require('./module/forget.vue')
		},
		'/index': {
			name: '首页',
			component: require('./repairDivision/index.vue'),
			subRoutes: {
				'/infoSet': {
					name: '信息设置',
					component: require('./repairDivision/infoSet.vue')
				},
				'/orderMan': {
					name: '订单管理',
					component: require('./repairDivision/orderMan.vue')
				},
				'/finance': {
					name: '收支明细',
					component: require('./repairDivision/finance.vue')
				},
				'/payment': {
					name: '提现',
					component: require('./repairDivision/payment.vue')
				},
				'/downPic1': {
					name: '返工明细',
					component: require('./repairDivision/downPic1.vue')
				},
				'/downPic2': {
					name: '图片预览上传',
					component: require('./repairDivision/downPic2.vue')
				},
				'/payBD': {
					name: '支付绑定',
					component: require('./repairDivision/payBD.vue')
				},
			}
		}
	});
}