/**
 * Created by apple on 16/9/8.
 */

export default function(router) {
	router.map({
		'/': {
			name: '后台登录',
			component: function index(resolve) {
				require(['./backstage/login'], resolve)
			},
			subRoutes: {

			}
		},
		'/index':{
			name: '后台影楼审核',
            component (resolve){
                require(['./backstage/index'], resolve)
            },
            subRoutes: {
				'/workReview': {
					name: '后台影楼审核',
					component: require('./backstage/workReview.vue')
				},
				'/template': {
					name: '后台模板管理',
					component: require('./backstage/template.vue')
				},
				'/moneyDetails': {
					name: '后台财务统计',
					component: require('./backstage/moneyDetails.vue')
				},
				'/wpDetails': {
					name: '后台财务统计详情',
					component: require('./backstage/wpDetails.vue')
				},
				'/handOrder': {
					name: '后台手动拍单',
					component: require('./backstage/handOrder.vue')
				},
				'/orderDetails': {
					name: '后台订单详情',
					component: require('./backstage/orderDetails.vue')
				},
				'/photoReview': {
					name: '后台订单详情',
					component: require('./backstage/photoReview.vue')
				},
				'/addmoney': {
					name: '充值和流水',
					component: require('./backstage/addmoney.vue')
				},
				'/complaints': {
					name: '投诉/申诉',
					component: require('./backstage/complaints.vue')
				},
				'/works': {
					name: '作品/产品',
					component: require('./backstage/works.vue')
				},
				'/help': {
					name: '帮助中心',
					component: require('./backstage/help.vue')
				},
				'/helpExit': {
					name: '帮助中心修改',
					component: require('./backstage/helpExit.vue')
				},
				'/abouts': {
					name: '关于我们',
					component: require('./backstage/abouts.vue')
				},
				'/aboutsExit': {
					name: '关于我们修改',
					component: require('./backstage/aboutsExit.vue')
				},
				'/contactus': {
					name: '联系我们',
					component: require('./backstage/contactus.vue')
				},
				'/contactusExit': {
					name: '联系我们修改',
					component: require('./backstage/contactusExit.vue')
				},
				'/workadd': {
					name: '添加产品分组/修改产品分组',
					component: require('./backstage/workadd.vue')
				},
				
			}
		}
	});
}