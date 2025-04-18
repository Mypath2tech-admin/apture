import Link from "next/link"
import {
  ArrowRight,
//   BarChart3,
//   Calendar,
//   ChevronRight,
  DollarSign,
  LineChart,
  PieChart,
//   Star,
//   Users,
  Sparkles,
  Clock,
  CreditCard,
  TrendingUp,
  Target,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a16] text-white overflow-hidden">
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-xl supports-[backdrop-filter]:bg-black/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg opacity-90 blur-[2px]"></div>
              <DollarSign className="h-6 w-6 text-white z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              BudgetPro
            </span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/features"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm font-medium text-white/80 hover:text-white transition-all duration-300"
            >
              Log in
            </Link>
            <button className="relative overflow-hidden group bg-gradient-to-tr from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)]">
              <div className="absolute -inset-full top-0 block bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-all"></div>
              <span className="font-medium flex items-center">
                Get Started
                <svg
                  className="w-5 h-5 ml-2 -mr-1 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Advanced Gradient and Animations */}
        <section className="relative py-24 md:py-36 overflow-hidden isolate">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f172a]"></div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15)_0%,rgba(0,0,0,0)_60%)]"></div>

          {/* Geometric Decorations */}
          <div className="absolute w-96 h-96 -top-20 -right-20 bg-purple-500/10 rounded-full blur-3xl animate-slow-pulse"></div>
          <div className="absolute w-96 h-96 -bottom-20 -left-20 bg-pink-600/10 rounded-full blur-3xl animate-slow-pulse delay-200"></div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-10 w-12 h-12 bg-white/5 backdrop-blur-xl rounded-xl rotate-12 animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-10 w-20 h-20 bg-white/5 backdrop-blur-xl rounded-full -rotate-12 animate-float-slower"></div>
          <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-white/5 backdrop-blur-xl rounded-lg rotate-45 animate-float"></div>

          {/* Glowing lines */}
          <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>

          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-24">
              <div className="inline-flex items-center backdrop-blur-md bg-white/5 rounded-full px-4 py-2 text-white mb-8 animate-fade-in shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
                <span className="text-sm font-medium">Next-Gen Budget Management</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 animate-slide-up leading-tight">
                <span className="relative">
                  <span className="relative z-10">Visualize your</span>
                  <span className="absolute bottom-0 left-0 w-full h-3 bg-purple-500/30 -rotate-1 translate-y-2 z-0"></span>
                </span>
                <br />
                <span className="relative mt-2 inline-block">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
                    financial future
                  </span>
                  <span className="absolute -bottom-2 -right-8 w-12 h-12 bg-purple-500/20 rounded-full blur-xl z-0"></span>
                </span>
              </h1>

              <p className="text-white/70 text-xl max-w-[900px] mb-10 animate-slide-up-delayed leading-relaxed">
                Experience a new dimension of financial management with our AI-powered budget tracking platform.
                Visualize, analyze, and optimize your finances like never before.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 animate-slide-up-more-delayed">
                <button className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl px-10 py-4 font-medium text-base shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute inset-0 w-3 bg-gradient-to-r from-white/10 to-white/5 transition-all duration-500 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></div>
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
                <button className="relative overflow-hidden bg-transparent hover:bg-white/5 text-white border border-white/20 rounded-2xl px-10 py-4 font-medium text-base transition-all duration-300 backdrop-blur-sm">
                  <span className="relative z-10">Learn more</span>
                  <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-white/5"></div>
                </button>
              </div>
            </div>

            {/* Enhanced Dashboard Preview */}
            <div className="relative max-w-6xl mx-auto animate-float">
              {/* Shadow and Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-pink-500/5 rounded-3xl transform rotate-1 scale-[1.03] blur-xl"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl opacity-70 blur-xl"></div>

              {/* Main Dashboard Container */}
              <div className="relative bg-[#151525] rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-1"></div>
                <div className="p-8">
                  {/* Dashboard Header */}
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg opacity-90 blur-[1px]"></div>
                        <DollarSign className="h-5 w-5 text-white z-10" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">Financial Dashboard</h3>
                        <p className="text-sm text-white/50">Visualize, analyze, optimize</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        <span className="text-sm font-medium text-white/70 flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                          July 2023
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                        <span className="text-sm font-medium text-white/80">JD</span>
                      </div>
                    </div>
                  </div>

                  {/* Budget Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-gradient-to-br from-[#1e1e3a] to-[#2a2a4a] p-6 rounded-xl border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all group">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <p className="text-sm text-white/50">Total Budget</p>
                      </div>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bold text-white group-hover:scale-105 transition-transform group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400">
                          $4,500.00
                        </p>
                        <span className="text-purple-400 text-sm font-medium pb-1">+5% from last month</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1e1e3a] to-[#2a2a4a] p-6 rounded-xl border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all group">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <p className="text-sm text-white/50">Spent</p>
                      </div>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bold text-white group-hover:scale-105 transition-transform group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400">
                          $2,345.67
                        </p>
                        <span className="text-pink-400 text-sm font-medium pb-1">52% of budget</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1e1e3a] to-[#2a2a4a] p-6 rounded-xl border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all group">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <p className="text-sm text-white/50">Remaining</p>
                      </div>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bold text-white group-hover:scale-105 transition-transform group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400">
                          $2,154.33
                        </p>
                        <span className="text-blue-400 text-sm font-medium pb-1">48% left</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-10">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium flex items-center text-white/70">
                        <Target className="h-4 w-4 mr-2 text-purple-400" />
                        Budget Usage
                      </span>
                      <span className="text-purple-400 font-medium">52%</span>
                    </div>
                    <div className="h-3 bg-[#1e1e3a] rounded-full overflow-hidden shadow-inner border border-white/5">
                      <div className="h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full w-[52%] relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_100%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_60%)]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Charts and Recent Transactions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-[#1e1e3a] to-[#2a2a4a] rounded-xl p-6 border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all">
                      <h4 className="text-sm font-medium mb-4 flex items-center text-white/70">
                        <PieChart className="h-4 w-4 mr-2 text-purple-400" />
                        Expense Categories
                      </h4>
                      <div className="flex items-center justify-center h-48 relative">
                        {/* Stylized donut chart */}
                        <div className="w-32 h-32 rounded-full border-[12px] border-purple-500/70 relative">
                          <div className="absolute inset-0 border-[12px] border-transparent border-t-pink-500/70 rounded-full transform rotate-45"></div>
                          <div className="absolute inset-0 border-[12px] border-transparent border-r-blue-500/70 rounded-full transform rotate-45"></div>
                          <div className="absolute inset-0 border-[4px] border-[#151525] rounded-full transform scale-90"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-white">52%</span>
                          </div>
                        </div>

                        {/* Blurred glow effects */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"></div>
                        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-pink-500/20 rounded-full blur-lg"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1e1e3a] to-[#2a2a4a] rounded-xl p-6 border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all">
                      <h4 className="text-sm font-medium mb-4 flex items-center text-white/70">
                        <LineChart className="h-4 w-4 mr-2 text-purple-400" />
                        Recent Transactions
                      </h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                              <span className="text-xs font-medium">GR</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-white">Grocery Shopping</span>
                              <p className="text-xs text-white/50">Today, 10:30 AM</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-white">-$85.32</span>
                        </div>

                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                              <span className="text-xs font-medium">IB</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-white">Internet Bill</span>
                              <p className="text-xs text-white/50">Yesterday, 2:15 PM</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-white">-$59.99</span>
                        </div>

                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                              <span className="text-xs font-medium">CS</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-white">Coffee Shop</span>
                              <p className="text-xs text-white/50">Jul 24, 9:45 AM</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-white">-$4.75</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      
      </main>

      {/* <footer className="border-t border-white/5 bg-[#0a0a16]">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg opacity-90 blur-[1px]"></div>
                  <DollarSign className="h-6 w-6 text-white z-10" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  BudgetPro
                </span>
              </div>
              <p className="text-white/50 mb-6 max-w-sm">
                Modern budgeting and expense tracking for everyone. Take control of your finances with powerful,
                intuitive tools designed for real people.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 py-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">© {new Date().getFullYear()} BudgetPro. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-white/40 hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-white/40 hover:text-purple-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-white/40 hover:text-purple-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  )
}
