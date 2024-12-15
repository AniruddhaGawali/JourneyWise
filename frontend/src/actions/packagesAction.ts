import { Packages } from "@/types";
import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const getAllPackages = async (): Promise<Packages[]> => {
  try {
    const response = await axios.get(apiURL + "/packages");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPackageById = async (id: string): Promise<Packages> => {
  try {
    const response = await axios.get(apiURL + "/packages/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createPackage = async (data: Packages): Promise<Packages> => {
  try {
    const response = await axios.post(apiURL + "/packages", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updatePackage = async (id: string, data: Packages): Promise<Packages> => {
  try {
    const response = await axios.put(apiURL + "/packages/" + id, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deletePackage = async (id: string): Promise<Packages> => {
  try {
    const response = await axios.delete(apiURL + "/packages/" + id);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  createPackage,
  deletePackage,
  getPackageById,
  updatePackage,
  getAllPackages,
};
