import { useState } from "react";
import { MdArrowOutward, MdCopyright, MdSend, MdCheckCircle } from "react-icons/md";
import { soundFx } from "../utils/audio";
import "./styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playClick();
    setStatus("submitting");

    // Simulate direct submission feedback
    setTimeout(() => {
      soundFx.playPop();
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1200);
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="kalpicksharma@gmail.com" data-cursor="disable">
                kalpicksharma@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+91 8810308974" data-cursor="disable">
                +91 8810308974
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/KalpickSharma"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/kalpick-sharma-20a759250"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="https://x.com/KalpickSharma"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Twitter <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/kalpick/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>

          {/* Right Column: Interactive Glassmorphic Form */}
          <div className="contact-form-col">
            <form className="contact-form-card" onSubmit={handleSubmit}>
              <div className="form-title">
                <h4>Send a Message</h4>
                <p>Have a project, idea, or role in mind? Reach out directly!</p>
              </div>

              {status === "success" && (
                <div className="contact-toast-success">
                  <MdCheckCircle className="toast-icon" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Alex Rivera"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => soundFx.playHover()}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => soundFx.playHover()}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Project Collaboration / Hiring Opportunity"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => soundFx.playHover()}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => soundFx.playHover()}
                />
              </div>

              <button
                type="submit"
                className="contact-submit-btn"
                disabled={status === "submitting"}
                onMouseEnter={() => soundFx.playHover()}
                data-cursor="pointer"
              >
                {status === "submitting" ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <MdSend />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="contact-credits-box">
          <h2>
            Designed and Developed by <span>Kalpick Sharma</span>
          </h2>
          <p>
            <MdCopyright /> 2025 All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
