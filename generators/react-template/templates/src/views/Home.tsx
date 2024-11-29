import React from 'react'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { incrementCount, decrementCount } from '@/store/common'

const Home: React.FC = () => {
  const count = useSelector((state: RootState) => state.common.count)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Home</h1>
      <p>Redux Count: {count} </p>
      <button onClick={() => dispatch(incrementCount())}> Increment </button>
      <button onClick={() => dispatch(decrementCount())}> decrement </button>
    </div>
  )
}

export default Home
