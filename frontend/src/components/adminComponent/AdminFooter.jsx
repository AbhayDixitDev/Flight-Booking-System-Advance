// src/components/adminComponent/AdminFooter.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const AdminFooter = () => {
  return (
    <footer className="py-3" style={{ backgroundColor: '#000', color: 'white', height: '10vh' }}>
      <Container>
        <Row>
          <Col md={4}>
            <p className="text-center" style={{ fontSize: '14px' }}>
              &copy; {new Date().getFullYear()} Flight Booking System. All rights reserved.
            </p>
          </Col>
          <Col md={4}>
            <p className="text-center">
              Developed by{' '}
              <a
                href="https://github.com/abhaydixitdev"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                Abhay Dixit
              </a>
            </p>
          </Col>
          <Col md={4}>
            <div className="text-center" style={{ display: 'flex', justifyContent: 'center' }}>
              <a
                href="https://github.com/abhaydixitdev"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                <FaGithub size={30} className="mx-2" />
              </a>
              <a
                href="https://twitter.com/abhaydixitji"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                <FaTwitter size={30} className="mx-2" />
              </a>
              <a
                href="https://www.instagram.com/abhaydixitji"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                <FaInstagram size={30} className="mx-2" />
              </a>
              <a
                href="https://www.linkedin.com/in/abhaydixitdev"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                <FaLinkedin size={30} className="mx-2" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default AdminFooter;
