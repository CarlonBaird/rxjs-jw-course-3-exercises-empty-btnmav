import { Observable } from 'rxjs';

const observable$ = new Observable<string>((subscriber) => {
  console.log('Observable executed!');
  subscriber.next('Alice');
  subscriber.next('Tim');
  // setTimeout(() => {
  //   subscriber.next('Chris');
  //   //emitting the complete notification after the third value has been emitted.
  //   subscriber.complete();
  // }, 2000);

  //emit error 4 seconds after subscribing
  setTimeout(() => subscriber.error(new Error('Failure')), 4000);

  return () => {
    console.log('Teardown'); //teardown phase of the subscription
  };
});

console.log('Before subscribe');
// observable$.subscribe((value) => {
//   console.log(value);
// });

//we have to use this format to deal with complete
observable$.subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log(err.message),
  complete: () => console.log('Completed'),
});
console.log('After subscribe');
