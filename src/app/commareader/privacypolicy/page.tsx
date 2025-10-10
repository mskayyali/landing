import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Comma Reader",
  description: "Privacy policy for Comma Reader app. Learn how we protect your privacy with completely offline operation and on-device AI processing.",
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
            href="/commareader"
            style={{
              color: '#9ca3af',
              textDecoration: 'none',
              fontSize: '0.875rem',
              marginBottom: '1rem',
              display: 'inline-block'
            }}
          >
            ← Back to Comma Reader
          </Link>
        </div>

        {/* Content */}
        <div style={{ lineHeight: '1.6' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Privacy Policy for Comma
          </h1>

          <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '2rem' }}>
            <em>Last Updated: October 10, 2025</em><br />
            <em>Effective Date: October 10, 2025</em>
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
            Overview
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Comma is a privacy-first EPUB and PDF reader for iOS. We believe your reading habits, notes, and personal data should remain completely private. This Privacy Policy explains how Comma handles your information.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>The Short Version:</strong> Comma does not collect, transmit, or share any of your personal data. Everything stays on your device.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
            Data Collection
          </h2>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '1rem' }}>
            What We DON'T Collect
          </h3>
          <p style={{ marginBottom: '1rem' }}>
            Comma does <strong>not</strong> collect, store, or transmit:
          </p>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>❌ Your name, email, or contact information</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Your reading history or book titles</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Your highlights, notes, or quotes</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Your device information or identifiers</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Your location data</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Analytics or usage statistics</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Crash reports or diagnostics</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Any personal information whatsoever</li>
          </ul>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '1rem' }}>
            What Stays on Your Device
          </h3>
          <p style={{ marginBottom: '1rem' }}>
            All of the following data is stored <strong>locally on your device only</strong>:
          </p>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>📚 <strong>Your Library:</strong> All imported EPUB and PDF files</li>
            <li style={{ marginBottom: '0.5rem' }}>📖 <strong>Reading Progress:</strong> Your current position in each book</li>
            <li style={{ marginBottom: '0.5rem' }}>✏️ <strong>Highlights:</strong> Text you've highlighted while reading</li>
            <li style={{ marginBottom: '0.5rem' }}>💬 <strong>Quotes:</strong> Memorable passages you've saved</li>
            <li style={{ marginBottom: '0.5rem' }}>⚙️ <strong>Reading Preferences:</strong> Theme, font, size, margins, and other settings</li>
            <li style={{ marginBottom: '0.5rem' }}>🏷️ <strong>Categories & Tags:</strong> Book organization and metadata</li>
            <li style={{ marginBottom: '0.5rem' }}>🔍 <strong>Search History:</strong> Local search queries (never transmitted)</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
            Apple Intelligence Features
          </h2>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '1rem' }}>
            On-Device AI Processing
          </h3>
          <p style={{ marginBottom: '1rem' }}>
            Comma uses <strong>Apple Intelligence</strong> (Apple Foundation Models) for the following features on supported devices:
          </p>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Automatic Book Categorization:</strong> Analyzes book content to suggest categories</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Tag Generation:</strong> Creates descriptive tags based on book content</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Chapter Summaries:</strong> Generates summaries of book chapters</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Text Explanation:</strong> Provides explanations of selected text passages</li>
          </ul>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '1rem' }}>
            Privacy Guarantees
          </h3>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>✅ <strong>All AI processing happens entirely on your device</strong></li>
            <li style={{ marginBottom: '0.5rem' }}>✅ <strong>No data is sent to external servers or cloud services</strong></li>
            <li style={{ marginBottom: '0.5rem' }}>✅ <strong>Apple Intelligence operates locally using on-device models</strong></li>
            <li style={{ marginBottom: '0.5rem' }}>✅ <strong>Your book content never leaves your device</strong></li>
            <li style={{ marginBottom: '0.5rem' }}>✅ <strong>Summaries and explanations are generated privately</strong></li>
          </ul>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '1rem' }}>
            Device Requirements
          </h3>
          <p style={{ marginBottom: '1rem' }}>
            Apple Intelligence features require:
          </p>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            <li>iOS 18.2 or later</li>
            <li>Compatible device (iPhone 15 Pro/Pro Max or later, iPad with M1 chip or later)</li>
            <li>Apple Intelligence enabled in Settings</li>
          </ul>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Note:</strong> If your device doesn't support Apple Intelligence, Comma still works perfectly. You simply won't see AI-powered features like automatic categorization or chapter summaries.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
            Third-Party Services
          </h2>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '1rem' }}>
            What We DON'T Use
          </h3>
          <p style={{ marginBottom: '1rem' }}>
            Comma does <strong>not</strong> integrate with:
          </p>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>❌ Analytics services (Google Analytics, Firebase, etc.)</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Advertising networks</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Social media platforms</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Cloud storage services</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ External APIs or servers</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Tracking or attribution services</li>
          </ul>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '1rem' }}>
            Optional User-Initiated Actions
          </h3>
          <p style={{ marginBottom: '1rem' }}>
            The following features involve external services <strong>only when you explicitly choose to use them</strong>:
          </p>
          <ol style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Google Images Search</strong> (Manual Cover Update)<br />
              When you tap "Search Google Images" to find a book cover<br />
              Opens Safari with a Google search query<br />
              You manually select and save an image<br />
              We don't track or monitor this action
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>iOS Share Sheet</strong> (Quote Sharing)<br />
              When you tap "Share" on a quote<br />
              Uses native iOS sharing (Messages, Mail, etc.)<br />
              We don't track what you share or where you share it<br />
              Sharing is handled entirely by iOS
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>App Store Review</strong><br />
              When you tap "Rate Comma on the App Store"<br />
              Opens the App Store app<br />
              Uses Apple's native review API<br />
              We don't track whether you leave a review
            </li>
          </ol>
          <p style={{ marginBottom: '1rem' }}>
            <strong>These actions are entirely optional and user-initiated. We have no visibility into these interactions.</strong>
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
            Permissions
          </h2>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '1rem' }}>
            Required Permissions
          </h3>
          <p style={{ marginBottom: '1rem' }}>
            Comma requests the following iOS permissions:
          </p>
          <ol style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            <li style={{ marginBottom: '1rem' }}>
              <strong>File Access</strong> (Document Picker)<br />
              <strong>Why:</strong> To import EPUB and PDF files from your Files app<br />
              <strong>When:</strong> Only when you tap "+" to add a book<br />
              <strong>Scope:</strong> You choose specific files; we don't access your entire file system
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Photo Library Access</strong> (Optional)<br />
              <strong>Why:</strong> To let you choose custom book covers from your photos<br />
              <strong>When:</strong> Only when you tap "Pick from Photos" for a custom cover<br />
              <strong>Scope:</strong> You select specific images; we don't access your entire photo library
            </li>
          </ol>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '1rem' }}>
            Permissions We DON'T Request
          </h3>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>❌ Camera</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Microphone</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Location Services</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Contacts</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Calendar</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Notifications (optional, for future features)</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Bluetooth</li>
            <li style={{ marginBottom: '0.5rem' }}>❌ Network access (no internet connection required)</li>
          </ul>
        </div>

        {/* Footer */}
        <footer style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid #374151',
          textAlign: 'center'
        }}>
          <Link
            href="/commareader"
            style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              textDecoration: 'none'
            }}
          >
            Back to Comma Reader
          </Link>
        </footer>
      </div>
    </div>
  );
}
