import { Observable, delay, finalize, mergeMap, throwError, timer } from "rxjs";

interface iRetryPolicy {
    maxRetryAttempts?: number;
    scalingDuration?: number;
    excludedStatusCodes?: number[];
  }
  
export const genericRetryPolicy =
  ({
    maxRetryAttempts = 2,
    scalingDuration = 1000,
    excludedStatusCodes = [],
  }: iRetryPolicy = {}) =>
    (attempts: Observable<any>) => {
      return attempts.pipe(
        delay(scalingDuration), // Start retries after 2s from the initial req fail.
        mergeMap((error, i) => {
          const retryAttempt = i + 1;
          // if maximum number of retries have been met
          // or response is a status code we don't wish to retry, throw error
          if (
            retryAttempt > maxRetryAttempts ||
            excludedStatusCodes.find((e:any) => e === error.status)
          ) {
            return throwError(() => error);
          }

          // retry after 1s, 2s, 3s
          console.log(`RETRY --> ${retryAttempt}`);
          return timer(retryAttempt * scalingDuration);
        }),
        finalize(() => console.log('Fin de rejeu, Requete echouée !'))
      );
    };