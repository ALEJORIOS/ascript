import { createReducer, on } from "@ngrx/store";
import { setEnablePages, setStatusLogged } from "./data.actions";

export const initialStateAvailablePages = {};
export const initialStatelogged = {value: false};

export const availablePagesReducer = createReducer(
    initialStateAvailablePages,
    on(setEnablePages, (state, { pages }) => ({ ...state, prop: pages}))
);

export const setLoggedReducer = createReducer(
    initialStatelogged,
    on(setStatusLogged, (state, { stateLogged }) => ({ ...state, prop: stateLogged})) 
);