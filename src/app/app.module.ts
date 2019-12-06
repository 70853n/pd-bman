import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
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
    !environment.production ? StoreDevtoolsModule.instrument() : [],
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
