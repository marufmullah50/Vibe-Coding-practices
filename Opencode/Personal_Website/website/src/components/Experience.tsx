'use client';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const experiences = [
  {
    type: 'work',
    title: 'Management Trainee Officer (Engineer)',
    company: 'PRAN-RFL Group',
    location: 'Kaliganj, Gazipur, Bangladesh',
    period: 'Jul 2025',
    description: [
      'Participated in structured assessment for manufacturing operations and engineering roles.',
      'Observed production workflow, plant layout, and assisted in machine monitoring.',
      'Prepared technical and operational reports demonstrating analytical and communication skills.',
    ],
    color: 'cyan',
  },
  {
    type: 'work',
    title: 'Mechanical Engineering Intern',
    company: 'IFAD Autos PLC',
    location: 'Dhamrai Upazila, Dhaka, Bangladesh',
    period: 'Feb 2024 - Mar 2024',
    description: [
      'Assisted in vehicle assembly, mechanical fitting, and torque verification.',
      'Observed quality control procedures and assembly line balancing.',
      'Gained hands-on exposure to automotive manufacturing systems.',
    ],
    color: 'purple',
  },
  {
    type: 'education',
    title: 'B.Sc. in Mechanical Engineering',
    company: 'Military Institute of Science and Technology (MIST)',
    location: 'Dhaka, Bangladesh',
    period: 'Apr 2021 - May 2025',
    description: [
      'CGPA: 3.23 / 4.00',
      'Bachelor\'s Thesis: Densification of Natural Wood to Improve Structural Properties',
      'Focus on computational mechanics, machine learning, and smart manufacturing.',
    ],
    color: 'blue',
  },
  {
    type: 'education',
    title: 'Higher Secondary Certificate (HSC)',
    company: 'Abdul Kadir Mollah City College',
    location: 'Bangladesh',
    period: '2020',
    description: ['GPA: 5.00 / 5.00'],
    color: 'green',
  },
  {
    type: 'education',
    title: 'Secondary School Certificate (SSC)',
    company: 'Siraj Nagar M.A. Pilot High School',
    location: 'Bangladesh',
    period: '2018',
    description: ['GPA: 5.00 / 5.00'],
    color: 'orange',
  },
];

const colorMap = {
  cyan: 'bg-cyan-500',
  purple: 'bg-purple-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
};

export default function Experience() {
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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="experience" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Experience & <span className="text-gradient">Education</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-6" />
            <p className="text-gray-400 max-w-2xl mx-auto">
              My professional journey and academic foundation in mechanical engineering and computational intelligence.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-8">
                    <div className={`w-4 h-4 rounded-full ${colorMap[exp.color as keyof typeof colorMap]} border-4 border-gray-950`} />
                  </div>

                  {/* Empty space for timeline alignment on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'
                  }`}>
                    <div className="bg-gray-900/80 rounded-2xl border border-gray-800 p-6 hover:border-cyan-500/30 transition-colors">
                      <div className="flex items-center mb-4">
                        <div className={`p-2 rounded-lg ${colorMap[exp.color as keyof typeof colorMap]}/10 mr-3`}>
                          {exp.type === 'work' ? (
                            <FaBriefcase className={`${colorMap[exp.color as keyof typeof colorMap].replace('bg-', 'text-')}`} />
                          ) : (
                            <FaGraduationCap className={`${colorMap[exp.color as keyof typeof colorMap].replace('bg-', 'text-')}`} />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{exp.title}</h3>
                          <p className="text-gray-400">{exp.company}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-2" />
                          {exp.period}
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-2" />
                          {exp.location}
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-gray-400 text-sm flex items-start">
                            <span className="text-cyan-400 mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}