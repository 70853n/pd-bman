import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {BookmarkEffects} from "./redux/bookmark.effects";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material";
import {BookmarkPersistenceService} from "./bookmark-persistence.service";
import {bookmarkReducer, bookmarksFeatureKey} from "./redux/bookmark.reducer";

@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [
    StoreModule.forFeature(bookmarksFeatureKey, bookmarkReducer),
    EffectsModule.forFeature([BookmarkEffects]),
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [BookmarkPersistenceService]
})
export class BookmarkEntityModule {
}
