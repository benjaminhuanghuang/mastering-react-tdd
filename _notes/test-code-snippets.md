
## Does element exist
```
const form = id => container.querySelector(`form[id="${id}"]`);
// check from by id
expect(form('appointment')).not.toBeNull();
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
## 
```
it.skip("", ()=>{})
```