import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

function BookingLayout({ children }: Props) {
  return <Suspense>{children}</Suspense>;
}

export default BookingLayout;
