import React, {useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loggedInUser] = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:4200/bookings?email=${loggedInUser.email}`, {
      method: 'GET',
      headers: {
        contentType: 'application/json',
        authorization: `Bearer ${sessionStorage.getItem('idtoken')}`
      }
    })
    .then(res => res.json())
    .then(data => setBookings(data));
  }, [loggedInUser.email])
  return (
    <div>
      <h1>You Have: {bookings.length} Bookings</h1>
      {
        bookings.map(book => <li key={book._id}>{book.name}  From {(new Date(book.checkIn)).toDateString('dd/MM/yyyy')} TO {(new Date(book.checkOut)).toDateString('dd/MM/yyyy')}</li>)
      }
    </div>
  );
};

export default Bookings;