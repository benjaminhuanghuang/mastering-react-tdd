## version 1
ch2: Submitting a form with data
```
it('saves existing first name when submitted', async () => {
      expect.hasAssertions();
});
```
The hasAssertions expection tell Jest tha tit should expect at least one assetion. 
Without this line, Jest could pass the test if the task queue clears but **the event handler was never executed**.


## version 2
```
const itSubmitsExistingValue = (fieldName, value) =>
    it('saves existing value when submitted', async () => {
      let submitArg;

      render(<CustomerForm {...{ [fieldName]: value }} onSumbit={customer=>submitArg = customer}/>);

      ReactTestUtils.Simulate.submit(form('customer'));

      const fetchOpts = fetchSpy.receivedArgument(1);
      expect(submitArg[fieldName].toEqual(value))
      //expect(JSON.parse(fetchOpts.body)[fieldName]).toEqual(value);
    });
```

## version 3
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


const itSubmitsExistingValue = (fieldName, value) =>
  it('saves existing value when submitted', async () => {
    let submitSpy = spy();

    render(<CustomerForm {...{ [fieldName]: value }} onSumbit={submitSpy.fn} />);

    ReactTestUtils.Simulate.submit(form('customer'));

    expect(submitSpy.receivedArguments()).toBeDefined()
    expect(submitSpy.receivedArgument(0)[fieldName]).toEqual(value)
    //expect(JSON.parse(fetchOpts.body)[fieldName]).toEqual(value);
  });
```