import { ComponentFixture, DeferBlockBehavior, DeferBlockFixture, DeferBlockState, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { loadFact, createError, selectFact, selectImageURL, selectLoading, selectError } from './store/cat.state';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('AppComponent using overrideSelector', () => {
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;

  const fact = 'Cats have the largest eyes of any mammal.';
  const imageURL = 'https://cataas.com/cat/says/%20Cats%20have%20the%20largest';
  let deferBlockFixture: DeferBlockFixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CommonModule],
      providers: [
        provideMockStore({ initialState: {} })
      ],
      deferBlockBehavior: DeferBlockBehavior.Manual
    }).compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');

    // **Sobrescribir los selectores con resultados simulados**
    store.overrideSelector(selectFact, fact);
    store.overrideSelector(selectImageURL, imageURL);
    store.overrideSelector(selectLoading, false);
    store.overrideSelector(selectError, '');

    store.refreshState();  // obliga a emitir los valores
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    deferBlockFixture = (await fixture.getDeferBlocks())[0];
  });

  it('renders fact and image based on mock selectors', async () => {
    await deferBlockFixture.render(DeferBlockState.Loading);
    expect(fixture.nativeElement.innerHTML).toContain('Loading...');
    await deferBlockFixture.render(DeferBlockState.Complete);

    const h4 = fixture.debugElement.query(By.css('h4'));
    expect(h4).toBeTruthy();
    expect(h4.nativeElement.textContent).toContain(fact);

    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.src).toContain(imageURL);
  });

  it('dispatches actions when buttons clicked', () => {
    const btnUpdate = fixture.debugElement.query(By.css('button:first-of-type')).nativeElement;
    btnUpdate.click();
    expect(store.dispatch).toHaveBeenCalledWith(loadFact());

    const btnError = fixture.debugElement.query(By.css('button:last-of-type')).nativeElement;
    btnError.click();
    expect(store.dispatch).toHaveBeenCalledWith(createError({}));
  });
});
