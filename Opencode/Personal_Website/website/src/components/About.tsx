'use client';
import { motion } from 'framer-motion';
import { FaUser, FaGraduationCap, FaLightbulb } from 'react-icons/fa';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-24 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg">
                  <FaUser className="text-cyan-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Who I Am</h3>
                  <p className="text-gray-400 leading-relaxed">
                    I am a dedicated Mechanical Engineer and researcher with a strong focus on bridging the gap between classical engineering and computational intelligence. My work spans from developing YOLO-based computer vision systems for industrial safety and medical imaging to researching the densification of tropical wood species.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <FaGraduationCap className="text-purple-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Education</h3>
                  <p className="text-gray-400 leading-relaxed">
                    <strong>B.Sc. in Mechanical Engineering</strong> from Military Institute of Science and Technology (MIST), Dhaka, Bangladesh (CGPA: 3.23/4.00). My thesis focused on the densification of natural wood to improve structural properties.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-pink-500/10 rounded-lg">
                  <FaLightbulb className="text-pink-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Research Focus</h3>
                  <p className="text-gray-400 leading-relaxed">
                    I work on data-driven modeling, machine learning/deep learning, and computational methods to predict material behavior and support engineering decisions. My research interests include advanced manufacturing systems, computational mechanics, and data-driven engineering applications.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">MM</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Md. Maruf Mullah</h3>
                  <p className="text-gray-400 mb-4">Mechanical Engineer & Researcher</p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm">ML/DL</span>
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">CAD</span>
                    <span className="px-3 py-1 bg-pink-500/10 text-pink-400 rounded-full text-sm">Robotics</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl" />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-16">
            <div className="bg-gray-800/50 rounded-2xl border border-gray-800 p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Core Values</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Innovation', desc: 'Constantly pushing boundaries with cutting-edge solutions' },
                  { title: 'Precision', desc: 'Attention to detail in every aspect of engineering' },
                  { title: 'Collaboration', desc: 'Working together to solve complex challenges' },
                  { title: 'Impact', desc: 'Creating solutions that make a real difference' },
                ].map((value, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                    <p className="text-gray-400 text-sm">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}