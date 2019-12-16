import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {metaReducers, reducers} from '../redux';
import {environment} from '../environments/environment';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import {AppComponent} from './app.component';
import {BookmarkFormDialogComponent} from './bookmark-form-dialog/bookmark-form-dialog.component';
import {BookmarkOverviewComponent} from './bookmark-overview/bookmark-overview.component';
import {BookmarkEffects} from '../redux/bookmark/bookmark.effects';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    BookmarkFormDialogComponent,
    BookmarkOverviewComponent
  ],
  entryComponents: [BookmarkFormDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    EffectsModule.forRoot([BookmarkEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
