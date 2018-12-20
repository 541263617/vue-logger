import tools from './utils/tools'

const logger = {
    arrivalTime: 0,
    unPublish() {
        let url = window.location.href || "";
        if (url.search("2dfire.com") < 0 && url.search("zm1717.com") < 0) {
            return true
        }
    },
    fire(type, msg, _params) {
        let defaultParams = tools.utils.getParams()
        let params = Object.assign({}, defaultParams, _params)
        console.warn(params)
        if (this.unPublish()) return
        tools.fire(
            type,
            msg,
            params
        );
    },
    getPageInfo(data = {}) {
        return {
            page_name: data.name || document.title
        }
    },
    pageArrival(route) {
        let params = this.getPageInfo(route)
        this.arrivalTime = tools.utils.getNowTime()
        params.arrival_time = this.arrivalTime
        params.event_type = 'pageViewEvent'
        console.warn('page-arrival')
        this.fire('pv', 'page_arrival', params)
    },
    pageLeave(route) {
        let params = this.getPageInfo(route)
        params.arrival_time = this.arrivalTime
        params.leave_time = tools.utils.getNowTime()
        params.event_type = 'pageViewEvent'
        console.warn('page-leave')
        this.fire('pv', 'page_leave', params)
    },
    click(binding, route) {
        let {name, value = {}} = binding
        let params = this.getPageInfo(route)
        params.click = value.name || name
        params.info = value.info || ''
        params.event_type = 'clickEvent'
        console.warn('click：', params)
        this.fire('Cu', params.click, params)
    },
    addEvent(el, event, handler, capture = false) {
        if (el.addEventListener) {
            el.addEventListener(event, handler, capture)
        } else if (el.attachEvent) {
            el.attachEvent('on' + event, handler);
        } else {
            el['on' + event] = handler;
        }
    },
    removeEvent(el, event) {
        if (el.removeEventListener) {
            el.removeEventListener(event, () => {
            })
        } else if (el.detachEvent) {
            el.detachEvent('on' + event, () => {
            });
        } else {
            el['on' + event] = () => {
            };
        }
    }
}

const install = function (Vue, options = {}) {
    let {product, project, router} = options
    if (!router) {
        console.error("logger error：can not find router in options")
        return
    }
    product && sessionStorage.setItem('product', product)
    project && sessionStorage.setItem('project', project)
    let _$route = {}
    let _$to = {}
    Vue.prototype.logger = (params) => {
        return logger.click({
            name: 'click',
            value: {...params}
        }, _$to)
    }
    Vue.directive("click", {
        bind(el, binding, vnode) {
            if (this) return
            let $route = vnode.context.$route
            _$route = {
                ...$route
            }
            logger.addEvent(el, 'click', () => {
                logger.click(binding, _$route)
            })
        },
        update(value) {
            /*vue 1.0兼容*/
            if (!this) return
            const el = this.el
            const descriptor = this.descriptor
            const binding = {
                name: descriptor.name,
                value: value
            }
            const $route = this.vm.$route
            _$route = {
                ...$route
            }
            logger.removeEvent(el, 'click')
            logger.addEvent(el, 'click', () => {
                logger.click(binding, _$route)
            })
        },
        unbind(el) {
            if (this) {
                logger.removeEvent(this.el, 'click')
            } else {
                logger.removeEvent(el, 'click')
            }

        }
    })
    router.beforeEach((to, from, next) => {
        let _to = to, _from = from, _next = next
        if (to.to) {
            _to = to.to
            _from = to.from
            _next = to.next
        }
        if (_from.name) {
            logger.pageLeave(_from)
        }
        if (_to.name) {
            _$to = _to
            logger.pageArrival(_to)
        }
        _next()
    })

    window.onbeforeunload = () => {
        logger.pageLeave(_$route)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

module.exports = {
    install
}
