import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
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
import {BookmarkEntityModule} from "../entities/bookmark/bookmark-entity.module";

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
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BookmarkEntityModule,
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
