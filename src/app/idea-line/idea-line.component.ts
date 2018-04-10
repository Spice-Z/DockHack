import { Component, OnInit } from "@angular/core";
import { Idea } from "../idea";

import { NgRedux } from "@angular-redux/store";
import { IIdeaState } from "../store/idea.store";
import { docksActions } from "../actions/app.actions";
import { HttpClient } from '@angular/common/http';
import { log } from "util";

@Component({
  selector: "app-idea-line",
  templateUrl: "./idea-line.component.html",
  styleUrls: ["./idea-line.component.scss"]
})
export class IdeaLineComponent implements OnInit {
  ideas: Idea[];
  subscription;

  constructor(
    private ngRedux: NgRedux<IIdeaState>,
    private actions: docksActions,
    private http: HttpClient
  ) {
    this.subscription = ngRedux
      .select<Idea[]>("ideas")
      .subscribe(newIdeas => (this.ideas = newIdeas));
    this.shuffleIdeas();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {}

  private shuffleIdeas() {
    for (let i = this.ideas.length - 1; i >= 0; i--) {
      // 0~iのランダムな数値を取得
      let rand = Math.floor(Math.random() * (i + 1));

      // 配列の数値を入れ替える
      [this.ideas[i], this.ideas[rand]] = [this.ideas[rand], this.ideas[i]];
    }
  }

}
