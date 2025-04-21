"use client"
import { useState } from "react"
import Link from "next/link"
import { Check, DollarSign, Shield, Zap, Star, Menu, X } from "lucide-react"

export default function PricingPageWhiteGreen() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <header className="backdrop-blur-xl sticky top-0 z-50 bg-white/90 border-b border-gray-100">
        <div className="container mx-auto px-4 flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-600 to-green-400 rounded-lg opacity-90"></div>
              <DollarSign className="h-6 w-6 text-white z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Greenor
            </span>
          </div>
          <nav className="hidden md:flex gap-8 items-center justify-center">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-800 hover:text-green-600 transition-colors relative group"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-600 to-green-400"></span>
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-all duration-300"
            >
              Log in
            </Link>
            <button className="relative overflow-hidden group bg-gradient-to-tr from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg">
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
          <button className="md:hidden text-gray-800" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg px-4 py-4 flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-green-600 transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-green-600 transition-colors">
              Log in
            </Link>
            <button className="bg-gradient-to-tr from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 p-2 px-4 rounded-full text-white w-full">
              Join Waitlist
            </button>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="w-full py-20 md:py-28 lg:py-32 relative overflow-hidden isolate">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100"></div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(74,222,128,0.15)_0%,rgba(0,0,0,0)_60%)]"></div>

          {/* Geometric Decorations */}
          <div className="absolute w-96 h-96 -top-20 -right-20 bg-green-500/10 rounded-full blur-3xl animate-slow-pulse"></div>
          <div className="absolute w-96 h-96 -bottom-20 -left-20 bg-green-600/10 rounded-full blur-3xl animate-slow-pulse delay-200"></div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-10 w-12 h-12 bg-green-50 backdrop-blur-xl rounded-xl rotate-12 animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-10 w-20 h-20 bg-green-50 backdrop-blur-xl rounded-full -rotate-12 animate-float-slower"></div>

          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center backdrop-blur-md bg-green-50 rounded-full px-4 py-2 text-green-800 mb-6 animate-fade-in shadow-sm">
                <Star className="h-4 w-4 mr-2 text-green-600" />
                <span className="text-sm font-medium">Transparent, Value-Based Pricing</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 animate-slide-up leading-tight">
                Choose the right plan for your
                <span className="relative mt-2 block">
                  <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent drop-shadow-sm">
                    financial journey
                  </span>
                  <span className="absolute -bottom-2 -right-8 w-12 h-12 bg-green-500/20 rounded-full blur-xl z-0"></span>
                </span>
              </h1>

              <p className="text-gray-600 text-xl max-w-[900px] mb-8 animate-slide-up-delayed leading-relaxed">
                Whether you&apos;re just starting out or managing complex finances, we have a plan that fits your needs.
                All plans include our core features with no hidden fees.
              </p>

              <div className="flex items-center gap-4 p-2 bg-white rounded-full animate-slide-up-more-delayed shadow-md">
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-green-500 text-white font-medium shadow-md">
                  Monthly
                </button>
                <button className="px-6 py-3 rounded-full text-gray-600 hover:text-gray-800 font-medium transition-colors">
                  Yearly <span className="ml-1 text-xs bg-green-100 px-2 py-1 rounded-full">Save 20%</span>
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
                <div className="absolute -inset-0.5 bg-gradient-to-br from-green-200/30 to-green-300/30 opacity-75 blur-lg rounded-3xl -z-10 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
                  <div className="p-6 space-y-4">
                    <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border border-green-100">
                      <Zap className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                    <p className="text-gray-500 h-12">Essential budgeting tools for individuals</p>
                    <div className="flex items-baseline text-gray-900 pt-4">
                      <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                        $0
                      </span>
                      <span className="ml-2 text-sm font-medium text-gray-500">/month</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100"></div>

                  <div className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">Basic budget management</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">Up to 50 expense entries per month</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">Basic analytics</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">CSV export</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-gray-50">
                    <button className="w-full border border-green-500 hover:bg-green-50 text-green-600 font-medium py-3 px-4 rounded-xl transition-colors">
                      Join Waitlist
                    </button>
                  </div>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/30 to-green-400/30 opacity-90 blur-lg rounded-3xl -z-10 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
                  <div className="absolute top-0 inset-x-0 mx-auto w-fit">
                    <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-2 rounded-full shadow-md text-sm font-bold uppercase tracking-wide">
                      Most Popular
                    </div>
                  </div>

                  <div className="p-6 space-y-4 pt-10">
                    <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border border-green-100">
                      <Star className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
                    <p className="text-gray-500 h-12">Advanced tools for serious budgeters</p>
                    <div className="flex items-baseline text-gray-900 pt-4">
                      <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                        $9.99
                      </span>
                      <span className="ml-2 text-sm font-medium text-gray-500">/month</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100"></div>

                  <div className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">Everything in Free</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">Unlimited expense entries</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">Advanced analytics and reporting</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">Time tracking features</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">CSV and PDF export</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">Email support</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-gray-50">
                    <button className="relative overflow-hidden group w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg">
                      <div className="absolute -inset-full top-0 block bg-gradient-to-r from-white/20 via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                      <span className="relative z-10">Join Waitlist</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Business Plan */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-green-400/30 to-green-500/30 opacity-75 blur-lg rounded-3xl -z-10 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
                  <div className="p-6 space-y-4">
                    <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border border-green-100">
                      <Shield className="h-7 w-7 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Business</h3>
                    <p className="text-gray-500 h-12">Complete solution for businesses and teams</p>
                    <div className="flex items-baseline text-gray-900 pt-4">
                      <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                        $29.99
                      </span>
                      <span className="ml-2 text-sm font-medium text-gray-500">/month</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100"></div>

                  <div className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">Everything in Pro</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">Multi-user access</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">Role-based permissions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">Advanced reporting and forecasting</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">API access</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">Priority support</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-gray-50">
                    <button className="w-full border border-green-500 hover:bg-green-50 text-green-600 font-medium py-3 px-4 rounded-xl transition-colors">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-gray-50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-40 right-0 w-80 h-80 bg-green-500/5 rounded-full"></div>
          <div className="absolute -bottom-40 left-0 w-80 h-80 bg-green-500/5 rounded-full"></div>

          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center bg-green-50 rounded-full px-4 py-1.5 mb-4 border border-green-100">
                <span className="text-sm font-medium text-green-800">Compare Plans</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900 tracking-tight">Feature Comparison</h2>
              <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                Compare our plans to find the perfect fit for your financial needs.
              </p>
            </div>

            <div className="max-w-6xl mx-auto overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-gray-50 px-6 py-5 text-left text-sm font-semibold text-gray-900">Features</th>
                      <th className="bg-gray-50 px-6 py-5 text-center text-sm font-semibold text-gray-900">Free</th>
                      <th className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-5 text-center text-sm font-semibold text-gray-900">
                        Pro
                      </th>
                      <th className="bg-gray-50 px-6 py-5 text-center text-sm font-semibold text-gray-900">Business</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="px-6 py-4 text-sm text-gray-900">Budget Creation</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Basic</td>
                      <td className="px-6 py-4 text-center bg-gradient-to-r from-green-50 to-green-100 text-sm text-gray-900">
                        Advanced
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Advanced</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-6 py-4 text-sm text-gray-900">Expense Tracking</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Limited (50/mo)</td>
                      <td className="px-6 py-4 text-center bg-gradient-to-r from-green-50 to-green-100 text-sm text-gray-900">
                        Unlimited
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Unlimited</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-6 py-4 text-sm text-gray-900">Data Visualization</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Basic</td>
                      <td className="px-6 py-4 text-center bg-gradient-to-r from-green-50 to-green-100 text-sm text-gray-900">
                        Advanced
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Advanced+</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-6 py-4 text-sm text-gray-900">Export Options</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">CSV only</td>
                      <td className="px-6 py-4 text-center bg-gradient-to-r from-green-50 to-green-100 text-sm text-gray-900">
                        CSV, PDF
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">All formats</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-6 py-4 text-sm text-gray-900">Time Tracking</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        <svg
                          className="w-5 h-5 mx-auto text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 text-center bg-gradient-to-r from-green-50 to-green-100 text-sm text-gray-900">
                        <svg
                          className="w-5 h-5 mx-auto text-green-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        <svg
                          className="w-5 h-5 mx-auto text-green-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
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
        <section className="w-full py-20 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-200 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-200 to-transparent"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center bg-green-50 rounded-full px-4 py-1.5 mb-4 border border-green-100">
                <span className="text-sm font-medium text-green-800">FAQ</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900 tracking-tight">Frequently Asked Questions</h2>
              <p className="max-w-2xl mx-auto text-gray-600 text-lg">Got questions? We&apos;ve got answers.</p>
            </div>

            <div className="max-w-4xl mx-auto grid gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Can I switch plans later?</h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                  billing cycle. We make it easy to adjust your subscription as your needs change.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Is there a free trial?</h3>
                <p className="text-gray-600">
                  We offer a 14-day free trial for our Pro and Business plans. No credit card required to get started.
                  Experience all the premium features before making a commitment.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How secure is my financial data?</h3>
                <p className="text-gray-600">
                  We use bank-level encryption to protect your data. Your security is our top priority. All data is
                  encrypted both in transit and at rest, and we never share your information with third parties.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Can I cancel my subscription?</h3>
                <p className="text-gray-600">
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
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white"></div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(74,222,128,0.2)_0%,rgba(0,0,0,0)_60%)]"></div>

          {/* Geometric Decorations */}
          <div className="absolute w-96 h-96 -top-20 -right-20 bg-green-500/10 rounded-full blur-3xl animate-slow-pulse"></div>
          <div className="absolute w-96 h-96 -bottom-20 -left-20 bg-green-600/10 rounded-full blur-3xl animate-slow-pulse delay-200"></div>

          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                Ready to transform your financial management?
              </h2>
              <p className="text-gray-600 text-xl max-w-2xl">
                Join thousands of users who have already discovered the power of Greenor. Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                <button className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-2xl px-10 py-4 font-medium text-base shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1 flex-1">
                  <div className="absolute inset-0 w-3 bg-gradient-to-r from-white/10 to-white/5 transition-all duration-500 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    Join Waitlist
                    <svg
                      className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
                <button className="relative overflow-hidden bg-white text-gray-800 border border-gray-200 rounded-2xl px-10 py-4 font-medium text-base transition-all duration-300 hover:border-green-300 flex-1">
                  <span className="relative z-10">Contact Sales</span>
                </button>
              </div>
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
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-600 to-green-400 rounded-lg opacity-90 blur-[1px]"></div>
                  <DollarSign className="h-6 w-6 text-white z-10" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  Greenor
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
                  <Link href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-500 hover:text-green-600 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 py-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Greenor. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
