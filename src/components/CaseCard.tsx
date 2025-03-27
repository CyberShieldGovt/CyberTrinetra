
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface CaseCardProps {
  title: string;
  icon: string;
  description: string;
  delay: number;
}

const CaseCard: FC<CaseCardProps> = ({ title, icon, description, delay }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-soft transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={icon} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-cyber-dark-blue mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <Link to={isAuthenticated ? '/report-crime' : '/login'}>
          <Button className="w-full">
            {isAuthenticated ? 'Register a Complaint' : 'Login to Register'}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CaseCard;
