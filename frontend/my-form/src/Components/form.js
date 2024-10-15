import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const FormComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://test-deploy-backend-liard.vercel.app/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage('Error submitting the form.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center mb-4">Submit Your Details</h2>
          <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm">
            
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                isInvalid={errors.name}
                {...register('name', { required: 'Name is required' })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name && errors.name.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                isInvalid={errors.email}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address',
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email && errors.email.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>

          {message && (
            <Alert variant="success" className="mt-3 text-center">
              {message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FormComponent;
