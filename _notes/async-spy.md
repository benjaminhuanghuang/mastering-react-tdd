## Version 1
```
it('saves existing first name when submitted', async () => {
  expect.hasAssertions();
  render(<CustomerForm firstName=""abc" onSubmit={customer=>
      expect(customer.firstName).toEqual('abc)
      } />);

  await ReactTestUtils.Simulator.sumbit(form('customer'));
});
```
There are 2 issues:
1. Assert phase was wrapped into Act phase
2. The hasAssertions expection tell Jest tha tit should expect at least one assetion. 
Without this line, Jest could pass the test if the task queue clears but **the event handler was never executed**.

The issue can be fixed by building a spy.
Spy is a test dbouble that records the arguments it is called. Those values can be inspected later.

## version 2
```
const itSubmitsExistingValue = (fieldName, value) =>
  it('saves existing value when submitted', async () => {
    // Move the Assert under Act by using a varialbe
    let submitArg;

    render(<CustomerForm {...{ [fieldName]: value }} onSumbit={customer=>submitArg = customer}/>);

    ReactTestUtils.Simulate.submit(form('customer'));

    // Assert
    expect(submitArg[fieldName].toEqual(value))
  });
```

## version 3
Making spy reusable
```
  const singleArgumentSpy = () =>{
    let receivedArgument;
    return {
      fun : arg => (receivedArgument = arg),
      receivedArgument : ()=> receivedArgument
    }
  }
    
  const itSubmitsExistingValue = (fieldName, value) =>
    it('saves existing value when submitted', async () => {
      let submitSpy = singleArgumentSpy();

      render(<CustomerForm {...{ [fieldName]: value }} onSumbit={submitSpy.fn}/>);

      ReactTestUtils.Simulate.submit(form('customer'));
    
      expect(submitSpy.receivedArgument()).toBeDefined()
      expect(submitSpy.receivedArgument()[fieldName]).toEqual(value)  
    });
```

## version 4
```
const spy = () => {
    let receivedArguments;
    return {
      fun: (...args) => (receivedArguments = args),
      receivedArguments: () => receivedArguments,
      receivedArgument: n => receivedArguments[n]
    }
  }

expect.extend({
  toHaveBeenCalled(received) {
    if (received.receivedArguments() === undefined) {
      return {
        pass: false,
        message: () => 'Spy was not called.'
      };
    }
    return { pass: true, message: () => 'Spy was called.' };
  }
});

it('calls fetch with the right properties when submitting data', async () => {
  cosnt fetchSpy = spy();

  render(<CustomerForm fetch={fetchSpy.fn} onSubmit={()=>{}}/>);

  ReactTestUtils.Simulate.submit(form('customer'));

  ReactTestUtils.Simulate.submit(form('customer'));
  expect(fetchSpy).toHaveBeenCalled();
  expect(fetchSpy.receivedArgument(0)).toEqual('/customers');
});
```

## version 5
Replacing global variables with spy
```
  let fetchSpy;

  beforeEach(() => {
    ({ render, container } = createContainer());
    fetchSpy = spy();
    window.fetch = fetchSpy.fn;
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });
```