"use client";

import { useState } from "react";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setError(null);
    setIsLoading(true);
    setImageUrl(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `Request failed: ${res.status}`);
      }
      const { url } = await res.json();
      setImageUrl(url);
    } catch (e: any) {
      setError(e.message || "Failed to generate image");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #111827 100%)',
      color: '#e5e7eb',
      padding: 24
    }}>
      <div style={{ width: '100%', maxWidth: 880 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>AI Text ? Image</h1>
        <p style={{ opacity: 0.8, marginBottom: 24 }}>
          Enter a prompt and generate an image. Deployed for `agentic-99ad5425`.
        </p>
        <div style={{ display: 'grid', gap: 12 }}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. a futuristic city at sunset, cinematic lighting"
            rows={4}
            style={{
              width: '100%',
              borderRadius: 12,
              border: '1px solid #374151',
              background: '#0b1220',
              color: 'white',
              padding: 16,
              outline: 'none'
            }}
          />
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isLoading}
            style={{
              padding: '12px 16px',
              borderRadius: 10,
              border: '1px solid #374151',
              background: isLoading ? '#1f2937' : '#2563eb',
              color: 'white',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontWeight: 700,
              letterSpacing: 0.3
            }}
          >
            {isLoading ? 'Generating?' : 'Generate'}
          </button>
          {error && (
            <div style={{ color: '#fecaca' }}>{error}</div>
          )}
          {imageUrl && (
            <div style={{ marginTop: 12 }}>
              <img
                src={imageUrl}
                alt={prompt}
                style={{
                  width: '100%',
                  borderRadius: 12,
                  border: '1px solid #374151',
                  background: '#0b1220'
                }}
              />
              <div style={{ opacity: 0.7, fontSize: 12, marginTop: 8 }}>
                Source: public image service for demo
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
