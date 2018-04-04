import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgRedux } from "@angular-redux/store";
import { IIdeaState } from "../store/idea.store";
import { IdeaActions } from "../actions/app.actions";
import { Idea } from "../idea";

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
  mentionIdeas:Idea[];
  parentIdeas:Idea[];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private ngRedux: NgRedux<IIdeaState>,
    private actions: IdeaActions
  ) {
    this.subscription = ngRedux
      .select<Idea[]>("ideas")
      .subscribe(newIdeas => (this.ideas = newIdeas));
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
    this.mentionIdeas = this.ideas.filter(i => {
      return i.mentionTo == this.tweetId;
    });
    this.parentIdeas = this.ideas.filter(i => {
      return i.id == this.idea.mentionTo;
    });
    
  }
}
