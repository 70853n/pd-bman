import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../environments/environment';
import * as fromBookmark from './bookmark/bookmark.reducer';


export interface State {

  [fromBookmark.bookmarksFeatureKey]: fromBookmark.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromBookmark.bookmarksFeatureKey]: fromBookmark.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
