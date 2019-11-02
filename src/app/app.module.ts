import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule} from '@ngrx/store';
import { getReducers, REDUCER_TOKEN } from './store';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TestComponent } from './test/test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    StoreModule.forRoot(REDUCER_TOKEN)
  ],
  providers: [
    {
      provide: REDUCER_TOKEN,
      useFactory: getReducers
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
