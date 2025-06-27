import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { createError, loadFact, selectError, selectFact, selectImageURL, selectLoading } from './store/cat.state';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe],
  template: `
    <div class="body" >
      <h1>Welcome to {{title}}!</h1>
      <button (click)="updateFact()" >update cat fact</button>
      <button (click)="throrErrorAPI()" >throw an error cat fact</button>
      @defer(when !((loading | async) || false)) {
        @if(!!((error | async)|| false)) {
          <span>Error while using the API: {{ error | async }}</span>
        } @else {
          <h4>{{ fact | async }}</h4>
          <img [src]="imageURL | async"
            alt="image with a cat fact" style="height: 30rem;" >
        } 
      } @loading(minimum 1s) {
        <div>Loading...</div>
      }
    </div>
  `,
  styles: `
    .body {
      display: flex;
      flex-direction: column;
      width: fit-content;
    }
  `,
})
export class AppComponent implements OnInit {
  title = 'Our technical Cat Fact App';
  private store = inject(Store)
  fact = this.store.select(selectFact)
  imageURL = this.store.select(selectImageURL)
  loading = this.store.select(selectLoading)
  error = this.store.select(selectError)

  ngOnInit(): void {
    this.updateFact()
  }

  updateFact() {
    this.store.dispatch(loadFact())
  }

  throrErrorAPI() {
    this.store.dispatch(createError({}));
  }
}
