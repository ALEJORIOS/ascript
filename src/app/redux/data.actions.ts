import { createAction, props } from "@ngrx/store";

export const setEnablePages = createAction(
    '[UserData] SetAvailablePages',
    props<{ pages: string[] }>()
);
export const setStatusLogged = createAction(
    '[UserData] SetLogged',
    props<{ stateLogged: boolean }>()
);