import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';


export const memoize: <T extends Observable<any>>(arg: (...args: any[]) => T) => (...originalArgs: any[]) => T  = (fn) => {
    let cache = {};
    let cacheCreationDate = new Date().getTime();
    
    const memoizedFunction = (...args) => {
        const currTime =  new Date().getTime();
        if (currTime - cacheCreationDate > 1000*60*60) {
            cache = {};
            cacheCreationDate = currTime;
        }
        const cacheKey = JSON.stringify(args);

        if (typeof cache[cacheKey] === 'undefined') {
            const result = fn(...args).pipe(shareReplay());
            cache[cacheKey] = result;
            return result;
        }
        else {
            return cache[cacheKey];
        }
    }
    return memoizedFunction;
}