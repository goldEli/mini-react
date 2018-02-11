import _ from 'underscore'

export const log = (desc, data) => {
    if (_.isObject(data)) {
        console.log('==='+desc+'===')
        for (let key in data) {
            console.log(key+': ', data[key])
        }
        console.log('===end===')
        return
    }
    if (_.isString(data)) {
        console.log('==='+desc+'===')
        console.log(data)
        console.log('===end===')
        return
    }
    console.error('log not work')
}