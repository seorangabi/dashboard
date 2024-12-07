import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateErrorMessage = (error: unknown) => {
  if (typeof error === "string") return error;

  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    if (error.response?.data?.error?.name) {
      return error.response.data.error?.name;
    }

    if (error.response?.data?.error?.message) {
      return error.response.data.error?.message;
    }

    if (typeof error.response?.data === "string") return error.response?.data;

    return "Axios error";
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (Array.isArray(error)) {
    return error[0];
  }

  return "Something went wrong";
};

export const formatRupiah = (angka: number) => {
  // Pastikan input berupa angka
  if (typeof angka !== "number") {
    throw new Error("Input harus berupa angka");
  }
  return "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
