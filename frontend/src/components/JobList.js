"use client";

import StatusBadge from "./StatusBadge";
import { updateJob, deleteJob } from "../api";

function JobList({ jobs, onChange }) {
  const handleStatusChange = async (job, newStatus) => {
    try {
      await updateJob(job.id, {
        status: newStatus,
      });

      onChange();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }

    try {
      await deleteJob(id);
      onChange();
    } catch (error) {
      console.error(error);
      alert("Failed to delete job");
    }
  };

  if (jobs.length === 0) {
    return <p className="no-jobs">No applications yet.</p>;
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div className="job-card" key={job.id}>
          <div className="job-card-header">
            <div>
              <h3>{job.company}</h3>
              <p>{job.role}</p>
            </div>

            <StatusBadge status={job.status} />
          </div>

          <div className="job-details">
            <p>
              <strong>Applied:</strong>{" "}
              {job.applied_date}
            </p>

            {job.follow_up_date && (
              <p>
                <strong>Follow-up:</strong>{" "}
                {job.follow_up_date}
              </p>
            )}

            {job.notes && (
              <p>
                <strong>Notes:</strong> {job.notes}
              </p>
            )}

            {job.job_link && (
              <p>
                <a
                  href={job.job_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Job
                </a>
              </p>
            )}
          </div>

          <div className="job-actions">
            <select
              value={job.status}
              onChange={(e) =>
                handleStatusChange(job, e.target.value)
              }
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button
              className="btn-delete"
              onClick={() => handleDelete(job.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JobList;