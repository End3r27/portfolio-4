"use client";
import { useRef } from 'react';

export default function CourseCard({ title, description, tags = [], videoSrc, poster, onEnroll }) {
  const mediaRef = useRef(null);
  const cardRef = useRef(null);

  const handleEnter = () => {
    if (mediaRef.current && mediaRef.current.tagName === 'VIDEO') {
      mediaRef.current.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    if (mediaRef.current && mediaRef.current.tagName === 'VIDEO') {
      mediaRef.current.pause();
      mediaRef.current.currentTime = 0;
    }
  };
  const handleMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect?.();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mx', `${x}%`);
    cardRef.current.style.setProperty('--my', `${y}%`);
  };

  return (
    <article
      ref={cardRef}
      className="course-card reveal-stagger"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
    >
      <div className="course-media">
        {videoSrc ? (
          <video
            ref={mediaRef}
            src={videoSrc}
            poster={poster}
            preload="none"
            muted
            playsInline
            loop
          />
        ) : (
          <div className="media-fallback" aria-hidden style={{
            background: 'linear-gradient(120deg, rgba(110,231,255,.25), rgba(167,139,250,.25))',
            filter: 'saturate(1.2) contrast(1.05)'
          }} />
        )}
        <div className="course-overlay" />
        <button className="card-cta" onClick={onEnroll}>Enroll</button>
      </div>
      <div className="course-body">
        <h3 className="course-title">{title}</h3>
        <p className="course-desc">{description}</p>
        {tags?.length > 0 && (
          <div className="course-tags">
            {tags.map((t, i) => (<span className="tag" key={i}>{t}</span>))}
          </div>
        )}
      </div>
    </article>
  );
}

