"use client";

import {
  Brain,
  ChevronUp,
  Clock,
  DollarSign,
  File,
  Film,
  FolderOpen,
  Home,
  Menu,
  NotebookTabs,
  PieChart,
  Settings,
  Smile,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Type for navigation items
type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  userTypes: ("user" | "organization")[];
  locked?: boolean;
};

interface DashboardSidebarProps {
  organizationName?: string;
}

export default function DashboardSidebar({
  organizationName,
}: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const pathname = usePathname();

  // Mock user type - in a real app, this would come from auth context
  const userType: "user" | "organization" = "organization"; // Change to test different views

  const navigation: NavItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      userTypes: ["user", "organization"],
    },
    {
      name: "Budgets",
      href: "/dashboard/budgets",
      icon: PieChart,
      userTypes: ["user", "organization"],
    },
    {
      name: "Expenses",
      href: "/dashboard/expenses",
      icon: DollarSign,
      userTypes: ["user", "organization"],
    },
    ...(organizationName === "MyPath2Tech"
      ? [
          {
            name: "Timesheets",
            href: "/dashboard/timesheets",
            icon: Clock,
            userTypes: ["user", "organization"],
          } as NavItem,
        ]
      : []),
      {
        name: "Community Members",
        href: "/dashboard/members",
        icon: NotebookTabs,
        userTypes: ["organization"],
        locked: false,
      },
      {
        name: "Ask Finn",
        href: "/dashboard/ai-assistant",
        icon: Brain,
        userTypes: ["organization"],
        locked: false,
      },
      {
        name: "Volunteer Members",
        href: "/dashboard/volunteer-management",
        icon: Smile,
        userTypes: ["organization"],
        locked: false,
      },
      {
        name: "Team Members",
        href: "/dashboard/users",
        icon: Users,
        userTypes: ["organization"],
      },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      userTypes: ["user", "organization"],
    },
  ];

  // Additional accordion items
  const accordionItems = [
    {
      name: "Media",
      href: "/dashboard/library/media",
      icon: Film,
      userTypes: ["user", "organization"],
    },
    {
      name: "Documents",
      href: "/dashboard/library/documents",
      icon: File,
      userTypes: ["user", "organization"],
    },
  ];

  // Filter navigation items based on user type
  const filteredNavigation = navigation.filter((item) =>
    item.userTypes.includes(userType)
  );

  // Check if a path is active
  const isPathActive = (path: string) => {
    // For dashboard root route, only highlight when exactly at /dashboard
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    // For other routes, highlight when pathname starts with the path
    return pathname.startsWith(path);
  };

  return (
    <div className="h-screen">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-white shadow-md text-gray-600"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed h-screen md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center">
              <div className="flex items-center">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <Image
                    src="/apture.png"
                    width={100}
                    height={100}
                    className=""
                    alt=""
                  />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                  pture
                </span>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {filteredNavigation
              .filter((item) => ["Dashboard", "Ask Finn"].includes(item.name))
              .map((item) => {
                const isActive = isPathActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.locked ? "#" : item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-teal-50 text-teal-700"
                        : "text-gray-700 hover:bg-gray-100"
                    } ${item.locked ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isActive ? "text-teal-600" : "text-gray-500"
                      } ${
                        item.locked ? "text-yellow-300 cursor-not-allowed" : ""
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            <div className="mx-4 my-2 border-t border-gray-200" />

            <div className="px-4 py-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Finance
              </span>
            </div>
            {filteredNavigation
              .filter((item) =>
                ["Budgets", "Expenses", "Timesheets"].includes(item.name)
              )
              .map((item) => {
                const isActive = isPathActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.locked ? "#" : item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-teal-50 text-teal-700"
                        : "text-gray-700 hover:bg-gray-100"
                    } ${item.locked ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isActive ? "text-teal-600" : "text-gray-500"
                      } ${
                        item.locked ? "text-yellow-300 cursor-not-allowed" : ""
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}

            <div className="mx-4 my-2 border-t border-gray-200" />
            <div className="px-4 py-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Organization
              </span>
            </div>

            {/* Organization Features Group */}
            {filteredNavigation
              .filter((item) =>
                [
                  "Team Members",
                  "Community Members",
                  "Volunteer Members",
                ].includes(item.name)
              )
              .map((item) => {
                const isActive = isPathActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.locked ? "#" : item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-teal-50 text-teal-700"
                        : "text-gray-700 hover:bg-gray-100"
                    } ${item.locked ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isActive ? "text-teal-600" : "text-gray-500"
                      } ${
                        item.locked ? "text-yellow-300 cursor-not-allowed" : ""
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}

            <div className="mx-4 my-2 border-t border-gray-200" />
            <div className="px-4 py-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Settings & Library
              </span>
            </div>

            {/* Library & Settings Group */}
            {filteredNavigation
              .filter((item) => ["Settings"].includes(item.name))
              .map((item) => {
                const isActive = isPathActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.locked ? "#" : item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-teal-50 text-teal-700"
                        : "text-gray-700 hover:bg-gray-100"
                    } ${item.locked ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isActive ? "text-teal-600" : "text-gray-500"
                      } ${
                        item.locked ? "text-yellow-300 cursor-not-allowed" : ""
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
          </nav>

          {/* Accordion */}
          <div className="mx-3 my-2 rounded-md">
            <button
              onClick={() => setAccordionOpen(!accordionOpen)}
              className="w-full flex border-2 border-teal-700 items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <span className="flex items-center">
                <FolderOpen
                  className="mr-2 h-5 w-5 text-teal-800"
                  aria-hidden="true"
                />
                Library
              </span>
              <ChevronUp
                className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                  accordionOpen ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>

            {/* Accordion content - opens upwards */}
            <div
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                accordionOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col-reverse">
                {accordionItems.map((item) => {
                  const isActive = isPathActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-3 py-2 mt-1 rounded-md text-sm font-medium ${
                        isActive
                          ? "bg-teal-50 text-teal-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          isActive ? "text-teal-600" : "text-gray-500"
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="p-4 border-t border-gray-200">
            <Link href="/pricing">
              <button className="w-full flex items-center gap-1 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-gray-600 hover:from-teal-700 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <Sparkles className="w-5" />
                <span> Upgrade to Pro</span>
              </button>
            </Link>
            <p className="mt-2 text-xs text-center text-gray-500">
              Get unlimited budgets, advanced analytics and more
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
