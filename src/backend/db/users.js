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

  },
  {
    _id: "user4-kjandsknvlasdkvnalkdsav",
    firstName: "Jane",
    lastName: "Doe",
    username: "janedoe",
    profilePicture:
      "https://res.cloudinary.com/dac2rwutk/image/upload/v1652212646/profile3_usk34b.jpg",
    email: "janedoe@gmail.com",
    password: "janedoe123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "user5-oqwjoadhflkjdslffalsdjfl",
    firstName: "Tosated",
    lastName: "Elvis",
    username: "toastedelvis",
    profilePicture:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80",
    email: "toastedelvis@gmail.com",
    password: "toastedelvis123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "user6-akjbfklquywdgjadbfsdjdfsibi",
    firstName: "Good",
    lastName: "Boi",
    username: "goodboi",
    profilePicture:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
    email: "goodboi@gmail.com",
    password: "goodboi123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  }
];
