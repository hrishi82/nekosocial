import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "user1-libkjefbvjabvkajhfbe",
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    email: "adarshbalika@gmail.com",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profilePicture: "https://res.cloudinary.com/dac2rwutk/image/upload/v1652213197/profile4_rtvkgu.jpg",

  },
  {
    _id: "user2-kdcbhaskdjbvahkasdbv",
    firstName: "John",
    lastName: "Doe",
    username: "JohnDoe",
    email: "johndoe@gmail.com",
    password: "johndoe123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profilePicture: "https://res.cloudinary.com/dac2rwutk/image/upload/v1652162986/cat_ij5wno.jpg",

  },
  {
    _id: "user3-jhdbckajhdsbvjbvahevljabva",
    firstName: "Shubham",
    lastName: "Soni",
    username: "shubhamsoni",
    email: "shubhamsoni@gmail.com",
    password: "shubhamsoni123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profilePicture: "https://res.cloudinary.com/dac2rwutk/image/upload/v1652212652/profile1_f5xwrt.jpg",

  }
];
