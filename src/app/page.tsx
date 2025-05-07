"use client"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  DollarSign,
  PieChart,
  Sparkles,
  Clock,
  CreditCard,
  Target,
  X,
  ClipboardList,
  BarChart2,
  PieChartIcon as PieChart2,
  Wallet,
  FileText,
  CheckCircle2,
  NotebookIcon,
} from "lucide-react"
import Image from "next/image"
import Header from "@/components/navbar"


export default function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen text-gray-800 overflow-hidden bg-white">

      <Header />
      <main className="flex-1 bg-[#f8fafc ]">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08)_0%,rgba(255,255,255,0)_60%)]"></div>

          {/* Floating Finance Elements */}
          <div className="absolute w-12 h-12 top-1/4 left-10 text-teal-400/30 animate-float-slow">
            <BarChart2 className="w-9 lg:w-14" />
          </div>
          <div className="absolute w-16 h-16 top-1/3 right-20 text-teal-400/30 animate-float">
            <PieChart2 className="w-9 lg:w-14" />
          </div>
          <div className="absolute w-10 h-10 bottom-1/4 left-1/4 text-teal-400/30 animate-float-slower">
            <Wallet className="w-9 lg:w-14" />
          </div>
          <div className="absolute w-14 h-14 top-1/2 right-10 text-teal-400/30 animate-float-slow">
            <FileText className="w-9 lg:w-14" />
          </div>
          <div className="absolute w-12 h-12 bottom-1/3 right-1/3 text-teal-400/30 animate-float">
            <ClipboardList className="w-9 lg:w-14" />
          </div>

          {/* Glowing lines */}
          {/* <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#358f82]/20 to-transparent"></div> */}
          <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent"></div>

          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-24">
              <div
                className="inline-flex items-center backdrop-blur-md bg-white/80 rounded-full px-4 py-2 text-gray-800 mb-8 shadow-sm border border-gray-200/50"
                data-aos="fade-down"
              >
                <Sparkles className="h-4 w-4 mr-2 text-[#317f82]" />
                <span className="text-sm font-medium  ">Budget & Timesheet Management</span>
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-tight"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <span className="relative">
                  <span className="relative z-10">All your work tools</span>
                </span>
                <br />
                <span className="relative mt-2 inline-block">
                  <span className="bg-gradient-to-r from-[#317f82] via-[#317f82] to-emerald-500 bg-clip-text text-transparent drop-shadow-sm">
                    in one place
                  </span>
                  <span className="absolute -bottom-2 -right-8 w-12 h-12 bg-[#358f82]/10 rounded-full blur-xl z-0"></span>
                </span>
              </h1>

              <p
                className="text-gray-600 text-xl max-w-[900px] mb-10 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Combine budget management, timesheet tracking, and more in a single powerful platform. Streamline your
                workflow and boost productivity with our all-in-one solution.
              </p>

              <div className="flex flex-col sm:flex-row gap-6" data-aos="fade-up" data-aos-delay="300">
                <button className="group relative overflow-hidden bg-gradient-to-r from-[#358f82] to-[#317f82] hover:from-teal-700 hover:to-[#358f82] text-white rounded-2xl px-10 py-4 font-medium text-base shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute inset-0 w-3 bg-gradient-to-r from-white/10 to-white/5 transition-all duration-500 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></div>
                  <Link href="/signin" className="relative z-10 flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </button>
                {/* <button className="relative overflow-hidden bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 rounded-2xl px-10 py-4 font-medium text-base transition-all duration-300 shadow-sm">
                  <span className="relative z-10">Learn more</span>
                  <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gray-100/50"></div>
                </button> */}
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative max-w-6xl mx-auto " data-aos="zoom-in" data-aos-delay="400">
              {/* Shadow and Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#358f82]/5 to-teal-400/5 rounded-3xl transform rotate-1 scale-[1.03] blur-xl"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#358f82]/10 to-teal-400/10 rounded-3xl opacity-70 blur-xl"></div>

              {/* Main Dashboard Container */}
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                <div className="bg-gradient-to-r from-[#358f82] to-[#317f82] h-1"></div>
                <div className="p-8">
                  {/* Dashboard Header */}
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-10 w-full">
                    <div className="flex items-center gap-3 mb-4 md:mb-0">
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr rounded-lg opacity-90"></div>
                        {/* <DollarSign className="h-6 w-6 text-white z-10" /> */}
                        <Image src="/apture.png"  className="" width={100} height={100} alt="" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">Financial Dashboard</h3>
                        <p className="text-sm text-gray-500">Budget & Timesheet Overview</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                        <span className="text-sm font-medium text-gray-700 flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1.5 text-[#317f82]" />
                          July 2023
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#358f82]/10 to-teal-400/10 flex items-center justify-center border border-gray-200">
                        <span className="text-sm font-medium text-gray-700">JD</span>
                      </div>
                    </div>
                  </div>

                  {/* Budget Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div
                      className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center text-[#358f82]">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <p className="text-sm text-gray-500">Total Budget</p>
                      </div>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#358f82] group-hover:to-[#317f82]">
                          $4,500.00
                        </p>
                        <span className="text-[#358f82] text-sm font-medium pb-1">+5% from last month</span>
                      </div>
                    </div>

                    <div
                      className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center text-[#358f82]">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <p className="text-sm text-gray-500">Spent</p>
                      </div>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#317f82] group-hover:to-emerald-600">
                          $2,345.67
                        </p>
                        <span className="text-[#358f82] text-sm font-medium pb-1">52% of budget</span>
                      </div>
                    </div>

                    <div
                      className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group"
                      data-aos="fade-up"
                      data-aos-delay="300"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center text-[#358f82]">
                          <Clock className="h-5 w-5" />
                        </div>
                        <p className="text-sm text-gray-500">Hours Tracked</p>
                      </div>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-[#358f82]">
                          128.5
                        </p>
                        <span className="text-[#358f82] text-sm font-medium pb-1">This month</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-10" data-aos="fade-up" data-aos-delay="400">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium flex items-center text-gray-700">
                        <Target className="h-4 w-4 mr-2 text-[#358f82]" />
                        Budget Usage
                      </span>
                      <span className="text-[#358f82] font-medium">52%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
                      <div className="h-3 bg-gradient-to-r from-[#358f82] to-[#317f82] rounded-full w-[52%] relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_100%,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0)_60%)]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Charts and Recent Transactions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                      data-aos="fade-up"
                      data-aos-delay="500"
                    >
                      <h4 className="text-sm font-medium mb-4 flex items-center text-gray-700">
                        <PieChart className="h-4 w-4 mr-2 text-[#358f82]" />
                        Expense Categories
                      </h4>
                      <div className="flex items-center justify-center h-48 relative">
                        {/* Stylized donut chart */}
                        <div className="w-32 h-32 rounded-full border-[12px] border-[#317f82]/70 relative">
                          <div className="absolute inset-0 border-[12px] border-transparent border-t-emerald-500/70 rounded-full transform rotate-45"></div>
                          <div className="absolute inset-0 border-[12px] border-transparent border-r-[#317f82]/70 rounded-full transform rotate-45"></div>
                          <div className="absolute inset-0 border-[4px] border-white rounded-full transform scale-90"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-gray-900">52%</span>
                          </div>
                        </div>

                        {/* Blurred glow effects */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#317f82]/10 rounded-full blur-xl"></div>
                        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#317f82]/10 rounded-full blur-lg"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl"></div>
                      </div>
                    </div>

                    <div
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                      data-aos="fade-up"
                      data-aos-delay="600"
                    >
                      <h4 className="text-sm font-medium mb-4 flex items-center text-gray-700">
                        <Clock className="h-4 w-4 mr-2 text-[#358f82]" />
                        Recent Timesheets
                      </h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-[#358f82]">
                              <span className="text-xs font-medium">WD</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-900">Web Development</span>
                              <p className="text-xs text-gray-500">Today, 10:30 AM - 2:45 PM</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-gray-900">4.25h</span>
                        </div>

                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-[#358f82]">
                              <span className="text-xs font-medium">MT</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-900">Marketing Tasks</span>
                              <p className="text-xs text-gray-500">Yesterday, 9:15 AM - 11:30 AM</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-gray-900">2.25h</span>
                        </div>

                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                              <span className="text-xs font-medium">RM</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-900">Research Meeting</span>
                              <p className="text-xs text-gray-500">Jul 24, 1:00 PM - 2:30 PM</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-gray-900">1.5h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#317f82]/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#317f82]/20 to-transparent"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#317f82]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#317f82]/5 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-20">
              <div
                className="inline-flex items-center justify-center bg-white backdrop-blur-md rounded-full px-4 py-1.5 mb-6 border border-gray-200"
                data-aos="fade-down"
              >
                <span className="text-sm font-medium text-gray-700">How It Works</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight" data-aos="fade-up">
                Simplify your workflow
              </h2>
              <p
                className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Apture combines budget management and timesheet tracking in one intuitive platform, making it easier to
                manage your finances and time.
              </p>
            </div>

            {/* Feature 1: Create Budget */}
            <div className="grid mx-6 grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center">
              <div className="order-2 lg:order-1" data-aos="fade-right" data-aos-delay="100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#358f82] to-[#317f82] rounded-2xl flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Create Budget</h3>
                </div>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Set up your budget categories and allocate funds based on your financial goals and income. Our
                  intuitive interface makes this process quick and painless.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-100 to-teal-100 rounded-full flex items-center justify-center mt-0.5 border border-teal-200">
                      <CheckCircle2 className="h-3 w-3 text-[#358f82]" />
                    </div>
                    <span className="text-gray-700">Create multiple budget categories</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-100 to-teal-100 rounded-full flex items-center justify-center mt-0.5 border border-teal-200">
                      <CheckCircle2 className="h-3 w-3 text-[#358f82]" />
                    </div>
                    <span className="text-gray-700">Set monthly or annual budget limits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-100 to-teal-100 rounded-full flex items-center justify-center mt-0.5 border border-teal-200">
                      <CheckCircle2 className="h-3 w-3 text-[#358f82]" />
                    </div>
                    <span className="text-gray-700">Track progress with visual indicators</span>
                  </li>
                </ul>
                <button className="text-[#358f82] font-medium flex items-center hover:text-teal-700 transition-colors">
                  Learn more
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="order-1 lg:order-2 relative" data-aos="fade-left" data-aos-delay="200">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#317f82]/10 via-[#317f82]/10 to-[#317f82]/10 rounded-3xl blur-xl opacity-70"></div>
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-4">
                  <Image
                    src="https://placehold.co/600x400/ffffff/5a5a5a?text=Create+Budget"
                    alt="Create Budget Interface"
                    className="rounded-xl w-full h-auto"
                    width={0}
                    height={0}
                  />
                </div>
              </div>
            </div>

            {/* Feature 2: Add Expenses */}
            <div className="grid mx-6 grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center">
              <div className="order-2" data-aos="fade-left" data-aos-delay="100">
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-4">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#317f82]/10 via-[#317f82]/10 to-[#317f82]/10 rounded-3xl blur-xl opacity-70"></div>
                  <Image
                    src="https://placehold.co/600x400/ffffff/5a5a5a?text=Add+Expenses"
                    alt="Add Expenses Interface"
                    className="rounded-xl w-full h-auto relative"
                    width={0}
                    height={0}
                  />
                </div>
              </div>
              <div className="order-1" data-aos="fade-right" data-aos-delay="200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#317f82] to-emerald-600 rounded-2xl flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Add Expenses</h3>
                </div>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Easily record and categorize your expenses as they happen. Attach receipts, add notes, and keep
                  everything organized in one place for easy reference.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-100 to-teal-100 rounded-full flex items-center justify-center mt-0.5 border border-teal-200">
                      <CheckCircle2 className="h-3 w-3 text-[#358f82]" />
                    </div>
                    <span className="text-gray-700">Quick expense entry with smart categorization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-100 to-teal-100 rounded-full flex items-center justify-center mt-0.5 border border-teal-200">
                      <CheckCircle2 className="h-3 w-3 text-[#358f82]" />
                    </div>
                    <span className="text-gray-700">Upload receipt photos directly from your phone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-100 to-teal-100 rounded-full flex items-center justify-center mt-0.5 border border-teal-200">
                      <CheckCircle2 className="h-3 w-3 text-[#358f82]" />
                    </div>
                    <span className="text-gray-700">Automatic budget updates and alerts</span>
                  </li>
                </ul>
                <button className="text-[#358f82] font-medium flex items-center hover:text-teal-700 transition-colors">
                  Learn more
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>

            {/* Feature 3: Record Timesheets */}
            <div className="grid mx-6 grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1" data-aos="fade-right" data-aos-delay="100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-[#358f82] rounded-2xl flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Record Timesheets</h3>
                </div>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Track your working hours with precision and ease. Log time by project, client, or task to maintain
                  accurate records and improve your productivity.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-100 to-teal-100 rounded-full flex items-center justify-center mt-0.5 border border-teal-200">
                      <CheckCircle2 className="h-3 w-3 text-[#358f82]" />
                    </div>
                    <span className="text-gray-700">Simple time tracking with start/stop functionality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-100 to-teal-100 rounded-full flex items-center justify-center mt-0.5 border border-teal-200">
                      <CheckCircle2 className="h-3 w-3 text-[#358f82]" />
                    </div>
                    <span className="text-gray-700">Categorize time entries by project or client</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-100 to-teal-100 rounded-full flex items-center justify-center mt-0.5 border border-teal-200">
                      <CheckCircle2 className="h-3 w-3 text-[#358f82]" />
                    </div>
                    <span className="text-gray-700">Generate detailed time reports for billing</span>
                  </li>
                </ul>
                <button className="text-[#358f82] font-medium flex items-center hover:text-teal-700 transition-colors">
                  Learn more
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="order-1 lg:order-2 relative" data-aos="fade-left" data-aos-delay="200">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#317f82]/10 via-emerald-500/10 to-[#317f82]/10 rounded-3xl blur-xl opacity-70"></div>
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-4">
                  <Image
                    src="https://placehold.co/600x400/ffffff/5a5a5a?text=Record+Timesheets"
                    alt="Timesheet Recording Interface"
                    className="rounded-xl w-full h-auto"
                    width={0}
                    height={0}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-24 bg-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#317f82]/5 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#317f82]/5 rounded-full"></div>

          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-20">
              <div
                className="inline-flex items-center justify-center bg-gray-50 backdrop-blur-md rounded-full px-4 py-1.5 mb-2 border border-gray-200"
                data-aos="fade-down"
              >
                <span className="text-sm font-medium text-gray-700">Premium Features</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900" data-aos="fade-up">
                Everything you need.
                <br />
                <span className="bg-gradient-to-r from-[#358f82] to-[#317f82] bg-clip-text text-transparent">
                  Nothing you don&apos;t.
                </span>
              </h2>
              <p
                className="max-w-[900px] text-gray-600 text-lg leading-relaxed mt-4"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Financial management and time tracking in one place. Experience a flexible toolkit that makes every task
                feel like a breeze, designed with your needs in mind.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl items-center gap-8 py-12 lg:grid-cols-2 lg:gap-16">
              <div className="grid gap-8">
                <div className="group relative" data-aos="fade-right" data-aos-delay="100">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#317f82]/5 to-[#317f82]/5 rounded-xl transform transition-transform group-hover:scale-105 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-teal-100 flex items-center justify-center border border-gray-200">
                        <BarChart3 className="h-6 w-6 text-[#358f82]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Budget Management</h3>
                    </div>
                    <p className="text-gray-600 pl-16">
                      Create and manage budgets for different time periods. Track your spending against your budget in
                      real-time with visual indicators and alerts.
                    </p>
                  </div>
                </div>

                <div className="group relative" data-aos="fade-right" data-aos-delay="100">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#317f82]/5 to-[#317f82]/5 rounded-xl transform transition-transform group-hover:scale-105 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-teal-100 flex items-center justify-center border border-gray-200">
                        <NotebookIcon className="h-6 w-6 text-[#358f82]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Expense Recording</h3>
                    </div>
                    <p className="text-gray-600 pl-16">
                      Create and manage your expense for a particular budget. Track your spending against your budget in
                      real-time with visual indicators and alerts.
                    </p>
                  </div>
                </div>

                <div className="group relative" data-aos="fade-right" data-aos-delay="200">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#317f82]/5 to-[#317f82]/5 rounded-xl transform transition-transform group-hover:scale-105 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-teal-100 flex items-center justify-center border border-gray-200">
                        <Clock className="h-6 w-6 text-[#358f82]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Timesheet Tracking</h3>
                    </div>
                    <p className="text-gray-600 pl-16">
                      Log your hours with precision and ease. Track time by project, client, or task to maintain
                      accurate records and improve your productivity.
                    </p>
                  </div>
                </div>

                <div className="group relative" data-aos="fade-right" data-aos-delay="300">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#317f82]/5 to-[#317f82]/5 rounded-xl transform transition-transform group-hover:scale-105 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-teal-100 flex items-center justify-center border border-gray-200">
                        <PieChart className="h-6 w-6 text-[#358f82]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Insightful Analytics</h3>
                    </div>
                    <p className="text-gray-600 pl-16">
                      Visualize your spending patterns and time allocation with beautiful interactive charts and graphs.
                      Gain insights to make better decisions with our comprehensive reporting tools.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center" data-aos="fade-left" data-aos-delay="200">
                <div className="relative w-full max-w-md aspect-square">
                  {/* Glowing background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#317f82]/10 via-[#317f82]/10 to-emerald-500/10 rounded-3xl blur-3xl transform -rotate-6"></div>

                  {/* Main feature showcase */}
                  <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    {/* Header with title and date */}
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-gray-900 flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-[#358f82]" />
                        Weekly Report
                      </h3>
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                        July 2023
                      </span>
                    </div>

                    {/* Chart visualization */}
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-white rounded-xl flex items-center justify-center border border-gray-200 shadow-inner p-4 mb-6">
                      <div className="relative">
                        {/* Stylized donut chart with glow effects */}
                        <div className="w-40 h-40 rounded-full relative">
                          <div className="absolute inset-0 rounded-full border-[16px] border-[#317f82]/70 opacity-80"></div>
                          <div className="absolute inset-0 rounded-full border-[16px] border-transparent border-t-emerald-500/70 opacity-80"></div>
                          <div className="absolute inset-0 rounded-full border-[16px] border-transparent border-l-[#317f82]/70 opacity-80"></div>

                          {/* Inner circle */}
                          <div className="absolute inset-[16px] rounded-full bg-white border border-gray-200 flex items-center justify-center">
                            <div className="text-center">
                              <span className="block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#358f82] to-[#317f82]">
                                32.5h
                              </span>
                              <span className="text-xs text-gray-500">Total Hours</span>
                            </div>
                          </div>

                          {/* Glow effects */}
                          <div className="absolute -inset-4 bg-[#317f82]/5 rounded-full blur-xl"></div>
                        </div>
                      </div>
                    </div>

                    {/* Category legend */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-3 h-3 bg-[#317f82] rounded-full"></div>
                        <div>
                          <span className="text-xs font-medium text-gray-900">Development</span>
                          <span className="block text-xs text-gray-500">15.5h • 48%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <div>
                          <span className="text-xs font-medium text-gray-900">Marketing</span>
                          <span className="block text-xs text-gray-500">8.0h • 25%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-3 h-3 bg-[#317f82] rounded-full"></div>
                        <div>
                          <span className="text-xs font-medium text-gray-900">Meetings</span>
                          <span className="block text-xs text-gray-500">6.0h • 18%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                        <div>
                          <span className="text-xs font-medium text-gray-900">Other</span>
                          <span className="block text-xs text-gray-500">3.0h • 9%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Old Way vs New Way Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#317f82]/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#317f82]/20 to-transparent"></div>

          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight" data-aos="fade-up">
                Maximize Your Productivity222
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600 text-lg" data-aos="fade-up" data-aos-delay="100">
                Managing your budget, expense and time shouldn&apos;t be complicated. See how Apture simplifies your
                workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div
                className="relative bg-white p-8 rounded-2xl border border-gray-200 shadow-md"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Old Way</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5 border border-red-200">
                      <X className="h-3 w-3 text-red-500" />
                    </div>
                    <span className="text-gray-700">Connect up to 8 different software tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5 border border-red-200">
                      <X className="h-3 w-3 text-red-500" />
                    </div>
                    <span className="text-gray-700">Manually track time in one system and expenses in another</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5 border border-red-200">
                      <X className="h-3 w-3 text-red-500" />
                    </div>
                    <span className="text-gray-700">Waste hours reconciling data between systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5 border border-red-200">
                      <X className="h-3 w-3 text-red-500" />
                    </div>
                    <span className="text-gray-700">Pay for multiple subscriptions</span>
                  </li>
                </ul>
              </div>

              <div
                className="relative bg-white p-8 rounded-2xl border border-gray-200 shadow-md"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Apture Way</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-100 to-teal-100 rounded-full flex items-center justify-center mt-0.5 border border-teal-200">
                      <CheckCircle2 className="h-3 w-3 text-[#358f82]" />
                    </div>
                    <span className="text-gray-700">Use 1 platform for all your budget and time tracking needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-100 to-teal-100 rounded-full flex items-center justify-center mt-0.5 border border-teal-200">
                      <CheckCircle2 className="h-3 w-3 text-[#358f82]" />
                    </div>
                    <span className="text-gray-700">Seamlessly connect time entries with expenses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-100 to-teal-100 rounded-full flex items-center justify-center mt-0.5 border border-teal-200">
                      <CheckCircle2 className="h-3 w-3 text-[#358f82]" />
                    </div>
                    <span className="text-gray-700">Get unified reports and insights across all your data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-100 to-teal-100 rounded-full flex items-center justify-center mt-0.5 border border-teal-200">
                      <CheckCircle2 className="h-3 w-3 text-[#358f82]" />
                    </div>
                    <span className="text-gray-700">Save money with a single subscription</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <button
                className="group relative overflow-hidden bg-gradient-to-r from-[#358f82] to-[#317f82] hover:from-teal-700 hover:to-[#358f82] text-white rounded-full px-10 py-4 font-medium text-base shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="absolute inset-0 w-3 bg-gradient-to-r from-white/10 to-white/5 transition-all duration-500 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></div>
                <Link href="/signin" className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </button>
            </div>
          </div>
        </section>
      </main>


      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col justify-between md:flex-row gap-10">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr rounded-lg opacity-90"></div>
                  {/* <DollarSign className="h-6 w-6 text-white z-10" /> */}
                  <Image src="/apture.png" width={100} height={100} className="w-full" alt="" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#358f82] to-teal-400 bg-clip-text text-transparent">
                  Apture
                </span>
              </div>
              <p className="text-gray-500 mb-6 max-w-sm">
                Modern budgeting and expense tracking for everyone. Take control of your finances with powerful,
                intuitive tools designed for real people.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Quick links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#358f82] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-500 hover:text-[#358f82] transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 py-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Apture. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-gray-500 hover:text-[#358f82] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-[#358f82] transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-[#358f82] transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
