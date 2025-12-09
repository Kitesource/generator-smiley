import { create } from 'zustand'
// 持久化存储
import { createJSONStorage, persist } from 'zustand/middleware'

export interface CommonState {
  count: number
  increment: () => void
  decrement: () => void
  incrementByAmount: (amount: number) => void
  setCount: (val: number) => void
  reset: () => void
  // 语言状态
  language: string
  setLanguage: (lang: string) => void
  toggleLanguage: () => void
  // 侧边栏展开状态
  siderCollapsed: boolean
  toggleSider: () => void
  setSiderCollapsed: (collapsed: boolean) => void
}

// 定义 store 的状态和更新函数
export const useCommonStore = create<CommonState>()(
  persist(
    set => ({
      count: 0, // 状态：计数器
      increment: () => set(state => ({ count: state.count + 1 })), // 增加计数器
      decrement: () => set(state => ({ count: state.count - 1 })), // 减少计数器
      incrementByAmount: (amount: number) => set(state => ({ count: state.count + amount })), // 增加计数器
      setCount: val => set({ count: val }), // 设置计数器
      reset: () => set({ count: 0 }), // 重置计数器
      // 语言状态初始化和更新
      language: 'zh-CN',
      setLanguage: (lang: string) => set({ language: lang }),
      toggleLanguage: () => set(state => ({ language: state.language === 'zh-CN' ? 'en' : 'zh-CN' })),
      // 侧边栏展开状态初始化和更新
      siderCollapsed: false,
      toggleSider: () => set(state => ({ siderCollapsed: !state.siderCollapsed })),
      setSiderCollapsed: (collapsed: boolean) => set({ siderCollapsed: collapsed })
    }),
    {
      name: 'common-storage', // 存储的名称，会作为 localStorage/sessionStorage 的 key
      storage: createJSONStorage(() => localStorage), // 使用 localStorage 存储
      partialize: state => {
        // 只持久化指定的状态
        return {
          language: state.language,
          siderCollapsed: state.siderCollapsed
        }
      }
    }
  )
)
