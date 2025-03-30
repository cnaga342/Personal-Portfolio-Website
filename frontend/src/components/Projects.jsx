import axios from "axios";
import { useEffect, useState } from "react";
import "./styles/Projects.css"; // Import CSS

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("https://portfolie-mern.onrender.com/projects"); // Replace with actual API URL
        console.log("API Response:", res.data);

        if (Array.isArray(res.data)) {
          setProjects(res.data);
        } else if (res.data && Array.isArray(res.data.projects)) {
          setProjects(res.data.projects);
        } else {
          throw new Error("Invalid data format from server.");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="projects-container">
      <h1>Projects</h1>

      {loading && <p>Loading projects...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              {project.image && (
                <img src={project.image} alt={project.title} className="project-image" />
              )}

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <p className="project-technologies">Technologies: {project.technologies}</p>

              <div className="project-links">
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="live-demo">
                    Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="github-link">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No projects found.</p>
      )}
    </div>
  );
};

export default Projects;
