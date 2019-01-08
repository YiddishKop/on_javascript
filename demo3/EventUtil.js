/*
 * 兼容性的事件绑定和删除库
 */
var EventUtil = {
    // 检测绑定事件
    addHandler: function(element, type, handler){
        if(element.addEventListener){ // 检测这个元素的属性中是否包含
                                      // addEventListener 方法属性. 如果有,说明
                                      // 是 w3c 浏览器, 就按照这种格式在元素
                                      // element 中添加事件监听器
            element.addEventListener(type, handler, false);
        }else if(element.attachEvent){ // 检测这个元素的属性中是否包含
                                       // attachEvent 方法属性. 如果有, 说明是
                                       // IE 浏览器, 就按照这种格式在元素
                                       // element 中添加事件监听器
            element.attachEvent('on' + type, handler); // 注意 IE 中的事件与 w3c
                                                       // 的事件命名不同, IE 是
                                                       // 'on' + 事件类型; w3c
                                                       // 中直接是事件类型.
        }else{                         // 脚本模型, 最后做为保底直接使用为元素的
                                       // 事件属性(这里采用数组方法才能访问)赋值
                                       // 事件处理器的方法.
            element['on' + type] = hanlder;
        }
    },

    // 移除绑定事件
    removeHandler: function(element, type, handler){
        if(element.removeEventListener){
            element.removeEventListener(type, handler, false);
        }else if(element.detachEvent){
            element.detachEvent('on'+type, handler);
        }else{
            element['on' + type] = handler;
        }
    }
};
