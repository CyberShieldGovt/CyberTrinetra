
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const FactCheckerIntro = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 md:p-8 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-cyber-dark-blue mb-4">Fact Checker</h2>
          <p className="text-gray-600 mb-4">
            Fact Checker is a tool that helps you identify and protect yourself from cyber fraud. 
            It allows you to input details like images, videos, links, or documents to verify if a 
            suspicious communication is legitimate or a scam.
          </p>
          <p className="text-gray-600">
            Whether it's a fraudulent call, a dubious link, or an APK file, Fact Checker processes 
            the information and tells you if it's genuine or fake, helping you stay safe online.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden shadow-md"
        >
          <img 
            src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Fact Checker" 
            className="w-full h-64 object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default FactCheckerIntro;
