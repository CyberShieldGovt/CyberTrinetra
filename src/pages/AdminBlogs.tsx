
import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Plus, FileText, Check, X, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Sample blog data (same as in Blogs.tsx but with additional fields)
const initialBlogPosts = [
  {
    id: '1',
    title: 'How to Protect Yourself from Phishing Attacks',
    excerpt: 'Learn the common signs of phishing attempts and strategies to keep your personal information safe from cybercriminals.',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'June 15, 2023',
    author: 'Cyber Expert',
    content: '<p>Full blog content here...</p>',
    published: true
  },
  {
    id: '2',
    title: 'Understanding Ransomware: Prevention and Recovery',
    excerpt: 'A comprehensive guide to ransomware attacks, how they work, and what steps you can take to protect your data and recover from an attack.',
    coverImage: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'May 22, 2023',
    author: 'Security Analyst',
    content: '<p>Full blog content here...</p>',
    published: true
  },
  {
    id: '3',
    title: 'The Rise of Financial Frauds: What You Need to Know',
    excerpt: 'Explore the increasing trends in financial cybercrimes and learn how to identify and avoid becoming a victim of these sophisticated scams.',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'April 10, 2023',
    author: 'Financial Security Expert',
    content: '<p>Full blog content here...</p>',
    published: true
  },
  {
    id: '4',
    title: 'Protecting Children Online: A Parent\'s Guide',
    excerpt: 'Essential tips and tools for parents to help safeguard their children from online predators, cyberbullying, and inappropriate content.',
    coverImage: 'https://images.unsplash.com/photo-1534437829740-62aafbb33587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'March 05, 2023',
    author: 'Child Safety Advocate',
    content: '<p>Full blog content here...</p>',
    published: true
  },
  {
    id: '5',
    title: 'The Importance of Two-Factor Authentication',
    excerpt: 'Why adding an extra layer of security with two-factor authentication is crucial in today\'s digital landscape and how to set it up on your accounts.',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'February 18, 2023',
    author: 'Cybersecurity Specialist',
    content: '<p>Full blog content here...</p>',
    published: true
  },
  {
    id: '6',
    title: 'Latest Cybersecurity Threats in 2023',
    excerpt: 'A draft overview of emerging cybersecurity threats and attack vectors that organizations and individuals should be aware of.',
    coverImage: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'July 10, 2023',
    author: 'Admin',
    content: '<p>This is a draft blog post about emerging threats...</p>',
    published: false
  }
];

type BlogPost = typeof initialBlogPosts[0];

const AdminBlogs = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    coverImage: '',
    author: '',
    content: '',
    published: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }

  // Format date string
  const formatDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Handle edit post
  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditing(true);
  };

  // Handle update post
  const handleUpdatePost = () => {
    if (!editingPost) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update post in state
      const updatedPosts = blogPosts.map(post => 
        post.id === editingPost.id ? editingPost : post
      );
      
      setBlogPosts(updatedPosts);
      setIsEditing(false);
      setEditingPost(null);
      setIsSubmitting(false);
      
      toast.success('Blog post updated successfully!');
    }, 1000);
  };

  // Handle create post
  const handleCreatePost = () => {
    if (!newPost.title || !newPost.excerpt || !newPost.content) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create new post
      const createdPost: BlogPost = {
        id: Date.now().toString(),
        title: newPost.title,
        excerpt: newPost.excerpt,
        coverImage: newPost.coverImage || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        date: formatDate(),
        author: newPost.author || 'Admin',
        content: newPost.content,
        published: newPost.published || false
      };
      
      setBlogPosts([createdPost, ...blogPosts]);
      setIsCreating(false);
      setNewPost({
        title: '',
        excerpt: '',
        coverImage: '',
        author: '',
        content: '',
        published: false
      });
      setIsSubmitting(false);
      
      toast.success('Blog post created successfully!');
    }, 1000);
  };

  // Handle delete post
  const handleDeletePost = (id: string) => {
    // Simulate API call
    setTimeout(() => {
      setBlogPosts(blogPosts.filter(post => post.id !== id));
      toast.success('Blog post deleted successfully!');
    }, 500);
  };

  // Handle toggle publish
  const handleTogglePublish = (id: string, currentState: boolean) => {
    const updatedPosts = blogPosts.map(post => 
      post.id === id ? { ...post, published: !currentState } : post
    );
    
    setBlogPosts(updatedPosts);
    toast.success(`Blog post ${currentState ? 'unpublished' : 'published'} successfully!`);
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
                  Blog Management
                </h1>
                <p className="text-gray-600 mt-2">
                  Create, edit, and manage blog posts for the CyberShield website.
                </p>
              </div>
              
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Blog Post
              </Button>
            </div>
            
            {/* Blog Posts Table */}
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPosts.length > 0 ? (
                    blogPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleTogglePublish(post.id, post.published)}
                            >
                              {post.published ? (
                                <X className="h-4 w-4" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditPost(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex flex-col items-center">
                          <FileText className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-gray-500">No blog posts found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Edit Post Dialog */}
      <Dialog open={isEditing} onOpenChange={(open) => !open && setIsEditing(false)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Make changes to the blog post and save when done.
            </DialogDescription>
          </DialogHeader>
          
          {editingPost && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-author">Author</Label>
                  <Input
                    id="edit-author"
                    value={editingPost.author}
                    onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-excerpt">Excerpt</Label>
                <Textarea
                  id="edit-excerpt"
                  rows={3}
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-cover-image">Cover Image URL</Label>
                <Input
                  id="edit-cover-image"
                  value={editingPost.coverImage}
                  onChange={(e) => setEditingPost({ ...editingPost, coverImage: e.target.value })}
                />
                <div className="mt-2 h-40 overflow-hidden rounded-md">
                  <img 
                    src={editingPost.coverImage} 
                    alt="Blog cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-content">Content (HTML)</Label>
                <Textarea
                  id="edit-content"
                  rows={10}
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="edit-published" 
                  checked={editingPost.published}
                  onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-cyber-blue focus:ring-cyber-blue"
                />
                <Label htmlFor="edit-published" className="cursor-pointer">Published</Label>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePost} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Create Post Dialog */}
      <Dialog open={isCreating} onOpenChange={(open) => !open && setIsCreating(false)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
            <DialogDescription>
              Fill in the details for the new blog post.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="new-title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="new-title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Enter blog title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-author">Author</Label>
                <Input
                  id="new-author"
                  value={newPost.author}
                  onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                  placeholder="Your name or username"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-excerpt">
                Excerpt <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="new-excerpt"
                rows={3}
                value={newPost.excerpt}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                placeholder="Brief summary of the blog post"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-cover-image">Cover Image URL</Label>
              <Input
                id="new-cover-image"
                value={newPost.coverImage}
                onChange={(e) => setNewPost({ ...newPost, coverImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
              {newPost.coverImage && (
                <div className="mt-2 h-40 overflow-hidden rounded-md">
                  <img 
                    src={newPost.coverImage} 
                    alt="Blog cover preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-content">
                Content (HTML) <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="new-content"
                rows={10}
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="<p>Your blog content here...</p>"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="new-published" 
                checked={newPost.published}
                onChange={(e) => setNewPost({ ...newPost, published: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-cyber-blue focus:ring-cyber-blue"
              />
              <Label htmlFor="new-published" className="cursor-pointer">Publish immediately</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePost} disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlogs;
