'use strict';

module.exports = setZeroTimeout;

function setZeroTimeout() {
    var timeouts = [];
    var messageName = 'zero-timeout-message';
    let glo = global;
    if (window) {
        glo = window;
    }
    // 保持 setTimeout 的形态，只接受单个函数的参数，延迟始终为 0。
    function setZeroTimeout(fn) {
        timeouts.push(fn);
        glo.postMessage(messageName, '*');
    }

    function handleMessage(event) {
        if (event.source == glo && event.data == messageName) {
            event.stopPropagation();
            if (timeouts.length > 0) {
                var fn = timeouts.shift();
                fn();
            }
        }
    }

    glo.addEventListener('message', handleMessage, true);

    // 把 API 添加到 glo 对象上
    glo.setZeroTimeout = setZeroTimeout;

    return setZeroTimeout;
}

console.log(setZeroTimeout);