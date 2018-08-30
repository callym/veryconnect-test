import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { UserSelectComponent } from './components/user-select/user-select.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { UnauthorizedModalComponent } from './components/unauthorized-modal/unauthorized-modal.component';

library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    UserSelectComponent,
    NewPostComponent,
    UnauthorizedModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    UnauthorizedModalComponent,
  ],
})
export class AppModule { }
