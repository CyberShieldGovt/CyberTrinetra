
import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Image, Upload, Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

// Sample gallery images
const initialGalleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
    alt: 'Cybersecurity Tech'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    alt: 'Circuit Board'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    alt: 'Programming Code'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    alt: 'Digital Matrix'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    alt: 'Laptop Computer'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
    alt: 'Colorful Code'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80',
    alt: 'Security Operations Center'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    alt: 'Woman with Laptop'
  }
];

type GalleryImage = typeof initialGalleryImages[0];

const AdminGallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImageAlt, setNewImageAlt] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImageFile(file);
      
      // Create a preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Handle image upload
  const handleUpload = () => {
    if (!newImageFile) {
      toast.error('Please select an image to upload');
      return;
    }
    
    if (!newImageAlt.trim()) {
      toast.error('Please provide alt text for the image');
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload API call
    setTimeout(() => {
      // Add new image to gallery
      const newImage: GalleryImage = {
        id: Date.now(), // Use timestamp as a simple ID
        src: previewUrl as string, // In a real app, this would be the URL from the server
        alt: newImageAlt
      };
      
      setGalleryImages([newImage, ...galleryImages]);
      
      // Reset form
      setNewImageFile(null);
      setNewImageAlt('');
      setPreviewUrl(null);
      setIsUploading(false);
      
      toast.success('Image uploaded successfully!');
    }, 1500);
  };

  // Handle image deletion
  const handleDeleteImage = (id: number) => {
    setGalleryImages(galleryImages.filter(img => img.id !== id));
    toast.success('Image deleted successfully!');
  };

  return (
    <div className="min-h-screen bg-cyber-light-gray py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-soft p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <Link to="/admin" className="flex items-center text-cyber-blue hover:underline mb-2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-cyber-dark-blue">
                  Gallery Management
                </h1>
                <p className="text-gray-600 mt-2">
                  Upload, manage, and organize images for the website gallery.
                </p>
              </div>
            </div>
            
            {/* Upload New Image */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-cyber-dark-blue mb-4 flex items-center">
                <Upload className="mr-2 h-5 w-5" />
                Upload New Image
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="image-file" className="mb-2 block">
                      Select Image <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="image-file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Accepted formats: JPG, PNG, WEBP. Max size: 2MB
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="image-alt" className="mb-2 block">
                      Alt Text <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="image-alt"
                      placeholder="Descriptive text for the image"
                      value={newImageAlt}
                      onChange={(e) => setNewImageAlt(e.target.value)}
                      disabled={isUploading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Provide descriptive text for accessibility purposes
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleUpload} 
                    disabled={isUploading || !newImageFile || !newImageAlt.trim()}
                  >
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-center bg-white rounded-lg border border-dashed border-gray-200 p-4 h-64">
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-full max-w-full object-contain rounded"
                    />
                  ) : (
                    <div className="text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-300" />
                      <p className="mt-2 text-sm text-gray-500">
                        Image preview will appear here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Gallery Images Grid */}
            <h2 className="text-xl font-semibold text-cyber-dark-blue mb-4">
              Current Gallery Images ({galleryImages.length})
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryImages.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white font-medium truncate mb-2">{image.alt}</p>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminGallery;
