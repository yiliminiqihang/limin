'use strict';

module.exports = setZeroTimeout;

function setZeroTimeout() {
    var timeouts = [];
    var messageName = 'zero-timeout-message';

    // 保持 setTimeout 的形态，只接受单个函数的参数，延迟始终为 0。
    function setZeroTimeout(fn) {
        timeouts.push(fn);
        window.postMessage(messageName, '*');
    }

    function handleMessage(event) {
        if (event.source == window && event.data == messageName) {
            event.stopPropagation();
            if (timeouts.length > 0) {
                var fn = timeouts.shift();
                fn();
            }
        }
    }

    window.addEventListener('message', handleMessage, true);

    // 把 API 添加到 window 对象上
    window.setZeroTimeout = setZeroTimeout;

    return setZeroTimeout;
}
