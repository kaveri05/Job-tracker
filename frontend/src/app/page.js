"use client";

import { useCallback, useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import { getJobs } from "../api";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = useCallback(async () => {
    try {
      const response = await getJobs();
      setJobs(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  return (
    <main className="app">
      <header className="app-header">
        <h1>Job Tracker</h1>
        <p>Track your job applications easily</p>
      </header>

      <Dashboard jobs={jobs} />

      <JobForm onJobAdded={loadJobs} />

      <section className="jobs-section">
        <h2>My Applications</h2>

        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <JobList jobs={jobs} onChange={loadJobs} />
        )}
      </section>
    </main>
  );
}
