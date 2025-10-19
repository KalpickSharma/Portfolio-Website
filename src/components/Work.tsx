import "./styles/Work.css";

const Work = () => {
  const projects = [
    {
      title: "Portfolio",
      category: "Web Development",
      tools: "React, TypeScript, GSAP, ThreeJS",
      image: "/images/Screenshot 2025-01-29 013539.png",
      type: "image",
      aspectRatio: "16/9",
      link: "https://github.com/KalpickSharma/Portfolio-Website.git"
    },
    {
      title: "APIC Platform",
      category: "Web Development",
      tools: "HTML, CSS, JavaScript",
      image: "/images/Screenshot 2025-01-29 013604.png",
      type: "image",
      aspectRatio: "16/9",
      link: "https://kalpicksharma.github.io/kalpicksharmaApic.html/"
    },
    {
      title: "Brand Identity",
      category: "Logo Design",
      tools: "Adobe Illustrator, Figma",
      video: "/images/Samples.mp4",
      type: "video",
      aspectRatio: "1/1"
    },
    {
      title: "Charge Edu Landing",
      category: "Web Development",
      tools: "HTML, CSS, JavaScript",
      image: "/images/Screenshot 2025-01-29 013621.png",
      type: "image",
      aspectRatio: "16/9",
      link: "https://kalpicksharma.github.io/Landing-Page-Charge-edu-tech/"
    }
  ];

  return (
    <div className="work" id="work">
      <div className="title">
        <span>MY WORK</span>
      </div>
      <div className="work-grid">
        {projects.map((project, index) => (
          <div className="work-item" key={index}>
            <div className="work-content">
              <div className="work-info">
                <h2>{project.title}</h2>
                <p>{project.category}</p>
                <p className="tools">{project.tools}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project">
                    View Project
                  </a>
                )}
              </div>
              {project.type === "video" ? (
                <div className="work-media" style={{ aspectRatio: project.aspectRatio }}>
                  <video autoPlay loop muted playsInline>
                    <source src={project.video} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <div className="work-media" style={{ aspectRatio: project.aspectRatio }}>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <img src={project.image} alt={project.title} />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
