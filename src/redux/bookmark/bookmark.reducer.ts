import {Action, createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Bookmark} from './bookmark.model';
import * as BookmarkActions from './bookmark.actions';

export const bookmarksFeatureKey = 'bookmarks';

export interface BookmarkState extends EntityState<Bookmark> {}

export const adapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();

export const initialState: BookmarkState = adapter.getInitialState({});

const bookmarkReducer = createReducer(
    initialState,
    on(BookmarkActions.upsertBookmark,
        (state, action) => adapter.upsertOne(action.bookmark, state)
    ),
    on(BookmarkActions.deleteBookmark,
        (state, action) => adapter.removeOne(action.id, state)
    ),
    on(BookmarkActions.loadBookmarks,
        (state, action) => adapter.addAll(action.bookmarks, state)
    )
);

export function reducer(state: BookmarkState | undefined, action: Action) {
  return bookmarkReducer(state, action);
}

export const {selectAll} = adapter.getSelectors();
