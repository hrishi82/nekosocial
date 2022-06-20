import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "user1-libkjefbvjabvkajhfbe",
    firstName: "Panda",
    lastName: "Cat",
    username: "pandacat",
    email: "adarshbalika@gmail.com",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profilePicture: "https://res.cloudinary.com/dac2rwutk/image/upload/v1652213197/profile4_rtvkgu.jpg",
    bio: "Aspiring fullstack developer",
    link: "https://www.w3schools.com/",
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
    bio: "Aspiring fullstack developer",
    link: "https://www.youtube.com/",
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
    bio: "Frontend developer | Football",
    link: "https://www.google.com/"

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
    bio: "Backend developer",
    link: "https://www.w3schools.com/"
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
    bio: "Aspiring cat",
    link: "https://www.whiskas.in/"
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
    bio: "Cat | Snack thief",
    link: "https://www.whiskas.in/"
  },
  {
    _id: "user7-akjbfjvhdfbvjsjdfsibi",
    firstName: "Ratia",
    lastName: "P",
    username: "ratia",
    profilePicture:"https://res.cloudinary.com/dac2rwutk/image/upload/v1655709513/ratia_czg5pf.jpg",    
    email: "ratia@gmail.com",
    password: "ratia123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "I am a cat",
    link: "https://www.whiskas.in/"
  },
  {
    _id: "user8-jhfberfoqrfqrrdfsibi",
    firstName: "Danchuo",
    lastName: "B",
    username: "danchuo",
    profilePicture:"https://res.cloudinary.com/dac2rwutk/image/upload/v1655709514/danchuo_se29nh.jpg",    
    email: "danchuo@gmail.com",
    password: "danchuo123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "The world is my oyester",
    link: "https://www.whiskas.in/"
  },
  {
    _id: "user9-jefhabwkelflaasdvbi",
    firstName: "Jiewliew",
    lastName: "Jiggo",
    username: "jiewliew",
    profilePicture:"https://res.cloudinary.com/dac2rwutk/image/upload/v1655709523/jiewliew_wkqbxk.jpg",    
    email: "jiewliew@gmail.com",
    password: "jiewliew123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "I want to sleep all day",
    link: "https://twitter.com/jiewliewnjiggo"
  }
];
