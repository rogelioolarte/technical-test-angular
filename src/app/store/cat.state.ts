import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from "@ngrx/store";

interface State {
    fact: string,
    imageURL: string,
    loading: boolean,
    error: string
}

export const initialState: State = {
    fact: '',
    imageURL: '',
    loading: false,
    error: ''
}

export const FactAPIActions = createActionGroup({
    source: 'API Actions',
    events: {
        loadFact: emptyProps(),
        loadFactSuccess: props<{ fact: string }>(),
        loadFactFailure: props<{ error: string }>(),
        createError: props<{ error?: string }>(),
    }
})

export const { loadFact, loadFactFailure, loadFactSuccess, createError } = FactAPIActions;

const getFirstFiveword = (phrase: string) => {
    return phrase.split(' ').slice(0, 4).reduce((prev, cur) => prev+' '+cur, '')
}

const factReducer = createReducer(
    initialState,
    on(loadFact, (state) => ({...state, loading: true})),
    on(loadFactSuccess, (state, { fact }) => ({ ...state, fact, error: '', loading: false,
        imageURL: `https://cataas.com/cat/says/${encodeURIComponent(getFirstFiveword(fact))}`})),
    on(loadFactFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(createError, (state, { error }) => ({...state, error: error || '404: API not found'}))
)

export const FactFeature = createFeature({
    name: '',
    reducer: factReducer,
})

export const { 
    name,
    reducer,
    selectError,
    selectFact,
    selectImageURL,
    selectLoading,
    selectState
} = FactFeature;