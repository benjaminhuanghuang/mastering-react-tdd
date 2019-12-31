
import React, {useEffect, useState} from 'react';

const CustomerRow = ({ customer }) => (
  <tr>
    <td>{customer.firstName}</td>
    <td>{customer.lastName}</td>
    <td>{customer.phoneNumber}</td>
  </tr>
);

export const CustomerSearch = ({
  renderCustomerActions,
  lastRowIds,
  searchTerm,
  limit,
  history,
  location
}) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async ()=>{
      const result = await window.fetch('/customers', {
        method: 'GET',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' }
      });
      setCustomers(await result.json());
    }
  
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            customers.map(customer => 
              <CustomerRow customer ={customer} key={customer.id}/>
            )
          }
        </tbody>
      </table>
    </React.Fragment>
  );
};

CustomerSearch.defaultProps = {
  renderCustomerActions: () => {},
  searchTerm: '',
  lastRowIds: []
};