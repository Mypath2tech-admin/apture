"use client"
import {useState} from 'react'
import Link from "next/link"
import { Check, DollarSign, Shield, Zap, Star, Menu, X } from "lucide-react"

export default function PricingPage() {
     const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a16] text-white">
      <header className=" backdrop-blur-xl sticky top-0  z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15)_0%,rgba(0,0,0,0)_60%)]"></div>
        <div className="container mx-auto px-4 flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-green-400 rounded-lg opacity-90 "></div>
              <DollarSign className="h-6 w-6 text-white z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
              Apture
            </span>
          </div>
          <nav className="hidden md:flex gap-8 items-center justify-center">
            <Link
              href="/"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              href="/pricing"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>

          </nav>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm font-medium text-white/80 hover:text-white transition-all duration-300"
            >
              Log in
            </Link>
            <button className="relative overflow-hidden group bg-gradient-to-tr from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white px-4 py-2 rounded-2xl transition-all duration-300 ">
              <div className="absolute -inset-full top-0 block bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-all"></div>
              <span className="font-medium flex items-center">
                Join Waitlist
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
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#151525] shadow-lg px-4 py-4 flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium hover:text-gray-200 transition-colors">Home</Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-gray-200 transition-colors">Pricing</Link>
            <Link href="/login" className="text-sm font-medium hover:text-gray-200 transition-colors">Log in</Link>
            <button className="bg-gradient-to-tr from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 p-2 px-4 rounded-full text-white w-full">Join Waitlist</button>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="w-full py-20 md:py-28 lg:py-32 relative overflow-hidden isolate">
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
          
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center backdrop-blur-md bg-white/5 rounded-full px-4 py-2 text-white mb-6 animate-fade-in shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <Star className="h-4 w-4 mr-2 text-purple-400" />
                <span className="text-sm font-medium">Transparent, Value-Based Pricing</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 animate-slide-up leading-tight">
                Choose the right plan for your
                <span className="relative mt-2 block">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">financial journey</span>
                  <span className="absolute -bottom-2 -right-8 w-12 h-12 bg-purple-500/20 rounded-full blur-xl z-0"></span>
                </span>
              </h1>
              
              <p className="text-white/70 text-xl max-w-[900px] mb-8 animate-slide-up-delayed leading-relaxed">
                Whether you&apos;re just starting out or managing complex finances, we have a plan that fits your needs.
                All plans include our core features with no hidden fees.
              </p>
              
              <div className="flex items-center gap-4 p-2 bg-white/5 backdrop-blur-md rounded-full animate-slide-up-more-delayed shadow-lg">
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  Monthly
                </button>
                <button className="px-6 py-3 rounded-full text-white/80 hover:text-white font-medium transition-colors">
                  Yearly <span className="ml-1 text-xs bg-white/10 px-2 py-1 rounded-full">Save 20%</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-transparent relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 -mt-32 md:-mt-40">
              {/* Free Plan */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-200/30 to-pink-200/30 opacity-75 blur-lg rounded-3xl -z-10 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-[#151525] rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] border border-white/10">
                  <div className="p-6 space-y-4">
                    <div className="bg-white/5 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
                      <Zap className="h-7 w-7 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Free</h3>
                    <p className="text-white/50 h-12">Essential budgeting tools for individuals</p>
                    <div className="flex items-baseline text-white pt-4">
                      <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">$0</span>
                      <span className="ml-2 text-sm font-medium text-white/50">/month</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/5"></div>
                  
                  <div className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-purple-400" />
                        </div>
                        <span className="text-white/70">Basic budget management</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-purple-400" />
                        </div>
                        <span className="text-white/70">Up to 50 expense entries per month</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-purple-400" />
                        </div>
                        <span className="text-white/70">Basic analytics</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-purple-400" />
                        </div>
                        <span className="text-white/70">CSV export</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-white/5">
                    <button className="w-full border border-purple-500 hover:bg-purple-500/10 text-purple-400 font-medium py-3 px-4 rounded-xl transition-colors">
                      Join  Waitlist
                    </button>
                  </div>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/30 to-pink-500/30 opacity-90 blur-lg rounded-3xl -z-10 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-[#151525] rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-white/10">
                  <div className="absolute top-0 inset-x-0 mx-auto w-fit">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-2 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] text-sm font-bold uppercase tracking-wide">
                      Most Popular
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4 pt-10">
                    <div className="bg-white/5 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
                      <Star className="h-7 w-7 text-pink-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Pro</h3>
                    <p className="text-white/50 h-12">Advanced tools for serious budgeters</p>
                    <div className="flex items-baseline text-white pt-4">
                      <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">$9.99</span>
                      <span className="ml-2 text-sm font-medium text-white/50">/month</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/5"></div>
                  
                  <div className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-pink-400" />
                        </div>
                        <span className="text-white/70">Everything in Free</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-pink-400" />
                        </div>
                        <span className="text-white/70">Unlimited expense entries</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-pink-400" />
                        </div>
                        <span className="text-white/70">Advanced analytics and reporting</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-pink-400" />
                        </div>
                        <span className="text-white/70">Time tracking features</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-pink-400" />
                        </div>
                        <span className="text-white/70">CSV and PDF export</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-pink-400" />
                        </div>
                        <span className="text-white/70">Email support</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-white/5">
                    <button className="relative overflow-hidden group w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                      <div className="absolute -inset-full top-0 block bg-gradient-to-r from-white/20 via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                      <span className="relative z-10">Join  Waitlist</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Business Plan */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/30 to-purple-500/30 opacity-75 blur-lg rounded-3xl -z-10 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-[#151525] rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(96,165,250,0.3)] border border-white/10">
                  <div className="p-6 space-y-4">
                    <div className="bg-white/5 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
                      <Shield className="h-7 w-7 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Business</h3>
                    <p className="text-white/50 h-12">Complete solution for businesses and teams</p>
                    <div className="flex items-baseline text-white pt-4">
                      <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">$29.99</span>
                      <span className="ml-2 text-sm font-medium text-white/50">/month</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/5"></div>
                  
                  <div className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-blue-400" />
                        </div>
                        <span className="text-white/70">Everything in Pro</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-blue-400" />
                        </div>
                        <span className="text-white/70">Multi-user access</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-blue-400" />
                        </div>
                        <span className="text-white/70">Role-based permissions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-blue-400" />
                        </div>
                        <span className="text-white/70">Advanced reporting and forecasting</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-blue-400" />
                        </div>
                        <span className="text-white/70">API access</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-blue-400" />
                        </div>
                        <span className="text-white/70">Priority support</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-white/5">
                    <button className="w-full border border-blue-500 hover:bg-blue-500/10 text-blue-400 font-medium py-3 px-4 rounded-xl transition-colors">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-[#0f0f1a] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-40 right-0 w-80 h-80 bg-purple-500/5 rounded-full"></div>
          <div className="absolute -bottom-40 left-0 w-80 h-80 bg-pink-500/5 rounded-full"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 mb-4 border border-white/10">
                <span className="text-sm font-medium text-white/70">Compare Plans</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-white tracking-tight">
                Feature Comparison
              </h2>
              <p className="max-w-2xl mx-auto text-white/60 text-lg">
                Compare our plans to find the perfect fit for your financial needs.
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto overflow-hidden rounded-xl border border-white/10 bg-[#151525] shadow-[0_0_25px_rgba(0,0,0,0.3)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-white/5 px-6 py-5 text-left text-sm font-semibold text-white">Features</th>
                      <th className="bg-white/5 px-6 py-5 text-center text-sm font-semibold text-white">Free</th>
                      <th className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-6 py-5 text-center text-sm font-semibold text-white">Pro</th>
                      <th className="bg-white/5 px-6 py-5 text-center text-sm font-semibold text-white">Business</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-white/5">
                      <td className="px-6 py-4 text-sm text-white">Budget Creation</td>
                      <td className="px-6 py-4 text-center text-sm text-white/70">Basic</td>
                      <td className="px-6 py-4 text-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-sm text-white">Advanced</td>
                      <td className="px-6 py-4 text-center text-sm text-white/70">Advanced</td>
                    </tr>
                    <tr className="border-t border-white/5">
                      <td className="px-6 py-4 text-sm text-white">Expense Tracking</td>
                      <td className="px-6 py-4 text-center text-sm text-white/70">Limited (50/mo)</td>
                      <td className="px-6 py-4 text-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-sm text-white">Unlimited</td>
                      <td className="px-6 py-4 text-center text-sm text-white/70">Unlimited</td>
                    </tr>
                    <tr className="border-t border-white/5">
                      <td className="px-6 py-4 text-sm text-white">Data Visualization</td>
                      <td className="px-6 py-4 text-center text-sm text-white/70">Basic</td>
                      <td className="px-6 py-4 text-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-sm text-white">Advanced</td>
                      <td className="px-6 py-4 text-center text-sm text-white/70">Advanced+</td>
                    </tr>
                    <tr className="border-t border-white/5">
                      <td className="px-6 py-4 text-sm text-white">Export Options</td>
                      <td className="px-6 py-4 text-center text-sm text-white/70">CSV only</td>
                      <td className="px-6 py-4 text-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-sm text-white">CSV, PDF</td>
                      <td className="px-6 py-4 text-center text-sm text-white/70">All formats</td>
                    </tr>
                    <tr className="border-t border-white/5">
                      <td className="px-6 py-4 text-sm text-white">Time Tracking</td>
                      <td className="px-6 py-4 text-center text-sm text-white/70">
                        <svg className="w-5 h-5 mx-auto text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 text-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-sm text-white">
                        <svg className="w-5 h-5 mx-auto text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-white/70">
                        <svg className="w-5 h-5 mx-auto text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-20 bg-[#0a0a16] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 mb-4 border border-white/10">
                <span className="text-sm font-medium text-white/70">FAQ</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="max-w-2xl mx-auto text-white/60 text-lg">
                Got questions? We&apos;ve got answers.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto grid gap-6">
              <div className="bg-[#151525] rounded-xl border border-white/10 p-6 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all">
                <h3 className="text-xl font-bold text-white mb-4">Can I switch plans later?</h3>
                <p className="text-white/60">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                  billing cycle. We make it easy to adjust your subscription as your needs change.
                </p>
              </div>
              
              <div className="bg-[#151525] rounded-xl border border-white/10 p-6 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all">
                <h3 className="text-xl font-bold text-white mb-4">Is there a free trial?</h3>
                <p className="text-white/60">
                  We offer a 14-day free trial for our Pro and Business plans. No credit card required to get started.
                  Experience all the premium features before making a commitment.
                </p>
              </div>
              
              <div className="bg-[#151525] rounded-xl border border-white/10 p-6 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all">
                <h3 className="text-xl font-bold text-white mb-4">How secure is my financial data?</h3>
                <p className="text-white/60">
                  We use bank-level encryption to protect your data. Your security is our top priority. All data is
                  encrypted both in transit and at rest, and we never share your information with third parties.
                </p>
              </div>
              
              <div className="bg-[#151525] rounded-xl border border-white/10 p-6 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all">
                <h3 className="text-xl font-bold text-white mb-4">Can I cancel my subscription?</h3>
                <p className="text-white/60">
                  Yes, you can cancel your subscription at any time from your account settings. There are no long-term
                  contracts or cancellation fees. You&apos;ll maintain access until the end of your billing period.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden isolate">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-[#151525]"></div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.2)_0%,rgba(0,0,0,0)_60%)]"></div>

          {/* Geometric Decorations */}
          <div className="absolute w-96 h-96 -top-20 -right-20 bg-purple-500/20 rounded-full blur-3xl animate-slow-pulse"></div>
          <div className="absolute w-96 h-96 -bottom-20 -left-20 bg-pink-600/20 rounded-full blur-3xl animate-slow-pulse delay-200"></div>

          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Ready to transform your financial management?
              </h2>
              <p className="text-white/70 text-xl max-w-2xl">
                Join thousands of users who have already discovered the power of BudgetPro. Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                <button className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl px-10 py-4 font-medium text-base shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] transition-all duration-500 hover:-translate-y-1 flex-1">
                  <div className="absolute inset-0 w-3 bg-gradient-to-r from-white/10 to-white/5 transition-all duration-500 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    Join  Waitlist
                    <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
                <button className="relative overflow-hidden bg-transparent hover:bg-white/5 text-white border border-white/20 rounded-2xl px-10 py-4 font-medium text-base transition-all duration-300 backdrop-blur-sm flex-1">
                  <span className="relative z-10">Contact Sales</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/5 bg-[#0a0a16]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col justify-between md:flex-row gap-10">

            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-green-400 rounded-lg opacity-90 blur-[1px]"></div>
                  <DollarSign className="h-6 w-6 text-white z-10" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                  Apture
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
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">Quick links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-white/50 hover:text-purple-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-white/50 hover:text-purple-400 transition-colors">
                    Pricing
                  </Link>
                </li>

              </ul>
            </div>


          </div>
        </div>
        <div className="border-t border-white/5 py-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">© {new Date().getFullYear()} Apture. All rights reserved.</p>
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
      </footer>
    </div>
  )
}
