import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IdeaLineComponent } from './idea-line/idea-line.component';
import { IdeaDetailComponent } from './idea-detail/idea-detail.component';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IIdeaState, rootReducer, INITIAL_STATE } from './store/idea.store';
import { IdeaActions ,CounterActions} from './actions/app.actions';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    IdeaLineComponent,
    IdeaDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    HttpClientModule,
  ],
  providers: [IdeaActions,CounterActions],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor( ngRedux:NgRedux<IIdeaState> ){
    ngRedux.configureStore(rootReducer,INITIAL_STATE);
  }
 }
