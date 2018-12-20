### 安装

    $ npm i @2dfire/logger --save-dev

### 用法
    import logger from '@2dfire/logger'
    Vue.use(logger,{
        product: '',    //产品线
        project: '',    //项目名称
        router          //路由实例
    })

    页面打点：
    单页路由切换，多页跳转都会自动打点。

    点击事件：
    标签：
    <div v-click="{name:'',info:''}"></div>
    函数：
    this.logger({
        name:'',
        info:''
    })

    name: 表示点击事件名称
    info：表示点击事件内容

    举例说明：
    <button v-click="{name:'忘记密码'}" class="btn fl-right" @click="toggle">忘记密码</button>

    <swiper-slide v-for="(item,index) in lists" :key="index">
        <a v-click="{name:'banner_'+(index+1),info:item.jumpUrl}" @click="jump(item.jumpUrl)"><img :src="item.bannerUrl" alt=""></a>
    </swiper-slide>

### 打点参数

    温馨提示：
    1、url中的“打点参数”在“每次”打点触发时都会设置到sessionStorage中
    2、token很关键，请务必保证在“进入页面之前”token已经在url/sessionStorage中
    3、如果token（uid/entity_id）是ajax获取的，请考虑新建一个中转页（redirect.vue）获取token并放入sessionStorage中
    4、参数取值优先级，url>sessionStorage>localStorage(不推荐)
    5、下面列表中没有“参数来源（-）”的表示“自动采集”

| 名称 | 类型 |是否必须|参数来源| 描述 |
|---|---|---|---|---|
|product|string|Y|url/session|产品线|
|project|string|Y|session|项目名称|
|page_name|string|Y|vue-router的name|页面名称|
|page_url|string|N|-|页面地址|
|chain_id|string|N|url/session|连锁ID|
|activity_id|string|N|url/session|活动ID|
|entity_id|string|N|url/session|店铺ID|
|click|string|N|name|事件类型|
|click_info|string|N|info|事件内容|
|source|string|N|url|业务来源|
|token|string|N|url/session/local|token信息|
|uid|string|N|url/session|用户唯一标识|
|ua|string|N|-|ua信息|
|ip|string|N|-|ip地址|
|seat_code|string|N|url/session|桌号|
|qr_code|string|N|url/session|二维码|
|device_type|string|N|-|设备类型|
|device_version|string|N|-|系统版本|
|browser_type|string|N|-|浏览器类型|
|browser_version|string|N|-|浏览器版本|
|screen_width|string|N|-|屏宽|
|screen_height|string|N|-|屏高|
|arrival_time|string|N|-|页面进入时间|
|leave_time|string|N|-|页面离开时间|
|log_time|string|N|-|日志记录时间|

### 部分参数“特别”说明
    product:
    每个产品都会有一个对应的编号，具体编号请咨询“冰石”（需要从“冰石”查看“埋点报表”的，必须让冰石新增“产品线”）
    ！！！特别申明：被其他多个项目用到的项目，比方说，下载页面
    必须写在url中: http://2dfire.download.html#/index?product=4.2

    page_name：
    export default new Router({
        routes: [
            {
                path: "/index",
                name: "index",（埋点页面名称取这个值）
                component: Index
            }
        ]
    });

    source:
    表示由第三方进入到我们页面，比方说，美团上有一个我们的活动页面
    https://2dfire.activity.com?source=meiTuan

    uid、entity_id:
    如果你无法从任何地方获取uid、entity_id，这里给你提供了网关接口
    getSessionInfo() {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.login.service.ILoginService.getSessionMapFromToken',
            params: {
                appKey: APP_KEY
            },
            headers:{
                token:'sJqKfwo1KqrHU27dE6Oxm7gXk9xoxEfnI5yPuBZmnfQyu%2Bxbp%2BYacmJ%2BpGD8ii1e%2F2UDF%2BNEShdSF8%2FVBUB1mg%3D%3D'（只是为了告诉你需要token）
            }
        })
    }
    res:{entityId: "99935791", userId: "6e24e3f6bd3b4ca98d605d2bfe3246c5"}

