export default function updateNodeElement(newElement, virtualDOM, oldVirtualDOM = {}) {
    const newProps = virtualDOM.props || {} // 获取节点对应属性对象 
    const oldProps = oldVirtualDOM.props || {} // 就节点属性对象
    Object.keys(newProps).forEach(propName => {
        const newPropsValue = newProps[propName] // 新
        const oldPropsValue = oldProps[propName] // 旧
        if (newPropsValue !== oldPropsValue) {
            // 判断属性是否是事件属性 onClick => click ...
            if (propName.slice(0, 2) === "on") {
                // 事件名称
                const eventName = propName.toLowerCase().slice(2)
                // 为元素添加事件
                newElement.addEventListener(eventName, newPropsValue)
                // 删除原有的事件的事件处理函数
                if (oldPropsValue) {
                    newElement.removeEventListener(eventName, oldPropsValue)
                }
            } else if (propName === 'value' || propName === "checked") {
                newElement[propName] = newPropsValue
            } else if (propName !== "children") {
                if (propName === "className") {
                    newElement.setAttribute("class", newPropsValue)
                } else {
                    newElement.setAttribute(propName, newPropsValue)
                }
            }
        }
    })

    // 判断属性被删除的情况
  Object.keys(oldProps).forEach(propName => { // 循环旧的 
    const newPropsValue = newProps[propName] // 传入新的   
    const oldPropsValue = oldProps[propName]
    if (!newPropsValue) { // 判断新的是否有
      // 属性被删除了
      if (propName.slice(0, 2) === "on") {
        const eventName = propName.toLowerCase().slice(2)
        newElement.removeEventListener(eventName, oldPropsValue)
      } else if (propName !== "children") {
        if (propName === "value") {
          newElement.value = ""
        } else {
          newElement.removeAttribute(propName)
        }
      }
    }
  })
}
