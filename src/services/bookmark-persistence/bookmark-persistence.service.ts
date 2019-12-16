import {Injectable} from '@angular/core';
import {Bookmark} from "../../redux/bookmark/bookmark.model";
import {Observable, throwError} from "rxjs";
import {DeleteBookmarkError, GetBookmarksError, SaveBookmarkError} from "./bookmark-persistence.errors";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BookmarkPersistenceService {

  private readonly backendUrl = environment.backendUrl;

  constructor(private readonly http: HttpClient) {
  }

  /**
   * Reads all Bookmarks from the persistence system.
   *
   * @return  an Observable emitting an Array of Bookmarks
   *          or terminating with a {@link GetBookmarksError}
   */
  get bookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${this.backendUrl}/bookmarks`)
        .pipe(
            catchError((error: HttpErrorResponse) => {
              logForDevelopment(error);
              return throwError(new GetBookmarksError())
            })
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
    return this.http.post<Bookmark>(`${this.backendUrl}/bookmarks`, bookmark)
        .pipe(
            catchError((error: HttpErrorResponse) => {
              logForDevelopment(error);
              return throwError(new SaveBookmarkError(bookmark))
            })
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
    return this.http.delete<Bookmark>(`${this.backendUrl}/bookmarks/${id}`)
        .pipe(
            catchError((error: HttpErrorResponse) => {
              logForDevelopment(error);
              return throwError(new DeleteBookmarkError(id));
            })
        );
  }
}

/*
 * TODO: Write dedicated logging service
 */
function logForDevelopment(error: HttpErrorResponse) {
  if (!environment.production) {
    console.error(error);
  }
}
