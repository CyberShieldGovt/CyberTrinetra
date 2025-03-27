
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Sample gallery images
const galleryImages = [
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
];

const GallerySection = () => {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  // Track which images have loaded
  const handleImageLoad = (src: string) => {
    setLoaded(prev => ({ ...prev, [src]: true }));
  };

  return (
    <section className="py-20 bg-cyber-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyber-dark-blue">Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visual insights into cybersecurity awareness and our mission to protect digital identities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: loaded[image] ? 1 : 0, scale: loaded[image] ? 1 : 0.8 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg overflow-hidden shadow-md aspect-square relative group"
            >
              <div className={`absolute inset-0 bg-cyber-navy/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}>
                <span className="text-white text-xl font-medium">CyberTrinetra</span>
              </div>
              <div className={`w-full h-full bg-gray-200 ${!loaded[image] ? 'animate-pulse' : ''}`}>
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    loaded[image] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(image)}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
