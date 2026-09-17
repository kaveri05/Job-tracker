"use client";

import { useState } from "react";
import { addJob } from "../api";

function JobForm({ onJobAdded }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    applied_date: "",
    follow_up_date: "",
    job_link: "",
    notes: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.company ||
      !formData.role ||
      !formData.applied_date
    ) {
      alert("Company, Role and Applied Date are required");
      return;
    }

    try {
      await addJob(formData);

      setFormData({
        company: "",
        role: "",
        status: "Applied",
        applied_date: "",
        follow_up_date: "",
        job_link: "",
        notes: "",
      });

      setShowForm(false);
      onJobAdded();
    } catch (error) {
      console.error(error);
      alert("Failed to add job");
    }
  };

  return (
    <div className="job-form-container">
      <button
        className="btn-primary"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "+ Add Job"}
      </button>

      {showForm && (
        <form className="job-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
          />

          <input
            type="text"
            name="role"
            placeholder="Job Role"
            value={formData.role}
            onChange={handleChange}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <label>Applied Date</label>

          <input
            type="date"
            name="applied_date"
            value={formData.applied_date}
            onChange={handleChange}
          />

          <label>Follow-up Date</label>

          <input
            type="date"
            name="follow_up_date"
            value={formData.follow_up_date}
            onChange={handleChange}
          />

          <input
            type="url"
            name="job_link"
            placeholder="Job Link"
            value={formData.job_link}
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <button type="submit" className="btn-primary">
            Add Job
          </button>
        </form>
      )}
    </div>
  );
}

export default JobForm;