'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/dashboard/PageHeader'
import DashboardCard from '@/components/dashboard/DashboardCard'
import Link from 'next/link'

interface DayEntry {
  date: string
  hours: string
  description: string
}

interface TimesheetFormData {
  weekStarting: string
  days: DayEntry[]
  notes: string
}

export default function CreateTimesheet() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Get the current week's Monday
  const getMonday = (d: Date) => {
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is Sunday
    return new Date(d.setDate(diff))
  }
  
  const monday = getMonday(new Date())
  
  // Initialize the week days
  const initDays = () => {
    const days: DayEntry[] = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      days.push({
        date: date.toISOString().split('T')[0],
        hours: '',
        description: ''
      })
    }
    return days
  }
  
  const [formData, setFormData] = useState<TimesheetFormData>({
    weekStarting: monday.toISOString().split('T')[0],
    days: initDays(),
    notes: ''
  })

  const handleWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeekStarting = e.target.value
    const newMonday = new Date(newWeekStarting)
    
    // Update all days based on the new week starting date
    const newDays = formData.days.map((day, index) => {
      const date = new Date(newMonday)
      date.setDate(newMonday.getDate() + index)
      return {
        ...day,
        date: date.toISOString().split('T')[0]
      }
    })
    
    setFormData({
      ...formData,
      weekStarting: newWeekStarting,
      days: newDays
    })
  }

  const handleDayChange = (index: number, field: keyof DayEntry, value: string) => {
    const newDays = [...formData.days]
    newDays[index] = {
      ...newDays[index],
      [field]: value
    }
    setFormData({
      ...formData,
      days: newDays
    })
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      notes: e.target.value
    })
  }

  const getTotalHours = () => {
    return formData.days.reduce((total, day) => {
      return total + (parseFloat(day.hours) || 0)
    }, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would submit this data to your API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
      
      console.log('Timesheet created:', formData)
      router.push('/dashboard/timesheets')
    } catch (error) {
      console.error('Failed to create timesheet:', error)
      setIsSubmitting(false)
    }
  }

  // Day names for display
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <div>
      <PageHeader 
        title="Log Time" 
        description="Record your working hours for the week"
        action={
          <Link 
            href="/dashboard/timesheets"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Cancel
          </Link>
        }
      />

      <DashboardCard title="Weekly Timesheet">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="weekStarting" className="block text-sm font-medium text-gray-700">
              Week Starting (Monday)
            </label>
            <input
              type="date"
              name="weekStarting"
              id="weekStarting"
              required
              value={formData.weekStarting}
              onChange={handleWeekChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Day
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Hours
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {formData.days.map((day, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {dayNames[index]}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(day.date).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <input
                        type="number"
                        min="0"
                        max="24"
                        step="0.5"
                        value={day.hours}
                        onChange={(e) => handleDayChange(index, 'hours', e.target.value)}
                        className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <input
                        type="text"
                        value={day.description}
                        onChange={(e) => handleDayChange(index, 'description', e.target.value)}
                        placeholder="What did you work on?"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    Total
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-bold text-gray-900">
                    {getTotalHours()} hrs
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleNotesChange}
              placeholder="Any additional information about this week's work"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Timesheet'}
            </button>
          </div>
        </form>
      </DashboardCard>
    </div>
  )
}
