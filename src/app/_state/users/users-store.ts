import { EntityAdapter, EntityState, Update, createEntityAdapter } from "@ngrx/entity";
import { createActionGroup, createFeature, createFeatureSelector, createReducer, createSelector, emptyProps, on, props, select } from '@ngrx/store';

const UsersStoreKey = "users";

export interface Data {
    id: number;
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
        'Update User': props<{data:Data}>()
    }
});
export const UsersReducer = createFeature({
    name: UsersStoreKey,
    reducer: createReducer(
        initialState,
        on(UsersActions.loadSuccess, (_, { users }) => usersAdapter.setAll(users, _)),
        on(UsersActions.updateUser, (state, {  data }) => usersAdapter.updateOne({
            id: data.id,
            changes: {
                ...data,
                show: data.show
            }
        }, state))
        
        
    )
});
export const selectUserState = createFeatureSelector<UsersState>('users');



export const { selectAll: selectAllUsers } = usersAdapter.getSelectors(selectUserState);



