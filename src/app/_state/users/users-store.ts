import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createActionGroup, createFeature, createFeatureSelector, createReducer, emptyProps, on, props } from "@ngrx/store";

const UsersStoreKey = "users";

export interface Data {
    id: string;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    birthDate: string;
    show: boolean;
}

export interface UsersState extends EntityState<Data> {}

const usersAdapter: EntityAdapter<Data> = createEntityAdapter<Data>();


export const initialState: UsersState = usersAdapter.getInitialState({});


export const UsersActions = createActionGroup({
    source: UsersStoreKey,
    events: {
        Init: emptyProps(),
        'Load Success': props<{ users: Data[] }>(),
        'Update User': props<{id:string}>()
    }
});
export const UsersReducer = createFeature({
    name: UsersStoreKey,
    reducer: createReducer(
        initialState,
        on(UsersActions.loadSuccess, (_, { users }) => usersAdapter.setAll(users, _)),
        // on(UsersActions.updateUser,(state,{id})=> [...state,])
        
    )
});

