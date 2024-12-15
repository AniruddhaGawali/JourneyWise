import { Booking, Invoice } from "@/types";
import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const createBooking = async (booking: Booking): Promise<Booking> => {
  try {
    const response = await axios.post(apiURL + "/bookings", booking);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getBookings = async (): Promise<Invoice[]> => {
  try {
    const response = await axios.get(apiURL + "/bookings");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getBookingById = async (id: string): Promise<Invoice> => {
  try {
    const response = await axios.get(apiURL + "/bookings/" + id);
    return response.data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export { createBooking, getBookings, getBookingById };
