import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  addProduct,
  buttonClicked,
  emptyCart,
  removeProduct,
} from '../app.actions';
import { Observable, map } from 'rxjs';
import { AppState, Product } from '../reducers';
import { state } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  buttonClicked$: Observable<boolean>;
  trendingMovies: any;
  products$: Observable<Product[]>;
  sumPrice$: Observable<number>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.buttonClicked$ = this.store.select((state) => state.buttonClicked);
    this.products$ = this.store.select((state) => state.products);
    this.sumPrice$ = this.store
      .select((state) => state.sumPrice)
      .pipe(map((sumPrice) => parseFloat(sumPrice.toFixed(2))));
  }

  ngOnInit(): void {
    this.getTrendingMovies();
  }

  onButtonClick(movie: any) {
    const newProduct: Product = {
      id: movie.id, // just a random number for this example
      name: movie.name, // 'User ' followed by a random number
      price: movie.rating,
    };
    this.store.dispatch(addProduct({ product: newProduct }));
  }

  onRemoveProduct() {
    this.store.dispatch(removeProduct());
  }

  onEmptyCart() {
    this.store.dispatch(emptyCart());
  }

  getTrendingMovies() {
    this.http
      .get('http://localhost:4200/assets/data/trending-movies.json')
      .subscribe((movies) => {
        this.trendingMovies = movies;
      });
  }

  goToMovie(type: string, id: string) {
    this.router.navigate(['movie', type, id]);
  }
}
