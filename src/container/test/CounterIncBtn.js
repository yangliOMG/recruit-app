import React from 'react'
import { withCounter } from './context'

const IncBtn = ({ counter }) => <button type='button' onClick={counter.inc}>+</button>

const CounterIncBtn = withCounter(IncBtn)

export default CounterIncBtn