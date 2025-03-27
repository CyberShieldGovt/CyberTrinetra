
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold text-cyber-dark-blue mb-6">Terms and Conditions</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>Last Updated: May 15, 2023</p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">1. Introduction</h2>
              <p>
                Welcome to CyberTrinetra. By accessing our website, mobile application, or using our services (collectively, the "Services"), you agree to be bound by these Terms and Conditions (these "Terms"). If you do not agree to these Terms, you should not use our Services.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">2. Definitions</h2>
              <p>"CyberTrinetra," "we," "us," or "our" refers to the CyberTrinetra platform and its operators.</p>
              <p>"User," "you," or "your" refers to individuals who access or use the Services.</p>
              <p>"Content" refers to any information, data, text, images, videos, audio files, or other materials that are uploaded, submitted, or displayed on the Services.</p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">3. Services Description</h2>
              <p>
                CyberTrinetra provides a platform for users to report cybercrime incidents, track case progress, verify suspicious communications through our Fact Checker tool, and access educational resources about cybersecurity.
              </p>
              <p>
                We do not guarantee the resolution of all reported cybercrimes or the recovery of lost assets. Our role is to facilitate the reporting process and provide guidance and support.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">4. User Accounts</h2>
              <p>
                To access certain features of our Services, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p>
                You are responsible for safeguarding your account credentials and for any activities or actions under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">5. User Responsibilities</h2>
              <p>By using our Services, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide truthful and accurate information when reporting cybercrimes</li>
                <li>Not use our Services for any illegal, fraudulent, or unauthorized purpose</li>
                <li>Not interfere with or disrupt the integrity or performance of our Services</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not harass, threaten, or intimidate any other users of our Services</li>
              </ul>
              
              <h2 className="text-xl font-bold mt-8 mb-4">6. Payment Terms</h2>
              <p>
                Certain services offered by CyberTrinetra may require payment. Women and children-related cases are processed free of charge, but voluntary donations are accepted. All other cases may be subject to service charges upon resolution.
              </p>
              <p>
                By agreeing to these Terms, you acknowledge and agree to our payment structure and commit to making any required payments for services rendered.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">7. Intellectual Property</h2>
              <p>
                The Services and their original content, features, and functionality are owned by CyberTrinetra and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not copy, modify, create derivative works, publicly display, publicly perform, republish, download, or distribute any portion of our Services without our express written consent.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, CyberTrinetra shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">9. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless CyberTrinetra and its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) that arise from or relate to your use of our Services or violation of these Terms.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">10. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of the Services after such modifications will constitute your acknowledgment of the modified Terms and agreement to be bound by them.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">12. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
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

export default Terms;
