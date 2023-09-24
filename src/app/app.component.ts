import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from './interfaces/book.interface';
import { select, Store } from '@ngrx/store';
import * as fromBooks from './store/book/index';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private readonly store: Store = inject(Store)

  books$: Observable<IBook[]> = this.store.pipe(select(fromBooks.selectBooksList));
  isLoading$: Observable<boolean> = this.store.pipe(select(fromBooks.selectBookIsLoading));


  ngOnInit(): void {
      this.initDispatch();
  }

  onCreateBook(name: string): void {
      this.store.dispatch(fromBooks.createBook({
          book: {
              id: Math.round(Math.random()),
              name
          }
      }));
  }

  onUpdateBook(book: IBook): void {
      this.store.dispatch(fromBooks.updateBook({book}));
  }

  onDeleteBook(book: IBook): void {
      this.store.dispatch(fromBooks.deleteBook({book}));
  }

  private initDispatch(): void {
      this.store.dispatch(fromBooks.getBooks());
  }
}
