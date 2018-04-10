import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { IdeaLineComponent } from "./idea-line/idea-line.component";
import { IdeaDetailComponent } from "./idea-detail/idea-detail.component";
import { NgReduxModule, NgRedux } from "@angular-redux/store";
import { IIdeaState, rootReducer } from "./store/idea.store";
import { docksActions } from "./actions/app.actions";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { log } from "util";
import { TweetFormComponent } from './tweet-form/tweet-form.component';

@NgModule({
  declarations: [AppComponent, IdeaLineComponent, IdeaDetailComponent, TweetFormComponent],
  imports: [BrowserModule, AppRoutingModule, NgReduxModule, HttpClientModule],
  providers: [docksActions],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IIdeaState>, private http: HttpClient) {
    //APIを叩けるか確認
    console.log("api is calledv in new");
    let apiResult = [];
    let initialState: IIdeaState = {
      ideas: [],
      hereId: 0
    };
    console.dir(initialState.ideas);
    this.http.get("./api/general").subscribe(json => {
      apiResult.push(json);
      initialState.ideas = apiResult[0];
      console.log("initialState");
      console.dir(initialState);
      ngRedux.configureStore(rootReducer, initialState);
    });
  }
}
