import React from 'react';
import 'whatwg-fetch';
import { createContainer, withEvent } from './domManipulators';
import { CustomerSearch } from '../src/CustomerSearch';
import { fetchResponseOk } from './spyHelpers';

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
});