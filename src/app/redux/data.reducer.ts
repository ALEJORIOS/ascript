import { createReducer, on } from "@ngrx/store";
import { setEnablePages } from "./data.actions";

export const initialState = {};

export const availablePagesReducer = createReducer(
    initialState,
    on(setEnablePages, (state, { pages }) => ({ ...state, prop: pages}))
);