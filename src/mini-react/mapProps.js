const mapProp = (domNode, props) => {
    
    for (let key in props) {
        if (key !== 'children') {
            if (mappingStrategy[key]) {
                domNode[key] = mappingStrategy[key](props[key])
                continue
            }
            
            domNode[key] = props[key]
        }
    }
    
    // debugger
}

const mappingStrategy = {
    style: function (data,dom) {
        let str = ''
        for(let i in data) str = i+':'+data[i];
        return str
    }
}

export default mapProp;