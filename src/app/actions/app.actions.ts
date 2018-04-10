import { Injectable } from "@angular/core";
import { Action } from "redux";

@Injectable()
export class docksActions {
  static MOVE_TO_DEATIL_PAGE = "MOVE_TO_DEATIL_PAGE";
  static MOVE_TO_IDEA_LINE ="MOVE_TO_IDEA_LINE";

  moveToIdeaLine(): Action {
    return { type: docksActions.MOVE_TO_DEATIL_PAGE };
  }
}
