import mountElement from "./mountElement"
import updateComponent from "./updateComponent"

export default function diffComponent (virtualDOM, oldComponent, oldDOM, container){
                                    // 要渲染组建的dom 要更新组件的实例对象 旧的组件实例对象 位置容器
    if (isSameComponent(virtualDOM, oldComponent)) {
        // 同一个组件 做组件更新操作
        updateComponent(virtualDOM, oldComponent, oldDOM, container)
      } else {
        // 不是同一个组件
        mountElement(virtualDOM, container, oldDOM)
      }
    }
    // 判断是否是同一个组件
    function isSameComponent(virtualDOM, oldComponent) {
      return oldComponent && virtualDOM.type === oldComponent.constructor
    }
