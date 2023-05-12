// src/app/reducers.ts

import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { addProduct, buttonClicked, emptyCart, removeProduct, updateSumPrice } from './app.actions';

export interface Product {
  id: number;
  name: string;
  price: number;
}

// interface
export interface AppState {
  buttonClicked: boolean;
  products: Product[];
  sumPrice: number;
}

// reducer
export const buttonClickedReducer = createReducer(
  false, // initial state
  on(buttonClicked, state => true), // on buttonClicked action, make state true
);

export const productReducer = createReducer<Product[]>(
  [],
  on(addProduct, (state, {product}) => [...state, product]),
  on(removeProduct, state => state.slice(0, state.length - 1)),
  on(emptyCart, state => []),
);

export const sumPriceReducer = createReducer<number>(
  0, // initial state
  on(updateSumPrice, (state, { sumPrice }) => sumPrice)
);

// list of all reducers
export const reducers: ActionReducerMap<AppState> = {
  // state: reducer
  buttonClicked: buttonClickedReducer,
  products: productReducer,
  sumPrice: sumPriceReducer
};
