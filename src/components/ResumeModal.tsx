import { soundFx } from "../utils/audio";
import {
  MdClose,
  MdDownload,
  MdWork,
  MdSchool,
  MdStar,
  MdEmail,
  MdPhone,
} from "react-icons/md";
import "./styles/ResumeModal.css";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    soundFx.playClick();
    // Path to downloadable PDF
    const link = document.createElement("a");
    link.href = "/Kalpick_Sharma_Resume.pdf";
    link.download = "Kalpick_Sharma_Resume.pdf";
    link.click();
  };

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div
        className="resume-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="resume-header">
          <div className="resume-title-box">
            <h2>Kalpick Sharma</h2>
            <p className="resume-subtitle">Full Stack & Creative Web Developer</p>
          </div>

          <div className="resume-header-actions">
            <button
              className="resume-download-btn"
              onClick={handleDownload}
              onMouseEnter={() => soundFx.playHover()}
              data-cursor="pointer"
            >
              <MdDownload /> Download Resume
            </button>
            <button
              className="resume-close-btn"
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
            >
              <MdClose />
            </button>
          </div>
        </div>

        <div className="resume-body">
          <div className="resume-contact-bar">
            <span>
              <MdEmail /> kalpicksharma@gmail.com
            </span>
            <span>
              <MdPhone /> +91 8810308974
            </span>
            <span>📍 New Delhi, India</span>
          </div>

          <div className="resume-grid">
            <div className="resume-section">
              <h3>
                <MdWork /> Professional Summary
              </h3>
              <p>
                Passionate Web Developer & Creative Engineer specializing in React,
                TypeScript, 3D web experiences (Three.js/Fiber), and modern animated UI
                development. Proven track record of building high-performance web applications,
                APIC platforms, and AI-integrated tools with exceptional visual standards.
              </p>
            </div>

            <div className="resume-section">
              <h3>
                <MdStar /> Core Technical Expertise
              </h3>
              <div className="resume-tags">
                <span>React.js</span>
                <span>TypeScript</span>
                <span>Three.js / Fiber</span>
                <span>GSAP Animations</span>
                <span>Node.js / Express</span>
                <span>FastAPI</span>
                <span>Python</span>
                <span>MongoDB</span>
                <span>Figma & Design Systems</span>
                <span>AI Prompt Engineering</span>
              </div>
            </div>

            <div className="resume-section">
              <h3>
                <MdSchool /> Education & Achievements
              </h3>
              <ul className="resume-list">
                <li>
                  <strong>B.Tech / Degree in Computer Science</strong> - Specialization in Web Technologies and Interactive Systems.
                </li>
                <li>
                  <strong>Brand Identity & UI Design Specialist</strong> - Custom 3D graphics, graphic design with Illustrator & Figma.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="resume-footer">
          <span>Official Resume Document • Last Updated 2025</span>
          <button className="resume-secondary-dl" onClick={handleDownload}>
            Download PDF Version
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
