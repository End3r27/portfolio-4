export default function CTA() {
  return (
    <div className="cta-shell container">
      <h2 className="cta-title">Start learning today</h2>
      <p className="cta-sub">Join thousands leveling up with hands‑on courses, projects, and mentorship.</p>
      <div className="cta-actions">
        <a className="btn-cta" href="#" onClick={(e) => e.preventDefault()}>Enroll Now</a>
        <a className="btn-cta btn-ghost" href="#" onClick={(e) => e.preventDefault()}>Get Updates</a>
      </div>
    </div>
  );
}

