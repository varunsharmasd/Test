import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType  } from "@ngrx/effects";
import { UsersActions } from './users-store';
import { switchMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { DataService } from '../../_pages/users/data.service';
import { EMPTY } from 'rxjs';

@Injectable()
export class UsersEffects {
    loadData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.init),
            exhaustMap(() =>
                this.api.loadData()
                    .pipe(
                        map(({users}) => UsersActions.loadSuccess({users})),
                        catchError(()=> EMPTY)
            )
        )
        )
    )
    constructor(private actions$: Actions, private api: DataService) {     }

}