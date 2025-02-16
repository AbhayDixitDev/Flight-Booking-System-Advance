// src/pages/adminPages/BookingHistory.jsx
import React, { useState, useEffect } from 'react';
import { Container, Table } from 'reactstrap';
import { message } from 'antd';
import apiService from '../../services/apiService';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Assuming you have an endpoint that returns all booking history for admin
        const response = await apiService.get('/admin/bookingHistory');
        setBookings(response.data.data);
      } catch (error) {
        message.error(error.response?.data?.message || 'Failed to fetch booking history');
      }
    };

    fetchBookings();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Booking History</h2>
      <Table striped responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Flight</th>
            <th>User</th>
            <th>Booking Date</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {bookings && bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.flightDetails}</td>
                <td>{booking.userId}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{booking.totalCost}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No bookings found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default BookingHistory;
