import axios from "axios"

const instance = axios.create({
  baseURL: "http://api-factory.simbirsoft1.com/api/",
  // "https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/",
  headers: {
    "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
    Authorization: "Bearer 4cbcea96de",
  },
})

const orderAPI = {
  getCity() {
    return instance.get(`db/city/`)
  },
  getPoint() {
    return instance.get(`db/point/`)
  },
  getCar() {
    return instance.get(`db/car/`)
  },
  postOrder(orderBody) {
    return instance.post(`db/order/`, orderBody)
  },
  getOrder(orderId) {
    return instance.get(`db/order/${orderId}`)
  },
  postLogIn(orderBody, basicToken) {
    return instance.post(`auth/login`, orderBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicToken}`,
      },
    })
  },
  getCarsPage(currentPage = 0, pageSize = 5) {
    return instance.get(`db/car?page=${currentPage}&limit=${pageSize}`)
  },
}

export default orderAPI
