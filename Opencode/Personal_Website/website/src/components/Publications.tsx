'use client';
import { motion } from 'framer-motion';
import { FaFileAlt, FaBook, FaAward, FaTrophy } from 'react-icons/fa';

const publications = [
  {
    type: 'paper',
    title: 'Impact Strength and Moisture Behaviour of Natural, Densified and Seasoned Wood',
    conference: 'ICMEAS 2025 (Accepted)',
    authors: 'A. Tahsin, Md. Maruf Mullah, et al.',
    description: 'Conference paper on mechanical properties of treated wood species.',
    color: 'cyan',
  },
  {
    type: 'chapter',
    title: 'Meteorological Drought Prediction Using Forecasting Models',
    conference: 'ICWFM 2025 (Book Chapter - Accepted)',
    authors: 'Z. Imtiaz et al., Md. Maruf Mullah',
    description: 'Book chapter on machine learning applications in climate prediction.',
    color: 'purple',
  },
  {
    type: 'manuscript',
    title: 'Effect of Groove Shapes on Microstructural and Mechanical Behavior of Pipe Welds under Post-Weld Heat Treatment',
    conference: 'Under revision for journal resubmission',
    authors: 'I. Alam et al., Md. Maruf Mullah',
    description: 'Research on welding metallurgy and mechanical properties.',
    color: 'blue',
  },
];

const achievements = [
  {
    title: 'Science Fair Champion',
    level: 'Upazila Level, Raipura',
    year: '2017',
    description: 'Led a school team to first place by presenting an applied science project.',
    icon: FaTrophy,
    color: 'yellow',
  },
  {
    title: 'Government Scholarship',
    level: 'Primary Education Completion',
    year: '2012',
    description: 'Recipient of Government Scholarship in the PEC Examination.',
    icon: FaAward,
    color: 'cyan',
  },
  {
    title: 'Government Scholarship',
    level: 'Junior School Certificate',
    year: '2015',
    description: 'Recipient of Government Scholarship in the JSC Examination.',
    icon: FaAward,
    color: 'purple',
  },
  {
    title: 'Casting Defect Classification',
    level: 'Project Achievement',
    year: '2025',
    description: 'Achieved 99.9% accuracy using YOLO-based classifier for industrial defect detection.',
    icon: FaTrophy,
    color: 'green',
  },
];

const colorMap = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
};

export default function Publications() {
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
    <section id="publications" className="py-24 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Publications & <span className="text-gradient">Achievements</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-6" />
            <p className="text-gray-400 max-w-2xl mx-auto">
              Academic contributions and notable achievements in engineering and research.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Publications */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-8">
                <div className="p-3 bg-cyan-500/10 rounded-xl mr-4">
                  <FaFileAlt className="text-cyan-400 text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold">Research Publications</h3>
              </div>

              <div className="space-y-6">
                {publications.map((pub, index) => (
                  <div
                    key={index}
                    className={`bg-gray-900/80 rounded-2xl border ${
                      colorMap[pub.color as keyof typeof colorMap].border
                    } p-6 hover:border-opacity-50 transition-colors`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          colorMap[pub.color as keyof typeof colorMap].bg
                        } ${colorMap[pub.color as keyof typeof colorMap].text}`}
                      >
                        {pub.type.charAt(0).toUpperCase() + pub.type.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">{pub.conference}</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{pub.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{pub.authors}</p>
                    <p className="text-gray-500 text-sm">{pub.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-8">
                <div className="p-3 bg-purple-500/10 rounded-xl mr-4">
                  <FaTrophy className="text-purple-400 text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold">Achievements & Awards</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div
                      key={index}
                      className={`bg-gray-900/80 rounded-2xl border ${
                        colorMap[achievement.color as keyof typeof colorMap].border
                      } p-5 hover:border-opacity-50 transition-colors`}
                    >
                      <div className="flex items-center mb-3">
                        <div
                          className={`p-2 rounded-lg ${
                            colorMap[achievement.color as keyof typeof colorMap].bg
                          } mr-3`}
                        >
                          <IconComponent
                            className={colorMap[achievement.color as keyof typeof colorMap].text}
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-xs text-gray-500">{achievement.level}</p>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
                      <p className="text-xs text-gray-500">{achievement.year}</p>
                    </div>
                  );
                })}
              </div>

              {/* Certifications */}
              <div className="mt-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-pink-500/10 rounded-xl mr-4">
                    <FaBook className="text-pink-400 text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold">Certifications</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Machine Learning Specialization - Coursera',
                    'Neural Networks and Deep Learning - Coursera',
                    'Mathematics for Data Science - Simplilearn',
                    'Python Programming Bootcamp - Decoders Academy',
                    'MATLAB Onramp - MathWorks',
                    'Git Training - Simplilearn',
                    'Google Sheets - Simplilearn',
                    'Project-Based Excel - Grameenphone Academy',
                  ].map((cert, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700/50 text-sm text-gray-300"
                    >
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}