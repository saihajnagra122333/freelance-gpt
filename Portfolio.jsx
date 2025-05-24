import React, { useEffect, useState } from "react";
import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";

export default function Portfolio({ token }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get("/portfolio", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data.projects || []);
      } catch (err) {
        setError("Failed to load portfolio.");
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [token]);

  if (loading) return <p>Loading portfolio...</p>;
  if (error) return <p>{error}</p>;
  if (projects.length === 0) return <p>No projects found.</p>;

  return (
    <div>
      <h2>Your Projects</h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {projects.map((proj) => (
          <li
            key={proj.id}
            style={{
              background: "rgba(255,255,255,0.1)",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "10px",
            }}
          >
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ff6f91" }}
              >
                View Project
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
/* 
10 Stunning Features to Enhance Portfolio Component:

1. Project Images: Display a thumbnail image for each project.
2. Tags/Technologies: Show a list of tech tags used in each project.
3. Animated Loading Spinner: Replace loading text with a spinner.
4. Project Modal: Click a project to view more details in a modal.
5. Search/Filter: Add a search bar to filter projects by title or tag.
6. Pagination: Paginate projects if there are many.
7. Sorting: Allow sorting by date or title.
8. Responsive Grid: Display projects in a responsive grid layout.
9. Like/Favorite: Allow users to like/favorite projects.
10. Share Button: Add a button to share project links.

Example implementation for some features:
*/

// 1. Project Images, 2. Tags, 3. Spinner, 4. Modal, 5. Search, 8. Responsive Grid


// Spinner component
function Spinner() {
  return (
    <div style={{ textAlign: "center", margin: "2rem" }}>
      <div className="spinner" style={{
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #ff6f91",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        animation: "spin 1s linear infinite"
      }} />
      <style>
        {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
}

// Add this above your Portfolio component
Modal.setAppElement("#root");

// Add these states inside Portfolio component
const [modalOpen, setModalOpen] = useState(false);
const [selectedProject, setSelectedProject] = useState(null);
const [search, setSearch] = useState("");

// Replace loading text with spinner
if (loading) return <Spinner />;

// Search/filter logic
const filteredProjects = projects.filter(
  (proj) =>
    proj.title.toLowerCase().includes(search.toLowerCase()) ||
    (proj.tags && proj.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())))
);

return (
  <div>
    <h2>Your Projects</h2>
    {/* 5. Search Bar */}
    <input
      type="text"
      placeholder="Search projects..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      style={{
        padding: "0.5rem",
        marginBottom: "1rem",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "100%"
      }}
    />
    {/* 8. Responsive Grid */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "1.5rem"
    }}>
      {filteredProjects.map((proj) => (
        <div
          key={proj.id}
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "1rem",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            cursor: "pointer",
            transition: "transform 0.1s",
          }}
          onClick={() => {
            setSelectedProject(proj);
            setModalOpen(true);
          }}
        >
          {/* 1. Project Image */}
          {proj.image && (
            <img
              src={proj.image}
              alt={proj.title}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "0.5rem"
              }}
            />
          )}
          <h3>{proj.title}</h3>
          <p>{proj.description}</p>
          {/* 2. Tags/Technologies */}
          {proj.tags && (
            <div style={{ margin: "0.5rem 0" }}>
              {proj.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    display: "inline-block",
                    background: "#ff6f91",
                    color: "#fff",
                    borderRadius: "5px",
                    padding: "0.2rem 0.6rem",
                    fontSize: "0.85rem",
                    marginRight: "0.4rem",
                    marginBottom: "0.2rem"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {proj.link && (
            <a
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ff6f91" }}
              onClick={e => e.stopPropagation()}
            >
              View Project
            </a>
          )}
        </div>
      ))}
    </div>
    {/* 4. Project Modal */}
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      contentLabel="Project Details"
      style={{
        content: {
          maxWidth: "500px",
          margin: "auto",
          borderRadius: "12px",
          padding: "2rem"
        }
      }}
    >
      {selectedProject && (
        <div>
          {selectedProject.image && (
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "1rem"
              }}
            />
          )}
          <h2>{selectedProject.title}</h2>
          <p>{selectedProject.description}</p>
          {selectedProject.tags && (
            <div style={{ margin: "0.5rem 0" }}>
              {selectedProject.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    display: "inline-block",
                    background: "#ff6f91",
                    color: "#fff",
                    borderRadius: "5px",
                    padding: "0.2rem 0.6rem",
                    fontSize: "0.85rem",
                    marginRight: "0.4rem",
                    marginBottom: "0.2rem"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {selectedProject.link && (
            <a
              href={selectedProject.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ff6f91" }}
            >
              View Project
            </a>
          )}
          <button
            onClick={() => setModalOpen(false)}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              background: "#ff6f91",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  </div>
);