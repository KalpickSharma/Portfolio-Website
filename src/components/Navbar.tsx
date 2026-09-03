import { useEffect, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import ResumeModal from "./ResumeModal";
import { soundFx } from "../utils/audio";
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  onOpenResume?: () => void;
}

const Navbar = ({ onOpenResume }: NavbarProps) => {
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getIsMuted());
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  useEffect(() => {
    // Animate navbar on scroll
    ScrollTrigger.create({
      start: "top -50",
      onUpdate: (self) => {
        const navbar = document.querySelector(".header");
        if (navbar) {
          if (self.direction === -1) {
            navbar.classList.remove("hide");
          } else {
            navbar.classList.add("hide");
          }
        }
      },
    });

    // Initial animation
    gsap.fromTo(
      ".header",
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      }
    );
  }, []);

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleOpenResumeModal = () => {
    soundFx.playPop();
    setIsResumeOpen(true);
    if (onOpenResume) onOpenResume();
  };

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          KS
        </a>

        <a
          href="mailto:kalpicksharma@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          kalpicksharma@gmail.com
        </a>

        <ul>
          <li>
            <a href="#about" onMouseEnter={() => soundFx.playHover()}>
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a href="#work" onMouseEnter={() => soundFx.playHover()}>
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a href="#career" onMouseEnter={() => soundFx.playHover()}>
              <HoverLinks text="CAREER" />
            </a>
          </li>
          <li>
            <a href="#contact" onMouseEnter={() => soundFx.playHover()}>
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          <li>
            <button
              className="nav-resume-link"
              onClick={handleOpenResumeModal}
              onMouseEnter={() => soundFx.playHover()}
              data-cursor="pointer"
            >
              <HoverLinks text="RESUME" />
            </button>
          </li>
        </ul>

        <div className="navbar-right-controls">
          {/* Sound Toggle */}
          <button
            className="nav-audio-btn"
            onClick={toggleSound}
            onMouseEnter={() => soundFx.playHover()}
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            data-cursor="pointer"
          >
            {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
          </button>
        </div>
      </div>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
