
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Cancellation = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold text-cyber-dark-blue mb-6">Cancellation Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>Last Updated: May 15, 2023</p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">Case Cancellation</h2>
              <p>
                At CyberTrinetra, we understand that circumstances may arise that require you to cancel a cybercrime case you've submitted. Please review our cancellation policy detailed below:
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">1. Cancellation Request Process</h3>
              <p>
                To cancel a case, you must submit a formal cancellation request through your user dashboard or by contacting our support team. All cancellation requests must include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your case reference number</li>
                <li>Reason for cancellation</li>
                <li>Any relevant details that support your cancellation request</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">2. Cancellation Timeframes</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cases in Initial Assessment Stage:</strong> Cases that have been submitted but not yet assigned to a specialist can be cancelled without any penalty or charge.</li>
                <li><strong>Cases in Progress:</strong> Once your case has been assigned and investigation has begun, cancellation may be subject to partial charges based on the work already performed.</li>
                <li><strong>Completed Cases:</strong> Cases that have been resolved or are in the final resolution stage cannot be cancelled and are subject to full applicable charges.</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">3. Refund Policy</h3>
              <p>
                Women and children-related cases are processed free of charge, so no refunds apply. For other cases:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cases cancelled before assignment:</strong> 100% refund of any advance payments</li>
                <li><strong>Cases cancelled within 24 hours of assignment:</strong> 75% refund of payments made</li>
                <li><strong>Cases cancelled within 72 hours of assignment:</strong> 50% refund of payments made</li>
                <li><strong>Cases cancelled after 72 hours of assignment:</strong> No refund will be issued</li>
              </ul>
              <p>
                All refunds will be processed within 7-10 business days to the original payment method used.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">4. Force Majeure</h3>
              <p>
                In the event that CyberTrinetra is unable to process your case due to circumstances beyond our control (including but not limited to natural disasters, government actions, or technological failures), we reserve the right to cancel your case and issue a full refund of any payments made.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">5. Exceptions</h3>
              <p>
                Cancellation requests may be denied if:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The case involves an ongoing legal process where our involvement is required by law</li>
                <li>There is suspicion that the cancellation request is being made to avoid payment for services already rendered</li>
                <li>The cancellation is requested after the case has been resolved</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">6. Involuntary Cancellations</h3>
              <p>
                CyberTrinetra reserves the right to cancel a case without notice if:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>False or misleading information was provided during case submission</li>
                <li>The case is found to be in violation of our Terms and Conditions</li>
                <li>The case involves illegal activities not disclosed at the time of submission</li>
                <li>The user is unresponsive to multiple communication attempts for required information</li>
              </ul>
              <p>
                In cases of involuntary cancellation, refund eligibility will be determined on a case-by-case basis.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">Contact Information</h2>
              <p>
                If you have any questions about this Cancellation Policy, please contact us at:
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

export default Cancellation;
