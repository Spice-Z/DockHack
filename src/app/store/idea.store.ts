import { Action } from "redux";
import { docksActions } from "../actions/app.actions";
import { Idea } from "../idea";

export interface IIdeaState {
  ideas: Idea[];
  hereId: number;
}

export interface IHereId {
  id: number;
}

export function rootReducer(lastState: IIdeaState, action: Action): IIdeaState {
  switch (action.type) {
    case docksActions.MOVE_TO_DEATIL_PAGE:
      console.log("MOVE_TO_DEATIL_PAGE");
      lastState.hereId = 1;
      return lastState;
    case docksActions.MOVE_TO_IDEA_LINE:
      console.log("MOVE_TO_IDEA_LINE");
      lastState.hereId = 1;
      return lastState;
  }
  console.log("rootReducer is called");
  console.dir(lastState);
  return lastState;
}
