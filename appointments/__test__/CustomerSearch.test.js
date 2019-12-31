import React from 'react';
import 'whatwg-fetch';
import { createContainer, withEvent } from './domManipulators';
import { CustomerSearch } from '../src/CustomerSearch';
import { fetchResponseOk } from './spyHelpers';

const oneCustomer = [
  { id: 1, firstName: 'A', lastName: 'B', phoneNumber: '1' }
];

const twoCustomers = [
  { id: 1, firstName: 'A', lastName: 'B', phoneNumber: '1' },
  { id: 2, firstName: 'C', lastName: 'D', phoneNumber: '2' }
];

const tenCustomers = Array.from('0123456789', id => ({ id }));

const anotherTenCustomers = Array.from('ABCDEFGHIJ', id => ({
  id
}));

const lessThanTenCustomers = Array.from('0123456', id => ({
  id: id
}));

const twentyCustomers = Array.from('0123456789ABCDEFGHIJ', id => ({
  id: id
}));

describe('CustomerSearch', () => {
  let renderAndWait, container, element, elements;
  
  beforeEach(() => {
    ({
      renderAndWait,
      container,
      element,
      elements
    } = createContainer());
    jest
      .spyOn(window, 'fetch')
      .mockReturnValue(fetchResponseOk([]));
  });

  const renderCustomerSearch = props =>
    renderAndWait(
      <CustomerSearch
        {...props}
        // history={{ push: historySpy }}
        // renderCustomerActions={actionSpy}
        location={{ pathname: '/path' }}
      />
    );

  it('renders a table with four headings', async () => {
    await renderCustomerSearch();
    const headings = elements('table th');
    expect(headings.map(h => h.textContent)).toEqual([
      'First name',
      'Last name',
      'Phone number',
      'Actions'
    ]);
  });

  it('fetches all customer data when component mounts', async () => {
    await renderCustomerSearch();
    expect(window.fetch).toHaveBeenCalledWith('/customers', {
      method: 'GET',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' }
    });
  });

  it('renders all customer data in a table row', async () => {
    window.fetch.mockReturnValue(fetchResponseOk(oneCustomer));
    await renderCustomerSearch();
    const columns = elements('table > tbody > tr > td');
    expect(columns[0].textContent).toEqual('A');
    expect(columns[1].textContent).toEqual('B');
    expect(columns[2].textContent).toEqual('1');
  });


  it('renders multiple customer rows', async () => {
    window.fetch.mockReturnValue(fetchResponseOk(twoCustomers));
    await renderCustomerSearch();
    const rows = elements('table tbody tr');
    expect(rows[1].childNodes[0].textContent).toEqual('C');
  });
});