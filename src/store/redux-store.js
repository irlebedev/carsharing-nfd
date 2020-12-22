import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import orderReducer from "./order-reducer"
import authReducer from "./auth-reducer"
import carsTableReducer from "./cars-table-reducer"

const reducers = combineReducers({
  order: orderReducer,
  auth: authReducer,
  carsTable: carsTableReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
)

export default store
