import {createAction, props} from '@ngrx/store';

import {Bookmark} from './bookmark.model';
import {GetBookmarksError} from "../../services/bookmark-persistence/bookmark-persistence.errors";

/*
 * load effect chain
 */
export const loadBookmarks = createAction(
    '[Bookmark/API] Load Bookmarks'
);

export const loadBookmarksSuccess = createAction(
    '[Bookmark/API] Load Bookmarks Success',
    props<{ bookmarks: Bookmark[] }>()
);

export const loadBookmarksFailure = createAction(
    '[Bookmark/API] Load Bookmarks Failure',
    props<{ error: GetBookmarksError }>()
);

/*
 * upsert effect chain
 */
export const upsertBookmark = createAction(
    '[Bookmark/API] Upsert Bookmark',
    props<{ bookmark: Bookmark }>()
);

export const upsertBookmarkSuccess = createAction(
    '[Bookmark/API] Upsert Bookmark Success'
);

export const upsertBookmarkFailure = createAction(
    '[Bookmark/API] Upsert Bookmark Failure',
    props<{ error: Error }>()
);

/*
 * delete effect chain
 */
export const deleteBookmark = createAction(
    '[Bookmark/API] Delete Bookmark',
    props<{ id: string }>()
);

export const deleteBookmarkSuccess = createAction(
    '[Bookmark/API] Delete Bookmark Success',
    props<{ bookmark: Bookmark }>()
);

export const deleteBookmarkFailure = createAction(
    '[Bookmark/API] Delete Bookmark Failure',
    props<{ error: Error }>()
);
