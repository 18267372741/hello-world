/**
 * Created by apple on 16/9/8.
 */

export default function(router) {
	router.map({
		'/': {
			name: '登录',
			component: require('./photoStudio/login.vue'),
			subRoutes: { }
		},
		'/test': {
			name: '示例及应用',
			component: require('./module/test.vue')
		},
		'/forget': {
			name: '找回密码',
			component: require('./module/forget.vue')
		},
		'/registered': {
			name: '注册',
			component: require('./photoStudio/registered.vue')
		},
		'/scrawlDemo': {
            name: '涂鸦DEMO',
            component: require('./photoStudio/scrawlDemo.vue')
        },
		'/index': {
			name: '首页',
			component: require('./photoStudio/index.vue'),
			subRoutes: {
				'/sendOrder': {
					name: '建单',
					component: require('./photoStudio/sendOrder.vue')
				},
				'/sendOrder2': {
					name: '发单',
					component: require('./photoStudio/sendOrder2.vue')
				},
				'/infoSet': {
					name: '信息设置',
					component: require('./photoStudio/infoSet.vue')
				},
				'/templateL': {
					name: '模板列表',
					component: require('./photoStudio/templateL.vue')
				},
				'/accountManage': {
					name: '账号设置',
					component: require('./photoStudio/accountManage.vue')
				},
				'/finance': {
					name: '收支明细',
					component: require('./photoStudio/finance.vue')
				},
				'/orderMan': {
					name: '订单管理',
					component: require('./photoStudio/orderMan.vue')
				},
				'/downPic': {
					name: '打包下载',
					component: require('./photoStudio/downPic.vue')
				},
				'/downPic1': {
					name: '预览返工',
					component: require('./photoStudio/downPic1.vue')
				},
				'/kehu': {
					name: '客户查看',
					component: require('./photoStudio/kehu.vue')
				},
				'/downPic2': {
					name: '预览查看',
					component: require('./photoStudio/downPic2.vue')
				},
				'/templateAdd': {
					name: '添加模板',
					component: require('./photoStudio/templateAdd.vue')
				},
				'/payment': {
					name: '充值',
					component: require('./photoStudio/payment.vue')
				},
			}
		}
	});
}