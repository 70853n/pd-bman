import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Bookmark} from './bookmark.model';
import {
  DeleteBookmarkError,
  GetBookmarksError,
  SaveBookmarkError
} from "../../services/bookmark-persistence/bookmark-persistence.errors";
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

export const bookmarksFeatureKey = 'bookmarks';

export interface BookmarkState extends EntityState<Bookmark> {
  loading: boolean
  error: GetBookmarksError | SaveBookmarkError | DeleteBookmarkError
}

export const adapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();

export const initialState: BookmarkState = adapter.getInitialState({
  loading: false,
  error: null
});

const bookmarkReducer = createReducer(
    initialState,
    /*
     * load effect chain
     */
    on(loadBookmarks,
        (state) => ({...state, loading: true})
    ),
    on(loadBookmarksSuccess,
        (state, action) => adapter.addAll(
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
        (state, action) => adapter.upsertOne(action.bookmark, state)
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
    on(deleteBookmark,
        (state, action) => adapter.removeOne(action.id, state)
    ),
    on(deleteBookmarkSuccess,
        (state, action) => state
    ),
    on(deleteBookmarkFailure,
        (state, action) => ({...state, error: action.error})
    ),
);

export function reducer(state: BookmarkState | undefined, action: Action) {
  return bookmarkReducer(state, action);
}

export const {selectAll} = adapter.getSelectors();
