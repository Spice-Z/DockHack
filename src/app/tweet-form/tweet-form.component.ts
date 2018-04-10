import { Component, OnInit } from "@angular/core";
import { NgModel } from "@angular/forms";
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { NgRedux } from "@angular-redux/store";
import { IIdeaState } from "../store/idea.store";
import { docksActions } from "../actions/app.actions";
import { ActivatedRoute } from "@angular/router";
import { log } from "util";

@Component({
  selector: "app-tweet-form",
  templateUrl: "./tweet-form.component.html",
  styleUrls: ["./tweet-form.component.scss"]
})
export class TweetFormComponent implements OnInit {
  isShowTweetForm: boolean;
  ideaText: String;

  constructor(
    private ngRedux: NgRedux<IIdeaState>,
    private actions: docksActions,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.isShowTweetForm = false;
    this.ideaText = "";
  }
 
  ngOnInit() {}

  private sendIdea(ideaText: String ) {
    let id ;
    this.activatedRoute.queryParams.subscribe(params => {
      id = params['tweetId'];
  });
    let datas = [
      {
        ideaText: ideaText,
        mentionTo: id,
        date: "none"
      }
    ];
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "my-auth-token"
      })
    };
    const targetUrl = "./api/tweetNewIdea";
    console.log("ideaText");
    console.log(ideaText);
    this.http.post<any>(targetUrl, datas, httpOptions).subscribe(data => {
      console.log("post");
      console.log(data);
    });
    console.log('dispatch,moveToIdeaLine');
    this.ngRedux.dispatch(this.actions.moveToIdeaLine());
    console.log(this.ngRedux.select<number>('hereId'));
    console.log(this.ngRedux.getState().hereId);
  }

  public tweetClick() {
    this.isShowTweetForm = !this.isShowTweetForm;
  }

  public tweetIdea(ideaText: String) {
    console.log("text is sended");
    setTimeout(() => {
      this.isShowTweetForm = false;
      this.ideaText = "";
    }, 1000);
    this.sendIdea(ideaText);
  }
}
