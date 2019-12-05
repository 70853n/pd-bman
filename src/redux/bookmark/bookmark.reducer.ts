import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Bookmark } from './bookmark.model';
import * as BookmarkActions from './bookmark.actions';

export const bookmarksFeatureKey = 'bookmarks';

export interface State extends EntityState<Bookmark> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

const bookmarkReducer = createReducer(
  initialState,
  on(BookmarkActions.addBookmark,
    (state, action) => adapter.addOne(action.bookmark, state)
  ),
  on(BookmarkActions.upsertBookmark,
    (state, action) => adapter.upsertOne(action.bookmark, state)
  ),
  on(BookmarkActions.addBookmarks,
    (state, action) => adapter.addMany(action.bookmarks, state)
  ),
  on(BookmarkActions.upsertBookmarks,
    (state, action) => adapter.upsertMany(action.bookmarks, state)
  ),
  on(BookmarkActions.updateBookmark,
    (state, action) => adapter.updateOne(action.bookmark, state)
  ),
  on(BookmarkActions.updateBookmarks,
    (state, action) => adapter.updateMany(action.bookmarks, state)
  ),
  on(BookmarkActions.deleteBookmark,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(BookmarkActions.deleteBookmarks,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(BookmarkActions.loadBookmarks,
    (state, action) => adapter.addAll(action.bookmarks, state)
  ),
  on(BookmarkActions.clearBookmarks,
    state => adapter.removeAll(state)
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return bookmarkReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
