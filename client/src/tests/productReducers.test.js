// src/reducers/users.test.js
import {productListReducer} from '../Redux/Reducers/ProductReducers.js';

describe('productList Reducer', () => {
  const initialState = {
    products: [],
    loading: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const reducer = productListReducer(undefined, {});

    expect(reducer).toEqual(initialState);
  });
  it('handles PRODUCT_LIST_REQUEST as expected', () => {
    const reducer = productListReducer(initialState, { type: "PRODUCT_LIST_REQUEST" });
  
    expect(reducer).toEqual({
      products: [],
      loading: true,
    });
  });
  
});