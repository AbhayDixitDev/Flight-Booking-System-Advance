// src/pages/Registration.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

const Registration = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    passportNumber: '',
  });
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for file upload along with other form fields
    const data = new FormData();
    data.append('username', formValues.username);
    data.append('email', formValues.email);
    data.append('password', formValues.password);
    data.append('fullName', formValues.fullName);
    data.append('passportNumber', formValues.passportNumber);
    if (avatar) {
      data.append('avatar', avatar);
    }

    try {
      const response = await apiService.post('/user/register', data);
      message.success(response.data.message);
      navigate('/');
    } catch (error) {
      message.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh' }} className="d-flex flex-column justify-content-center">
      <Container className="mt-5" style={{ overflow: "auto" }}>
        <Row className="justify-content-center">
          <Col md="4">
            <Form onSubmit={handleSubmit} className="shadow p-4 bg-white rounded">
              <h2 className="text-center mb-4">Register</h2>
              <FormGroup>
                <Label for="username">
                  <FaEnvelope className="mr-2" /> Username
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={formValues.username}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">
                  <FaEnvelope className="mr-2" /> Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">
                  <FaLock className="mr-2" /> Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="fullName">
                  <FaEnvelope className="mr-2" /> Full Name
                </Label>
                <Input
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formValues.fullName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="passportNumber">
                  <FaEnvelope className="mr-2" /> Passport Number
                </Label>
                <Input
                  type="text"
                  id="passportNumber"
                  placeholder="Enter your passport number"
                  value={formValues.passportNumber}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="avatar">
                  <FaEnvelope className="mr-2" /> Avatar
                </Label>
                <Input type="file" id="avatar" name="avatar" onChange={handleFileChange} />
              </FormGroup>
              <Button color="danger" block className="my-2" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Registration;
