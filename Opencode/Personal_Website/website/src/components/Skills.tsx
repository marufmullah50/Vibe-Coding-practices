'use client';
import { motion } from 'framer-motion';
import { 
  FaPython, FaGit, FaHtml5, FaJava, FaDocker, 
  FaAws, FaLinux, FaReact 
} from 'react-icons/fa';
import { 
  SiPytorch, SiTensorflow, SiMongodb, SiPostgresql, 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiSolid,
  SiAnsible, SiKubernetes
} from 'react-icons/si';

const skillCategories = [
  {
    title: 'Programming & Tools',
    icon: '💻',
    skills: [
      { name: 'Python', level: 90, icon: FaPython, color: '#3776AB' },
      { name: 'MATLAB', level: 85, icon: FaJava, color: '#0076A8' },
      { name: 'C/C++', level: 80, icon: FaJava, color: '#00599C' },
      { name: 'HTML/CSS', level: 75, icon: FaHtml5, color: '#E34F26' },
      { name: 'Git', level: 85, icon: FaGit, color: '#F05032' },
    ],
  },
  {
    title: 'Machine Learning & AI',
    icon: '🤖',
    skills: [
      { name: 'PyTorch', level: 85, icon: SiPytorch, color: '#EE4C2C' },
      { name: 'TensorFlow', level: 80, icon: SiTensorflow, color: '#FF6F00' },
      { name: 'Scikit-learn', level: 85, icon: FaPython, color: '#F09819' },
      { name: 'YOLO', level: 90, icon: FaPython, color: '#00FFFF' },
      { name: 'Computer Vision', level: 88, icon: FaPython, color: '#FF6B6B' },
    ],
  },
  {
    title: 'Engineering & Simulation',
    icon: '⚙️',
    skills: [
      { name: 'SOLIDWORKS', level: 90, icon: SiSolid, color: '#FF3300' },
      { name: 'ANSYS', level: 80, icon: SiAnsible, color: '#FF0000' },
      { name: 'COMSOL', level: 75, icon: FaJava, color: '#0052CC' },
      { name: 'FEA', level: 70, icon: FaJava, color: '#6C5B7B' },
      { name: '3D Printing', level: 85, icon: FaJava, color: '#FF9A00' },
    ],
  },
  {
    title: 'Data & Databases',
    icon: '📊',
    skills: [
      { name: 'Pandas', level: 90, icon: FaPython, color: '#150458' },
      { name: 'NumPy', level: 90, icon: FaPython, color: '#4DABCF' },
      { name: 'SQL', level: 80, icon: SiPostgresql, color: '#336791' },
      { name: 'MongoDB', level: 70, icon: SiMongodb, color: '#47A248' },
      { name: 'Data Visualization', level: 85, icon: FaPython, color: '#F15BAC' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    icon: '☁️',
    skills: [
      { name: 'Docker', level: 75, icon: FaDocker, color: '#2496ED' },
      { name: 'Linux', level: 80, icon: FaLinux, color: '#FCC624' },
      { name: 'AWS', level: 65, icon: FaAws, color: '#FF9900' },
      { name: 'Kubernetes', level: 60, icon: SiKubernetes, color: '#326CE5' },
      { name: 'CI/CD', level: 70, icon: FaGit, color: '#40BE46' },
    ],
  },
  {
    title: 'Web & Frontend',
    icon: '🌐',
    skills: [
      { name: 'React', level: 70, icon: FaReact, color: '#61DAFB' },
      { name: 'Next.js', level: 75, icon: SiNextdotjs, color: '#000000' },
      { name: 'TypeScript', level: 70, icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', level: 80, icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Node.js', level: 65, icon: FaJava, color: '#339933' },
    ],
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Technical <span className="text-gradient">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-6" />
            <p className="text-gray-400 max-w-2xl mx-auto">
              A comprehensive toolkit spanning machine learning, engineering simulation, and modern software development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => {
                    const IconComponent = skill.icon;
                    return (
                      <div key={skillIndex}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <IconComponent 
                              size={16} 
                              style={{ color: skill.color }} 
                              className="mr-2" 
                            />
                            <span className="text-sm font-medium">{skill.name}</span>
                          </div>
                          <span className="text-sm text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}