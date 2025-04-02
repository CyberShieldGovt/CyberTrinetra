
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';

const Support = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!subject.trim()) newErrors.subject = 'Subject is required';
    if (!message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        toast.success('Your message has been sent successfully!');
        
        // Reset form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setIsSubmitting(false);
      }, 1500);
    }
  };

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
              Support & Contact
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Need help with your case or have questions about our services? Our support team is here to assist you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
              <h2 className="text-2xl font-bold text-cyber-dark-blue mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-cyber-blue" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-cyber-dark-blue">Helpline</h3>
                    <p className="text-gray-600">+91 9876543210</p>
                    <p className="text-sm text-gray-500">Monday-Friday, 9AM-6PM IST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-cyber-blue" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-cyber-dark-blue">Email</h3>
                    <p className="text-gray-600">support@cybertrinetra.com</p>
                    <p className="text-sm text-gray-500">We respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-cyber-blue" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-cyber-dark-blue">Address</h3>
                    <p className="text-gray-600">
                      K R Puram, Bengalore<br />
                      India-560036
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-cyber-blue" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-cyber-dark-blue">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday-Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-cyber-navy rounded-lg text-white">
                <h3 className="text-lg font-semibold mb-2">Emergency Cyber Support</h3>
                <p className="mb-4">
                  For urgent cyber incidents requiring immediate assistance:
                </p>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>Emergency Hotline: +91 9876543211</span>
                </div>
                <p className="text-sm mt-2 text-gray-300">
                  Available 24/7 for critical cyber emergencies only
                </p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
              <h2 className="text-2xl font-bold text-cyber-dark-blue mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Your Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Your Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Subject <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Enter the subject of your message"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={errors.subject ? 'border-red-500' : ''}
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={errors.message ? 'border-red-500' : ''}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-cyber-dark-blue mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: 'How long does it take to process a cybercrime complaint?',
                  answer: 'Processing times vary depending on the complexity of the case. Simple cases may be resolved within 2-3 Days, while more complex cases involving financial fraud or multiple parties may take 6-8 Days.'
                },
                {
                  question: 'Is my personal information secure when I submit a case?',
                  answer: 'Yes, we prioritize the security and confidentiality of your information. All data is encrypted, and access is strictly limited to authorized personnel handling your case.'
                },
                {
                  question: 'What should I do if I\'ve already paid money to a scammer?',
                  answer: 'Contact your bank immediately to try to stop the transaction. Report the incident to us and to the cyber crime division of your local police. Provide all relevant details including transaction information.'
                },
                {
                  question: 'Can I report a cybercrime on behalf of someone else?',
                  answer: 'Yes, you can report on behalf of family members, especially minors or elderly individuals. You\'ll need to provide your relationship details and may need authorization documents for some cases.'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-soft p-6"
                >
                  <h3 className="text-lg font-semibold text-cyber-dark-blue mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;
