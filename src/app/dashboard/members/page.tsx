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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Textarea } from "@/components/ui/textarea";
import { Member } from "@/types/members";
import { useEffect, useState } from "react";

export default function MembersPage() {
  const [isBeta] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dueStatusFilter, setDueStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockMembers: Member[] = [
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "555-123-4567",
        address: "123 Main St, Anytown, USA",
        joinDate: "2023-01-15",
        status: "active",
        membershipType: "Regular",
        duesAmount: 25,
        lastPaymentDate: "2023-05-01",
        dueStatus: "paid",
        notes: "Volunteers regularly",
      },
      {
        id: "2",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        phone: "555-987-6543",
        address: "456 Oak Ave, Somewhere, USA",
        joinDate: "2023-02-20",
        status: "active",
        membershipType: "Premium",
        duesAmount: 50,
        lastPaymentDate: "2023-04-15",
        dueStatus: "overdue",
        notes: "Board member",
      },
      {
        id: "3",
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice@example.com",
        phone: "555-567-8901",
        address: "789 Pine St, Nowhere, USA",
        joinDate: "2023-03-10",
        status: "pending",
        membershipType: "Student",
        duesAmount: 15,
        lastPaymentDate: "",
        dueStatus: "pending",
        notes: "Student discount applied",
      },
    ];

    setMembers(mockMembers);
    setFilteredMembers(mockMembers);
  }, []);

  // Filter members based on search term and filters
  useEffect(() => {
    let filtered = members;

    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          `${member.firstName} ${member.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.phone.includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((member) => member.status === statusFilter);
    }

    if (dueStatusFilter !== "all") {
      filtered = filtered.filter(
        (member) => member.dueStatus === dueStatusFilter
      );
    }

    setFilteredMembers(filtered);
  }, [searchTerm, statusFilter, dueStatusFilter, members]);

  // Add new member
  const handleAddMember = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newMember: Member = {
      id: (members.length + 1).toString(),
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
      membershipType: formData.get("membershipType") as string,
      duesAmount: parseFloat(formData.get("duesAmount") as string),
      lastPaymentDate: "",
      dueStatus: "pending",
      notes: formData.get("notes") as string,
    };

    setMembers([...members, newMember]);
    setIsAddDialogOpen(false);
  };

  // Generate invite link
  const generateInviteLink = () => {
    // In a real application, this would create a unique link
    const link = `https://your-domain.com/join?token=${Date.now()}`;
    setInviteLink(link);
    setShowInviteDialog(true);
  };

  // Generate payment link
  const generatePaymentLink = (member: Member) => {
    setSelectedMember(member);
    setShowPaymentDialog(true);
  };

  // Badge colors based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Badge colors based on due status
  const getDueStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return isBeta ? (
          <Badge className="bg-gray-400">Paid</Badge>
        ) : (
          <Badge className="bg-green-500">Paid</Badge>
        );
      case "overdue":
        return isBeta ? (
          <Badge className="bg-gray-400">Overdue</Badge>
        ) : (
          <Badge className="bg-red-500">Overdue</Badge>
        );
      case "pending":
        return isBeta ? (
          <Badge className="bg-gray-400">Pending</Badge>
        ) : (
          <Badge className="bg-yellow-500">Pending</Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Member Management</h1>
        <div className="flex space-x-3">
          <Button onClick={generateInviteLink}>Generate Invite Link</Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default">Add New Member</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleAddMember}>
                <DialogHeader>
                  <DialogTitle>Add New Member</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new member.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" name="address" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="membershipType">Membership Type</Label>
                      <Select name="membershipType" defaultValue="Regular">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Regular">Regular</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Student">Student</SelectItem>
                          <SelectItem value="Senior">Senior</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="duesAmount"
                        className={isBeta ? "text-gray-400" : ""}
                      >
                        Monthly Dues ($)
                        {isBeta && (
                          <span className="italic"> (Coming soon)</span>
                        )}
                      </Label>
                      <Input
                        id="duesAmount"
                        name="duesAmount"
                        type="number"
                        min="0"
                        step="0.01"
                        defaultValue="25"
                        disabled={isBeta}
                        className={isBeta ? "opacity-50" : ""}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" name="notes" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Member</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Member Directory</CardTitle>
          <CardDescription>
            View and manage your community members and their monthly dues.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={dueStatusFilter}
                onValueChange={setDueStatusFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Due Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Due Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Membership</TableHead>
                  <TableHead className={isBeta ? "text-gray-400" : ""}>
                    Monthly Dues
                    {isBeta && <span className="italic"> (Coming soon)</span>}
                  </TableHead>
                  <TableHead className={isBeta ? "text-gray-400" : ""}>
                    Last Payment
                    {isBeta && <span className="italic"> (Coming soon)</span>}
                  </TableHead>
                  <TableHead className={isBeta ? "text-gray-400" : ""}>
                    Due Status
                    {isBeta && <span className="italic"> (Coming soon)</span>}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        {member.firstName} {member.lastName}
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.joinDate}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell>{member.membershipType}</TableCell>
                      <TableCell className={isBeta ? "text-gray-400" : ""}>
                        ${member.duesAmount.toFixed(2)}
                      </TableCell>
                      <TableCell className={isBeta ? "text-gray-400" : ""}>
                        {member.lastPaymentDate || "Never"}
                      </TableCell>
                      <TableCell className={isBeta ? "text-gray-400" : ""}>
                        {getDueStatusBadge(member.dueStatus)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => generatePaymentLink(member)}
                            disabled={isBeta}
                            className={
                              isBeta ? "opacity-50 cursor-not-allowed" : ""
                            }
                          >
                            Payment Link
                          </Button>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6">
                      No members found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Member Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{members.length}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {members.filter((m) => m.status === "active").length} active
              members
            </p>
          </CardContent>
        </Card>
        <div className={isBeta ? "opacity-50 pointer-events-none" : ""}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                Monthly Dues Collection
                {isBeta && (
                  <span className="italic text-gray-400"> (Coming soon)</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                $
                {members
                  .reduce((sum, member) => sum + member.duesAmount, 0)
                  .toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {members.filter((m) => m.dueStatus === "overdue").length}{" "}
                overdue payments
              </p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Member Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Array.from(new Set(members.map((m) => m.membershipType))).map(
              (type) => {
                const count = members.filter(
                  (m) => m.membershipType === type
                ).length;
                return (
                  <div key={type} className="flex justify-between items-center">
                    <span>{type}</span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                );
              }
            )}
          </CardContent>
        </Card>
      </div>

      {/* Invite Link Dialog */}
      <AlertDialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Member Invitation Link</AlertDialogTitle>
            <AlertDialogDescription>
              Share this link with potential members. They can use it to fill
              out their details and join your community.
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

      {/* Payment Link Dialog */}
      <AlertDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Payment Link</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedMember && (
                <>
                  Payment link for {selectedMember.firstName}{" "}
                  {selectedMember.lastName} - $
                  {selectedMember.duesAmount.toFixed(2)} monthly dues.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-gray-100 p-3 rounded-md my-4 break-all">
            {selectedMember &&
              `https://payment-provider.com/pay?member=${selectedMember.id}&amount=${selectedMember.duesAmount}&type=monthly-dues`}
          </div>
          <AlertDialogFooter>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://payment-provider.com/pay?member=${selectedMember?.id}&amount=${selectedMember?.duesAmount}&type=monthly-dues`
                );
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
