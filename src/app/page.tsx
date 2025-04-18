"use client"
import Link from "next/link"
import { ArrowRight, DollarSign, Sparkles, Menu, X } from "lucide-react"
import { useState } from "react"
// import {  BarChart3, Calendar, PieChart } from "lucide-react"
// import { button } from "@/components/ui/button"

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="flex flex-col min-h-screen  bg-linear-to-br from-white to-emerald-500">
      <header className="sticky top-0 z-50 ">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">Greenor</span>
          </div>

          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-emerald-600 transition-colors">Home</Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-emerald-600 transition-colors">Pricing</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-emerald-600 transition-colors">Log in</Link>
            <button className="bg-emerald-600 hover:bg-emerald-700 p-2 px-4 rounded-full text-white">Join Waitlist</button>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg px-4 py-4 flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium hover:text-emerald-600 transition-colors">Home</Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-emerald-600 transition-colors">Pricing</Link>
            <Link href="/login" className="text-sm font-medium hover:text-emerald-600 transition-colors">Log in</Link>
            <button className="bg-emerald-600 hover:bg-emerald-700 p-2 px-4 rounded-full text-white w-full">Join Waitlist</button>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden bg-linear-to-br from-white to-emerald-500">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[10%] -ight-[10%] w-[40%] h-[40%] rounded-full bg-emerald-100/40 blur-3xl"></div>
            <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-100/40 blur-3xl"></div>
          </div>

          <div className="container px-4 md:px-6 relative"
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-20">
              <div className="inline-flex justify-center gap-2 items-center rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700 mb-6 animate-fade-in">
                <Sparkles className="w-4" /> Modern Budget Management
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none text-emerald-950 mb-6 animate-slide-up"
               data-aos="fade-up"
               data-aos-delay="100"
               data-aos-duration="1000">
                Unleash the power of <br />
                <span className="text-emerald-600">intuitive budgeting</span>
              </h1>
              <p className="text-gray-600 md:text-xl max-w-[800px] mb-8 animate-slide-up-delayed"
               data-aos="fade-up"
               data-aos-delay="200"
               data-aos-duration="1000">
                Say goodbye to outdated financial tools. Take control of your finances with a modern, intuitive budget
                and expense tracking solution designed for today&apos;s needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up-more-delayed"
               data-aos="fade-up"
               data-aos-delay="300"
               data-aos-duration="1000">
                <button className="bg-emerald-600 flex h-max text-white p-2 px-4 rounded-full text-base font-semibold hover:scale-110 transition-all duration-300">
                  Get Started
                  <ArrowRight className="ml-2  w-4" />
                </button>
                <button
                  className="rounded-full p-2 px-4 h-max font-medium text-base border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-all duration-300"
                >
                  Learn more
                </button>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative max-w-5xl mx-auto animate-float">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-emerald-500/20 rounded-2xl transform rotate-1 scale-[1.03] blur-sm"></div>
              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-emerald-100">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-500 h-2"></div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-6 w-6 text-emerald-600" />
                      <h3 className="font-semibold text-emerald-950">Monthly Budget Overview</h3>
                    </div>
                    <span className="text-sm text-gray-500">March 2024</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="1000">
                    <div className="bg-emerald-50 p-5 rounded-lg border border-emerald-100" data-aos="zoom-in" data-aos-delay="150">
                      <p className="text-sm text-gray-500 mb-1">Total Budget</p>
                      <p className="text-2xl font-bold text-emerald-700">$4,500.00</p>
                    </div>
                    <div className="bg-emerald-50 p-5 rounded-lg border border-emerald-100" data-aos="zoom-in" data-aos-delay="250">
                      <p className="text-sm text-gray-500 mb-1">Spent</p>
                      <p className="text-2xl font-bold text-emerald-700">$2,345.67</p>
                    </div>
                    <div className="bg-emerald-50 p-5 rounded-lg border border-emerald-100" data-aos="zoom-in" data-aos-delay="350">
                      <p className="text-sm text-gray-500 mb-1">Remaining</p>
                      <p className="text-2xl font-bold text-emerald-700">$2,154.33</p>
                    </div>
                  </div>

                  <div className="mb-4"  data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="1000">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Budget Usage</span>
                      <span className="text-emerald-700 font-medium">52%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-emerald-500 rounded-full w-[52%]"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6"  data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="1000">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h4 className="text-sm font-medium mb-3">Expense Categories</h4>
                      <div className="flex items-center justify-center h-32">
                        <div className="w-24 h-24 rounded-full border-[6px] border-emerald-500 relative">
                          <div className="absolute inset-0 border-[6px] border-transparent border-t-teal-400 rounded-full transform rotate-45"></div>
                          <div className="absolute inset-0 border-[6px] border-transparent border-r-blue-400 rounded-full transform rotate-45"></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100" data-aos="fade-up">
                      <h4 className="text-sm font-medium mb-3">Recent Transactions</h4>
                      <div className="space-y-3"  data-aos="fade-up" data-aos-delay="100">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span className="text-sm">Grocery Shopping</span>
                          </div>
                          <span className="text-sm font-medium">$85.32</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                            <span className="text-sm">Internet Bill</span>
                          </div>
                          <span className="text-sm font-medium">$59.99</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-sm">Coffee Shop</span>
                          </div>
                          <span className="text-sm font-medium">$4.75</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-emerald-950">
                  Everything you need.
                  <br />
                  Nothing you don't.
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Financial management and visibility in one place. Experience a flexible toolkit that makes every task
                  feel like a breeze.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-xl font-bold">Budget Management</h3>
                  </div>
                  <p className="text-gray-500">
                    Create and manage budgets for different time periods. Track your spending against your budget in
                    real-time.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-xl font-bold">Expense Tracking</h3>
                  </div>
                  <p className="text-gray-500">
                    Record and categorize expenses with ease. Add notes, attach receipts, and never lose track of where
                    your money goes.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-xl font-bold">Insightful Analytics</h3>
                  </div>
                  <p className="text-gray-500">
                    Visualize your spending patterns with beautiful charts and graphs. Gain insights to make better
                    financial decisions.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-xl font-bold">Time Tracking</h3>
                  </div>
                  <p className="text-gray-500">
                    Track time spent on different projects and categories. Connect time investments to financial
                    outcomes.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100 p-2">
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-lg">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5">
                      <div className="bg-white rounded-lg shadow-xl p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold text-emerald-800">Expense Distribution</h3>
                          <span className="text-xs text-gray-500">July 2023</span>
                        </div>
                        <div className="aspect-square bg-white rounded-lg flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full border-8 border-emerald-500 relative">
                            <div className="absolute inset-0 border-8 border-transparent border-t-teal-400 rounded-full transform rotate-45"></div>
                            <div className="absolute inset-0 border-8 border-transparent border-r-blue-400 rounded-full transform rotate-45"></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                            <span className="text-xs">Housing</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                            <span className="text-xs">Food</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                            <span className="text-xs">Transport</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready for smarter, more efficient budgeting?
                </h2>
                <p className="mx-auto max-w-[700px] text-emerald-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Try Greenor  today. It's free to get started.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <button className="bg-white text-emerald-900 hover:bg-emerald-50">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  <button variant="outline" className="border-white text-white hover:bg-emerald-800">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
         */}
      </main>

      {/* <footer className="border-t bg-white">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex flex-col gap-2 md:gap-4 lg:flex-1">
            <div className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-emerald-600" />
              <span className="text-xl font-bold">Greenor </span>
            </div>
            <p className="text-sm text-gray-500">Modern budgeting and expense tracking for everyone.</p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} Greenor . All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs text-gray-500 hover:text-emerald-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-emerald-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-emerald-600 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  )
}
