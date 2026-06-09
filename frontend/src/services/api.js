const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000/api/v1';

const suspiciousTerms = [
  'urgent',
  'verify',
  'password',
  'otp',
  'bank',
  'suspended',
  'click',
  'login',
  'payment',
  'limited',
];

function localFallback(emailText, sender = '') {
  const lower = `${emailText} ${sender}`.toLowerCase();

  const matched = suspiciousTerms.filter((term) =>
    lower.includes(term)
  );

  const urlCount =
    (emailText.match(/https?:\/\/|www\./gi) || [])
      .length;

  const senderRisk = /\.(xyz|top|click|zip|ru)\b/i.test(
    sender
  )
    ? 18
    : 0;

  const score = Math.min(
    98,
    12 +
      matched.length * 10 +
      urlCount * 14 +
      senderRisk
  );

  const label =
    score >= 70
      ? 'Phishing Email'
      : score >= 40
      ? 'Suspicious Email'
      : 'Safe Email';

  return {
    label,
    confidence: score,
    risk_level:
      score >= 70
        ? 'high'
        : score >= 40
        ? 'medium'
        : 'low',
    reasons: [
      ...matched
        .slice(0, 4)
        .map(
          (term) =>
            `Suspicious keyword detected: ${term}`
        ),

      ...(urlCount
        ? [
            `${urlCount} link(s) found in the email body`,
          ]
        : []),

      ...(senderRisk
        ? [
            'Sender domain has a suspicious top-level domain',
          ]
        : []),

      ...(matched.length === 0 &&
      urlCount === 0
        ? [
            'No strong phishing indicators found in the text',
          ]
        : []),
    ],
    source: 'frontend-fallback',
  };
}

export async function scanEmail(payload) {
  try {
    const requestBody = {
      email_text: payload.email_text || '',
      sender: payload.sender || '',
      url: payload.url || '',
    };

    console.log(
      'Sending request:',
      requestBody
    );

    const response = await fetch(
      `${API_BASE_URL}/predict`,
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify(
          requestBody
        ),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Backend responded with ${response.status}`
      );
    }

    const data =
      await response.json();

    console.log(
      'Backend response:',
      data
    );

    return data;
  } catch (error) {
    console.error(
      'Backend failed, using local fallback:',
      error
    );

    return localFallback(
      payload.email_text,
      payload.sender
    );
  }
}