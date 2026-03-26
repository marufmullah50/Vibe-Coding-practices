'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaProjectDiagram } from 'react-icons/fa';
import { 
  SiPython, SiTensorflow, SiPytorch, SiOpenai
} from 'react-icons/si';

const projects = [
  {
    title: 'Casting Defect Classification',
    description: 'Achieved 99.9% accuracy using YOLO-based classifier for industrial defect detection. Compared CNN, MobileNetV3, ViT, and YOLO classifiers on industrial datasets.',
    tags: ['YOLO', 'Computer Vision', 'Deep Learning', 'PyTorch'],
    github: 'https://github.com/marufmullah50',
    color: 'cyan',
    icon: SiPytorch,
  },
  {
    title: 'RAG Research Assistant',
    description: 'Developed a local Retrieval-Augmented Generation chatbot for research assistance. Integrated document ingestion, web scraping, and structured Markdown knowledge storage.',
    tags: ['RAG', 'LLM', 'LangChain', 'Python'],
    github: 'https://github.com/marufmullah50',
    color: 'purple',
    icon: SiOpenai,
  },
  {
    title: 'Surface Roughness Prediction',
    description: 'Built regression models (LR, RF, GB, SVM, DT) to predict surface roughness. Best model: Decision Tree (R² = 0.85) analyzing influence of cutting parameters.',
    tags: ['Machine Learning', 'Scikit-learn', 'Regression', 'Python'],
    github: 'https://github.com/marufmullah50',
    color: 'pink',
    icon: SiPython,
  },
  {
    title: 'Wind Speed & Direction Prediction',
    description: 'Applied ANN, RNN, LSTM, and CatBoost on meteorological time-series data. Performed feature engineering, temporal modeling, and comparative evaluation.',
    tags: ['Time Series', 'TensorFlow', 'CatBoost', 'Python'],
    github: 'https://github.com/marufmullah50',
    color: 'blue',
    icon: SiTensorflow,
  },
  {
    title: 'YOLO Vision Applications',
    description: 'Implemented segmentation (brain MRI), detection (PPE compliance), classification, and real-time tracking. Managed dataset preparation and annotation using Roboflow.',
    tags: ['YOLO', 'Roboflow', 'Computer Vision', 'Deployment'],
    github: 'https://github.com/marufmullah50',
    color: 'green',
    icon: SiPython,
  },
  {
    title: 'Densification of Natural Wood',
    description: 'Bachelor thesis on improving structural properties of natural wood through chemical treatment and thermo-mechanical hot-press densification.',
    tags: ['Materials Science', 'Research', 'ASTM Standards', 'SEM Analysis'],
    color: 'orange',
    icon: FaProjectDiagram,
  },
];

const colorMap = {
  cyan: 'from-cyan-500 to-blue-600',
  purple: 'from-purple-500 to-pink-600',
  pink: 'from-pink-500 to-rose-600',
  blue: 'from-blue-500 to-indigo-600',
  green: 'from-green-500 to-emerald-600',
  orange: 'from-orange-500 to-amber-600',
};

export default function Projects() {
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
    <section id="projects" className="py-24 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-6" />
            <p className="text-gray-400 max-w-2xl mx-auto">
              A selection of projects spanning machine learning, computer vision, engineering simulation, and research.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative bg-gray-900/80 rounded-2xl border border-gray-800 overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[project.color as keyof typeof colorMap]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="p-6 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${colorMap[project.color as keyof typeof colorMap]}`}>
                        <IconComponent className="text-white text-2xl" />
                      </div>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-500 hover:text-white transition-colors"
                        >
                          <FaGithub size={20} />
                        </a>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-xs font-medium border border-gray-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom gradient bar */}
                  <div className={`h-1 bg-gradient-to-r ${colorMap[project.color as keyof typeof colorMap]} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}