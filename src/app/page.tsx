"use client";

import Terminal from './components/Terminal';
import Script from 'next/script';

const mainStyle = {
  width: '100%',
  height: '100vh',
  backgroundColor: '#000',
  margin: 0,
  padding: 0,
};

export default function Home() {
  return (
    <main style={mainStyle}>
      <Script id="structured-data" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Saleh Kayyali",
            "jobTitle": "Product & User Experience Designer",
            "description": "London-based designer and developer with 12+ years of experience in software design.",
            "url": "https://mskayyali.com",
            "sameAs": [
              "https://linkedin.com/in/mskayyali",
              "https://www.threads.net/@kayyalims",
              "https://interfacestudies.substack.com/"
            ],
            "knowsAbout": [
              "Product Design",
              "UX Design",
              "Software Design",
              "Financial Software",
              "UI/UX",
              "Design Systems"
            ]
          }
        `}
      </Script>
      <Terminal />
    </main>
  );
}
