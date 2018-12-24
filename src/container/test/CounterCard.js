import React from 'react'
import CounterDecBtn from './CounterDecBtn'
import CounterIncBtn from './CounterIncBtn'
import CounterDisplay from './CounterDisplay'

const CounterCard = () => (
    <div>
        <CounterDisplay/>
        <CounterDecBtn/>
        <CounterIncBtn/>
    </div>
)

export default CounterCard