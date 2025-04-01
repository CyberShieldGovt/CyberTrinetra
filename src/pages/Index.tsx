
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import CaseCard from '@/components/CaseCard';
import GallerySection from '@/components/GallerySection';
import FactCheckerIntro from '@/components/FactCheckerIntro';
import { useAuth } from '@/components/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Case card data
  const caseTypes = [
    {
      title: 'Women and Child Related Cases',
      icon: '/uploaded-images/resized_image_324x212.png',
      description: 'Report cases related to online harassment, bullying, and other cybercrimes targeting women and children.',
      delay: 1
    },
    {
      title: 'Financial Frauds',
      icon: '/uploaded-images/Username__1_-removebg-preview.png',
      description: 'Report online financial scams, fraudulent transactions, phishing attempts and identity theft.',
      delay: 2
    },
    {
      title: 'Other Cyber Crimes',
      icon: '/uploaded-images/other-removebg-preview.png',
      description: 'Report hacking attempts, ransomware attacks, data breaches, and other cybercrimes.',
      delay: 3
    }
  ];

  return (
    <>
      {/* Hero section */}
      <section className="relative bg-hero-pattern bg-cover bg-center py-32 md:py-40">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-navy/90 to-cyber-navy/70"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-6">
                <Shield className="w-4 h-4 text-cyber-blue mr-2" />
                <span className="text-sm font-semibold text-white">Welcome to CyberTrinetra</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                CyberTrinetra - Your Guardian Against Digital Threats
              </h1>
              {/* Added highlighted safety message */}
              <div className="bg-cyber-blue/20 border-l-4 border-cyber-blue p-4 my-6 rounded-r">
                <p className="text-xl md:text-2xl font-semibold text-white animate-pulse">
                  Every Girl's Safety is Our Responsibility
                </p>
              </div>
              <p className="text-lg text-gray-200 mb-8 max-w-lg">
                At CyberTrinetra, we are dedicated to empowering individuals in the fight against cybercrimes. Our secure platform helps you report and track cybercrimes with transparency and swift resolution.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to={isAuthenticated ? '/dashboard' : '/login'}>
                  <Button size="lg" className="bg-cyber-blue hover:bg-cyber-blue/90">
                    {isAuthenticated ? 'Go to Dashboard' : 'Login'}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/blogs">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 hover:text-white bg-white/10 backdrop-blur-sm">
                    Explore Blogs
                  </Button>
                </Link>
                <Link to={isAuthenticated ? '/fact-checker' : '/login'}>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 hover:text-white bg-white/10 backdrop-blur-sm">
                    Fact Checker
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${isMobile ? "mt-8" : "hidden lg:block"}`}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-cyber-blue/20 rounded-full blur-xl animate-pulse-glow"></div>
                <img 
                  src="/uploaded-images/HeroSec.jpg"
                  alt="Cybersecurity" 
                  className="rounded-lg shadow-xl w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services/Case Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyber-dark-blue">Report Cybercrimes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the category that matches your situation and submit your complaint. Our team will guide you through the process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseTypes.map((caseType, index) => (
              <CaseCard 
                key={index}
                title={caseType.title}
                icon={caseType.icon}
                description={caseType.description}
                delay={caseType.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Fact Checker Highlight */}
      <section className="py-20 bg-cyber-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 md:p-12 shadow-glass">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Fact Checker</h2>
                <p className="text-gray-200 mb-6 leading-relaxed">
                  Fact Checker is a tool that helps you identify and protect yourself from cyber fraud. It allows you to input details like images, videos, links, or documents to verify if a suspicious communication is legitimate or a scam.
                </p>
                <p className="text-gray-200 mb-6 leading-relaxed">
                  Whether it's a fraudulent call, a dubious link, or an APK file, Fact Checker processes the information and tells you if it's genuine or fake, helping you stay safe online.
                </p>
                <Link to={isAuthenticated ? '/fact-checker' : '/login'}>
                  <Button size="lg" className="bg-white text-cyber-dark-blue hover:bg-white/90">
                    Try Fact Checker
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className={isMobile ? "mt-8" : "hidden lg:block"}>
                <img 
                  src="/uploaded-images/FactChecker.jpg"
                  alt="Fact Checker" 
                  className="rounded-lg shadow-xl animate-float w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Report */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyber-dark-blue">How to Report?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to report cybercrime incidents and track your case.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Register a Case',
                description: (
                  <>
                    Visit <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-cyber-blue hover:underline">Cyber Crime Portal</a> and file a complaint. Download the acknowledgment or obtain the FIR copy.
                  </>
                )
              },
              {
                step: 2,
                title: 'Provide Case Details',
                description: 'Navigate to the appropriate section, fill in the required information, and upload the FIR copy along with supporting proofs.'
              },
              {
                step: 3,
                title: 'Submit & Track',
                description: 'Ensure all details and evidence are accurate before submitting. You can monitor the progress of your case through the dashboard.'
              },
              {
                step: 4,
                title: 'Stay Informed',
                description: 'Our professionals will reach out if needed. Keep an eye on your case status in the dashboard for updates.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 relative"
              >
                <div className="absolute -top-5 -left-5 w-12 h-12 bg-cyber-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-cyber-dark-blue mb-3 mt-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />
    </>
  );
};

export default Index;
