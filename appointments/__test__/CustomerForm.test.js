import React from 'react';
import 'whatwg-fetch';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import CustomerForm from '../src/CustomerForm';
import {
  fetchResponseOk,
  fetchResponseError,
  requestBodyOf
} from './spyHelpers';

describe('CustomerForm', () => {
  let render,
  container,
  form,
  field,
  labelFor,
  element,
  change,
  submit;

  const originalFetch = window.fetch;
  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = name => form('customer').elements[name];
  const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

  beforeEach(() => {
    // destructuring assignment where the variables have been declared
    ({
      render,
      container,
      form,
      field,
      labelFor,
      element,
      change,
      submit
    } = createContainer());

    fetchSpy = spy();
    // No need to pass fetch function to CustomerForm as a prop.
    jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk({}))
  });
  
  afterEach(() => {
    window.fetch = originalFetch;
  });

  const spy = () => {
    let receivedArguments;
    let returnValue;

    return {
      fn: (...args) => {
        receivedArguments = args;
        //
        return returnValue; 
      },
      receivedArguments: () => receivedArguments,
      receivedArgument: n => receivedArguments[n],
      stubReturnValue: (value)=> returnValue = value
    };
  };

  const fetchResponseOk = body =>
    Promise.resolve({
      ok: true,
      json: ()=>Promise.resolove(body)
    })

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

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  it('has a submit button', () => {
    render(<CustomerForm />);
    const submitButton = container.querySelector(
      'input[type="submit"]'
    );
    expect(submitButton).not.toBeNull();
  });

  // this logic was moved to itRendersAsATextBox(fieldName)
  it("renders the first name field as a text box", () => {
    render(<CustomerForm />);
    const field = form("customer").elements.firstName;
    expect(field).not.toBeNull();
    expect(field.tagName).toEqual('INPUT')
    expect(field.type).toEqual('text');
  })

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

  const itIncludesTheExistingValue = fieldName =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expect(field(fieldName).value).toEqual('value');
    });

  const itRendersALabel = (fieldName, text) =>
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(text);
    });

  const itAssignsAnIdThatMatchesTheLabelId = fieldName =>
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSubmitsExistingValue = (fieldName, value) =>
    it('saves existing value when submitted', async () => {
      let submitSpy = spy();
      let fetchSpy = spy();

      render(<CustomerForm {...{ [fieldName]: value }} fetch={fetchSpy.fn} onSumbit={submitSpy.fn} />);

      ReactTestUtils.Simulate.submit(form('customer'));

      const fetchOpts = fetchSpy.receivedArgument(1);
      expect(JSON.parse(fetchOpts.body)[fieldName]).toEqual(value);

      expect(submitSpy.receivedArguments()).toBeDefined()
      expect(submitSpy.receivedArgument(0)[fieldName]).toEqual(value)
    });

  const itSubmitsNewValue = (fieldName, value) =>
    it('saves new value when submitted', async () => {
      render(
        <CustomerForm {...{ [fieldName]: 'existingValue' }} />
      );
      ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value, name: fieldName }
      });
      ReactTestUtils.Simulate.submit(form('customer'));

      const fetchOpts = fetchSpy.receivedArgument(1);
      expect(JSON.parse(fetchOpts.body)[fieldName]).toEqual(value);
    });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName', 'First name');
    itAssignsAnIdThatMatchesTheLabelId('firstName');
    itSubmitsExistingValue('firstName', 'value');
    // itSubmitsNewValue('firstName', 'newValue');
  });

  /*
  describe('last name field', () => {
    itRendersAsATextBox('lastName');
    itIncludesTheExistingValue('lastName');
    itRendersALabel('lastName', 'Last name');
    itAssignsAnIdThatMatchesTheLabelId('lastName');
    itSubmitsExistingValue('lastName', 'value');
    itSubmitsNewValue('lastName', 'newValue');
  });

  describe('phone number field', () => {
    itRendersAsATextBox('phoneNumber');
    itIncludesTheExistingValue('phoneNumber');
    itRendersALabel('phoneNumber', 'Phone number');
    itAssignsAnIdThatMatchesTheLabelId('phoneNumber');
    itSubmitsExistingValue('phoneNumber', '12345');
    itSubmitsNewValue('phoneNumber', '67890');
  });*/
})