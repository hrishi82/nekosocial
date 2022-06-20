import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "post1-fngjhsegrsjhgjhs",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 3,
      likedBy: [
        {
          firstName: "Jane",
          lastName: "Doe",
          username: "janedoe",
          profilePicture:
            "https://res.cloudinary.com/dac2rwutk/image/upload/v1652212646/profile3_usk34b.jpg",
        },
        {
          firstName: "Toasted",
          lastName: "Elvis",
          username: "toastedelvis",
          profilePicture:
            "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80",
        },

        {
          _id: uuid(),
          firstName: "Good",
          lastName: "Boi",
          username: "goodboi",
          profilePicture:
            "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
        },
      ],
      dislikedBy: [],
    },
    username: "pandacat",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        profilePicture:
          "https://res.cloudinary.com/dac2rwutk/image/upload/v1652212646/profile3_usk34b.jpg",
        text: "some text",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
      {
        _id: uuid(),
        firstName: "Tosated",
        lastName: "Elvis",
        username: "toastedelvis",
        profilePicture:
          "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80",
        text: "Hello",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
    ],
  },
  {
    _id: "post2-hefakhfvhjefnejbf",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          firstName: "Toasted",
          lastName: "Elvis",
          username: "toastedelvis",
          profilePicture:
            "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80",
        },

        {
          _id: uuid(),
          firstName: "Good",
          lastName: "Boi",
          username: "goodboi",
          profilePicture:
            "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
        },
      ],
      dislikedBy: [],
    },
    username: "shubhamsoni",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        firstName: "Good",
        lastName: "Boi",
        username: "goodboi",
        profilePicture:
          "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
        text: "hi",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
      {
        _id: uuid(),
        firstName: "Tosated",
        lastName: "Elvis",
        username: "toastedelvis",
        profilePicture:
          "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80",
        text: "console",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
    ],
  },
  {
    _id: "post3-feffakhfjsdbflvjnejbf",
    content:
      "Need refferals",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "goodboi",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: []
  },
  {
    _id: "post4-feffoiyjtsddbflvjnejbf",
    content:
      "What’s the first thing you do when your code doesn’t work?",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "toastedelvis",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: []
  },
  {
    _id: "post5-kngbknndfigernejbf",
    content:
      "Finalised a flat today!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "ratia",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: []
  },
  {
    _id: "post5-kngbknndfigernejbf",
    content:
      "Last week was so busy, I just couldn't feel the weekend. And this week is going to be the same!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "danchuo",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: []
  },
  
  {
    _id: "post6-sjdvbalsdjblvaf",
    content:
      "I want to eat and sleep all day",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "jiewliew",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: []
  },
  
];
