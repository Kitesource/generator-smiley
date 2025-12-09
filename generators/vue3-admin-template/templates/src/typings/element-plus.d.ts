import type { ElTable } from 'element-plus'

/**
 * Element-Plus UI typings namespace
 */
export namespace ElementNS {
  /** Tag type */
  export type TagType = 'success' | 'info' | 'warning' | 'danger'

  /* Tag effect */
  export type TagEffect = 'dark' | 'light' | 'plain'

  /** Message type */
  export type MessageType = 'success' | 'info' | 'warning' | 'error'

  export type ImageFit = '' | 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

  /** El-Table instance */
  export type ElTableInstance = InstanceType<typeof ElTable>
}
