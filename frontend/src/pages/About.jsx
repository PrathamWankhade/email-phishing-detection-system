import React from 'react';

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-4xl font-black text-white">
        About the Project
      </h2>

      <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-400">
        This AI-Based Phishing Email Detection System
        uses Machine Learning and NLP techniques to
        analyze suspicious emails and classify them
        as safe or phishing. The system examines
        email content, sender patterns, suspicious
        keywords, and malicious links to improve
        cybersecurity awareness and email safety.
      </p>
    </div>
  );
}