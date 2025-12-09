import React from 'react'

interface SvgIconProps {
  name: string
  className?: string
  size?: number | string
  color?: string
}

const SvgIcon: React.FC<SvgIconProps> = ({ name, className, size, color }) => {
  return (
    <svg className={className} style={{ width: size, height: size, color }} aria-hidden="true">
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  )
}

export default SvgIcon
