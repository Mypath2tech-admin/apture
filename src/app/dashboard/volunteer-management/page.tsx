'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Copy, Check } from 'lucide-react'

interface Volunteer {
  id: string
  name: string
  email: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  role: string
  volunteerDate: string
  createdAt: string
}

export default function VolunteerManagement() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [filteredVolunteers, setFilteredVolunteers] = useState<Volunteer[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [inviteLink, setInviteLink] = useState('')
  const [linkCopied, setLinkCopied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [generatingInvite, setGeneratingInvite] = useState(false)
  const [approvingVolunteer, setApprovingVolunteer] = useState<string | null>(null)
  const [rejectingVolunteer, setRejectingVolunteer] = useState<string | null>(null)

  // Fetch volunteers
  useEffect(() => {
    fetchVolunteers()
  }, [])

  // Filter volunteers
  useEffect(() => {
    let filtered = volunteers

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.role.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((v) => v.status === statusFilter.toUpperCase())
    }

    setFilteredVolunteers(filtered)
  }, [volunteers, searchTerm, statusFilter])

  const fetchVolunteers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/volunteers')
      if (!response.ok) {
        throw new Error('Failed to fetch volunteers')
      }
      const data = await response.json()
      setVolunteers(data)
    } catch (error) {
      console.error('Error fetching volunteers:', error)
      toast.error('Failed to load volunteers')
    } finally {
      setLoading(false)
    }
  }

  const handleInviteClick = async () => {
    try {
      setGeneratingInvite(true)
      const response = await fetch('/api/volunteers/invite')
      if (!response.ok) {
        throw new Error('Failed to generate invite link')
      }
      const data = await response.json()
      setInviteLink(data.inviteLink)
      setIsInviteDialogOpen(true)
    } catch (error) {
      console.error('Error generating invite link:', error)
      toast.error('Failed to generate invite link')
    } finally {
      setGeneratingInvite(false)
    }
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setLinkCopied(true)
    toast.success('Invite link copied to clipboard!')
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleApprove = async (volunteerId: string) => {
    try {
      setApprovingVolunteer(volunteerId)
      const response = await fetch(`/api/volunteers/${volunteerId}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'approve' }),
      })

      if (!response.ok) {
        throw new Error('Failed to approve volunteer')
      }

      toast.success('Volunteer approved successfully')
      fetchVolunteers()
    } catch (error) {
      console.error('Error approving volunteer:', error)
      toast.error('Failed to approve volunteer')
    } finally {
      setApprovingVolunteer(null)
    }
  }

  const handleReject = async (volunteerId: string) => {
    try {
      setRejectingVolunteer(volunteerId)
      const response = await fetch(`/api/volunteers/${volunteerId}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'reject' }),
      })

      if (!response.ok) {
        throw new Error('Failed to reject volunteer')
      }

      toast.success('Volunteer rejected')
      fetchVolunteers()
    } catch (error) {
      console.error('Error rejecting volunteer:', error)
      toast.error('Failed to reject volunteer')
    } finally {
      setRejectingVolunteer(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            Approved
          </span>
        )
      case 'PENDING':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
            Pending
          </span>
        )
      case 'REJECTED':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
            Rejected
          </span>
        )
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>
    }
  }

  // Calculate metrics
  const totalVolunteers = volunteers.length
  const activeVolunteers = volunteers.filter((v) => v.status === 'APPROVED').length
  const newThisMonth = volunteers.filter((v) => {
    const volunteerDate = new Date(v.volunteerDate)
    const now = new Date()
    return (
      volunteerDate.getMonth() === now.getMonth() &&
      volunteerDate.getFullYear() === now.getFullYear()
    )
  }).length

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Volunteer Management</h1>
        <Button onClick={handleInviteClick} disabled={generatingInvite}>
          {generatingInvite ? 'Generating...' : 'Invite New Volunteer'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalVolunteers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeVolunteers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{newThisMonth}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Volunteer List</CardTitle>
            <div className="flex gap-4">
              <Input
                placeholder="Search volunteers..."
                className="w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p>Loading volunteers...</p>
            </div>
          ) : filteredVolunteers.length === 0 ? (
            <div className="text-center py-8">
              <p>No volunteers found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Volunteer Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVolunteers.map((volunteer) => (
                  <TableRow key={volunteer.id}>
                    <TableCell>{volunteer.name}</TableCell>
                    <TableCell>{volunteer.email}</TableCell>
                    <TableCell>{volunteer.role}</TableCell>
                    <TableCell>{getStatusBadge(volunteer.status)}</TableCell>
                    <TableCell>
                      {new Date(volunteer.volunteerDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {volunteer.status === 'PENDING' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(volunteer.id)}
                              disabled={approvingVolunteer === volunteer.id || rejectingVolunteer === volunteer.id}
                            >
                              {approvingVolunteer === volunteer.id ? 'Approving...' : 'Approve'}
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleReject(volunteer.id)}
                              disabled={approvingVolunteer === volunteer.id || rejectingVolunteer === volunteer.id}
                            >
                              {rejectingVolunteer === volunteer.id ? 'Rejecting...' : 'Disapprove'}
                            </Button>
                          </>
                        )}
                        {volunteer.status !== 'PENDING' && (
                          <span className="text-sm text-gray-500">
                            {volunteer.status === 'APPROVED' ? 'Approved' : 'Rejected'}
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Invite Link Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Volunteer Invite Link</DialogTitle>
            <DialogDescription>
              Share this link with volunteers to invite them to join your organization.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input value={inviteLink} readOnly className="flex-1" />
              <Button onClick={copyInviteLink} variant="outline">
                {linkCopied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              This link is unique to your organization and will not work for other organizations.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
