import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Bookmark} from './bookmark.model';
import {DeleteBookmarkError, GetBookmarksError, SaveBookmarkError} from "../bookmark-persistence.errors";
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

export const bookmarksFeatureKey = 'bookmarks';

export interface BookmarkState extends EntityState<Bookmark> {
}

export const bookmarkAdapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();

export const initialState: BookmarkState = bookmarkAdapter.getInitialState({});

const reducer = createReducer(
    initialState,
    /*
     * load effect chain
     */
    on(loadBookmarks,
        (state) => ({...state})
    ),
    on(loadBookmarksSuccess,
        (state, action) => bookmarkAdapter.addAll(action.bookmarks, {...state})
    ),
    on(loadBookmarksFailure,
        (state) => ({...state})
    ),
    /*
     * upsert effect chain
     */
    on(upsertBookmark,
        (state, action) => bookmarkAdapter.upsertOne(action.bookmark, state)
    ),
    on(upsertBookmarkSuccess,
        (state) => state
    ),
    on(upsertBookmarkFailure,
        (state) => ({...state})
    ),
    /*
     * delete effect chain
     */
    on(deleteBookmark, synchronisedDeleteBookmark,
        (state, action) => bookmarkAdapter.removeOne(action.bookmark.id, state)
    ),
    on(synchronisedDeleteBookmarkSuccess,
        (state) => state
    ),
    on(synchronisedDeleteBookmarkFailure,
        (state) => ({...state})
    ),
);

export function bookmarkReducer(state: BookmarkState | undefined, action: Action) {
  return reducer(state, action);
}

export const {selectAll} = bookmarkAdapter.getSelectors();
