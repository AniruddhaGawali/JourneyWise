export type Packages = {
  _id?: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  destination: string;
  availableDates: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type Booking = {
  _id?: string;
  packageId: string;
  name: string;
  email: string;
  phone: string;
  noOfTravellers: number;
  bookingDate: string;
  request: string;
};

export type Invoice = {
  _id?: string;
  package: Packages;
  name: string;
  email: string;
  phone: string;
  noOfTravellers: number;
  bookingDate: string;
  request: string;
};
