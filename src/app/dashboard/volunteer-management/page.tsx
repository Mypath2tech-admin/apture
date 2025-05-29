"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Volunteer } from "@/types/volunteers";
import { useEffect, useState } from "react";

export default function VolunteerManagement() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [inviteLink, setInviteLink] = useState("");
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(
    null
  );

  // Fetch volunteers on component mount
  useEffect(() => {
    fetchVolunteers();
  }, []);

  // Filter volunteers based on search and status
  useEffect(() => {
    let filtered = volunteers;

    if (searchTerm) {
      filtered = filtered.filter(
        (volunteer) =>
          volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          volunteer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (volunteer) => volunteer.status.toLowerCase() === statusFilter
      );
    }

    setFilteredVolunteers(filtered);
  }, [searchTerm, statusFilter, volunteers]);

  // Fetch volunteers from API
  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/volunteers");

      if (!response.ok) {
        throw new Error("Failed to fetch volunteers");
      }

      const data = await response.json();
      setVolunteers(data.volunteers || []);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
      // You might want to show a toast notification here
    } finally {
      setLoading(false);
    }
  };

  // Generate invite link
  const generateInviteLink = async () => {
    try {
      const response = await fetch("/api/volunteers/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          baseUrl: window.location.origin,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate invite link");
      }

      const data = await response.json();
      setInviteLink(data.inviteLink);
      setShowInviteDialog(true);
    } catch (error) {
      console.error("Error generating invite link:", error);
      // You might want to show a toast notification here
    }
  };

  // Open edit dialog
  const openEditDialog = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsEditDialogOpen(true);
  };

  // Handle edit volunteer
  const handleEditVolunteer = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!selectedVolunteer) return;

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(`/api/volunteers/${selectedVolunteer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          status: formData.get("status") as "PENDING" | "ACTIVE" | "INACTIVE",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update volunteer");
      }

      // Refresh volunteers list
      await fetchVolunteers();
      setIsEditDialogOpen(false);
      setSelectedVolunteer(null);
    } catch (error) {
      console.error("Error updating volunteer:", error);
      // You might want to show a toast notification here
    }
  };

  // Handle delete volunteer
  const handleDeleteVolunteer = async (volunteerId: string) => {
    if (!confirm("Are you sure you want to remove this volunteer?")) {
      return;
    }

    try {
      const response = await fetch(`/api/volunteers/${volunteerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete volunteer");
      }

      // Refresh volunteers list
      await fetchVolunteers();
    } catch (error) {
      console.error("Error deleting volunteer:", error);
      // You might want to show a toast notification here
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading volunteers...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Volunteer Management</h1>
        <div className="flex space-x-3">
          <Button onClick={generateInviteLink}>Invite Volunteer</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{volunteers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {volunteers.filter((v) => v.status === "ACTIVE").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {volunteers.filter((v) => v.status === "PENDING").length}
            </p>
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVolunteers.length > 0 ? (
                filteredVolunteers.map((volunteer) => (
                  <TableRow key={volunteer.id}>
                    <TableCell>{volunteer.name}</TableCell>
                    <TableCell>{volunteer.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          volunteer.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : volunteer.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {volunteer.status.toLowerCase()}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(volunteer.joinDate)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(volunteer)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteVolunteer(volunteer.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No volunteers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Volunteer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleEditVolunteer}>
            <DialogHeader>
              <DialogTitle>Edit Volunteer</DialogTitle>
              <DialogDescription>
                Update the volunteer&apos;s information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  defaultValue={selectedVolunteer?.name || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  defaultValue={selectedVolunteer?.email || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  name="status"
                  defaultValue={selectedVolunteer?.status || "ACTIVE"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="join-date">Join Date</Label>
                <Input
                  id="join-date"
                  value={
                    selectedVolunteer
                      ? formatDate(selectedVolunteer.joinDate)
                      : ""
                  }
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Invite Link Dialog */}
      <AlertDialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Volunteer Invitation Link</AlertDialogTitle>
            <AlertDialogDescription>
              Share this link with potential volunteers. They can use it to fill
              out their details and join your volunteer team.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-gray-100 p-3 rounded-md my-4 break-all">
            {inviteLink}
          </div>
          <AlertDialogFooter>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(inviteLink);
              }}
            >
              Copy Link
            </Button>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
