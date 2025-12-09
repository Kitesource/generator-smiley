import { Outlet } from 'react-router-dom'

const ZustandLayout = () => {
  return (
    <div className="p-4">
      <Outlet />
    </div>
  )
}

export default ZustandLayout
