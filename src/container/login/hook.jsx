import React ,{   useReducer, Suspense  } from 'react'
const C = React.lazy(() => import('./constant'))

const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  import('./constant').then(({default:Com }) => {  //动态import，then传过来的参数，不会是默认default
      console.log(2)
  })
  console.log(1)                        
                                                    //Suspense与react.lazy配合使用
  return (
    <React.Fragment>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'reset'})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <Suspense fallback={<div>Loading...</div>}>     
        <C></C>
      </Suspense>
    </React.Fragment>
  );
}
// class Counter extends React.Component {
//   constructor() {
//     super();
//     this.state = {};
//     import('./constant').then(({ default: OtherComponent }) => {
//       setTimeout(() => {
//         this.setState({ OtherComponent });
//       }, 2000);
//     });
//   }

//   render() {
//     const { OtherComponent } = this.state;

//     return (
//       <Suspense fallback={<div>Loading...</div>}>
//         { OtherComponent && <OtherComponent /> }
//        </Suspense>
//     );
//   }
// }
// function test(e) {
//   import('./constant.js').then(({text})=>{
//     console.log(text)
//     console.log(e)
//   })
// }

export default Counter

