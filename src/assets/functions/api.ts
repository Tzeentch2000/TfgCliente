import axios from "axios";
import {
  IBook,
  IBuyCart,
  ICategory,
  ICategoryInitialData,
  IOrderCart,
  IState,
  IStateInitialData,
  IUser,
  IUserWithoutOrders,
  InsertBook,
  InsertCategory,
  InsertState,
} from "../../interfaces/Interfaces";
const SERVER = "https://localhost:7224/";
const CREATEUSER = `${SERVER}User/Create`;
const LOGIN = `${SERVER}Auth`;
const GETUSER = `${SERVER}User/`;
const GETBOOKS = `${SERVER}Book`;
const GETACTIVEBOOKS = `${SERVER}Active/Books`;
const GETCATEGORIES = `${SERVER}Category`;
const GETACTIVECATEGORIES = `${SERVER}Active/Categories`;
const GETSTATES = `${SERVER}State`;
const GETACTIVESTATES = `${SERVER}Active/States`;
const GETORDERSBYUSERID = `${SERVER}Order/UserId/`;
const BUY = `${SERVER}Order`;
const DELETEBOOK = `${SERVER}Book/`;
const DELETECATEGORY = `${SERVER}Category/`;
const DELETESTATE = `${SERVER}State/`;
const GETORDERS = `${SERVER}Order`;
const CHECKUSERNAME = `${SERVER}CheckUsername?username=`;

const config = (token: string) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export async function register(user: any) {
  return axios
    .post(CREATEUSER, user)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return -1;
    });
}

export async function login(user: any) {
  return axios
    .post(LOGIN, user)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return -1;
    });
}

export async function chargeUser(id: string, token: string) {
  return axios
    .get(`${GETUSER}${id}`, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export async function getBooks() {
  return axios
    .get(`${GETBOOKS}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export async function getActiveBooks() {
  return axios
    .get(`${GETACTIVEBOOKS}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export async function getCategories() {
  return axios
    .get(`${GETCATEGORIES}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export async function getActiveCategories() {
  return axios
    .get(`${GETACTIVECATEGORIES}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export async function getStates() {
  return axios
    .get(`${GETSTATES}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export async function getActiveStates() {
  return axios
    .get(`${GETACTIVESTATES}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export async function getBookById(id: number) {
  return axios
    .get(`${GETBOOKS}/${id}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export async function getOrderByUserId(id: number, token: string) {
  return axios
    .get(`${GETORDERSBYUSERID}${id}`, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export async function buy(cart: IBuyCart[], token: string) {
  return axios
    .post(BUY, cart, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return -1;
    });
}

export async function deleteBook(id: number, token: string) {
  return axios
    .delete(`${DELETEBOOK}${id}`, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      throw new Error("Cant delete book");
    });
}

export async function createBook(book: InsertBook, token: string) {
  return axios
    .post(GETBOOKS, book, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return -1;
    });
}

export async function updateBook(book: IBook, token: string) {
  return axios
    .put(`${GETBOOKS}/${book.id}`, book, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return -1;
    });
}

export async function getCategoryById(id: number) {
  return axios
    .get(`${GETCATEGORIES}/${id}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export async function createCategory(category: InsertCategory, token: string) {
  return axios
    .post(GETCATEGORIES, category, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export async function updateCategory(
  category: ICategoryInitialData,
  token: string
) {
  return axios
    .put(`${GETCATEGORIES}/${category.id}`, category, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return -1;
    });
}

export async function deleteCategory(id: number, token: string) {
  return axios
    .delete(`${DELETECATEGORY}${id}`, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      throw new Error("Cant delete category");
    });
}

export async function getStateById(id: number) {
  return axios
    .get(`${GETSTATES}/${id}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export async function createState(category: InsertState, token: string) {
  return axios
    .post(GETSTATES, category, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export async function updateState(category: IStateInitialData, token: string) {
  return axios
    .put(`${GETSTATES}/${category.id}`, category, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return -1;
    });
}

export async function deleteState(id: number, token: string) {
  return axios
    .delete(`${DELETESTATE}${id}`, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      throw new Error("Cant delete category");
    });
}

export async function getOrders(token: string) {
  return axios
    .get(`${GETORDERS}`, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}
//orderBy=date&orderType=descending
export async function getOrdersByCategory(id: number, token: string) {
  return axios
    .get(`${GETORDERS}?categoryId=${id}`, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export async function getOrderByUserIdOrderBy(
  url: string,
  id: number,
  token: string
) {
  return axios
    .get(`${GETORDERSBYUSERID}${id}${url}`, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export async function updateUser(user: IUserWithoutOrders, token: string) {
  console.log(user);
  return axios
    .put(`${SERVER}User/${user.id}`, user, config(token))
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return -1;
    });
}

export async function checkUsername(username: string) {
  return axios
    .get(`${CHECKUSERNAME}${username}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return null;
    });
}
