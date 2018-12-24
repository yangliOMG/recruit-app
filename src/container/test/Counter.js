import React from 'react'
// import { Provider} from './context'
import CounterCard from './CounterCard'
import { dispatch } from 'rxjs/internal/observable/pairs';

class Counter extends React.Component{
    constructor ( props){
        super(props)
        this.state = {
            // counter :{
            //     value:0,
            //     inc: this.inc,
            //     dec: this.dec
            // }
        }
    }
    // inc = () => {
    //     this.setState( ({counter}) =>({
    //         counter: {
    //             ...counter,
    //             value: counter.value + 1
    //         }
    //     }))
    // }
    // dec = () => {
    //     this.setState( ({counter}) =>({
    //         counter: {
    //             ...counter,
    //             value: counter.value - 1
    //         }
    //     }))
    // }
    render(){
        return (
            // <Provider value={this.state.counter}>
            <div>
                <CounterCard/>
                <button onClick={()=>this.props.history.push('/login')}></button>
            </div> 
            // </Provider>
        )
    }
}

export  default Counter