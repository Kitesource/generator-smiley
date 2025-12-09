import namespaceModule from './css-module/namespace.module.scss'

/**
 * 命名空间管理
 *
 * @param block 块，用于声明组件的命名空间
 * @param namespaceOverrides 自定义命名空间
 */
export const useNamespace = (block = '', namespaceOverrides) => {
  const finalNamespace = namespaceOverrides || namespaceModule.namespace
  const elNamespace = namespaceModule.elNamespace

  /**
   * 创建 BEM 元素
   */
  const createBem = (namespace, block, blockSuffix, element, modifier) => {
    let space = `${namespace}-${block}`

    if (blockSuffix) space += `-${blockSuffix}`
    if (element) space += `__${element}`
    if (modifier) space += `--${modifier}`
    return space
  }

  const b = (blockSuffix) => {
    return createBem(finalNamespace, block, blockSuffix)
  }

  const e = (element) => {
    return createBem(finalNamespace, block, '', element)
  }
  const m = (modifier) => {
    return createBem(finalNamespace, block, '', '', modifier)
  }

  const be = (blockSuffix, element) => {
    return createBem(finalNamespace, block, blockSuffix, element)
  }

  const bm = (blockSuffix, modifier) => {
    return createBem(finalNamespace, block, blockSuffix, '', modifier)
  }

  const em = (element, modifier) => {
    return createBem(finalNamespace, block, '', element, modifier)
  }

  const bem = (blockSuffix, element, modifier) => {
    return createBem(finalNamespace, block, blockSuffix, element, modifier)
  }

  const is = (name, bool = true) => {
    return bool ? `is-${name}` : ''
  }

  const has = (name, bool = true) => {
    return bool ? `has-${name}` : ''
  }

  const no = (name, bool = true) => {
    return bool ? `no-${name}` : ''
  }

  /**
   * 拼接命名空间
   */
  const join = (scope) => {
    return `${finalNamespace}-${scope}`
  }

  /**
   * CSS 变量，当 name = color，返回 var(--tk-color)
   */
  const cssVar = (name) => `var(--${finalNamespace}-${name})`
  /**
   * CSS 变量名称当 name = color，返回 --tk-color
   */
  const cssVarName = (name) => `--${finalNamespace}-${name}`

  /**
   * 拼接 element plus 命名空间
   */
  const joinEl = (scope) => {
    return `${elNamespace}-${scope}`
  }

  /**
   * CSS 变量，当 name = color，返回 var(--el-color)
   */
  const cssVarEl = (name) => `var(--${elNamespace}-${name})`
  /**
   * CSS 变量名称当 name = color，返回 --el-color
   */
  const cssVarNameEl = (name) => `--${elNamespace}-${name}`

  return {
    namespaceModule,
    namespace: namespaceModule.namespace,
    elNamespace: elNamespace,
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is,
    has,
    no,
    createBem,
    join,
    cssVar,
    cssVarName,
    joinEl,
    cssVarEl,
    cssVarNameEl
  }
}
