import {Injectable} from '@angular/core';
import {Bookmark} from "../../redux/bookmark/bookmark.model";
import {bookmarksFeatureKey} from "../../redux/bookmark/bookmark.reducer";
import {Observable, of, throwError} from "rxjs";
import {DeleteBookmarkError, GetBookmarksError, SaveBookmarkError} from "./bookmark-persistence.errors";
import {CustomErrorBase} from "../../lib/CustomErrorBase";
import {empty} from "rxjs/internal/Observer";

@Injectable({
  providedIn: 'root'
})
export class BookmarkPersistenceService {

  constructor() {
  }

  /**
   * Reads all Bookmarks from the persistence system.
   *
   * @return  an Observable emitting an Array of Bookmarks
   *          or terminating with a {@link GetBookmarksError}
   */
  get bookmarks(): Observable<Bookmark[]> {
    return tryOperation(
        () => {
          const bookmarksById: { string: Bookmark } = JSON.parse(localStorage.getItem(bookmarksFeatureKey));

          return of(bookmarksById
              ? Object.values(bookmarksById)
              : []
          );
        },
        () => {
          return new GetBookmarksError();
        }
    );
  }

  /**
   * Writes the given Bookmark into the persistence system. If a Bookmark with
   * the same id already exists, that Bookmark is replaced by the given Bookmark.
   *
   * @param bookmark - The Bookmark to be persisted
   * @return  an empty Observable
   *          or one terminating with a {@link SaveBookmarkError}
   */
  saveBookmark(bookmark: Bookmark): Observable<any> {
    return tryOperation(
        () => {
          const bookmarksById = JSON.parse(localStorage.getItem(bookmarksFeatureKey)) || {};

          bookmarksById[bookmark.id] = bookmark;
          localStorage.setItem(bookmarksFeatureKey, JSON.stringify(bookmarksById));

          return of(empty);
        },
        () => {
          return new SaveBookmarkError(bookmark);
        }
    );
  }

  /**
   * Deletes a Bookmark which has the given id.
   *
   * @param id - The identifier of the Bookmark to be deleted
   * @return  an Observable emitting the deleted Bookmark
   *          or terminating with a {@link DeleteBookmarkError}
   */
  deleteBookmark(id: string): Observable<Bookmark> {
    return tryOperation(
        () => {
          const bookmarksById = JSON.parse(localStorage.getItem(bookmarksFeatureKey)) || {};
          const deletedBookmark = bookmarksById[id];

          delete bookmarksById[id];
          localStorage.setItem(bookmarksFeatureKey, JSON.stringify(bookmarksById));

          return of(deletedBookmark);
        },
        () => new DeleteBookmarkError(id)
    );
  }
}

function tryOperation(operation: () => Observable<any>, errorFactory: () => CustomErrorBase): Observable<any> {
  try {
    return operation();
  } catch (e) {
    // TODO: Implement production-safe logging
    console.log(e);
    return throwError(errorFactory());
  }
}
