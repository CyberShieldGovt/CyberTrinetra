
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  index: number;
}

const BlogCard: FC<BlogCardProps> = ({ id, title, excerpt, coverImage, date, author, index }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-soft transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
    >
      <Link to={`/blogs/${id}`} className="block">
        <div className="h-48 overflow-hidden">
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 space-x-4 mb-3">
          <div className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{author}</span>
          </div>
        </div>
        <Link to={`/blogs/${id}`} className="block">
          <h3 className="text-xl font-semibold text-cyber-dark-blue mb-3 hover:text-cyber-blue transition-colors">{title}</h3>
        </Link>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <Link 
          to={`/blogs/${id}`} 
          className="inline-flex items-center text-cyber-blue font-medium hover:underline"
        >
          Read More
          <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogCard;
