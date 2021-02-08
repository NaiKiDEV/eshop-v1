import {
	ADD_PRODUCT_END,
	GET_ALL_PRODUCTS_END,
	ADD_PRODUCT,
	ADD_TO_CART_END,
	REMOVE_FROM_CART_END,
	UPDATE_CART_END,
	REMOVE_PRODUCT,
	REMOVE_PRODUCT_END,
	CLEAR_MESSAGE_END,
	UPDATE_PRODUCT,
	UPDATE_PRODUCT_END,
	GET_SINGLE_PRODUCT,
	GET_SINGLE_PRODUCT_END
} from './actionTypes';

const initialState = {
	products: [],
	productAdminAction: {
		productCode: null,
		productMessage: "",
	},
	singleproduct: null,
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
		case GET_SINGLE_PRODUCT: {
			return { ...state, singleproduct: null }
		}
		case GET_SINGLE_PRODUCT_END: {
			return { ...state, singleproduct: action.payload.error ? null : action.payload }
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
				productAdminAction: {
					productCode: null,
					productMessage: "",
				},
			}
		}
		
		case REMOVE_PRODUCT: {
			return {
				...state,
				productAdminAction: {
					productCode: null,
					productMessage: "",
				},
			}
		}

		case REMOVE_PRODUCT_END: {
			return {
				...state,
				productAdminAction: {
					productMessage: action.payload.message,
					productCode: action.payload.error ? 0 : 1
				},
				
			}
		}
		case UPDATE_PRODUCT: {
			return {
				...state,
				productAdminAction: {
					productCode: null,
					productMessage: "",
				},
			}
		}

		case UPDATE_PRODUCT_END: {
			return {
				...state,
				productAdminAction: {
					productMessage: action.payload.message,
					productCode: action.payload.error ? 0 : 1
				},
				
			}
		}
		case ADD_PRODUCT_END: {
			return {
				...state,
				productAdminAction: {
					productMessage: action.payload.message,
					productCode: action.payload.error ? 0 : 1
				},
			}
		}
		case CLEAR_MESSAGE_END: {
			return {
			  ...state,
			  productAdminAction: {
				productMessage: "",
				productCode: null
			},
			}
		  }
		default: {
			return state;
		}
	}
};

export default reducer;