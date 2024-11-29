import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CommonState {
  count: number
  language: string
}

const initialState: CommonState = {
  count: 0,
  language: 'en'
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    incrementCount: state => {
      state.count += 1
    },
    decrementCount: state => {
      state.count -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    }
  }
})

export const { incrementCount, decrementCount, incrementByAmount } = commonSlice.actions

export default commonSlice.reducer
