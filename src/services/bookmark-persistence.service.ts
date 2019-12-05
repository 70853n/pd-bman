import {Injectable} from '@angular/core';
import {Bookmark} from "../redux/bookmark/bookmark.model";
import {bookmarksFeatureKey} from "../redux/bookmark/bookmark.reducer";

@Injectable({
  providedIn: 'root'
})
export class BookmarkPersistenceService {

  constructor() {
  }

  get bookmarks(): Bookmark[] {
    const bookmarksById: { string: Bookmark } = JSON.parse(localStorage.getItem(bookmarksFeatureKey));

    return bookmarksById
        ? Object.values(bookmarksById)
        : [];
  }

  upsertBookmark(bookmark: Bookmark) {
    const bookmarksById = JSON.parse(localStorage.getItem(bookmarksFeatureKey)) || {};
    bookmarksById[bookmark.id] = bookmark;
    localStorage.setItem(bookmarksFeatureKey, JSON.stringify(bookmarksById));
  }

  deleteBookmark(id: string) {
    const bookmarksById = JSON.parse(localStorage.getItem(bookmarksFeatureKey)) || {};
    delete bookmarksById[id];
    localStorage.setItem(bookmarksFeatureKey, JSON.stringify(bookmarksById));
  }
}
