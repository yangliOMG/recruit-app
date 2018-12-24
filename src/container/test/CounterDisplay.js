import React from 'react'
import { withCounter } from './context'

const Display = ({ counter }) => <h5>{counter.value}</h5>

const CounterDisplay = withCounter(Display)

export default CounterDisplay