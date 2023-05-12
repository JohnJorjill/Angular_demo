// src/app/app.actions.ts

import { createAction, props } from '@ngrx/store';
import { Product } from './reducers';

export const buttonClicked = createAction('[App Component] Button Clicked');
export const addProduct = createAction(
  '[App Component] Add Product',
  props<{ product: Product }>()
);
export const removeProduct = createAction(
  '[App Component] Remove Product',
);
export const emptyCart = createAction(
  '[App Component] Empty Cart',
);

export const updateSumPrice = createAction(
  '[Item] Update Sum Price',
  props<{ sumPrice: number }>()
);
