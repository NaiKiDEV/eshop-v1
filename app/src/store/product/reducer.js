import {
	ADD_PRODUCT_END,
	GET_ALL_PRODUCTS_END,
	ADD_PRODUCT,
	ADD_TO_CART_END,
	REMOVE_FROM_CART_END,
	UPDATE_CART_END
} from './actionTypes';

const initialState = {
	products: [],
	productcode: null,
	productmessage: "",
	cart: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		// case LOGIN_END: {
		//   return {
		//     ...state,
		//     isLoggedIn: true
		//   }
		// }
		case UPDATE_CART_END: {
			return {
				...state, cart: state.cart.map(x => {
					if (x._id === action.payload._id) {
						return { ...x, quantity: action.payload.quantity }
					} else {
						return x
					}
				})
			}
		}
		case ADD_TO_CART_END: {
			return { ...state, cart: [...state.cart, action.payload] }
		}
		case REMOVE_FROM_CART_END: {
			return { ...state, cart: state.cart.filter(x => x._id !== action.payload) }
		}
		case GET_ALL_PRODUCTS_END: {
			return {
				...state,
				products: action.payload
			}
		}
		case ADD_PRODUCT: {
			return {
				...state,
				productcode: null,
				productmessage: ""
			}
		}
		case ADD_PRODUCT_END: {
			return {
				...state,
				productcode: action.payload.error ? 0 : 1,
				productmessage: action.payload.message
			}
		}
		default: {
			return state;
		}
	}
};

export default reducer;