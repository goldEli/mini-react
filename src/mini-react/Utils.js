import _ from 'underscore'

let keyMap;
(function () {
    const o = {}
    keyMap = (desc) => {
        if (desc in o) {
            o[desc] = o[desc] + 1
        } else {
            o[desc] = 0
        }
        return o[desc]
    }
})()

/**
 * 日志打印
 *
 * @param desc[string] 打印描述
 * @param data 需要打印的内容  
 * @return
*/

export const log = (desc, data) => {
    if (_.isObject(data)) {
        console.log('==='+desc+'='+keyMap(desc)+'==')
        for (let key in data) {
            console.log(key+': ', data[key])
        }
        console.log('===end===')
        return
    }
    if (_.isString(data)) {
        console.log('==='+desc+'='+keyMap(desc)+'==')
        console.log(data)
        console.log('===end===')
        return
    }
    console.error('log not work')
}

