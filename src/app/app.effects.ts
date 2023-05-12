import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';
import { addProduct, emptyCart, removeProduct, updateSumPrice } from './app.actions';
import { AppState } from './reducers';

@Injectable()
export class AppEffects {
  updateSumIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct, removeProduct, emptyCart),
      withLatestFrom(this.store.select('products')),
      map(([action, products]) => {
        const sumPrice = products.reduce((sum, product) => sum + product.price, 0);
        return updateSumPrice({ sumPrice });
      })
    )
  );

  constructor(private actions$: Actions, private store: Store<AppState>) {}
}
