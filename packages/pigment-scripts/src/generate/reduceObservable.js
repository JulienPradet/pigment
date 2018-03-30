const { ReplaySubject } = require("rxjs/ReplaySubject");
const { scan } = require("rxjs/operators");

const reduceObservable = (reducer, starter) => observable$ => {
  let dataToReturn = starter;
  const data$ = new ReplaySubject();

  observable$.pipe(scan(reducer, starter)).subscribe(
    data => {
      dataToReturn = data;
    },
    error => {
      data$.error(error);
    },
    () => {
      data$.next(dataToReturn);
      data$.complete();
    }
  );

  return data$;
};

module.exports = reduceObservable;
