import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'
import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'

export default function diff(virtualDOM, container, oldDOM){
    console.log(oldDOM)
    const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
    const oldComponent = oldVirtualDOM && oldVirtualDOM.component
    console.log(oldVirtualDOM)
    // 判断oldDOM是否存在
    if(!oldDOM){
        mountElement(virtualDOM, container)
    }else if(virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM !== 'function'){
        // 不需要对比
        // 使用新的 virtualDOM 对象生成真实 DOM 对象
        const newElement = createDOMElement(virtualDOM)
        // 使用新的 DOM 对象替换旧的 DOM 对象
        oldDOM.parentNode.replaceChild(newElement, oldDOM) // 替换元素
    } else if (typeof virtualDOM.type === "function") {
        // 组件
        diffComponent(virtualDOM, oldComponent, oldDOM, container)
    } else if(oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type){
        console.log(oldVirtualDOM.type, virtualDOM.type)
        if(virtualDOM.type === "text"){
            // 更新内容
            updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
        }else{
            // 更新元素属性
            updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
        }      

        // 1 将拥有key的子元素放在一个单独对象中
        let keyedElements = {}
        for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
            let domElement = oldDOM.childNodes[i]
            if(domElement.nodeType === 1){
                let key = domElement.getAttribute('key')
                if(key){
                    keyedElements[key] = domElement
                }
            }
            
        }

        let hasNoKey = Object.keys(keyedElements).length === 0
        if(hasNoKey){
            // 对比子节点
            virtualDOM.children.forEach((child, i) => {
                diff(child, oldDOM, oldDOM.childNodes[i])
            })
        } else {
            // 2 循环 virtualDOM 的子元素 获取子元素的key属性
            virtualDOM.children.forEach((child, i) => {
                let key = child.props.key
                if(key){
                    let domElement = keyedElements[key]
                    if(domElement){
                        // 3 当前位置的元素是不是我们期望的元素 
                        if(oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement){
                            oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
                        }
                    }else{
                        // 新增元素
                        mountElement(child, oldDOM, oldDOM.childNodes[i])
                    }
                }
            })
        }

        // 删除节点
        // 获取就节点
        let oldChildNodes = oldDom.childNodes
        // 判断就节点数量 
        if(oldChildNodes.length > virtualDOM.children.length){
            if(hasNoKey){
                // 有节点要删除
                for(let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--){
                    unmountNode(oldChildNodes[i])
                }
            }else{
                // 通过key属性删除节点
                for(let i = 0; i < oldChildNodes.length; i++){
                    let oldChild = oldChildNodes[i]
                    let oldChildKey = oldChild._virtualDOM.props.key
                    let found = false
                    for(let n = 0; n < virtualDOM.children.length; n++){
                        if(oldChildKey === virtualDOM.children[n].props.key){
                            found = true
                            break
                        }
                    }
                    if(!found){
                        unmountNode(oldChild)
                    }
                }
            }
            
        }
    }
}
