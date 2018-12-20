/*埋点参数列表 字段说明请查看http://npm.2dfire.net/-/@2dfire/analysis-ui文档*/
const paramsList = ['product', 'project', 'page_name', 'chain_id', 'activity_id', 'entity_id',
    'click', 'source', 'token', 'uid', 'ip', 'seat_code',
    "screen_width", "screen_height", 'qr_code', 'arrival_time', 'leave_time', 'log_time']

// 只有线上发送真实统计日志
const IMG_URL = "https://trace.2dfire.com/0.gif";
const API_URL = "https://trace.2dfire.com/0.gif";

const analysis = {
    utils: {
        fireStatic(url, params) { //发送信息到http服务器  里面要追加信息标识 比如info error等
            if (!params) {
                params = {};
            }
            // 防止浏览器缓存
            params.V = (new Date().getTime() + parseInt(1000 * Math.random(0, 1))).toString(36);
            let img = new Image();
            img.onload = img.onerror = function (e) {
                // 请求完成后清除
                img = null;
            };
            img.src = url + this.formatParam(params);
        },

        // 发送ajax请求 用户实时监控
        fireAPI(url, arg1, arg2, arg3) { //发送信息到http服务器  里面要追加信息标识 比如info error等
            let params, success, error;
            if (typeof(arg1) == "object") {
                params = arg1;
                success = arg2;
                error = arg3
            } else {
                params = undefined;
                success = arg1;
                error = arg2
            }

            let xmlHttp = new XMLHttpRequest();

            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4) {
                    if (xmlHttp.status == 200) {
                        let resp = JSON.parse(xmlHttp.responseText);
                        if (resp.code == 1 && success) {
                            success(resp.data)
                        } else if (error) {
                            error(resp)
                        }
                    } else if (error) {
                        error("error status: " + xmlHttp.status)
                    }
                }
            };
            xmlHttp.open("get", url + this.formatParam(params), true);
            xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*');
            xmlHttp.timeout = 15000;
            xmlHttp.ontimeout = function () {
                error("timeout")
            };
            xmlHttp.send();
        },

        //格式化请求参数
        formatParam(params) {
            if (params && Object.keys(params).length > 0) {
                let paramArray = [];
                for (let k in params) {
                    if (params.hasOwnProperty(k)) {
                        if (typeof params[k] === "object") {
                            params[k] = JSON.stringify(params[k])
                        }
                        if (params[k]) {
                            paramArray.unshift(k + "=" + encodeURIComponent(params[k]));
                        }
                    }
                }
                return "?" + paramArray.join("&");
            } else {
                return ""
            }
        },
        /*获取params*/
        getParams() {
            let browserInfo = this.getBrowserInfo()
            let params = {}
            for (let name of paramsList) {
                let value = this.getParamByName(name)
                params[name] = value
            }
            params.log_time = this.getNowTime()
            return {
                ...params,
                ...browserInfo
            }
        },
        /*获取浏览器信息（ua，设备类型，设备版本，浏览器类型，浏览器版本，屏宽，屏高）*/
        getBrowserInfo() {
            let screenWidth = this.getScreenWidth()
            let screenHeight = this.getScreenHeight()
            return {
                screen_width: screenWidth,
                screen_height: screenHeight,
            }
        },
        /*获取屏宽*/
        getScreenWidth() {
            return document.documentElement.clientWidth
        },
        /*获取屏高*/
        getScreenHeight() {
            return document.documentElement.clientHeight
        },
        /*获取当前时间*/
        getNowTime() {
            return new Date().getTime()
        },
        /*采集打点内容放到sessionStorage中*/
        setSessionFromUrl() {
            for (let name of paramsList) {
                let value = this.queryUrl(name) || '';
                if (value) {
                    this.setSession(name, value)
                }
            }
        },
        /*从 url/sessionStorage/localStorage中获取埋点信息*/
        getParamByName(name) {
            let url, session, local
            url = this.queryUrl(name)
            if (url) {
                this.setSession(name, url)
            }
            session = this.getSession(name)
            local = this.getLocalStorage(name);
            return url || session || local || ''
        },
        /*设置sessionStorage*/
        setSession(name, value) {
            sessionStorage.setItem(name, value)
        },
        // 获取sessionStorage中的参数
        getSession: function (name) {
            return sessionStorage.getItem(name);
        },

        // 获取localStorage中的参数
        getLocalStorage: function (name) {
            return localStorage.getItem(name);
        },

        // 获取url中的参数
        queryUrl: function (name) {
            let url = window.location.href;
            let values = url.match(new RegExp("[(\?)|(\&)]" + name + "\=[^\?\&\\\/\#]*", "g"));
            let value = "";
            if (values) {
                let val = "";
                if (values.length === 1) {
                    val = values[0] || "";
                    value = val.split("=")[1]
                } else if (values.length > 1) {   // 有多个值 就返回第二个
                    val = values[values.length - 1] || "";
                    value = val.split("=")[1]
                }
            }
            return value || ""
        }
    },
    fire(type, msg, params, sub_type, track_type) {
        if (!params) {
            params = {};
        }
        params.T = type || "Nm";
        params.M = msg;
        params.U = encodeURIComponent(window.location.href);
        params.S = sub_type || "";
        if (track_type && track_type == "api") {
            this.utils.fireAPI(API_URL, params);
        } else {
            this.utils.fireStatic(IMG_URL, params);
        }
    }
}

export default analysis
