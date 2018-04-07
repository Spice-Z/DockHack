import { Action } from "redux";
import { IdeaActions } from "../actions/app.actions";
import { Idea } from "../idea";

export interface IIdeaState {
  ideas: Idea[];
}

export function rootReducer(lastState: IIdeaState, action: Action): IIdeaState {
  return lastState;
}
