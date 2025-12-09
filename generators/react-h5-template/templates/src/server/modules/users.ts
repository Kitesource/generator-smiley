import axios from '../request'
import { UserNS } from '@/typings'

export function getUsers(): Promise<{ data: UserNS.UserItem[] }> {
  // axios.get('/')
  console.log('getUsers', axios.defaults.baseURL)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: 1,
            name: 'user1',
            email: 'user1@example.com'
          },
          {
            id: 2,
            name: 'user2',
            email: 'user2@example.com'
          }
        ]
      })
    }, 1000)
  })
}
