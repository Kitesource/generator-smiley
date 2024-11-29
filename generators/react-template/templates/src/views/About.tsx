import type { RootState } from '@/store'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementByAmount } from '@/store/common'

const About: React.FC = () => {
  const count = useSelector((state: RootState) => state.common.count)
  const dispatch = useDispatch()

  const [value, setValue] = useState(1)

  return (
    <div>
      <h1>About</h1>
      <p>Redux Common Count: {count} </p>
      <div>
        <input type="number" value={value} onInput={(e: any) => setValue(Number(e.target.value))} />
        <button onClick={() => dispatch(incrementByAmount(value))}> IncrementByMount </button>
      </div>
    </div>
  )
}

export default About
