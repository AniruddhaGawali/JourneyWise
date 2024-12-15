"use client";

import React, { useEffect, useState } from "react";
import { getBookingById } from "@/actions/bookingAction";
import { Invoice } from "@/types";
import { useParams } from "next/navigation";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { usePDF } from "react-to-pdf";

const InvoicePage: React.FC = () => {
  const { id } = useParams() as { id: string };
  const [booking, setBooking] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" });

  useEffect(() => {
    setLoading(true);
    getBookingById(id)
      .then((res) => {
        setBooking(res);
      })
      .catch((err) => {
        console.error("Error fetching booking:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const calculateTotalCost = () => {
    if (!booking) return 0;
    return booking.noOfTravellers * booking.package.price;
  };

  const generatePDF = () => {
    if (!booking) return;
    toPDF();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading invoice...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>No booking found</p>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      ref={targetRef}
    >
      <BackgroundGradient>
        <div className="container mx-auto p-6">
          <div className="mx-auto max-w-2xl rounded-lg bg-white/80 p-6 shadow-md">
            <h2 className="mb-6 text-center text-2xl font-bold">
              Booking Invoice
            </h2>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              {/* Customer Details */}
              <div>
                <h3 className="mb-2 text-lg font-semibold">Customer Details</h3>
                <p>
                  <strong>Name:</strong> {booking.name}
                </p>
                <p>
                  <strong>Email:</strong> {booking.email}
                </p>
                <p>
                  <strong>Phone:</strong> {booking.phone}
                </p>
              </div>

              {/* Booking Details */}
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Booking Information
                </h3>
                <p>
                  <strong>Package:</strong> {booking.package.title}
                </p>
                <p>
                  <strong>Destination:</strong> {booking.package.destination}
                </p>
                <p>
                  <strong>Booking Date:</strong>{" "}
                  {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p>
                  <strong>Travellers:</strong> {booking.noOfTravellers}
                </p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="border-t pt-4">
              <h3 className="mb-2 text-lg font-semibold">Cost Breakdown</h3>
              <div className="flex justify-between">
                <p>Price per Person</p>
                <p>{booking.package.price}</p>
              </div>
              <div className="flex justify-between">
                <p>Number of Travellers</p>
                <p>{booking.noOfTravellers}</p>
              </div>
              <div className="mt-4 flex justify-between text-xl font-bold">
                <p>Total Cost</p>
                <p>$ {calculateTotalCost()}</p>
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-6 text-center">
              <Button onClick={generatePDF}>Download Invoice PDF</Button>
            </div>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
};

export default InvoicePage;
