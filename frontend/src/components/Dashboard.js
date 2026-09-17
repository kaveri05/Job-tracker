"use client";

function Dashboard({ jobs }) {
  const total = jobs.length;
  const applied = jobs.filter((job) => job.status === "Applied").length;
  const interview = jobs.filter((job) => job.status === "Interview").length;
  const offer = jobs.filter((job) => job.status === "Offer").length;
  const rejected = jobs.filter((job) => job.status === "Rejected").length;

  const cards = [
    { label: "Total", value: total },
    { label: "Applied", value: applied },
    { label: "Interview", value: interview },
    { label: "Offer", value: offer },
    { label: "Rejected", value: rejected },
  ];

  return (
    <div className="dashboard">
      {cards.map((card) => (
        <div className="stat-card" key={card.label}>
          <p className="stat-value">{card.value}</p>
          <p className="stat-label">{card.label}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;