export default function createElement(type, props, ...children) {
    const childElements = [].concat(...children).reduce((result, child) => { // 拷贝children遍历
        if (child !== false && child !== true && child !== null) { // 排除 false true null 节点
            if (child instanceof Object) { // 判断是否为对象
                result.push(child)
            } else { // 否则为文本
                result.push(createElement("text", { textContent: child })) // 递归
            }
        }
        return result
    }, [])
    return {
        type,
        props: Object.assign({children: childElements}, props),
        children: childElements
    }
}
