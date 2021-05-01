export const initialState = {
  posts: {
    data: [
      {
        id: "1a",
        author: "the.admin@example.com",
        created: "2019-01-01",
        updated: "2019-01-01",
        status: "published",
        title: "Welcome to our bulletin board!",
        text: "Email me to register and get an account!",
        photo:
          "https://www.happybeds.co.uk/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/f/e/fenton_grey_ottoman_2.jpg",
        price: 35,
        phone: "556777799",
        location: "Berlin",
      },
      {
        id: "2a",
        author: "user123@example.com",
        created: "2019-01-05",
        updated: "2019-01-05",
        status: "published",
        title: "Room for rent",
        text: "I have a spare room for rent. Low price!",
        photo:
          "https://www.happybeds.co.uk/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/f/e/fenton_grey_ottoman_2.jpg",
        price: 77,
        phone: "666666666666666666",
        location: null,
      },
      {
        id: "3a",
        author: "the.admin@example.com",
        created: "2019-01-01",
        updated: "2019-01-01",
        status: "draft",
        title: "Welcome to our bulletin board!",
        text: "Email me to register and get an account!",
        photo:
          "https://www.happybeds.co.uk/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/f/e/fenton_grey_ottoman_2.jpg",
        price: 35,
        phone: "7890-5555",
        location: null,
      },
      {
        id: "4a",
        author: "user123@example.com",
        created: "2019-01-05",
        updated: "2019-01-05",
        status: "closed",
        title: "Room for rent",
        text: "I have a spare room for rent. Low price!",
        photo:
          "https://www.happybeds.co.uk/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/f/e/fenton_grey_ottoman_2.jpg",
        price: 77,
        phone: "777777777888888888",
        location: null,
      },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
  user: {
    active: true,
  },
};
