import { FaReact, FaNodeJs, FaDocker, FaAws, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiExpress, SiJavascript } from "react-icons/si";

const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React.js", icon: <FaReact className="text-sky-400" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
      { name: "TailwindCSS", icon: <SiTailwindcss className="text-cyan-400" /> },
      { name: "HTML5", icon: <span className="text-orange-500 font-bold">HTML5</span> },
      { name: "CSS3", icon: <span className="text-blue-600 font-bold">CSS3</span> },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
      { name: "Express.js", icon: <SiExpress className="text-gray-700 dark:text-gray-200" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-700" /> },
      { name: "Redis", icon: <span className="text-red-500 font-bold">Redis</span> },
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Docker", icon: <FaDocker className="text-blue-400" /> },
      { name: "AWS", icon: <FaAws className="text-orange-400" /> },
      { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
      { name: "VS Code", icon: <span className="text-blue-500 font-bold">VS</span> },
      { name: "Postman", icon: <span className="text-orange-500 font-bold">Postman</span> },
    ],
  },
];

const Skills = () => (
  <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900 transition-colors">
    <div className="max-w-4xl mx-auto">
      <h2 className="section-title text-black dark:text-white mb-10 text-center">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skills.map((group) => (
          <div key={group.category} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-green-500">{group.category}</h3>
            <ul className="space-y-3">
              {group.items.map((skill) => (
                <li key={skill.name} className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                  <span className="text-2xl">{skill.icon}</span>
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;