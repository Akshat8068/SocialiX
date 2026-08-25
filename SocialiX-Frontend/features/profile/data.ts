export const dummyUser = {
  id: 1,

  fullName: "Alex Rivera",

  username: "ariveria_creative",

  bio: "Digital Product Designer & Tech Enthusiast. Building the future of social connectivity. Exploring the intersection of human psychology and kinetic UI systems.",

  website: "https://socialix.app/alex",

  profileImage: "/Hero.jpg",

  verified: true,

  professional: true,

  stats: {
    posts: 124,
    followers: "8.2k",
    following: 428,
  },
}

export const dummyHighlights = [
  {
    id: 1,
    title: "Designs",
    image: "/Hero.jpg",
    active: true,
  },
  {
    id: 2,
    title: "Travel",
    image: "/Hero.jpg",
    active: false,
  },
  {
    id: 3,
    title: "Work",
    image: "/Hero.jpg",
    active: false,
  },
  {
    id: 4,
    title: "Lifestyle",
    image: "/Hero.jpg",
    active: false,
  },
  {
    id: 5,
    title: "Projects",
    image: "/Hero.jpg",
    active: false,
  },
]
export const dummyPosts = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  image: "/Hero.jpg",
  type:
    index % 5 === 0
      ? "carousel"
      : index % 3 === 0
      ? "video"
      : "image",
}));