/**
 * 路由配置
 *
*/
import index from '../views/index/index';
import hello from '../views/hello/hello';

export default function(router){
	router.map({
		'/hello':{
			name : 'hello',
			component : hello
		},
		'/index':{
			name : 'index',
			component : index
		}
	});

	router.redirect({
		'/': '/index',
	});

	/*router.beforeEach(function (transition) {
	if (transition.to.path === '/lastupdate/1') {
	transition.abort()
	} else {
	transition.next()
	}
	});*/

	router.afterEach(function (transition) {
		console.log('成功浏览到: ' + transition.to.path)
	});
};
