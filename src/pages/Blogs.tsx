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
    date: 'March 15, 2025',
    author: 'Cyber Expert'
  },
  {
    id: '2',
    title: 'Digital Arrest Scam',
    excerpt: 'Scammers impersonate law enforcement officials, using deepfake videos and fake arrest warrants to extort money from victims',
    coverImage: '/Digital-Arrest-blog-image.jpg',
    date: 'March 22, 2025',
    author: 'Security Analyst'
  },
  {
    id: '3',
    title: 'Job Scam: Fake Government & IT Job Offers',
    excerpt: 'Scammers exploit job seekers with fake job offers, demanding money for application fees and vanishing after payment.',
    coverImage: '/jobs.jpg',
    date: 'March 10, 2025',
    author: 'Financial Security Expert'
  },
  {
    id: '4',
    title: 'Protecting Children Online: A Parent\'s Guide',
    excerpt: 'Essential tips and tools for parents to help safeguard their children from online predators, cyberbullying, and inappropriate content.',
    coverImage: '/kids-safety-online.png',
    date: 'March 05, 2025',
    author: 'Security Analyst'
  },
  {
    id: '5',
    title: 'The Importance of Two-Factor Authentication',
    excerpt: 'Why adding an extra layer of security with two-factor authentication is crucial in today\'s digital landscape and how to set it up on your accounts.',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'February 18, 2025',
    author: 'Cybersecurity Specialist'
  },
  {
    id: '6',
    title: 'Credit Card Scam: The "Police Will Arrest You" Threat',
    excerpt: 'Fraudsters call or message claiming a large withdrawal was made from your credit card and demand immediate payment to avoid police action.',
    coverImage: '/credit-card-fraud-in-india-717x404.jpg',
    date: 'March 30, 2025',
    author: 'Cybersecurity Expert'
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
    
    // Debug: log current route
    console.log("Current route:", window.location.pathname);
  }, [searchTerm]);

  console.log("Blogs page loaded, available blog posts:", blogPosts.map(b => b.id));

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
