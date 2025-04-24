import { ReactNode } from 'react'

type DashboardCardProps = {
  title: string
  children: ReactNode
  className?: string
  action?: ReactNode
}

export default function DashboardCard({ title, children, className = '', action }: DashboardCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  )
}
