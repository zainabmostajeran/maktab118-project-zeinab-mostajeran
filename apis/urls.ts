export const NEXT_PUBLIC_PostMan_URL = {
  Auth: {
    signup: "/signup",
    loginIn: "/login",
    byTag: "/logout",
  },
  Products: {
    add: "/products",
    list: "/products?page=1&limit=4&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8",
    byId: (id: number) => `/products/${id}`,
    update: (id: number) => `/products/${id}`,
    delete:(id: number) => `/products/${id}`,
  },
  Categories: {
    add: "/categories",
    list:"/categories",
    byId: (id: number) => `/categories/${id}`,
    update: (id: number) => `/categories/${id}`,
    delete:(id: number) => `/categories/${id}`,
  },
  SubCategories:{
    add: "/subcategories",
    list:"/subcategories",
    byId: (id: number) => `/subcategories/${id}`,
    update: (id: number) => `/subcategories/${id}`,
    delete:(id: number) => `/subcategories/${id}`,
  },
  Orders:{
    add: "/orders",
    list:"/orders",
    byId: (id: number) => `/orders/${id}`,
    update: (id: number) => `/orders/${id}`,
    delete:(id: number) => `/orders/${id}`,
  },
  Users:{
    add: "/users",
    list:"/users",
    byId: (id: number) => `/users/${id}`,
    update: (id: number) => `/users/${id}`,
    delete:(id: number) => `/users/${id}`,

  }
};
