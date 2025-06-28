import { useState, useEffect } from "react";
import DraggableWindow from './DraggableWindow';
import styles from './ContactWindow.module.css';
import { Theme } from '../themes';
import { useForm, ValidationError } from "@formspree/react";

interface ContactWindowProps {
  onClose: () => void;
  disableDragging: boolean;
  currentTheme: Theme;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
}

export default function ContactWindow({
  onClose,
  disableDragging,
  currentTheme,
  position,
  onPositionChange,
}: ContactWindowProps) {
  const [state, handleSubmit] = useForm("xeokvvoy");
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  const windowTitle = "Contact Me";

  useEffect(() => {
    if (state.succeeded) {
      setIsCoolingDown(true);
      const timer = setTimeout(() => {
        setIsCoolingDown(false);
      }, 60000); // 60 seconds

      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  return (
    <DraggableWindow
      onClose={onClose}
      title={windowTitle}
      disableDragging={disableDragging}
      initialPosition={{ x: 100, y: 100 }}
      currentTheme={currentTheme}
      position={position}
      onPositionChange={onPositionChange}
    >
      <div
        style={{
          width: "400px",
          padding: "1.25rem",
          color: "var(--theme-text)",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "1rem",
          lineHeight: "1.6",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
                color: "var(--theme-text)",
                fontSize: "0.9rem",
              }}
            >
              Your Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                border: "1px solid var(--theme-border)",
                borderRadius: "4px",
                padding: "0.75rem",
                color: "var(--theme-text)",
                fontFamily: "inherit",
                fontSize: "1em",
                outline: "none",
              }}
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className={styles.errorMessage}
            />
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              htmlFor="message"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
                color: "var(--theme-text)",
                fontSize: "0.9rem",
              }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                border: "1px solid var(--theme-border)",
                borderRadius: "4px",
                padding: "0.75rem",
                color: "var(--theme-text)",
                fontFamily: "inherit",
                fontSize: "1em",
                outline: "none",
                minHeight: "100px",
                resize: "vertical",
              }}
            ></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className={styles.errorMessage}
            />
          </div>
          <button
            type="submit"
            disabled={state.submitting || isCoolingDown}
            style={{
              backgroundColor: "#333",
              color: "var(--theme-text)",
              border: "1px solid var(--theme-border)",
              borderRadius: "4px",
              padding: "0.75rem 1rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
              width: "100%",
              textAlign: "left",
              opacity: state.submitting || isCoolingDown ? 0.5 : 1,
            }}
          >
            {isCoolingDown
              ? "Please wait..."
              : state.submitting
              ? "Sending..."
              : "Send Message"}
          </button>
          <div
            style={{
              height: "2.5rem",
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              color: "var(--theme-primary)",
              fontSize: "0.9rem",
            }}
          >
            {state.succeeded && (
              <p style={{ margin: 0 }}>Thank you! I&apos;ll be in touch.</p>
            )}
            {state.errors && state.errors.getFormErrors().length > 0 && (
              <p className={styles.errorMessage} style={{ margin: 0 }}>
                {state.errors.getFormErrors()[0].message}
              </p>
            )}
          </div>
        </form>
      </div>
    </DraggableWindow>
  );
} 