#### 一个基于vue和webpack的开发实例

#### 目录说明（因项目而异）

```
|~dist/ 打包后上线目录
| |+css/
| |+html/
| `+js/
|~src/ 开发目录
| |+components/ 公共组件
| |~html/ 入口页面
| | |-app.html 
| | `-app2.html
| |~pages/ 入口页面的组件化
| | |-app.js
| | |-app.vue
| | |-app2.js
| | `-app2.vue
| |+router/
| `~views/ 拼装的视窗组件
|   |~hello/
|   | |-hello.scss
|   | `-hello.vue
|   `+index/
```

#### 使用

``npm start`` 开发模式

``npm run build`` 打包项目
