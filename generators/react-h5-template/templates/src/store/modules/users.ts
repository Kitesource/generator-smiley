import { getUsers } from '@/server'
import { create } from 'zustand'
export interface UserItem {
  id: number
  name: string
  email: string
}
export interface Fish {
  users: UserItem[]
  loading: boolean
  fetchUsers: () => Promise<void>
}

export const useUserStore = create<Fish>(set => ({
  users: [],
  loading: false,
  fetchUsers: async () => {
    set({ loading: true })
    try {
      const response = await getUsers()
      set({ users: response.data })
    } catch (error) {
      console.error(error)
    }
    set({ loading: false })
  }
}))
