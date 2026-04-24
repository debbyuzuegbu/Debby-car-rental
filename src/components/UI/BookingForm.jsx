import { useState } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup, FormFeedback, Alert } from "reactstrap";

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  fromAddress: "",
  toAddress: "",
  persons: "1 person",
  luggage: "1 luggage",
  journeyDate: "",
  journeyTime: "",
  message: "",
};

const validate = (fields) => {
  const errors = {};
  if (!fields.firstName.trim()) errors.firstName = "First name is required.";
  if (!fields.lastName.trim()) errors.lastName = "Last name is required.";
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!fields.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[0-9\s\-]{7,15}$/.test(fields.phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!fields.fromAddress.trim()) errors.fromAddress = "Pick-up address is required.";
  if (!fields.toAddress.trim()) errors.toAddress = "Drop-off address is required.";
  if (!fields.journeyDate) errors.journeyDate = "Journey date is required.";
  else if (new Date(fields.journeyDate) < new Date().setHours(0, 0, 0, 0))
    errors.journeyDate = "Journey date cannot be in the past.";
  if (!fields.journeyTime) errors.journeyTime = "Journey time is required.";
  return errors;
};

const BookingForm = () => {
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setFields(INITIAL);
    setErrors({});
  };

  if (submitted) {
    return (
      <Alert color="success" className="text-center">
        <i className="ri-checkbox-circle-line fs-4 me-2"></i>
        Booking request received! We'll contact you shortly to confirm.
        <br />
        <button
          className="btn btn-sm btn-outline-success mt-3"
          onClick={() => setSubmitted(false)}
        >
          Make another booking
        </button>
      </Alert>
    );
  }

  return (
    <Form onSubmit={submitHandler} noValidate>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={fields.firstName}
          onChange={handleChange}
          className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
        />
        {errors.firstName && <FormFeedback>{errors.firstName}</FormFeedback>}
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={fields.lastName}
          onChange={handleChange}
          className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
        />
        {errors.lastName && <FormFeedback>{errors.lastName}</FormFeedback>}
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={fields.email}
          onChange={handleChange}
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
        />
        {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={fields.phone}
          onChange={handleChange}
          className={`form-control ${errors.phone ? "is-invalid" : ""}`}
        />
        {errors.phone && <FormFeedback>{errors.phone}</FormFeedback>}
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="text"
          name="fromAddress"
          placeholder="From Address"
          value={fields.fromAddress}
          onChange={handleChange}
          className={`form-control ${errors.fromAddress ? "is-invalid" : ""}`}
        />
        {errors.fromAddress && <FormFeedback>{errors.fromAddress}</FormFeedback>}
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="text"
          name="toAddress"
          placeholder="To Address"
          value={fields.toAddress}
          onChange={handleChange}
          className={`form-control ${errors.toAddress ? "is-invalid" : ""}`}
        />
        {errors.toAddress && <FormFeedback>{errors.toAddress}</FormFeedback>}
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <select
          name="persons"
          value={fields.persons}
          onChange={handleChange}
          className="form-select"
        >
          {["1 person", "2 person", "3 person", "4 person", "5+ person"].map(
            (v) => <option key={v} value={v}>{v}</option>
          )}
        </select>
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <select
          name="luggage"
          value={fields.luggage}
          onChange={handleChange}
          className="form-select"
        >
          {["1 luggage", "2 luggage", "3 luggage", "4 luggage", "5+ luggage"].map(
            (v) => <option key={v} value={v}>{v}</option>
          )}
        </select>
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="date"
          name="journeyDate"
          value={fields.journeyDate}
          onChange={handleChange}
          className={`form-control ${errors.journeyDate ? "is-invalid" : ""}`}
        />
        {errors.journeyDate && <FormFeedback>{errors.journeyDate}</FormFeedback>}
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="time"
          name="journeyTime"
          value={fields.journeyTime}
          onChange={handleChange}
          className={`form-control time__picker ${errors.journeyTime ? "is-invalid" : ""}`}
        />
        {errors.journeyTime && <FormFeedback>{errors.journeyTime}</FormFeedback>}
      </FormGroup>

      <FormGroup>
        <textarea
          rows={5}
          name="message"
          className="textarea w-100"
          placeholder="Additional notes (optional)"
          value={fields.message}
          onChange={handleChange}
        />
      </FormGroup>

      <button type="submit" className="btn btn-success w-100 py-2">
        <i className="ri-calendar-check-line me-2"></i>Confirm Booking
      </button>
    </Form>
  );
};

export default BookingForm;
