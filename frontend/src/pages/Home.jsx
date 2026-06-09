import React, {
  useState,
} from 'react';

import EmailInput from '../components/EmailInput.jsx';
import PredictionCard from '../components/PredictionCard.jsx';
import UploadEmail from '../components/UploadEmail.jsx';
import { scanEmail } from '../services/api.js';

const sampleEmail =
  'URGENT! Your online banking account will be suspended immediately. Click https://secure-bank-login.verify-now.example to verify your password and OTP.';

export default function Home() {
  const [emailText, setEmailText] =
    useState(sampleEmail);

  const [sender, setSender] =
    useState(
      'support@sbi-security-alert.xyz'
    );

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  async function handleScan(
    event
  ) {
    event.preventDefault();

    setLoading(true);

    try {
      const prediction =
        await scanEmail({
          email_text:
            emailText,
          sender,
        });

      setResult(
        prediction
      );
    } catch (error) {
      console.error(
        'Scan failed:',
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_0.95fr] lg:py-24">

      {/* LEFT SIDE */}
      <div>

        {/* Tag */}
        <p className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-200">
          Cybersecurity + AI + NLP
        </p>

        {/* Heading */}
        <h1 className="text-5xl font-black tracking-tight md:text-7xl">
          AI-Based Phishing
          Email Detection
          System
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Paste or upload an
          email and the system
          analyzes language,
          links, sender
          patterns, urgency,
          credential requests,
          and machine-learning
          features to classify
          messages as safe,
          suspicious, or
          phishing.
        </p>

        {/* Feature Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            'NLP preprocessing',
            'URL analysis',
            'Explainable scoring',
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-slate-200"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Upload */}
        <div className="mt-6">
          <UploadEmail
            onLoad={
              setEmailText
            }
            onSenderLoad={
              setSender
            }
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="grid gap-6 self-start">
        <EmailInput
          value={emailText}
          sender={sender}
          onEmailChange={
            setEmailText
          }
          onSenderChange={
            setSender
          }
          onScan={
            handleScan
          }
          loading={loading}
        />

        <PredictionCard
          result={result}
        />
      </div>
    </div>
  );
}