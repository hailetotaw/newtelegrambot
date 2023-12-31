import { Service } from "../models/service";

export const mainServices: Service[] = [
  {
    code: "1",
    label: "Health",
    parentCode: "",
    description: "Health",
    imageUrl: "https://picsum.photos/id/237/200/300",
  },
  {
    code: "2",
    label: "Grocery",
    parentCode: "",
    description: "Grocery",
    imageUrl: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    code: "3",
    label: "Food & Beverges",
    parentCode: "",
    description: "Food & Beverages",
    imageUrl: "https://picsum.photos/200/300?grayscale",
  },
  {
    code: "4",
    label: "Hospitals",
    parentCode: "1",
    description: "Hospitals",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    code: "5",
    label: "Clinics",
    parentCode: "1",
    description: "Clinics",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    code: "6",
    label: "Pharmacy",
    parentCode: "1",
    description: "Pharmacy",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    code: "7",
    label: "Doctors",
    parentCode: "1",
    description: "Doctors",
    imageUrl: "https://picsum.photos/200/300",
  },

  {
    code: "8",
    label: "Clinics",
    parentCode: "1",
    description: "Clinics",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    code: "9",
    label: "Pharmacy",
    parentCode: "1",
    description: "Pharmacy",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    code: "10",
    label: "Doctors",
    parentCode: "1",
    description: "Doctors",
    imageUrl: "https://picsum.photos/200/300",
  },
];
