import axios from "axios";
import { useEffect, useState } from "react";
import "./styles/Admin.css";

const AdminPanel = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [view, setView] = useState("dashboard");
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveDemo: "",
    image: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://portfolie-mern.onrender.com/admin/login", { username, password });

      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        setAuthenticated(true);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error logging in");
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get("https://portfolie-mern.onrender.com/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(Array.isArray(data) ? data : data.projects || []);
    } catch (err) {
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get("https://portfolie-mern.onrender.com/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(Array.isArray(data) ? data : data.messages || []);
    } catch (err) {
      setMessages([]);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchProjects();
      fetchMessages();
    }
  }, [authenticated]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAuthenticated(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No admin token found");
        return;
      }
  
      const config = { headers: { Authorization: `Bearer ${token}` } };
  
      if (editMode && editProjectId) {
        await axios.put(`https://portfolie-mern.onrender.com/projects/${editProjectId}`, projectData, config);
      } else {
        await axios.post("https://portfolie-mern.onrender.com/projects", projectData, config);
      }
  
      setProjectData({
        title: "",
        description: "",
        technologies: "",
        githubLink: "",
        liveDemo: "",
        image: "",
      });
      setEditMode(false);
      setEditProjectId(null);
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      console.error("Error saving project:", err);
    }
  };
  
  const handleEditProject = (project) => {
    setProjectData({
      title: project.title || "",
      description: project.description || "",
      technologies: project.technologies || "",
      githubLink: project.githubLink || "",
      liveDemo: project.liveDemo || "",
      image: project.image || "",
    });
    setEditMode(true);
    setEditProjectId(project._id);
    setShowForm(true);
  };
  

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`https://portfolie-mern.onrender.com/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  if (!authenticated) {
    return (
      <form onSubmit={login} className="login-form">
        <h2>Admin Login</h2>
        <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    );
  }

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <button onClick={() => setView("dashboard")}>Dashboard</button>
        <button onClick={() => setView("projects")}>Projects</button>
        <button onClick={() => setView("messages")}>Messages</button>
        <button onClick={logout} className="logout-button">Logout</button>
      </aside>

      <main className="content">
        {view === "dashboard" && <h2 style={{color:"blue"}}>Welcome to Admin Dashboard</h2>}

        {view === "projects" && (
          <div>
            <h3 style={{ color: "blue" }}>Manage Projects</h3>
            <button onClick={() => { setShowForm(true); setEditMode(false); setProjectData({ title: "", description: "", technologies: "", githubLink: "", liveDemo: "", image: "" }); }}>
              Add Project
            </button>

            {showForm && (
              <form onSubmit={handleProjectSubmit} className="project-form">
                <input type="text" name="title" value={projectData.title} onChange={handleInputChange} placeholder="Title" required />
                <input type="text" name="description" value={projectData.description} onChange={handleInputChange} placeholder="Description" required />
                <input type="text" name="technologies" value={projectData.technologies} onChange={handleInputChange} placeholder="Technologies" required />
                <input type="text" name="githubLink" value={projectData.githubLink} onChange={handleInputChange} placeholder="GitHub Link" required />
                <input type="text" name="liveDemo" value={projectData.liveDemo} onChange={handleInputChange} placeholder="Live Demo" required />
                <input type="text" name="image" value={projectData.image} onChange={handleInputChange} placeholder="Image URL" required />
                <button type="submit">{editMode ? "Update" : "Add"} Project</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </form>
            )}

            {loading ? <p>Loading...</p> : projects.map((project) => (
              <div key={project.id} className="project-item">
                <img src={project.image} alt={project.title} />
                <h3>{project.title}</h3>
                <p>{project.technologies}</p>
                <p>{project.liveDemo}</p>
                <p>{project.githubLink}</p>
                <p>{project.description}</p>
                <button onClick={() => handleEditProject(project)}>Edit</button>

                <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}

        {view === "messages" && (
          <div>
            <h2 style={{color:"blue"}}>Messages</h2>
            {messages.length > 0 ? messages.map((msg, index) => (
              <div key={index} className="message-item">
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Message:</strong> {msg.message}</p>
              </div>
            )) : <p>No messages found.</p>}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
