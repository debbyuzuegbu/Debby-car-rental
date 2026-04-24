import { useState } from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const today = () => new Date().toISOString().split("T")[0];

const validate = (fields) => {
  const errors = {};
  if (!fields.from.trim()) errors.from = true;
  if (!fields.to.trim()) errors.to = true;
  if (!fields.date) errors.date = true;
  else if (fields.date < today()) errors.dateMsg = "Date cannot be in the past.";
  if (!fields.time) errors.time = true;
  return errors;
};

const FindCarForm = () => {
  const [fields, setFields] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    type: "ac",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.dateMsg)
      setErrors((prev) => ({ ...prev, [name]: undefined, dateMsg: undefined }));
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSuccess(true);
  };

  return (
    <Form className="form" onSubmit={handleSubmit} noValidate>
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <input
            type="text"
            name="from"
            placeholder="From address"
            value={fields.from}
            onChange={handleChange}
            className={errors.from ? "is-invalid" : ""}
            aria-label="From address"
          />
          {errors.from && (
            <div className="invalid-feedback d-block">From address required.</div>
          )}
        </FormGroup>

        <FormGroup className="form__group">
          <input
            type="text"
            name="to"
            placeholder="To address"
            value={fields.to}
            onChange={handleChange}
            className={errors.to ? "is-invalid" : ""}
            aria-label="To address"
          />
          {errors.to && (
            <div className="invalid-feedback d-block">To address required.</div>
          )}
        </FormGroup>

        <FormGroup className="form__group">
          <input
            type="date"
            name="date"
            value={fields.date}
            min={today()}
            onChange={handleChange}
            className={errors.date || errors.dateMsg ? "is-invalid" : ""}
            aria-label="Journey date"
          />
          {(errors.date || errors.dateMsg) && (
            <div className="invalid-feedback d-block">
              {errors.dateMsg || "Journey date required."}
            </div>
          )}
        </FormGroup>

        <FormGroup className="form__group">
          <input
            className={`journey__time ${errors.time ? "is-invalid" : ""}`}
            type="time"
            name="time"
            value={fields.time}
            onChange={handleChange}
            aria-label="Journey time"
          />
          {errors.time && (
            <div className="invalid-feedback d-block">Journey time required.</div>
          )}
        </FormGroup>

        <FormGroup className="select__group">
          <select
            name="type"
            value={fields.type}
            onChange={handleChange}
            aria-label="Car type"
          >
            <option value="ac">AC Car</option>
            <option value="non-ac">Non AC Car</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <button type="submit" className="btn find__car-btn">
            Find Car
          </button>
        </FormGroup>
      </div>

      {success && (
        <div className="text-success mt-2 fw-medium text-center">
          <i className="ri-checkbox-circle-line me-1"></i>
          Searching for available cars…
        </div>
      )}
    </Form>
  );
};

export default FindCarForm;
