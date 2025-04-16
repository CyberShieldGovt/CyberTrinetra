import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  const faqs = [
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
  ];

  return (
    <div className="min-h-screen bg-cyber-light-gray py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-cyber-dark-blue mb-6">
              Support & Contact
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Need help with your case or have questions about our services? Our support team is here to assist you.
            </p>
          </div>

          {/* Contact Information - Horizontal Alignment */}
          <div className="max-w-3xl mx-auto mb-20">
            <div className="bg-white rounded-xl shadow-soft p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-cyber-dark-blue mb-10 text-center">
                Get in Touch
              </h2>

              <div className="space-y-8">
                {/* Email - Horizontal */}
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-cyber-blue" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-cyber-dark-blue">Email</h3>
                    <p className="text-gray-600">support@cybertrinetra.com</p>
                    <p className="text-sm text-gray-500">We respond within 24 hours</p>
                  </div>
                </div>

                {/* Address - Horizontal */}
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-cyber-blue" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-cyber-dark-blue">Address</h3>
                    <p className="text-gray-600">
                      K R Puram, Bengalore<br />
                      India-560036
                    </p>
                  </div>
                </div>

                {/* Business Hours - Horizontal */}
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-cyber-blue" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-cyber-dark-blue">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday-Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section with Expandable FAQs */}
          <div className="mt-16">
            <h2 className="text-2xl md:text-4xl font-bold text-cyber-dark-blue mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-soft mb-4 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-6 flex items-center justify-between focus:outline-none"
                  >
                    <h3 className="text-xl font-semibold text-cyber-dark-blue">
                      {faq.question}
                    </h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-6 w-6 text-cyber-blue flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-cyber-blue flex-shrink-0" />
                    )}
                  </button>

                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-gray-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
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
