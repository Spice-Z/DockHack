import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Idea } from "./idea";
import { NgRedux } from "@angular-redux/store";
import { IIdeaState } from "./store/idea.store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";
}
