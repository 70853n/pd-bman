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
import {BookmarkPersistenceService} from "../../services/bookmark-persistence/bookmark-persistence.service";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class BookmarkEffects {

  constructor(
      private actions$: Actions,
      private bookmarkPersistence: BookmarkPersistenceService
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
          .deleteBookmark(action.id)
          .pipe(
              map((bookmark) => deleteBookmarkSuccess({bookmark})),
              catchError((error) => of(deleteBookmarkFailure({error})))
          )
      )
  ));
}
