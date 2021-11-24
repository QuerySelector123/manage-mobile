- @Author: zengcheng
- @Date: 2020-12-08

### 简介：

- UI 框架 [element-ui](https://element.eleme.cn/#/zh-CN) - [README]()

- views 页面 - [README](src/views/Home.vue)

- 路由管理 [vue-router](https://router.vuejs.org/zh/installation.html) - [README](src/router/index.js)

- HTTP 请求 [axios](https://github.com/axios/axios) - [README](src/utils/request.js)

- 模拟数据 [mockjs](https://github.com/nuysoft/Mock/wiki/Getting-Started)

- 强制代码校验 [eslint](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint) + [prettier](https://prettier.io/)

- SVG 图标 [iconfonts 阿里巴巴矢量图标库](https://www.iconfont.cn/)

- 全局组件 [components](src/components/index.js)

- 全局样式 [style](src/assets/scss/index.scss)

- vuex 状态管理 [style](src/store/index.js)

- utils 工具函数库 [utils](src/utils)

### 必要的地址

- (1) 前端代码托管地址 [manage-web]()
- (2) 视觉稿/交互稿地址 [招商邮轮经营平台](https://lanhuapp.com/web/#/user/invite?type=share_mark&pid=94580b20-1ee6-40b2-8989-88029a772baf&imgId=e4c6971c-a751-45d9-80bd-bd3482f32bb0&project_id=94580b20-1ee6-40b2-8989-88029a772baf&image_id=e4c6971c-a751-45d9-80bd-bd3482f32bb0&teamId=c55f5cf0-80e1-44ab-ab2f-e569ac199e64&userId=e62f10a9-6f15-4bfd-a97f-9a3d24189315&param=3924dc02-7f1e-46e3-96c2-f5bacbc715b3&toRouteName=detailDetach)
- (3) 业务蓝图地址 [蓝图]()

### 构建 vue 文件：

- (1)所有的页面文件全部新建在 views 里面.
- (2)新建的文件夹的名字就是路由的名称。
- (3)在新建的文件夹里面，写一个 index.vue，即代表该页面。
- (4)如果有该页面单独使用的组件，那么在新建文件夹的里面再建立子文件夹，路由不会读取到子文件夹。
- (5)所有的公共组件统一放在 components 里面

  #### 注意：

  1. 文件创建名称必须使用驼峰命名法，且文件夹名称与最下层路径名称必须一样；
  2. 文件夹名称最好控制在 20 个字符内，过长在 portal 中可能不允许创建；
  3. 每个页面的文件夹下一定有一个 index.vue 文件，方便路由读取；
  4. 路由下私有的组件在该文件夹下创建一个 components 文件，将组件放入里面；

  #### 页面新建步骤：

  1. 访问 portal 门户系统，地址：http://10.36.10.244:8080/bip-web，账号/密码：admin/admin;

  2. 进入管理中心 -> 菜单管理点击上面的新建，填写相应的路由信息；

  3. 应用名称：选择金地头管理平台；

  4. 菜单编码：是唯一的，使用驼峰命名；

  5. 菜单排序注意：子菜单排序必须大于其父级菜单排序；

  6. 菜单名称：和 ui 图的菜单名称一致；

  7. 上级菜单名称：在菜单树中选择其上级菜单；

  8. 菜单 URL：子菜单 URL 必须包含父级菜单 URL, 比如父级菜单 URL: /father,子菜单就是：/father/son;

  9. 在 views 文件新建页面文件夹名称必须是指定名字，如果路径为 /father/son,文件夹名字就是 son;

### 整体规范：

- (1)所有的公用方法，统一写在 utils 里面

- (2)每个页面要单独抽离出样式文件，统一放在 assets-scss 里面，用该文件夹命名

- (3)所有图片放置在 assets-img 里面，所有的字体文件放置在 assets-fonts

- (4)所有的接口请求方法，统一放置在 api 文件夹中

- (5)如果要修改测试的地址或者生产的地址，那么请到.env.development(测试)和.env.production(生产) 里面去改

### 关于 PC 端适配方案：

- (1)采用了 px2rem 的适配方案，所有的样式继续采用 px+百分比的布局.行内样式无效

- (2)在布局中，根据 UI 给的 1920 的设计稿进行布局，如果在 1920 的屏幕下，那么 1rem = 192px.

- (3)在布局中，假如一个 div 宽度为 400px(1920 设计稿下),那么直接写 400px,浏览器渲染出来的实际是 400/192=2.083rem.

- (4)假如此时我们改变分辨率，改为 1366，那么 1rem = 136px,之前写的 2.084rem,在经过渲染后,就变成了 2.083\*136=283px,那么在 1366 下，展示就是 283px,等比例缩小.

### 关于 Vue 过滤器：

- (1)对于一些常见的单位处理，可以写统一的 vue 过滤器来进行处理，具体文件在 utils-filters.js 里面

- (2)那么对于一些模板字符串，可以使用 {{  org_name | formatterString }} 可以对其进行过滤

- (3)特别注意，过滤器仅限于在模板字符串中使用，如果需要在 echarts 图里面，最好还是写公共的过滤方法

### 路由规范：

- (1)按上面构建 Vue 文件的规则来构建，那么路由会自动注册，如果需要写路由的权限控制，那么在 router-index.js 里面写即可

- (2)注意，文件夹名称，就是路由的名称，建议全部小写

- (3)注意，如果你希望‘/’页面会重定向到一个你想要的页面，那么在 router-index.js 里面，这个特例路由要单独拿出来进行修改，目前该框架中，/会重定向到 login 页面

### 关于 Vuex：

- (1)Vuex 尽量采用分模块的写法，用到哪个写哪个，不需要的就暂时不写

### 关于样式：

- (1)在 assets-scss-index.scss 里面写整个项目的共用整体样式，通过引入 scss 文件的方式，再逐个引入到 index.scss 里面

- (2)样式统一使用 scss

- (3)局部样式在局部文件下创建 index.scss 文件，在 vue 文件的 <style> 使用 @import 引入。

- (4)scss 样式最好使用 & 表示当前级，以提高代码的可读性。

### 关于代码格式化：

- (1)代码格式化，统一采用 Prettier 插件来进行，尽量不要手敲换行。

### 关于 IE 浏览器兼容：

- (1)最好使用 float 浮动布局方式。

- (2)最好遵循 strict 严格模式，比如不要重复定义变量，不要重复添加属性，以免在 IE 浏览器出现 bug。

### 提交代码备注规范：

- 第一类

type 用于说明 commit 的类别，只允许使用下面 12 个标识。

br: 此项特别针对 bug 号，用于向测试反馈 bug 列表的 bug 修改情况
feat：新功能（feature）
fix：修补 bug
docs：仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE 等等
style： 格式（不影响代码运行的变动）
staticPage：静态页面
refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
perf: 优化相关，比如提升性能、体验
test：增加测试
chore：构建过程或辅助工具的变动
revert: feat(pencil): add 'graphiteWidth' option (撤销之前的 commit)
delete: 删除一些不需要文件
interface: 关于接口联调

- 第二类
  scope
  scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

- 第三类
  subject
  subject 是 commit 目的的简短描述，不超过 50 个字符。
  以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes，
  第一个字母小写，结尾不加句号（.）

- 第四类
  Body 部分是对本次 commit 的详细描述，可以分成多行。

### 启动

- (1)npm run serve 本地运行;
- (2)npm run lint 代码检查;
- (3)npm run build-test 测试环境打包;
- (4)npm run build 生产环境打包;
