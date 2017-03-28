/**
 * Created by apple on 16/9/8.
 */

export default function(router) {
	router.map({
		'/': {
			name: '登录',
			component: function index(resolve) {
				require(['./workRoom/login'], resolve)
			},
			subRoutes: { }
		},
		'/forget': {
			name: '找回密码',
			component: require('./module/forget.vue')
		},
		'/registered': {
			name: '注册',
			component: require('./workRoom/registered.vue')
		},
		'/index': {
			name: '首页',
			component: require('./workRoom/index.vue'),
			subRoutes: {
				'/infoSet': {
					name: '信息设置',
					component: require('./workRoom/infoSet.vue')
				},
				'/templateL': {
					name: '模板列表',
					component: require('./workRoom/templateL.vue')
				},
				'/addWork': {
					name: '添加员工',
					component: require('./workRoom/addWork.vue')
				},
				'/workList': {
					name: '员工列表',
					component: require('./workRoom/workList.vue')
				},
				'/accountManage': {
					name: '账号设置',
					component: require('./workRoom/accountManage.vue')
				},
				'/finance': {
					name: '收支明细',
					component: require('./workRoom/finance.vue')
				},
				'/recOrder': {
					name: '接单',
					component: require('./workRoom/recOrder.vue')
				},
				'/orderMan': {
					name: '订单管理',
					component: require('./workRoom/orderMan.vue')
				},
				'/downPic': {
					name: '打包下载',
					component: require('./workRoom/downPic.vue')
				},
				'/downPic1': {
					name: '返工明细',
					component: require('./workRoom/downPic1.vue')
				},
				'/templateAdd': {
					name: '添加模板',
					component: require('./workRoom/templateAdd.vue')
				},
				'/payment': {
					name: '充值',
					component: require('./workRoom/payment.vue')
				},
			}
		}
	});
}