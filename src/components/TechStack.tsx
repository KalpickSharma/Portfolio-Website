import "./styles/TechStack.css";
import { 
  FaReact, 
  FaNodeJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaFigma,
  FaDatabase,
  FaDocker
} from "react-icons/fa";
import { 
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiAdobexd,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiTailwindcss,
  SiGreensock
} from "react-icons/si";

const technologies = [
  {
    category: "Frontend",
    items: [
      { name: "React", Icon: FaReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "HTML5", Icon: FaHtml5 },
      { name: "CSS3", Icon: FaCss3Alt },
      { name: "Tailwind", Icon: SiTailwindcss },
      { name: "GSAP", Icon: SiGreensock }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", Icon: FaNodeJs },
      { name: "Express", Icon: SiExpress },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "MySQL", Icon: SiMysql },
      { name: "Docker", Icon: FaDocker },
      { name: "Database", Icon: FaDatabase }
    ]
  },
  {
    category: "Design",
    items: [
      { name: "Figma", Icon: FaFigma },
      { name: "Adobe XD", Icon: SiAdobexd },
      { name: "Illustrator", Icon: SiAdobeillustrator },
      { name: "Photoshop", Icon: SiAdobephotoshop }
    ]
  }
];

const TechStack = () => {
  return (
    <div className="techstack-section">
      <h2>My Tech Stack</h2>
      
      <div className="tech-categories">
        {technologies.map((category, i) => (
          <div key={i} className="tech-category">
            <h3>{category.category}</h3>
            <div className="tech-grid">
              {category.items.map((tech, j) => (
                <div key={j} className="tech-item">
                  <tech.Icon className="tech-icon" />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
