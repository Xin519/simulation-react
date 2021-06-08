import mountElement from "./mountElement"
import updateNodeElement from "./updateNodeElement"

export default function createDOMElement (virtualDOM) {
    let newElement = null
    if(virtualDOM.type === 'text'){ // 文本节点
        newElement = document.createTextNode(virtualDOM.props.textContent) //创建文本节点
    }else{ // 元素节点
        newElement = document.createElement(virtualDOM.type) // 创建元素节点
        updateNodeElement(newElement, virtualDOM) // 添加元素
    }
    newElement._virtualDOM = virtualDOM
    // 递归创建子节点
    virtualDOM.children.forEach(child => {
        mountElement(child, newElement)
    })

    if(virtualDOM.props && virtualDOM.props.ref){
        virtualDOM.props.ref(newElement)
    }

    return newElement
}
