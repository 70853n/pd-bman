import {createAction, props} from '@ngrx/store';

import {Bookmark} from './bookmark.model';

export const loadBookmarks = createAction(
  '[Bookmark/API] Load Bookmarks', 
  props<{ bookmarks: Bookmark[] }>()
);

export const upsertBookmark = createAction(
  '[Bookmark/API] Upsert Bookmark',
  props<{ bookmark: Bookmark }>()
);

export const deleteBookmark = createAction(
  '[Bookmark/API] Delete Bookmark',
  props<{ id: string }>()
);
