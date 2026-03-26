'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  // Personal info
  'hello': 'Hello! I am Md. Maruf Mullah, a Mechanical Engineer and researcher. How can I help you today?',
  'hi': 'Hi there! I\'m Maruf. Feel free to ask me about my work, research, or anything else.',
  'who are you': 'I am Md. Maruf Mullah, a Mechanical Engineer and researcher specializing in computational intelligence, machine learning, and smart manufacturing.',
  'about': 'I am a dedicated Mechanical Engineer and researcher with a strong focus on bridging the gap between classical engineering and computational intelligence. My work spans from developing YOLO-based computer vision systems for industrial safety and medical imaging to researching the densification of tropical wood species.',
  
  // Education
  'education': 'I have a B.Sc. in Mechanical Engineering from Military Institute of Science and Technology (MIST), Dhaka, Bangladesh with a CGPA of 3.23/4.00. My thesis was on "Densification of Natural Wood to Improve Structural Properties".',
  'university': 'I studied at Military Institute of Science and Technology (MIST) in Dhaka, Bangladesh, graduating in May 2025.',
  'thesis': 'My bachelor\'s thesis was on "Densification of Natural Wood to Improve Structural Properties". I studied structural performance of natural, seasoned, and chemically treated densified wood, investigating three tropical species.',
  
  // Research
  'research': 'My research interests include: Machine Learning & Deep Learning in Mechanical Engineering, Materials Science & Metamaterials, Autonomous Systems & Robotics, Smart Manufacturing, and Renewable Energy Applications with Data-Driven Methods.',
  'interests': 'I\'m interested in advanced and smart manufacturing systems, computational mechanics and numerical modelling, data-driven and machine learning applications in engineering, and advanced engineering materials.',
  
  // Skills
  'skills': 'My technical skills include: Programming: Python, C, C++, MATLAB; Machine Learning: Scikit-learn, PyTorch, TensorFlow; Engineering: SOLIDWORKS, ANSYS, COMSOL; CAD/3D Printing: SolidWorks, FreeCAD, Anycubic Cobra; Data Visualization: Matplotlib, Seaborn, Excel.',
  'programming': 'I\'m proficient in Python, C, C++, MATLAB, and HTML. For machine learning, I use Python with libraries like Scikit-learn, PyTorch, and TensorFlow.',
  
  // Projects
  'projects': 'Some of my notable projects include: Casting Defect Classification (99.9% accuracy with YOLO), RAG Research Assistant, Surface Roughness Prediction, Wind Speed Prediction, YOLO Vision Applications, and Wood Densification Research.',
  'casting': 'The Casting Defect Classification project achieved 99.9% accuracy using YOLO-based classifiers. I compared CNN, MobileNetV3, ViT, and YOLO classifiers on industrial datasets.',
  'rag': 'I developed a local Retrieval-Augmented Generation (RAG) chatbot for research assistance. It integrates document ingestion, web scraping, and structured Markdown knowledge storage with local inference and Gemini 2.5 Flash Lite integration.',
  'wood': 'My research on wood densification involved studying structural performance of natural, seasoned, and chemically treated wood. I investigated three tropical species: Swietenia macrophylla, Albizia procera, and Cordia subcordata.',
  
  // Experience
  'experience': 'I have industrial experience at IFAD Autos PLC (Mechanical Engineering Intern) and PRAN-RFL Group (Management Trainee Officer). I\'ve also volunteered at ICMEAS 2022, Job Fair 2022, and organized the Soccer Bot Competition at MIST.',
  'work': 'My work experience includes a Mechanical Engineering Internship at IFAD Autos PLC and a Management Trainee Officer position at PRAN-RFL Group. Both were hands-on roles in manufacturing operations.',
  
  // Contact
  'contact': 'You can reach me at md.marufmullah50@gmail.com. My GitHub and LinkedIn are marufmullah50. My portfolio is at marufmullah50.github.io.',
  'email': 'My email address is md.marufmullah50@gmail.com.',
  'github': 'My GitHub username is marufmullah50.',
  'linkedin': 'You can find me on LinkedIn as marufmullah50.',
  
  // Publications
  'publications': 'I have publications including: "Impact Strength and Moisture Behaviour of Natural, Densified and Seasoned Wood" (ICMEAS 2025), "Meteorological Drought Prediction Using Forecasting Models" (ICWFM 2025), and a manuscript on "Effect of Groove Shapes on Microstructural and Mechanical Behavior of Pipe Welds" under revision.',
  
  // Default
  'default': 'I\'m not sure about that. You can ask me about my education, research, skills, projects, experience, or publications. Or you can contact me directly at md.marufmullah50@gmail.com for specific inquiries.',
};

export default function DigitalTwin() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I am Maruf\'s digital twin. How can I help you today? You can ask me about his education, research, skills, projects, or experience.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(keyword) || keyword === 'default') {
        return response;
      }
    }
    
    return predefinedResponses['default'];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const quickQuestions = [
    'Tell me about yourself',
    'What are your research interests?',
    'What projects have you worked on?',
    'How can I contact you?',
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-cyan-500/10 to-purple-600/10">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full mr-3">
                  <FaRobot className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Maruf&apos;s Digital Twin</h3>
                  <p className="text-xs text-gray-400">Ask me anything about Maruf</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                        : 'bg-gray-800 text-gray-100 border border-gray-700'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-cyan-200' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-100 border border-gray-700 rounded-2xl px-4 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 py-2 border-t border-gray-800">
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(question)}
                    className="px-3 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-full border border-gray-700/50 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <button
                  type="submit"
                  className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
                >
                  <FaPaperPlane size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}