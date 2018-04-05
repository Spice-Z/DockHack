import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { IdeaLineComponent } from "./idea-line/idea-line.component";
import { IdeaDetailComponent } from "./idea-detail/idea-detail.component";
import { NgReduxModule, NgRedux } from "@angular-redux/store";
import { IIdeaState, rootReducer, INITIAL_STATE } from "./store/idea.store";
import { IdeaActions, CounterActions } from "./actions/app.actions";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { log } from "util";

@NgModule({
  declarations: [AppComponent, IdeaLineComponent, IdeaDetailComponent],
  imports: [BrowserModule, AppRoutingModule, NgReduxModule, HttpClientModule],
  providers: [IdeaActions, CounterActions],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IIdeaState>, private http: HttpClient) {
    //APIを叩けるか確認
    console.log("api is calledv in new");
    let apiResult = [];
    let initialState: IIdeaState = {
      ideas: []
    };
    console.dir(initialState.ideas);
    this.http.get("./api/general").subscribe(json => {
      apiResult.push(json);
      console.log("apiResult");
      console.dir(apiResult);
      console.log("apiResult[0]");
      console.dir(apiResult[0]);
      initialState.ideas = apiResult[0];
      console.log("initialState");
      console.dir(initialState);
      ngRedux.configureStore(rootReducer, initialState);
    });
  }
}
