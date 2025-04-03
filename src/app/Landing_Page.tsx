"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronRight,
  DollarSign,
  Clock,
  PieChart,
  TrendingUp,
  Shield,
  Menu,
  X,
  ChevronDown,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    howItWorks: false,
    testimonials: false,
    cta: false,
  })

  useEffect(() => {
    setIsVisible({
      hero: true,
      features: false,
      howItWorks: false,
      testimonials: false,
      cta: false,
    })

    const handleScroll = () => {
      const sections = {
        features: document.getElementById("features")?.getBoundingClientRect(),
        howItWorks: document.getElementById("how-it-works")?.getBoundingClientRect(),
        testimonials: document.getElementById("testimonials")?.getBoundingClientRect(),
        cta: document.getElementById("cta")?.getBoundingClientRect(),
      }

      if (sections.features && sections.features.top < window.innerHeight * 0.75) {
        setIsVisible((prev) => ({ ...prev, features: true }))
      }
      if (sections.howItWorks && sections.howItWorks.top < window.innerHeight * 0.75) {
        setIsVisible((prev) => ({ ...prev, howItWorks: true }))
      }
      if (sections.testimonials && sections.testimonials.top < window.innerHeight * 0.75) {
        setIsVisible((prev) => ({ ...prev, testimonials: true }))
      }
      if (sections.cta && sections.cta.top < window.innerHeight * 0.75) {
        setIsVisible((prev) => ({ ...prev, cta: true }))
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Freelance Designer",
      content:
        "This app has completely transformed how I track my expenses and manage my time. I can now see exactly where my money goes and how I spend my working hours.",
      avatar: "https://ui-avatars.com/api/?name=Mike+John",
    },
    {
      name: "Michael Chen",
      role: "Small Business Owner",
      content:
        "As a business owner, keeping track of expenses and employee hours was always a challenge. This platform has simplified everything in one place.",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen",
    },
    {
      name: "Jessica Williams",
      role: "Project Manager",
      content:
        "The weekly timesheet feature is a game-changer for our team. We've improved our productivity and budget allocation significantly.",
      avatar: "https://ui-avatars.com/api/?name=Jessica+Williams",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800">BudgetTime</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-emerald-500 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-emerald-500 transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-emerald-500 transition-colors">
              Testimonials
            </Link>
            <div className="flex items-center space-x-3">
              <Link href="/signin" className="px-4 py-2 text-emerald-600 hover:text-emerald-700 transition-colors">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
              <Link
                href="#features"
                className="text-gray-600 py-2 hover:text-emerald-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-600 py-2 hover:text-emerald-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-600 py-2 hover:text-emerald-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <Link
                  href="/signin"
                  className="w-full py-2 text-center text-emerald-600 hover:text-emerald-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="w-full py-2 text-center bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-emerald-50 to-teal-100">
          <div
            className={`container mx-auto px-4 flex flex-col md:flex-row items-center transition-all duration-1000 ${
              isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                Manage Your Budget & Time in One Place
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Track expenses, manage timesheets, and gain insights into your financial and time management habits.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/signup"
                  className="px-8 py-3 bg-emerald-500 text-white rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors group"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="px-8 py-3 border border-emerald-500 text-emerald-500 rounded-lg flex items-center justify-center hover:bg-emerald-50 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero.jpg"
                  alt="Budget and Timesheet Dashboard"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-5 -right-1 bg-white p-4 rounded-lg shadow-lg animate-bounce">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  <span className="font-bold text-gray-800">Save 30% more</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Powerful Features for Complete Financial Control
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to manage your budget and track your time efficiently
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <DollarSign className="h-10 w-10 text-emerald-500" />,
                  title: "Expense Tracking",
                  description: "Easily log and categorize your expenses. Get a clear picture of where your money goes.",
                },
                {
                  icon: <Clock className="h-10 w-10 text-emerald-500" />,
                  title: "Weekly Timesheets",
                  description:
                    "Track your working hours and projects. Generate reports for billing or productivity analysis.",
                },
                {
                  icon: <PieChart className="h-10 w-10 text-emerald-500" />,
                  title: "Visual Analytics",
                  description:
                    "Understand your spending patterns and time allocation with intuitive charts and graphs.",
                },
                {
                  icon: <TrendingUp className="h-10 w-10 text-emerald-500" />,
                  title: "Budget Planning",
                  description:
                    "Set financial goals and track your progress. Get alerts when you're approaching your limits.",
                },
                {
                  icon: <Shield className="h-10 w-10 text-emerald-500" />,
                  title: "Secure Data",
                  description:
                    "Your financial and time data is encrypted and securely stored. Access it from anywhere.",
                },
                {
                  icon: <ChevronDown className="h-10 w-10 text-emerald-500" />,
                  title: "Export Options",
                  description:
                    "Export your data in various formats for accounting, tax preparation, or further analysis.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform ${
                    isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="bg-emerald-50 p-3 rounded-lg inline-block mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Getting started is easy - follow these simple steps
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Create Your Account",
                  description: "Sign up in seconds and set up your profile with your financial goals and preferences.",
                },
                {
                  step: "02",
                  title: "Track Your Expenses",
                  description: "Log your expenses on the go. Categorize them and add notes for better organization.",
                },
                {
                  step: "03",
                  title: "Record Your Time",
                  description: "Use the weekly timesheet to track hours spent on different projects or activities.",
                },
                {
                  step: "04",
                  title: "Analyze & Optimize",
                  description:
                    "Review your spending patterns and time allocation. Make adjustments to reach your goals.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start mb-12 transition-all duration-700 ${
                    isVisible.howItWorks
                      ? "opacity-100 translate-x-0"
                      : index % 2 === 0
                        ? "opacity-0 -translate-x-20"
                        : "opacity-0 translate-x-20"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="mr-6 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                    {index < 3 && <div className="h-full w-0.5 bg-emerald-200 mx-auto mt-2"></div>}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of satisfied users who have transformed their financial and time management
              </p>
            </div>

            <div
              className={`max-w-4xl mx-auto relative transition-all duration-1000 ${
                isVisible.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-gray-50 rounded-2xl p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-300 to-teal-500"></div>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                      <Image
                        src={testimonials[activeTestimonial].avatar || "/placeholder.svg"}
                        alt={testimonials[activeTestimonial].name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="relative h-32">
                      {testimonials.map((testimonial, index) => (
                        <div
                          key={index}
                          className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                            index === activeTestimonial
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 translate-x-10 pointer-events-none"
                          }`}
                        >
                          <p className="text-gray-600 italic mb-4">{testimonial.content}</p>
                          <div>
                            <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-8 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === activeTestimonial ? "bg-emerald-500" : "bg-gray-300"
                      }`}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-20 bg-emerald-500">
          <div
            className={`container mx-auto px-4 text-center transition-all duration-1000 ${
              isVisible.cta ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Take Control of Your Finances and Time?
            </h2>
            <p className="text-xl text-emerald-50 max-w-3xl mx-auto mb-8">
              Join thousands of users who have transformed their financial habits and productivity
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/signup"
                className="px-8 py-3 bg-white text-emerald-500 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Get Started for Free
              </Link>
              <Link
                href="#features"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-emerald-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-emerald-500 p-2 rounded-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl text-white">BudgetTime</span>
              </div>
              <p className="text-gray-400 mb-4">The complete solution for budget tracking and time management.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Updates
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BudgetTime. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

