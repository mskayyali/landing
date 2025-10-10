"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

const screenshots = [
  '/images/comma1.png',
  '/images/comma2.png',
  '/images/comma3.png',
  '/images/comma4.png',
  '/images/comma5.png'
];

export default function CommaReader() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      fontFamily: 'ui-monospace, "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column'
      }} className="main-container">

        {/* Main Content Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%'
        }} className="main-content-section">
          {/* Desktop Layout */}
          <div style={{
            display: 'none',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            height: '100%',
            width: '100%',
            alignItems: 'center'
          }} className="desktop-layout">

          {/* Left Side - Content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            height: '100%',
            justifyContent: 'center',
            paddingRight: '2rem'
          }}>

            {/* Logo and Title */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '12px',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <img
                  src="/images/commalogo.png"
                  alt="Comma Reader Logo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <h1 style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 'bold',
                margin: 0,
                lineHeight: '1.1'
              }}>
                Comma Reader
              </h1>
            </div>

            {/* Description */}
            <p style={{
              fontSize: 'clamp(0.9rem, 1.8vw, 1.125rem)',
              color: '#d1d5db',
              lineHeight: '1.5',
              margin: 0
            }}>
              On‑Device AI EPUB & PDF Reader for iOS. Your epubs, pdfs, highlgihts, quotes, and personal data remain completely private. Everything stays on your device.
            </p>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{
                fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
                fontWeight: '600',
                color: '#fff',
                margin: 0
              }}>
                Key Features:
              </h3>
              <ul style={{
                color: '#9ca3af',
                fontSize: 'clamp(0.75rem, 1.4vw, 0.8rem)',
                margin: 0,
                paddingLeft: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <li>• Complete privacy - no data leaves your device</li>
                <li>• Apple Intelligence integration for smart categorization</li>
                <li>• On-device AI processing for summaries and explanations</li>
                <li>• Offline reading with full functionality</li>
              </ul>
            </div>

            {/* CTA Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{
                fontSize: 'clamp(0.75rem, 1.4vw, 0.8rem)',
                color: '#6b7280',
                margin: 0,
                lineHeight: '1.4'
              }}>
                Perfect for readers who value their privacy and want intelligent features without compromising their data.
              </p>

              {/* App Store Button and QR Code Side by Side */}
              <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'stretch' }}>
                {/* Left Column - App Store + Coffee Button */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                  <div style={{ width: '180px', height: '50px' }}>
                    <Link
                      href="https://apps.apple.com/us/app/comma-reader/id1234567890"
                      target="_blank"
                      style={{
                        display: 'block',
                        width: '180px',
                        height: '50px'
                      }}
                    >
                      <img
                        src="/images/appstore.svg"
                        alt="Download on the App Store"
                        style={{
                          width: '180px',
                          height: '50px',
                          objectFit: 'contain',
                          objectPosition: 'left center',
                          transition: 'opacity 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                      />
                    </Link>
                  </div>

                  <div style={{ width: '180px', height: '50px' }}>
                    <Link
                      href="https://coff.ee/mskayyali"
                      target="_blank"
                      style={{
                        display: 'block',
                        width: '180px',
                        height: '50px'
                      }}
                    >
                      <img
                        src="/images/bmc-button.svg"
                        alt="Buy me a coffee"
                        style={{
                          width: '180px',
                          height: '50px',
                          objectFit: 'contain',
                          objectPosition: 'left center',
                          transition: 'opacity 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                      />
                    </Link>
                  </div>
                </div>

                {/* Right Column - QR Code */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="/images/qrcode.jpg"
                    alt="QR Code to download Comma Reader"
                    style={{
                      width: '110px',
                      height: '110px',
                      objectFit: 'contain',
                      borderRadius: '6px',
                      backgroundColor: '#fff',
                      padding: '6px',
                      flexShrink: 0
                    }}
                  />
                </div>
              </div>

              {/* Privacy Policy */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Link
                  href="/commareader/privacypolicy"
                  style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    textDecoration: 'underline',
                    width: 'fit-content'
                  }}
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Image Carousel */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            height: '100%',
            justifyContent: 'center'
          }}>

            {/* Image Container */}
            <div style={{
              position: 'relative',
              width: '450px',
              height: '700px',
              maxWidth: '90vw',
              maxHeight: '75vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {screenshots.map((screenshot, index) => (
                <img
                  key={index}
                  src={screenshot}
                  alt={`App Screenshot ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: currentImageIndex === index ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out'
                  }}
                />
              ))}
            </div>

            {/* Carousel Dots */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center'
            }}>
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: currentImageIndex === index ? '#f9533d' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    outline: 'none'
                  }}
                  aria-label={`Go to screenshot ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        </div>

        {/* Mobile Layout */}
        <div style={{
          display: 'flex'
        }} className="mobile-layout">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            justifyContent: 'flex-start',
            paddingTop: '0',
            paddingBottom: '2rem'
          }}>

            {/* Logo and Title */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '10px',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <img
                  src="/images/commalogo.png"
                  alt="Comma Reader Logo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                margin: 0,
                lineHeight: '1.1'
              }}>
                Comma Reader
              </h1>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '1rem',
              color: '#d1d5db',
              lineHeight: '1.5',
              margin: 0,
              textAlign: 'left'
            }}>
              A privacy-first EPUB and PDF reader for iOS. Your reading habits, notes, and personal data remain completely private. Everything stays on your device.
            </p>

            {/* Centered Image Carousel */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              margin: '1.5rem 0'
            }}>
              {/* Image Container */}
              <div style={{
                position: 'relative',
                width: '280px',
                height: '500px',
                maxWidth: '80vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {screenshots.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`App Screenshot ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      opacity: currentImageIndex === index ? 1 : 0,
                      transition: 'opacity 0.5s ease-in-out'
                    }}
                  />
                ))}
              </div>

              {/* Carousel Dots */}
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'center'
              }}>
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      border: 'none',
                      backgroundColor: currentImageIndex === index ? '#f9533d' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                      outline: 'none'
                    }}
                    aria-label={`Go to screenshot ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left' }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#fff',
                margin: 0
              }}>
                Key Features:
              </h3>
              <ul style={{
                color: '#9ca3af',
                fontSize: '0.85rem',
                margin: 0,
                paddingLeft: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <li>• Complete privacy - no data leaves your device</li>
                <li>• Apple Intelligence integration for smart categorization</li>
                <li>• On-device AI processing for summaries and explanations</li>
                <li>• Offline reading with full functionality</li>
              </ul>
            </div>

            {/* CTA and Privacy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              <p style={{
                fontSize: '0.85rem',
                color: '#6b7280',
                margin: 0,
                lineHeight: '1.4'
              }}>
                Perfect for readers who value their privacy and want intelligent features without compromising their data.
              </p>

              {/* App Store Button and QR Code Side by Side */}
              <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'stretch' }}>
                {/* Left Column - App Store + Coffee Button */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                  <div style={{ width: '180px', height: '50px' }}>
                    <Link
                      href="https://apps.apple.com/us/app/comma-reader/id1234567890"
                      target="_blank"
                      style={{
                        display: 'block',
                        width: '180px',
                        height: '50px'
                      }}
                    >
                      <img
                        src="/images/appstore.svg"
                        alt="Download on the App Store"
                        style={{
                          width: '180px',
                          height: '50px',
                          objectFit: 'contain',
                          objectPosition: 'left center',
                          transition: 'opacity 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                      />
                    </Link>
                  </div>

                  <div style={{ width: '180px', height: '50px' }}>
                    <Link
                      href="https://coff.ee/mskayyali"
                      target="_blank"
                      style={{
                        display: 'block',
                        width: '180px',
                        height: '50px'
                      }}
                    >
                      <img
                        src="/images/bmc-button.svg"
                        alt="Buy me a coffee"
                        style={{
                          width: '180px',
                          height: '50px',
                          objectFit: 'contain',
                          objectPosition: 'left center',
                          transition: 'opacity 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                      />
                    </Link>
                  </div>
                </div>

                {/* Right Column - QR Code */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="/images/qrcode.jpg"
                    alt="QR Code to download Comma Reader"
                    style={{
                      width: '110px',
                      height: '110px',
                      objectFit: 'contain',
                      borderRadius: '6px',
                      backgroundColor: '#fff',
                      padding: '6px',
                      flexShrink: 0
                    }}
                  />
                </div>
              </div>

              {/* Privacy Policy */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Link
                  href="/commareader/privacypolicy"
                  style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    textDecoration: 'underline',
                    width: 'fit-content'
                  }}
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Responsive CSS */}
      <style jsx>{`
        /* Mobile-first approach - starts with mobile layout */
        .main-content-section {
          min-height: auto !important;
        }

        .main-container {
          padding: 1rem !important;
        }

        /* Desktop layout - only shows on larger screens */
        @media (min-width: 769px) {
          .desktop-layout {
            display: grid !important;
          }
          .mobile-layout {
            display: none !important;
          }
          .main-container {
            padding: 2rem !important;
          }
          .main-content-section {
            min-height: calc(100vh - 4rem) !important;
          }
        }

        /* Ensure mobile layout is default */
        @media (max-width: 768px) {
          .desktop-layout {
            display: none !important;
          }
          .mobile-layout {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
