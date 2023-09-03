import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importação do módulo HTTP

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { UsersComponent } from './components/users/users.component';
import { PostsComponent } from './components/posts/posts.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { FormsModule } from '@angular/forms';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { PostEditComponent } from './components/posts/post-edit/post-edit.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarMenuComponent,
    UsersComponent,
    PostsComponent,
    UserCreateComponent,
    UserEditComponent,
    PostEditComponent,
    PostCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
