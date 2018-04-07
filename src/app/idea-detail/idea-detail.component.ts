import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgRedux } from "@angular-redux/store";
import { IIdeaState } from "../store/idea.store";
import { IdeaActions } from "../actions/app.actions";
import { Idea } from "../idea";
import { HttpClientModule, HttpClient } from "@angular/common/http";

@Component({
  selector: "app-idea-detail",
  templateUrl: "./idea-detail.component.html",
  styleUrls: ["./idea-detail.component.scss"]
})
export class IdeaDetailComponent implements OnInit {
  private queryParams: any;
  private tweetId: number;
  subscription;
  ideas: Idea[];
  idea: Idea;
  mentionIdeas: Idea[];
  parentIdeas: Idea[];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private ngRedux: NgRedux<IIdeaState>,
    private actions: IdeaActions,
    private http: HttpClient
  ) {
    this.subscription = ngRedux
      .select<Idea[]>("ideas")
      .subscribe(newIdeas => (this.ideas = newIdeas));
    this.mentionIdeas = [];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      this.tweetId = parseInt(this.queryParams.tweetId);
    });
    this.idea = this.ideas.find(i => {
      return i.id == this.tweetId;
    });
    this.parentIdeas = this.ideas.filter(i => {
      return i.id == this.idea.is_mentiond;
    });
    this.http.get("./api/mentiond?id=" + this.idea.id).subscribe(json => {
      /*
      apiResult.push(json);
      initialState.ideas = apiResult[0];
      console.log("initialState");
      console.dir(initialState);
      */
      let ideas = json[0];
      this.mentionIdeas.push(ideas);
      console.log("ww");
      console.log(json);
      console.log(ideas);
    });
  }
}
