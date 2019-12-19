import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  deleteBookmark,
  loadBookmarks,
  loadBookmarksFailure,
  loadBookmarksSuccess,
  synchronisedDeleteBookmark,
  synchronisedDeleteBookmarkFailure,
  synchronisedDeleteBookmarkSuccess,
  upsertBookmark,
  upsertBookmarkFailure,
  upsertBookmarkSuccess
} from "./bookmark.actions";
import {BookmarkPersistenceService} from "../bookmark-persistence.service";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
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
              catchError(() => of(loadBookmarksFailure()))
          )
      )
  ));

  saveBookmark$ = createEffect(() => this.actions$.pipe(
      ofType(upsertBookmark),
      mergeMap((action) => this.bookmarkPersistence
          .saveBookmark(action.bookmark)
          .pipe(
              map(() => upsertBookmarkSuccess()),
              catchError(error => {
                this.snackBar.open(error.message, 'Retry')
                    .onAction()
                    .subscribe(() => this.store.dispatch(upsertBookmark({bookmark: action.bookmark})));

                return of(upsertBookmarkFailure(), deleteBookmark({bookmark: action.bookmark}));
              })
          )
      )
  ));

  deleteBookmark$ = createEffect(() => this.actions$.pipe(
      ofType(synchronisedDeleteBookmark),
      mergeMap((action) => this.bookmarkPersistence
          .deleteBookmark(action.bookmark)
          .pipe(
              tap(() => {
                this.snackBar
                    .open(`Successfully deleted bookmark '${action.bookmark.name}'`, 'Undo', {duration: 2500})
                    .onAction()
                    .subscribe(() => this.store.dispatch(upsertBookmark({bookmark: action.bookmark})));
              }),
              map(() => synchronisedDeleteBookmarkSuccess({bookmark: action.bookmark})),
              catchError(() => of(synchronisedDeleteBookmarkFailure()))
          )
      )
  ));
}
