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
  loading: boolean
  error: GetBookmarksError | SaveBookmarkError | DeleteBookmarkError
}

export const bookmarkAdapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();

export const initialState: BookmarkState = bookmarkAdapter.getInitialState({
  loading: false,
  error: null
});

const reducer = createReducer(
    initialState,
    /*
     * load effect chain
     */
    on(loadBookmarks,
        (state) => ({...state, loading: true})
    ),
    on(loadBookmarksSuccess,
        (state, action) => bookmarkAdapter.addAll(
            action.bookmarks,
            {...state, loading: false, error: null}
        )
    ),
    on(loadBookmarksFailure,
        (state, action) => ({...state, loading: false, error: action.error})
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
        (state, action) => ({...state, error: action.error})
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
        (state, action) => ({...state, error: action.error})
    ),
);

export function bookmarkReducer(state: BookmarkState | undefined, action: Action) {
  return reducer(state, action);
}

export const {selectAll} = bookmarkAdapter.getSelectors();
