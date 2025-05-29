import { ReactNode } from "react";

type StatItemProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  className?: string;
};

export function StatItem({
  title,
  value,
  icon,
  className = "",
}: StatItemProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 rounded-md bg-teal-50 p-3 text-teal-600">
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd>
              <div className="text-lg font-medium text-gray-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
      {/* {change && (
        <div className="mt-4">
          <div className={`flex items-center text-sm ${
            change.isPositive ? 'text-teal-600' : 'text-red-600'
          }`}>
            <span className="font-medium">
              {change.isPositive ? '+' : ''}{change.value}
            </span>
            <span className="ml-1">from previous period</span>
          </div>
        </div>
      )} */}
    </div>
  );
}

type DashboardStatsProps = {
  children: ReactNode;
  className?: string;
};

export default function DashboardStats({
  children,
  className = "",
}: DashboardStatsProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {children}
    </div>
  );
}
