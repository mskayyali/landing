import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Note to Self Memos",
  description: "Privacy policy for Note to Self Memos app. Learn how we protect your privacy with completely offline operation.",
};

export default function PrivacyPolicy() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: '#fff', 
      fontFamily: 'ui-monospace, "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
      padding: '2rem 1rem'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto'
      }}>
        
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <Link 
            href="/notetoself" 
            style={{
              color: '#9ca3af',
              textDecoration: 'none',
              fontSize: '0.875rem',
              marginBottom: '1rem',
              display: 'inline-block'
            }}
          >
            ← Back to Note to Self
          </Link>
        </div>
        
        {/* Content */}
        <div style={{ lineHeight: '1.6' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Privacy Policy
          </h1>
          
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '2rem' }}>
            <em>Last updated: 24 June 2025</em>
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
            Overview
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Note to Self Memos is committed to protecting your privacy. This Privacy Policy explains how data is handled entirely on your device.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
            Information I Do Not Collect
          </h2>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Personal Data:</strong> I do not collect, store, or transmit any identifying information (name, email, voice recordings off-device).</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Usage Analytics:</strong> I do not employ analytics, crash reporting, or behavioural tracking.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Device Information:</strong> I do not access device identifiers, location, or hardware data.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
            Information I Collect Locally
          </h2>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Voice Recordings & Transcripts:</strong> Stored in the app sandbox for searchable notes.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Metadata (tags, timestamps):</strong> Used to organise and display your notes.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
            Initial Model Downloads
          </h2>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>AI Models:</strong> WhisperKit and Qwen2.5 are downloaded on first launch.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Network Use:</strong> Only during initial setup; thereafter, fully offline.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
            Data Storage & Security
          </h2>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Encryption at Rest:</strong> iOS file-system encryption protects all app data.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Secure Memory Handling:</strong> Sensitive data processed with in-memory protections.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Optional Export Encryption:</strong> You may encrypt ZIP exports for added security.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
            Privacy by Design
          </h2>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Local-First:</strong> All AI processing occurs on-device.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Data Minimisation:</strong> Only data strictly necessary is handled.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
            Your Rights
          </h2>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Access & Portability:</strong> View or export all recordings/transcripts at any time.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Rectification & Erasure:</strong> Edit or delete any data stored locally.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Restrict Processing:</strong> Uninstalling the app removes all data permanently.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
            Changes to this Policy
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            I may update this policy to reflect legal or technical changes. “Last updated” date will always indicate the revision date.
          </p>
        </div>
        
        {/* Footer */}
        <footer style={{ 
          marginTop: '4rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid #374151', 
          textAlign: 'center' 
        }}>
          <Link 
            href="/notetoself" 
            style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              textDecoration: 'none'
            }}
          >
            Back to Note to Self
          </Link>
        </footer>
      </div>
    </div>
  );
}
