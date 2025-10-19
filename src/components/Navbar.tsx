import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
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

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          KS
        </a>
        <a
          href="kalpicksharma@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          kalpicksharma@gmail.com
        </a>
        <ul>
          <li>
            <a href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
