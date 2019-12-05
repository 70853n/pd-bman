import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../environments/environment';
import * as fromBookmark from './bookmark/bookmark.reducer';


export interface ApplicationState {

  [fromBookmark.bookmarksFeatureKey]: fromBookmark.BookmarkState;
}

export const reducers: ActionReducerMap<ApplicationState> = {

  [fromBookmark.bookmarksFeatureKey]: fromBookmark.reducer,
};


export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production ? [] : [];
