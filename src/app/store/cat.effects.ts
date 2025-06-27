import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FactService, Response } from "../services/fact.service";
import { catchError, exhaustMap, map, of } from "rxjs";
import { loadFact, loadFactFailure, loadFactSuccess } from "./cat.state";
import { HttpErrorResponse } from "@angular/common/http";

export const loadFactEffect = createEffect(
    (
        actions$ = inject(Actions),
        factService = inject(FactService)
    ) => {
        return actions$.pipe(
            ofType(loadFact),
            exhaustMap(() => 
                factService.getFact().pipe(
                    map((res: Response) => loadFactSuccess({ fact: res.fact})),
                    catchError((error: HttpErrorResponse) =>
                        of(loadFactFailure({error: error.message})) )
                )
            )
        )
    },
    { functional: true }
);