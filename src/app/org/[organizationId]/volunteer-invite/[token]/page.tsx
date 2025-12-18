'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'react-toastify'

interface Organization {
  id: string
  name: string
  logo: string | null
}

export default function VolunteerInvitePage() {
  const params = useParams()
  const router = useRouter()
  const organizationId = params.organizationId as string
  const token = params.token as string

  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  })

  // Validate invite and get organization info
  useEffect(() => {
    async function validateInvite() {
      try {
        const response = await fetch(
          `/api/volunteers/validate-invite?organizationId=${organizationId}&token=${token}`
        )

        if (!response.ok) {
          const error = await response.json()
          toast.error(error.error || 'Invalid invite link')
          router.push('/')
          return
        }

        const data = await response.json()
        setOrganization(data.organization)
      } catch (error) {
        console.error('Error validating invite:', error)
        toast.error('Failed to validate invite link')
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    if (organizationId && token) {
      validateInvite()
    }
  }, [organizationId, token, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/volunteers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          organizationId,
          token,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.error || 'Failed to submit volunteer application')
        return
      }

      toast.success('Volunteer application submitted successfully! Your application is pending approval.')
      setFormData({ name: '', email: '', role: '' })
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Failed to submit volunteer application')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Validating invite link...</p>
        </div>
      </div>
    )
  }

  if (!organization) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {organization.logo && (
            <div className="flex justify-center mb-4">
              <img
                src={organization.logo}
                alt={organization.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>
          )}
          <CardTitle className="text-2xl">Join as a Volunteer</CardTitle>
          <CardDescription>
            {organization.name} is inviting you to become a volunteer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Input
                id="role"
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g., Event Coordinator, Fundraiser, etc."
              />
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Your application will be reviewed by the organization. You'll receive an email once a decision is made.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

