import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IdeaLineComponent } from "./idea-line/idea-line.component";
import { templateJitUrl } from "@angular/compiler";
import { IdeaDetailComponent } from "./idea-detail/idea-detail.component";

const routes: Routes = [
  { path: "IDetail", component: IdeaDetailComponent },
  { path: "IL", component: IdeaLineComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
