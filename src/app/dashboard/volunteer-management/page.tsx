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
import { useState } from "react";

interface Volunteer {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  joinDate: string;
}

export default function VolunteerManagement() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([
    {
      id: "1",
      name: "John Doe",
      email: "johnD@example.com",
      status: "active",
      joinDate: "2024-03-15",
    },
    // Add more sample data as needed
  ]);

  const [inviteLink, setInviteLink] = useState("");
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(
    null
  );

  // Generate invite link
  const generateInviteLink = () => {
    // In a real application, this would create a unique link
    const link = `${
      window.location.origin
    }/volunteer-signup?token=${Date.now()}`;
    setInviteLink(link);
    setShowInviteDialog(true);
  };

  // Open edit dialog
  const openEditDialog = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsEditDialogOpen(true);
  };

  // Handle edit volunteer
  const handleEditVolunteer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedVolunteer) return;

    const formData = new FormData(event.currentTarget);
    const updatedVolunteer: Volunteer = {
      ...selectedVolunteer,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      status: formData.get("status") as "active" | "inactive",
    };

    setVolunteers(
      volunteers.map((v) =>
        v.id === selectedVolunteer.id ? updatedVolunteer : v
      )
    );

    setIsEditDialogOpen(false);
    setSelectedVolunteer(null);
  };

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
              {volunteers.filter((v) => v.status === "active").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Volunteer List</CardTitle>
            <div className="flex gap-4">
              <Input placeholder="Search volunteers..." className="w-[300px]" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
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
              {volunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell>{volunteer.name}</TableCell>
                  <TableCell>{volunteer.email}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        volunteer.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {volunteer.status}
                    </span>
                  </TableCell>
                  <TableCell>{volunteer.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(volunteer)}
                      >
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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
                Update the volunteer's information below.
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
                  defaultValue={selectedVolunteer?.status || "active"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="join-date">Join Date</Label>
                <Input
                  id="join-date"
                  value={selectedVolunteer?.joinDate || ""}
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
