import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  deleteBookmark,
  deleteBookmarkFailure,
  deleteBookmarkSuccess,
  loadBookmarks,
  loadBookmarksFailure,
  loadBookmarksSuccess,
  upsertBookmark,
  upsertBookmarkFailure,
  upsertBookmarkSuccess
} from "./bookmark.actions";
import {BookmarkPersistenceService} from "../bookmark-persistence.service";
import {catchError, first, map, mergeMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {MatSnackBar} from "@angular/material";
import {BookmarkState} from "./bookmark.reducer";
import {Store} from "@ngrx/store";

@Injectable()
export class BookmarkEffects {

  constructor(
      private store: Store<BookmarkState>,
      private actions$: Actions,
      private bookmarkPersistence: BookmarkPersistenceService,
      private snackBar: MatSnackBar
  ) {
  }

  loadBookmarks$ = createEffect(() => this.actions$.pipe(
      ofType(loadBookmarks),
      mergeMap(() => this.bookmarkPersistence.bookmarks
          .pipe(
              map((bookmarks) => loadBookmarksSuccess({bookmarks})),
              catchError((error) => of(loadBookmarksFailure({error})))
          )
      )
  ));

  saveBookmark$ = createEffect(() => this.actions$.pipe(
      ofType(upsertBookmark),
      mergeMap((action) => this.bookmarkPersistence
          .saveBookmark(action.bookmark)
          .pipe(
              map(() => upsertBookmarkSuccess()),
              catchError(error => of(upsertBookmarkFailure({error})))
          )
      )
  ));

  deleteBookmark$ = createEffect(() => this.actions$.pipe(
      ofType(deleteBookmark),
      mergeMap((action) => this.bookmarkPersistence
          .deleteBookmark(action.bookmark)
          .pipe(
              tap(() => {
                this.snackBar
                    .open(`Successfully deleted bookmark '${action.bookmark.name}'`, 'Undo', {duration: 2500})
                    .onAction()
                    .subscribe(() => this.store.dispatch(upsertBookmark({bookmark: action.bookmark})));
              }),
              map(() => deleteBookmarkSuccess({bookmark: action.bookmark})),
              catchError((error) => of(deleteBookmarkFailure({error})))
          )
      )
  ));
}
