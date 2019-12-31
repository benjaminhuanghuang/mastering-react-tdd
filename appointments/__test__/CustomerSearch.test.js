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
  let renderAndWait, container, element, elements, clickAndWait, changeAndWait;
  
  beforeEach(() => {
    ({
      renderAndWait,
      container,
      element,
      elements,
      clickAndWait,
      changeAndWait
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

  it("has a next button", async ()=>{
    await renderCustomerSearch();
    expect(element('button#next-page')).not.toBeNull();
  })


  it('requests next page of data when next button is clicked', async () => {
    window.fetch.mockReturnValue(fetchResponseOk(tenCustomers));
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(element('button#next-page'));
    expect(window.fetch).toHaveBeenLastCalledWith(
      '/customers?after=9',
      expect.anything()
    );
  });

  it('displays next page of data when next button is clicked', async () => {
    const nextCustomer = [{ id: 'next', firstName: 'Next' }];
    window.fetch
      .mockReturnValueOnce(fetchResponseOk(tenCustomers))
      .mockReturnValue(fetchResponseOk(nextCustomer));
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(element('button#next-page'));
    expect(elements('tbody tr').length).toEqual(1);
    expect(elements('td')[0].textContent).toEqual('Next');
  });

  it('has a previous button', async () => {
    await renderAndWait(<CustomerSearch />);
    expect(element('button#previous-page')).not.toBeNull();
  });

  it('moves back to first page when previous button is clicked', async () => {
    window.fetch.mockReturnValue(fetchResponseOk(tenCustomers));
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(element('button#next-page'));
    await clickAndWait(element('button#previous-page'));
    expect(window.fetch).toHaveBeenLastCalledWith(
      '/customers',
      expect.anything()
    );
  });

  it('moves back one page when clicking previous after multiple clicks of the next button', async () => {
    window.fetch
      .mockReturnValueOnce(fetchResponseOk(tenCustomers))
      .mockReturnValue(fetchResponseOk(anotherTenCustomers));
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(element('button#next-page'));
    await clickAndWait(element('button#next-page'));
    await clickAndWait(element('button#previous-page'));
    expect(window.fetch).toHaveBeenLastCalledWith(
      '/customers?after=9',
      expect.anything()
    );
  });

  it('moves back multiple pages', async () => {
    window.fetch
      .mockReturnValueOnce(fetchResponseOk(tenCustomers))
      .mockReturnValue(fetchResponseOk(anotherTenCustomers));
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(element('button#next-page'));
    await clickAndWait(element('button#next-page'));
    await clickAndWait(element('button#previous-page'));
    await clickAndWait(element('button#previous-page'));
    expect(window.fetch).toHaveBeenLastCalledWith(
      '/customers',
      expect.anything()
    );
  });

  it('has a search input field with a placeholder', async () => {
    await renderAndWait(<CustomerSearch />);
    expect(element('input')).not.toBeNull();
    expect(element('input').getAttribute('placeholder')).toEqual(
      'Enter filter text'
    );
  });

  it('performs search when search term is changed', async () => {
    await renderAndWait(<CustomerSearch />);
    await changeAndWait(
      element('input'),
      withEvent('input', 'name')
    );
    expect(window.fetch).toHaveBeenLastCalledWith(
      '/customers?searchTerm=name',
      expect.anything()
    );
  });

  it('includes search term when moving to next page', async () => {
    window.fetch.mockReturnValue(fetchResponseOk(tenCustomers));
    await renderAndWait(<CustomerSearch />);
    await changeAndWait(
      element('input'),
      withEvent('input', 'name')
    );
    await clickAndWait(element('button#next-page'));
    expect(window.fetch).toHaveBeenLastCalledWith(
      '/customers?after=9&searchTerm=name',
      expect.anything()
    );
  });

  it('displays provided action buttons for each customer', async () => {
    const actionSpy = jest.fn();
    actionSpy.mockReturnValue('actions');
    window.fetch.mockReturnValue(fetchResponseOk(oneCustomer));
    await renderAndWait(
      <CustomerSearch renderCustomerActions={actionSpy} />
    );
    const rows = elements('table tbody td');
    expect(rows[rows.length - 1].textContent).toEqual('actions');
  });

  it('passes customer to the renderCustomerActions prop', async () => {
    const actionSpy = jest.fn();
    actionSpy.mockReturnValue('actions');
    window.fetch.mockReturnValue(fetchResponseOk(oneCustomer));
    await renderAndWait(
      <CustomerSearch renderCustomerActions={actionSpy} />
    );
    expect(actionSpy).toHaveBeenCalledWith(oneCustomer[0]);
  });

  it('initially disables previous page', async () => {
    await renderAndWait(<CustomerSearch />);
    expect(
      element('button#previous-page').getAttribute('disabled')
    ).not.toBeNull();
  });

  it('enables previous page button once next page button has been clicked', async () => {
    window.fetch.mockReturnValue(fetchResponseOk(tenCustomers));
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(element('button#next-page'));
    expect(
      element('button#previous-page').getAttribute('disabled')
    ).toBeNull();
  });

  it('disables next page button if there are less than ten results on the page', async () => {
    window.fetch.mockReturnValue(
      fetchResponseOk(lessThanTenCustomers)
    );
    await renderAndWait(<CustomerSearch />);
    expect(
      element('button#next-page').getAttribute('disabled')
    ).not.toBeNull();
  });

  it('has a button with a label of 10 that is initially toggled', async () => {
    await renderAndWait(<CustomerSearch />);
    const button = element('a#limit-10');
    expect(button.className).toContain('toggle-button');
    expect(button.className).toContain('toggled');
    expect(button.textContent).toEqual('10');
  });

  [20, 50, 100].forEach(limitSize => {
    it(`has a button with a label of ${limitSize} that is initially not toggled`, async () => {
      await renderAndWait(<CustomerSearch />);
      const button = element(`a#limit-${limitSize}`);
      expect(button).not.toBeNull();
      expect(button.className).toContain('toggle-button');
      expect(button.className).not.toContain('toggled');
      expect(button.textContent).toEqual(limitSize.toString());
    });

    it(`searches by ${limitSize} records when clicking on ${limitSize}`, async () => {
      await renderAndWait(<CustomerSearch />);
      await clickAndWait(element(`a#limit-${limitSize}`));
      expect(window.fetch).toHaveBeenLastCalledWith(
        `/customers?limit=${limitSize}`,
        expect.anything()
      );
    });
  });

  it('searches by 10 records when clicking on 10', async () => {
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(element('a#limit-20'));
    await clickAndWait(element('a#limit-10'));
    expect(window.fetch).toHaveBeenLastCalledWith(
      '/customers',
      expect.anything()
    );
  });

  it('next button still enabled if limit changes', async () => {
    window.fetch.mockReturnValue(fetchResponseOk(twentyCustomers));
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(element('a#limit-20'));
    expect(
      element('button#next-page').getAttribute('disabled')
    ).toBeNull();
  });

  it('changing limit maintains current page', async () => {
    window.fetch.mockReturnValue(fetchResponseOk(tenCustomers));
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(element('button#next-page'));
    await clickAndWait(element('a#limit-20'));
    expect(window.fetch).toHaveBeenLastCalledWith(
      '/customers?after=9&limit=20',
      expect.anything()
    );
  });

});