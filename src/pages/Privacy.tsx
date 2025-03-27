
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cyber-light-gray py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-cyber-dark-blue mb-6">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>Last Updated: May 15, 2023</p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">Introduction</h2>
              <p>
                CyberTrinetra ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by CyberTrinetra when you use our website, mobile application, and services (collectively, the "Services").
              </p>
              <p>
                By accessing or using our Services, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">Information We Collect</h2>
              <p>We collect information from you when you voluntarily provide it to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, postal address, and other identifiers you provide when registering for our Services or filing a cybercrime report.</li>
                <li><strong>Case Information:</strong> Details about cybercrime incidents you report, including dates, descriptions, financial information related to the crime, and any supporting documents you upload.</li>
                <li><strong>Communication Information:</strong> Content of emails, chat messages, or other communications you have with us.</li>
                <li><strong>Technical Information:</strong> IP address, browser type, device identifiers, and other technical information when you use our Services.</li>
              </ul>
              
              <h2 className="text-xl font-bold mt-8 mb-4">How We Use Your Information</h2>
              <p>We use your information for various purposes, including to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our Services</li>
                <li>Process and manage your cybercrime reports</li>
                <li>Communicate with you about your cases, updates to our Services, and respond to your inquiries</li>
                <li>Protect against, identify, and prevent fraud and other criminal activity</li>
                <li>Comply with legal obligations</li>
                <li>Create aggregated, anonymized data for analytical purposes</li>
              </ul>
              
              <h2 className="text-xl font-bold mt-8 mb-4">Disclosure of Your Information</h2>
              <p>We may share your information in the following situations:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>With Law Enforcement:</strong> When necessary to process your cybercrime reports or if required by applicable law.</li>
                <li><strong>Service Providers:</strong> With third-party vendors who provide services on our behalf, such as IT and hosting providers.</li>
                <li><strong>Legal Requirements:</strong> If required to do so by law or in response to valid requests by public authorities.</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of all or a portion of our assets.</li>
              </ul>
              <p>
                We will never sell your personal information to third parties for marketing purposes.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no security measures are perfect or impenetrable, and we cannot guarantee the absolute security of your data.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to delete your information (subject to certain exceptions)</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                CyberTrinetra<br />
                Pooja Arcade, 2nd Floor<br />
                Kammanahalli, Kalyan Nagar<br />
                Bengaluru, Karnataka<br />
                India<br />
                Email: support@cybertrinetri.com
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
