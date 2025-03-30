import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import "./styles/Skills.css"; // ✅ Import CSS

// ✅ Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Skills = () => {
  const data = {
    labels: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", "Java", "MySQL", "MongoDB", "Tailwind", "Bootstrap", "SASS"],
    datasets: [
      {
        label: "Skill Level",
        data: [90, 85, 80, 75, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        backgroundColor: "#60A5FA",
      },
    ],
  };

  return (
    <div className="skills-container">
      <h2>My Skills</h2>
      <div className="chart-wrapper">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default Skills;
