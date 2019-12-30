
## Find element
```
// Find from by id
const form = id => container.querySelector(`form[id="${id}"]`);
expect(form('appointment')).not.toBeNull();

// Find table by id
container.querySelector('table#time-slots');

// Find element by type
cells[0].querySelector('input[type="radio"]')

```


## Check the text content of div, span
```
expect(document.body.textContent).toMatch('Abc')
```

## Check label, value, tag of input
```
  expect(labelFor('service')).not.toBeNull();
  expect(labelFor('service').textContent).toEqual('Salon service');
  expect(field('service')).not.toBeNull();
  expect(field('service').tagName).toEqual('SELECT');
```

## Test dropdown
```
  const firstNode = field('service').childNodes[0];
  expect(firstNode.value).toEqual('');
  expect(firstNode.selected).toBeTruthy();
```

## Test form submit
```
it('saves existing value when submitted', async () => {
  let submitArg;

  render(<CustomerForm {...{ [fieldName]: value }} onSumbit={customer=>submitArg = customer}/>);

  ReactTestUtils.Simulate.submit(form('customer'));

  const fetchOpts = fetchSpy.receivedArgument(1);
  expect(submitArg[fieldName].toEqual(value))
  //expect(JSON.parse(fetchOpts.body)[fieldName]).toEqual(value);
});
```


## Reusable functions
```
// get form element by #id
const form = id => container.querySelector(`form[id="${id}"]`);

// get form element by name
const field = name => form('xxxformId').elements[name];

// get label for input element
const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

// find option in dropdown
  const findOption = (dropdownNode, textContent) => {
    const options = Array.from(dropdownNode.childNodes);
    return options.find(
      option => option.textContent === textContent
    );
  };
```


## Refactor
The logic for 'firstName' can be reused to other fields 
```
it("renders the first name field as a text box", () => {
    render(<CustomerForm />);
    const field = form("customer").elements.firstName;
    expect(field).not.toBeNull();
    expect(field.tagName).toEqual('INPUT')
    expect(field.type).toEqual('text');
  })
```
Refactor to 
```
const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };

const itRendersAsATextBox = fieldName =>
  it('renders as a text box', () => {
    render(<CustomerForm />);
    expectToBeInputFieldOfTypeText(field(fieldName));
  });
```
## 
```
it.skip("", ()=>{})
it.only("", ()=>{})
```