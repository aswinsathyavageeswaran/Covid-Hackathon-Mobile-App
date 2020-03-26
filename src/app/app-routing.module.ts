import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { Tab1Page } from './tab1/tab1.page';
import { Tab3Page } from './tab3/tab3.page';
import { Tab2Page } from './tab2/tab2.page';
import { HomePageComponent } from './homepage/homepage.component';
import { LoginPageComponent } from './login/loginpage.component';
import { RegisterPageComponent } from './register/register.component';

const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent
  },
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "registration",
    component: RegisterPageComponent
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        component: Tab1Page
      },
      {
        path: 'tab2',
        component: Tab2Page
      },
      {
        path: 'tab3',
        component: Tab3Page
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
