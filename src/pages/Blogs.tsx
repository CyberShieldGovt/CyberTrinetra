
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import BlogCard from '@/components/BlogCard';

// Sample blog data
const blogPosts = [
  {
    id: '1',
    title: 'How to Protect Yourself from Phishing Attacks',
    excerpt: 'Learn the common signs of phishing attempts and strategies to keep your personal information safe from cybercriminals.',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'June 15, 2023',
    author: 'Cyber Expert'
  },
  {
    id: '2',
    title: 'Understanding Ransomware: Prevention and Recovery',
    excerpt: 'A comprehensive guide to ransomware attacks, how they work, and what steps you can take to protect your data and recover from an attack.',
    coverImage: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'May 22, 2023',
    author: 'Security Analyst'
  },
  {
    id: '3',
    title: 'The Rise of Financial Frauds: What You Need to Know',
    excerpt: 'Explore the increasing trends in financial cybercrimes and learn how to identify and avoid becoming a victim of these sophisticated scams.',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'April 10, 2023',
    author: 'Financial Security Expert'
  },
  {
    id: '4',
    title: 'Protecting Children Online: A Parent\'s Guide',
    excerpt: 'Essential tips and tools for parents to help safeguard their children from online predators, cyberbullying, and inappropriate content.',
    coverImage: 'https://images.unsplash.com/photo-1534437829740-62aafbb33587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'March 05, 2023',
    author: 'Child Safety Advocate'
  },
  {
    id: '5',
    title: 'The Importance of Two-Factor Authentication',
    excerpt: 'Why adding an extra layer of security with two-factor authentication is crucial in today\'s digital landscape and how to set it up on your accounts.',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'February 18, 2023',
    author: 'Cybersecurity Specialist'
  },
  {
    id: '6',
    title: 'Identity Theft: Prevention and Recovery',
    excerpt: 'A step-by-step guide on how to protect yourself from identity theft and what actions to take if you suspect your identity has been compromised.',
    coverImage: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'January 30, 2023',
    author: 'Identity Protection Expert'
  }
];

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogPosts);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Filter blogs based on search term
    if (searchTerm.trim() === '') {
      setFilteredBlogs(blogPosts);
    } else {
      const filtered = blogPosts.filter(
        post => 
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-cyber-light-gray py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-cyber-dark-blue mb-4">
              Cybersecurity Blog
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay informed on the latest cybersecurity threats, prevention tips, and best practices to protect yourself online.
            </p>
          </div>
          
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search blogs by title, content, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((post, index) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                <h3 className="text-xl font-semibold text-cyber-dark-blue mb-2">No blogs found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or check back later for new content.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blogs;
