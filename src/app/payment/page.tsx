"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentInfo } from "@/types/members";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const memberId = searchParams.get("member");
  const amount = searchParams.get("amount")
    ? parseFloat(searchParams.get("amount") as string)
    : 0;
  const paymentType = searchParams.get("type") || "monthly-dues";

  // Convert from useState to regular const since we don't update this value
  const paymentInfo: PaymentInfo = {
    memberId: memberId || "",
    amount: amount || 0,
    type: paymentType || "monthly-dues",
  };
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real application, this would process the payment with a payment gateway
    console.log("Processing payment:", {
      ...paymentInfo,
      method: paymentMethod,
      cardInfo: cardInfo,
    });

    // Show success dialog
    setPaymentSuccess(true);
    setShowSuccessDialog(true);
  };

  // If no member ID is provided, show an error
  if (!memberId) {
    return (
      <div className="container mx-auto max-w-md py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Invalid Payment Link
            </CardTitle>
            <CardDescription className="text-center">
              This payment link appears to be invalid.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-6">
            <p>Please contact the organization for a valid payment link.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // If payment is already processed, show confirmation
  if (paymentSuccess) {
    return (
      <div className="container mx-auto max-w-md py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Payment Successful
            </CardTitle>
            <CardDescription className="text-center">
              Thank you for your payment!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-6">
            <p className="mb-2">
              Your payment of <strong>${paymentInfo.amount.toFixed(2)}</strong>{" "}
              has been processed successfully.
            </p>
            <p>A receipt has been sent to your email address.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Payment
          </CardTitle>
          <CardDescription className="text-center">
            Complete your payment for {paymentType.replace("-", " ")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <div className="flex justify-between mb-2">
              <span>Payment Amount:</span>
              <span className="font-bold">
                ${paymentInfo.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Payment Type:</span>
              <span>{paymentInfo.type.replace("-", " ")}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="debit-card">Debit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardInfo.cardNumber}
                onChange={handleCardInfoChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={cardInfo.expiryDate}
                  onChange={handleCardInfoChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={cardInfo.cvv}
                  onChange={handleCardInfoChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nameOnCard">Name on Card</Label>
              <Input
                id="nameOnCard"
                name="nameOnCard"
                placeholder="John Doe"
                value={cardInfo.nameOnCard}
                onChange={handleCardInfoChange}
                required
              />
            </div>

            <Button type="submit" className="w-full mt-6">
              Pay ${paymentInfo.amount.toFixed(2)}
            </Button>

            <p className="text-xs text-center text-gray-500 mt-4">
              This is a secure payment processed by our payment provider. Your
              card details are encrypted and secure.
            </p>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Payment Successful!</AlertDialogTitle>
            <AlertDialogDescription>
              Your payment of ${paymentInfo.amount.toFixed(2)} has been
              processed successfully. A receipt has been sent to your email
              address.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
