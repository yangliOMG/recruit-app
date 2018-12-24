import React from 'react'
import { withCounter } from './context'

const DecBtn = ({ counter }) => <button type='button' onClick={counter.dec}>+</button>

const CounterDecBtn = withCounter(DecBtn)

export default CounterDecBtn