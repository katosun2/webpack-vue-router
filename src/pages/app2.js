import Vue from 'vue';
import VueRouter from 'vue-router';
import routerConfig from '../router/router';
import app from './app';

/*Router*/
Vue.use(VueRouter);
const router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  suppressTransitionError: true
});
routerConfig(router);

router.start(app, '#app');

window.router = router;


