import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { Params } from '@angular/router';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
}

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];
