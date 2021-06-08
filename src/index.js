import TinyReact from "./TinyReact"

const root = document.getElementById("root")

const virtualDOM = (
    <div className="container">
        <h1>你好 Tiny React</h1>
        <h2 data-test="test">(编码必杀技)</h2>
        <div>
            嵌套1 <div>嵌套 1.1</div>
        </div>
        <h3>(观察: 这个将会被改变)</h3>
        {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
        {2 == 2 && <div>2</div>}
        <span>这是一段内容</span>
        <button onClick={() => alert("你好")}>点击我</button>
        <h3>这个将会被删除</h3>
      2, 3
        <input type="text" value="13" />
    </div>
)
// console.log(virtualDOM)

// TinyReact.render(virtualDOM, root)

// function Demo() {
//     return <div>Leaf</div>
// }

// function Heart(props) {
//     return (
//         <div>
//             {props.title}
//             &hearts; <Demo />
//         </div>
//     )
// }

// TinyReact.render(<Heart title="love " />, root)

// class Alert extends TinyReact.Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             title: "titles"
//         }
//         this.handleClick = this.handleClick.bind(this)
//     }
//     handleClick(){
//         this.setState({title: 'changed Title'})
//     }
//     render () {
//         return (
//             <div> 
//                 love{this.props.name}  
//                 <div>
//                     {this.state.title}
//                     <button onClick={this.handleClick}>改变</button>
//                 </div>
//             </div>
//         )
//     }
// }

// TinyReact.render(<Alert name=" Leaf" />, root)
// setTimeout(() => {
//     TinyReact.render(<Alert name=" _leaf" />, root)
// }, 3000);
// const oldDome = (<div>Leaf</div>)

// TinyReact.render(oldDome, root)

// const newDome = (<div>love Leaf</div>)

// setTimeout(() => {
//     TinyReact.render(newDome, root)
// }, 3000);

class DemoRef extends TinyReact.Component {
    constructor(props) {
      super(props)
      this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
      // console.log(this.input.value)
      console.log(this.input)
      console.log(this.alert)
    }
    componentDidMount() {
      console.log("componentDidMount")
    }
    componentWillUnmount() {
      console.log("componentWillUnmount")
    }
    render() {
      return (
        <div>
          <input type="text" ref={input => (this.input = input)} />
          <button onClick={this.handleClick}>按钮</button>
          <Alert ref={alert => (this.alert = alert)} name="张三" age={20} />
        </div>
      )
    }
  }

  TinyReact.render(<DemoRef />, root)
