import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  try {
    const response = await axios.post(apiURL + "/admin/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
