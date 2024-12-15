export const urls = {
  auth: {
    signup: "auth/signup",
    loginIn: "/auth/login",
    logout: "auth/logout",
  },
  products: {
    add: "/products",
    list: "/products",
    byId: (id: number) => `/products/${id}`,
    update: (id: number) => `/products/${id}`,
    delete: (id: number) => `/products/${id}`,
  },
  categories: {
    add: "/categories",
    list: "/categories",
    byId: (id: number) => `/categories/${id}`,
    update: (id: number) => `/categories/${id}`,
    delete: (id: number) => `/categories/${id}`,
  },
  subCategories: {
    add: "/subcategories",
    list: "/subcategories",
    byId: (id: number) => `/subcategories/${id}`,
    update: (id: number) => `/subcategories/${id}`,
    delete: (id: number) => `/subcategories/${id}`,
  },
  orders: {
    add: "/orders",
    list: "/orders",
    byId: (id: number) => `/orders/${id}`,
    update: (id: number) => `/orders/${id}`,
    delete: (id: number) => `/orders/${id}`,
  },
  Users: {
    add: "/users",
    list: "/users",
    byId: (id: number) => `/users/${id}`,
    update: (id: number) => `/users/${id}`,
    delete: (id: number) => `/users/${id}`,
  },
};
