"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface OrganizationInfo {
  id: string;
  name: string;
  description?: string;
}

export default function VolunteerSignup() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [organization, setOrganization] = useState<OrganizationInfo | null>(
    null
  );
  const [token, setToken] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    validateInvite();
  }, []);

  const validateInvite = async () => {
    try {
      const inviteToken = searchParams.get("token");
      const orgId = searchParams.get("org");

      if (!inviteToken || !orgId) {
        setError("Invalid invite link. Please check the URL and try again.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `/api/volunteers/signup?token=${inviteToken}&org=${orgId}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Invalid invite link");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setOrganization(data.organization);
      setToken(inviteToken);
      setLoading(false);
    } catch (error) {
      console.error("Error validating invite:", error);
      setError("Failed to validate invite link. Please try again.");
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token || !organization) return;

    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    const volunteerData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      token: token,
    };

    try {
      const response = await fetch(
        `/api/volunteers/signup?org=${organization.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(volunteerData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to submit application");
        setSubmitting(false);
        return;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      setError("Failed to submit application. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-lg">Validating invite...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-600">
              Invalid Invite
            </CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.close()} className="w-full">
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-600">
              Thank You!
            </CardTitle>
            <CardDescription>
              Your volunteer application for{" "}
              <strong>{organization?.name}</strong> has been submitted
              successfully. We&apos;ll be in touch soon!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.close()} className="w-full">
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Join {organization?.name}
          </CardTitle>
          <CardDescription className="text-center">
            {organization?.description
              ? organization.description
              : "Thank you for your interest in volunteering with us. Please fill out the form below to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                disabled={submitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
                disabled={submitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                required
                disabled={submitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter your address"
                rows={3}
                required
                disabled={submitting}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
