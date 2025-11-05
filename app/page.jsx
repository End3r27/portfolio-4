"use client";
import FinisherHeader from "@/components/FinisherHeader";
import SwirlBackground from "@/components/SwirlBackground";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import Section from "@/components/Section";
import CourseCard from "@/components/CourseCard";
import CTA from "@/components/CTA";

const COURSES = [
  {
    title: 'Next.js from Zero to Pro',
    description: 'Build production‑ready, blazingly fast web apps with the App Router.',
    tags: ['Next.js', 'React', 'SSR', 'Edge'],
  },
  {
    title: 'TypeScript for React Devs',
    description: 'Confidently type your React apps with patterns used by pros.',
    tags: ['TypeScript', 'React', 'DX'],
  },
  {
    title: 'Design for Developers',
    description: 'Visual hierarchy, color, and motion to ship beautiful UIs.',
    tags: ['Design', 'Motion', 'Accessibility'],
  },
  {
    title: 'Data Visualization',
    description: 'Tell compelling stories with interactive charts and canvas/WebGL.',
    tags: ['D3', 'Canvas', 'WebGL'],
  },
  {
    title: 'Node & APIs',
    description: 'Robust REST and GraphQL APIs with testing and observability.',
    tags: ['Node', 'API', 'GraphQL'],
  },
  {
    title: 'AI Fundamentals',
    description: 'Practical LLM usage, prompt design, and app integration.',
    tags: ['AI', 'LLMs', 'Prompting'],
  },
];

export default function Page() {
  const enroll = (title) => () => alert(`Enroll: ${title}`);
  return (
    <>
      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Scroll to top button */}
      <ScrollToTop showAfter={500} />

      <main>
        {/* Swirl animated background - fixed position behind all content */}
        <SwirlBackground />

        {/* Animated Finisher header with custom particle animation */}
        <FinisherHeader
          title="LearnX"
          subtitle="Cutting‑edge courses. Career‑ready skills."
          config={{
            count: 12,
            size: { min: 1300, max: 1500, pulse: 0 },
            speed: {
              x: { min: 0.6, max: 3 },
              y: { min: 0.6, max: 3 }
            },
            colors: {
              background: "transparent",
              particles: ["#ff681c", "#87ddfe", "#231efe", "#ff0a53"],
            },
            blending: "lighten",
            opacity: { center: 0.6, edge: 0 },
            skew: -2,
            shapes: ["c"],
          }}
        />

        <div className="spacer-xl" />

        {/* Courses section */}
        <Section id="courses">
          <div className="container">
            <h2 style={{ margin: 0, fontSize: 'clamp(1.25rem, 1.4vw + 1rem, 2rem)' }}>Popular Courses</h2>
            <p className="muted" style={{ marginTop: 6, marginBottom: 18 }}>Hover to preview. Click enroll to get started.</p>
            <div className="courses-grid">
              {COURSES.map((c, i) => (
                <CourseCard key={i} {...c} onEnroll={enroll(c.title)} />
              ))}
            </div>
          </div>
        </Section>

        <div className="spacer-xxl" />

        {/* Call‑to‑action section */}
        <Section id="cta">
          <CTA />
        </Section>

        <div className="spacer-xxl" />
      </main>
    </>
  );
}
