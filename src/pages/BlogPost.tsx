
import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CalendarDays, User, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

// Sample blog post data (same as in Blogs.tsx but with full content)
const blogPosts = [
  {
    id: '1',
    title: 'How to Protect Yourself from Phishing Attacks',
    excerpt: 'Learn the common signs of phishing attempts and strategies to keep your personal information safe from cybercriminals.',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'June 15, 2023',
    author: 'Cyber Expert',
    readTime: '8 min read',
    content: `
      <p class="mb-4">Phishing attacks remain one of the most common and effective methods cybercriminals use to steal sensitive information. These attacks typically involve deceptive emails, messages, or websites that appear legitimate but are designed to trick you into revealing personal data or installing malware.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Common Signs of Phishing Attempts</h2>
      
      <p class="mb-4">Being able to identify phishing attempts is crucial to protecting yourself online. Here are some red flags to watch out for:</p>
      
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>Urgent or threatening language:</strong> Messages creating a sense of urgency or threatening negative consequences if immediate action isn't taken.</li>
        <li><strong>Generic greetings:</strong> Instead of addressing you by name, phishing emails often use generic terms like "Dear Customer" or "Account Holder."</li>
        <li><strong>Suspicious sender address:</strong> The email address may look similar to a legitimate company but contain subtle differences or misspellings.</li>
        <li><strong>Requests for sensitive information:</strong> Legitimate organizations rarely request sensitive information via email.</li>
        <li><strong>Grammar and spelling errors:</strong> Professional companies typically proofread their communications carefully.</li>
        <li><strong>Suspicious links or attachments:</strong> Hover over links to see the actual URL before clicking. Be wary of unexpected attachments.</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Effective Strategies for Protection</h2>
      
      <p class="mb-4">Implementing these practices can significantly reduce your risk of falling victim to phishing attacks:</p>
      
      <ol class="list-decimal list-inside mb-4 space-y-2">
        <li><strong>Verify the sender:</strong> Double-check the sender's email address for legitimacy.</li>
        <li><strong>Don't click suspicious links:</strong> Type the website address directly into your browser instead.</li>
        <li><strong>Use multi-factor authentication:</strong> This adds an extra layer of security to your accounts.</li>
        <li><strong>Keep software updated:</strong> Security updates often patch vulnerabilities that phishers exploit.</li>
        <li><strong>Use antivirus and anti-phishing software:</strong> These tools can help detect and block phishing attempts.</li>
        <li><strong>Be skeptical:</strong> If something seems too good to be true or unusually urgent, it's wise to be cautious.</li>
      </ol>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">What to Do If You Suspect a Phishing Attempt</h2>
      
      <p class="mb-4">If you receive a suspicious communication:</p>
      
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Do not respond or click on any links</li>
        <li>Report the message to the organization being impersonated</li>
        <li>Delete the message from your inbox</li>
        <li>If you've already clicked a link or provided information, immediately change passwords for compromised accounts</li>
        <li>Monitor your accounts for suspicious activity</li>
        <li>Consider reporting the incident to relevant authorities</li>
      </ul>
      
      <p class="mb-4">By staying vigilant and following these guidelines, you can significantly reduce your risk of falling victim to phishing attacks and better protect your personal information in the digital world.</p>
    `
  },
  {
    id: '2',
    title: 'Understanding Ransomware: Prevention and Recovery',
    excerpt: 'A comprehensive guide to ransomware attacks, how they work, and what steps you can take to protect your data and recover from an attack.',
    coverImage: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'May 22, 2023',
    author: 'Security Analyst',
    readTime: '12 min read',
    content: `
      <p class="mb-4">Ransomware has emerged as one of the most devastating forms of cyberattacks in recent years. This type of malware encrypts a victim's files, making them inaccessible, and demands a ransom payment for the decryption key. Understanding how ransomware works is the first step in protecting yourself and your organization.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">How Ransomware Attacks Work</h2>
      
      <p class="mb-4">Ransomware typically infiltrates systems through these common methods:</p>
      
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>Phishing emails:</strong> Containing malicious attachments or links.</li>
        <li><strong>Remote Desktop Protocol (RDP) vulnerabilities:</strong> Weak credentials or unpatched systems.</li>
        <li><strong>Software vulnerabilities:</strong> Outdated software with security flaws.</li>
        <li><strong>Drive-by downloads:</strong> Malicious code that downloads automatically when visiting compromised websites.</li>
        <li><strong>Malvertising:</strong> Malicious ads that can deliver ransomware.</li>
      </ul>
      
      <p class="mb-4">Once ransomware enters a system, it begins encrypting files, making them inaccessible to users. The attack often spreads across connected networks, maximizing damage. After encryption, the ransomware displays a ransom note with payment instructions, typically demanding cryptocurrency.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Preventative Measures</h2>
      
      <ol class="list-decimal list-inside mb-4 space-y-2">
        <li><strong>Regular backups:</strong> Maintain frequent, comprehensive backups of important data. Store backups offline or in cloud services disconnected from your main network.</li>
        <li><strong>Software updates:</strong> Keep all software, operating systems, and applications updated with the latest security patches.</li>
        <li><strong>Security awareness training:</strong> Educate all users about recognizing phishing attempts and practicing safe browsing habits.</li>
        <li><strong>Email filtering:</strong> Implement robust email filtering solutions to detect suspicious attachments and links.</li>
        <li><strong>Endpoint protection:</strong> Deploy modern antivirus and anti-malware solutions with specific ransomware protection features.</li>
        <li><strong>Network segmentation:</strong> Divide networks into separate segments to limit the spread of ransomware if a breach occurs.</li>
        <li><strong>Access controls:</strong> Implement the principle of least privilege, giving users only the access they need for their jobs.</li>
      </ol>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Responding to a Ransomware Attack</h2>
      
      <p class="mb-4">If you become a victim of ransomware, follow these steps:</p>
      
      <ol class="list-decimal list-inside mb-4 space-y-2">
        <li><strong>Isolate infected systems:</strong> Disconnect affected devices from networks to prevent the ransomware from spreading.</li>
        <li><strong>Identify the ransomware:</strong> Tools like ID Ransomware can help identify the specific ransomware variant.</li>
        <li><strong>Assess the damage:</strong> Determine which systems and data have been affected.</li>
        <li><strong>Report the incident:</strong> Notify law enforcement and relevant regulatory bodies.</li>
        <li><strong>Evaluate recovery options:</strong> Determine if you can restore from backups or if other recovery options exist.</li>
        <li><strong>Consider professional help:</strong> Engage cybersecurity experts who specialize in ransomware recovery.</li>
      </ol>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">To Pay or Not to Pay?</h2>
      
      <p class="mb-4">Law enforcement agencies and cybersecurity experts generally advise against paying ransoms for several reasons:</p>
      
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Payment doesn't guarantee you'll get your data back</li>
        <li>It funds criminal operations and encourages more attacks</li>
        <li>Organizations that pay may become targets for repeat attacks</li>
      </ul>
      
      <p class="mb-4">However, each situation is unique, and organizations sometimes make the difficult decision to pay when critical systems are affected and no viable recovery options exist.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Building Resilience</h2>
      
      <p class="mb-4">The best defense against ransomware is a comprehensive security approach combined with thorough preparation for potential attacks:</p>
      
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Develop and regularly test an incident response plan</li>
        <li>Conduct regular security assessments and penetration testing</li>
        <li>Consider cyber insurance that covers ransomware incidents</li>
        <li>Maintain up-to-date, tested backup solutions</li>
        <li>Foster a security-conscious culture throughout your organization</li>
      </ul>
      
      <p class="mb-4">By implementing these preventative measures and being prepared to respond effectively, you can significantly reduce the risk of ransomware attacks and minimize their impact if they do occur.</p>
    `
  },
  {
    id: '3',
    title: 'The Rise of Financial Frauds: What You Need to Know',
    excerpt: 'Explore the increasing trends in financial cybercrimes and learn how to identify and avoid becoming a victim of these sophisticated scams.',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'April 10, 2023',
    author: 'Financial Security Expert',
    readTime: '10 min read',
    content: '<p>Blog content goes here...</p>'
  },
  {
    id: '4',
    title: 'Protecting Children Online: A Parent\'s Guide',
    excerpt: 'Essential tips and tools for parents to help safeguard their children from online predators, cyberbullying, and inappropriate content.',
    coverImage: 'https://images.unsplash.com/photo-1534437829740-62aafbb33587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'March 05, 2023',
    author: 'Child Safety Advocate',
    readTime: '9 min read',
    content: '<p>Blog content goes here...</p>'
  },
  {
    id: '5',
    title: 'The Importance of Two-Factor Authentication',
    excerpt: 'Why adding an extra layer of security with two-factor authentication is crucial in today\'s digital landscape and how to set it up on your accounts.',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'February 18, 2023',
    author: 'Cybersecurity Specialist',
    readTime: '7 min read',
    content: '<p>Blog content goes here...</p>'
  },
  {
    id: '6',
    title: 'Identity Theft: Prevention and Recovery',
    excerpt: 'A step-by-step guide on how to protect yourself from identity theft and what actions to take if you suspect your identity has been compromised.',
    coverImage: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: 'January 30, 2023',
    author: 'Identity Protection Expert',
    readTime: '11 min read',
    content: '<p>Blog content goes here...</p>'
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<typeof blogPosts[0] | null>(null);
  const [nextPost, setNextPost] = useState<typeof blogPosts[0] | null>(null);
  const [prevPost, setPrevPost] = useState<typeof blogPosts[0] | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const currentPost = blogPosts.find(post => post.id === id);
      if (currentPost) {
        setPost(currentPost);
        
        // Find next and previous posts
        const currentIndex = blogPosts.findIndex(post => post.id === id);
        setPrevPost(currentIndex > 0 ? blogPosts[currentIndex - 1] : null);
        setNextPost(currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null);
      }
    }
  }, [id]);

  if (!post) {
    return <Navigate to="/blogs" />;
  }

  return (
    <div className="min-h-screen bg-cyber-light-gray py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <div className="mb-8">
              <Link 
                to="/blogs" 
                className="inline-flex items-center text-cyber-blue hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all blogs
              </Link>
            </div>
            
            {/* Featured image */}
            <div className="rounded-xl overflow-hidden mb-8 shadow-md">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
            
            {/* Post header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-cyber-dark-blue mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            
            {/* Post content */}
            <div className="bg-white rounded-xl shadow-soft p-6 md:p-8 mb-12">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
            
            {/* Post navigation */}
            <div className="border-t border-gray-200 pt-8 mb-8">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {prevPost ? (
                  <Link 
                    to={`/blogs/${prevPost.id}`} 
                    className="flex-1"
                  >
                    <Button variant="outline" className="flex items-center w-full">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      <div className="text-left">
                        <div className="text-xs text-gray-500">Previous Article</div>
                        <div className="text-sm font-medium truncate">{prevPost.title}</div>
                      </div>
                    </Button>
                  </Link>
                ) : (
                  <div className="flex-1"></div>
                )}
                
                {nextPost ? (
                  <Link 
                    to={`/blogs/${nextPost.id}`} 
                    className="flex-1"
                  >
                    <Button variant="outline" className="flex items-center justify-end w-full">
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Next Article</div>
                        <div className="text-sm font-medium truncate">{nextPost.title}</div>
                      </div>
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <div className="flex-1"></div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
