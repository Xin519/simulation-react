export default function unmountNode(node){
    // 获取节点的 _virtualDom 对象
    const virtualDom = node._virtualDom
    // 1 文本节点直接删除
    if(virtualDom.type === 'text'){
        node.remove() // 删除
        return // 阻止向下执行
    }
    // 2 看一下节点是否由组件生成
    let component = virtualDom.component
    if(component){ // component 存在 说明由组件生成
        component.componentWillUnmount()
    }
    // 3 看一下节点身上是否有ref属性
    if(virtualDom.props && virtualDom.props.ref){
        virtualDom.props.ref(null)
    }
    // 4 看一下节点属性是否有事件属性
    Object.keys(virtualDom.props).forEach(propName => {
        if(propName.slice(0, 2) === 'on'){
            const eventName = propName.toLowerCase().slice(0, 2)
            const eventHandler = virtualDom.props[propName]
            node.removeEventListener(eventName, eventHandler)
        }
    })
    // 5 递归删除子节点
    if(node.childNodes.length > 0){
        for(let i = 0; i < node.childNodes.length; i++){
            unmountNode(node.childNodes[i])
            i--
        }
    }

    //删除节点 
    node.remove()
}
