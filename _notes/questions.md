-  expect.hasAssertions();
ch2: Submitting a form with data
```
it('saves existing first name when submitted', async () => {
      expect.hasAssertions();
});
```
The hasAssertions expection tell Jest tha tit should expect at least one assetion. 
Without this line, Jest could pass the test if the task queue clears but **the event handler was never executed**.


- act in React
Use this function when our actions perform any kind of side-effects that happen outside the synchronous flow of our component, including resolving premise

it defers state updates until the entirety of function passed to act has comppleted.
That helps to avoid timing issues whtn multiple state setters are running. 

it waits for any useEffect hook to complete

before act was availabele, we would call **await new promise(setTimeout)** for this case.

Warning when need act:
```
  Warning: An update to null inside a test was not wrapped in act(...).
  When testing, code that causes React state updates should be wrapped into act(...)
```


## Array.from(dropdownNode.childNodes); 

- [x] resloved

// The DOM objects are changes, By calling Array.from, we taks a snaphow of the value within it at a particular momonet
How about using dropdownNode.childNodes directly?

## jest.spyOn


## whatwg-fetch


## shallow render
Ch 4 
tag shallow-rendering

https://github.com/PacktPublishing/Mastering-React-Test-Driven-Development/blob/chapter-5-exercises/appointments/test/shallowHelpers.js

https://github.com/PacktPublishing/Mastering-React-Test-Driven-Development/blob/chapter-5-exercises/appointments/test/shallowHelpers.test.js


## useCallback