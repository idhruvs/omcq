import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "tabs", loadChildren: "./tabs/tabs.module#TabsPageModule" },
  {
    path: "",
    loadChildren: "./startquiz/startquiz.module#StartquizPageModule"
  },
  { path: "quiz", loadChildren: "./quiz/quiz.module#QuizPageModule" },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
