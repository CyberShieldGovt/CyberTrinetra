import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarDays, User, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import ShareButton from '@/components/ShareButton';

const blogPosts = [
  {
    id: '1',
    title: 'How to Protect Yourself from Phishing Attacks',
    excerpt: 'Learn the common signs of phishing attempts and strategies to keep your personal information safe from cybercriminals.',
    coverImage: '/pishing.jpg',
    date: 'March 15, 2025',
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
    title: 'Digital Arrest Scam',
    excerpt: 'Scammers impersonate law enforcement officials, using deepfake videos and fake arrest warrants to extort money from victims.',
    coverImage: '/Digital-Arrest-blog-image.jpg',
    date: 'March 22, 2025',
    author: 'Cyber Security Expert',
    readTime: '6 min read',
    content: `
      <p class= "mb-4">Imagine receiving a WhatsApp message from an unknown number claiming to be a law enforcement officer. The message contains a court warrant and legal notice, saying you are accused of a crime. Then, you receive a video call where the scammer, often in a police uniform, demands money to "settle" the case. </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">How It Works</h2>
       <ul class="list-disc list-inside mb-4 space-y-2">
         <li>The scammer sends a fake warrant via WhatsApp, email, or SMS.</li>
         <li>Uses deepfake technology or wears a police uniform to appear legitimate.</li>
         <li>Pressures the victim with threats of immediate arrest and legal action.</li>
         <li>Demands an urgent online transfer, cryptocurrency payment, or gift cards to "resolve" the case.</li>
         <li>Often impersonates real police officials to increase credibility.</li>
       </ul>

       <h2 class="text-2xl font-bold mt-8 mb-4">How to Stay Safe</h2>
       <ul class="list-disc list-inside mb-4 space-y-2">
         <li>No legal authority will ever demand payments via WhatsApp, phone calls, or video chats.</li>
         <li>If you receive a legal notice, verify directly with your local police station.</li>
         <li>Never share personal or banking details with unknown contacts.</li>
         <li>Check the official website of the police department for contact details before responding.</li>
         <li>If you suspect a scam, report it to cybercrime authorities immediately.</li>
       </ul>
        <p class="mb-4">Scammers use fear and urgency to manipulate victims. Always verify any legal claims directly with official sources. If something feels off, trust your instincts and seek professional advice before taking action.</p>
        `
  },
  {
id: '3',
title: 'Job Scam: Fake Government & IT Job Offers',
excerpt: 'Scammers exploit job seekers with fake job offers, demanding money for application fees and vanishing after payment.',
coverImage: '/jobs.jpg',
date: 'March 10, 2025',
author: 'Cyber Security Expert',
readTime: '5 min read',
content: `
      <p class="mb-4">With the rise in unemployment, scammers are targeting job seekers with fake government or IT job offers, promising high salaries and secure employment. The only catch? You need to pay an "application fee."</p>
<h2 class="text-2xl font-bold mt-8 mb-4">How It Works</h2>
  <ul class="list-disc list-inside mb-4 space-y-2">
    <li>Scammers post fake job listings on social media, job portals, and even official-looking websites.</li>
    <li>They conduct fake interviews via phone, email, or video calls.</li>
    <li>They send fraudulent offer letters on forged company letterheads.</li>
    <li>They demand money for processing fees, training, security deposits, or background checks.</li>
    <li>Once the payment is made, they disappear or block the victim.</li>
  </ul>

  <h2 class="text-2xl font-bold mt-8 mb-4">How to Stay Safe</h2>
  <ul class="list-disc list-inside mb-4 space-y-2">
    <li>Verify job postings on official company or government portals before applying.</li>
    <li>Legitimate companies never ask for money upfront for job applications.</li>
    <li>Check the recruiter’s email address—genuine companies use official domains, not free email services.</li>
    <li>If a job sounds too good to be true, it probably is.</li>
    <li>Report fraudulent job postings to relevant authorities.</li>
  </ul>
   <p class="mb-4">Always research a job offer before committing to any payment. Real job opportunities do not require advance fees. If you suspect fraud, report the scam to protect others.</p>
`
  },
  {
    id: '4',
    title: 'Protecting Children Online: A Parent\'s Guide',
    excerpt: 'Essential tips and tools for parents to help safeguard their children from online predators, cyberbullying, and inappropriate content.',
    coverImage: '/kids-safety-online.png',
    date: 'March 05, 2025',
    author: 'Security Analyst',
    readTime: '9 min read',
    content: `
      <p class="mb-4">The digital world offers children incredible opportunities for learning, entertainment, and socialization. However, it also presents significant risks, from exposure to inappropriate content to potential interactions with online predators. As parents, navigating this landscape can feel overwhelming, but with the right approach, you can help your children enjoy the benefits of technology while staying safe online.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Understanding the Risks</h2>

      <p class="mb-4">Before implementing protective measures, it's important to understand what you're protecting your children from:</p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>Inappropriate content:</strong> Violence, adult content, or extreme viewpoints that aren't age-appropriate</li>
        <li><strong>Cyberbullying:</strong> Harassment, intimidation, or humiliation through digital channels</li>
        <li><strong>Online predators:</strong> Individuals who seek to exploit children through online interactions</li>
        <li><strong>Privacy concerns:</strong> Oversharing personal information that could compromise safety</li>
        <li><strong>Excessive screen time:</strong> Potential negative impacts on development, sleep, and physical activity</li>
        <li><strong>Digital footprint:</strong> Long-term consequences of online actions and posts</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Age-Appropriate Safety Strategies</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">For Young Children (Ages 5-8)</h3>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Use parental controls and kid-friendly browsers</li>
        <li>Choose age-appropriate apps and websites</li>
        <li>Always supervise online activities</li>
        <li>Set strict time limits for device usage</li>
        <li>Introduce basic concepts of online privacy</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">For Preteens (Ages 9-12)</h3>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Gradually introduce more responsibility with continued oversight</li>
        <li>Discuss cyberbullying and appropriate online behavior</li>
        <li>Establish family rules for device usage</li>
        <li>Begin conversations about digital footprints</li>
        <li>Regularly review contacts and communications</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">For Teenagers (Ages 13-17)</h3>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Focus on open communication rather than strict control</li>
        <li>Discuss the permanence of online actions</li>
        <li>Talk about sexting and its potential consequences</li>
        <li>Teach critical thinking about online information</li>
        <li>Prepare them for increasing independence</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Technical Safeguards</h2>

      <p class="mb-4">Several tools can help you create a safer online environment:</p>

      <ol class="list-decimal list-inside mb-4 space-y-2">
        <li><strong>Parental control software:</strong> Programs that filter content, limit screen time, and monitor activity</li>
        <li><strong>Safe search settings:</strong> Features in search engines that filter explicit content</li>
        <li><strong>Privacy settings:</strong> Configuring social media and online accounts for maximum privacy</li>
        <li><strong>YouTube Kids and similar platforms:</strong> Child-specific versions of popular services</li>
        <li><strong>Router-level controls:</strong> Filtering that works across all devices connected to your home network</li>
      </ol>

      <h2 class="text-2xl font-bold mt-8 mb-4">Building Digital Literacy</h2>

      <p class="mb-4">Beyond technical controls, help your children develop the skills to navigate online spaces safely:</p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Teach critical thinking about information sources</li>
        <li>Discuss how to recognize scams and manipulation</li>
        <li>Role-play appropriate responses to concerning situations</li>
        <li>Encourage questions about confusing or uncomfortable content</li>
        <li>Model healthy technology habits yourself</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Creating a Family Media Plan</h2>

      <p class="mb-4">A structured approach to technology can help establish healthy boundaries:</p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Set device-free times and zones (like during meals or in bedrooms)</li>
        <li>Create a family media agreement with clear rules and consequences</li>
        <li>Schedule regular tech breaks and outdoor activities</li>
        <li>Designate charging stations outside of bedrooms</li>
        <li>Hold regular family discussions about online experiences</li>
      </ul>

      <p class="mb-4">Remember that protective measures should evolve as your child matures. The goal is not to isolate children from technology but to gradually prepare them to make wise decisions independently. By combining technical safeguards with ongoing conversations and education, you can help your children develop the skills they need to navigate the digital world safely and responsibly.</p>
    `
  },
  {
    id: '5',
    title: 'The Importance of Two-Factor Authentication',
    excerpt: 'Why adding an extra layer of security with two-factor authentication is crucial in today\'s digital landscape and how to set it up on your accounts.',
    coverImage: '/RD-Two-Factor-Authentication-FT.jpg',
    date: 'February 18, 2025',
    author: 'Cybersecurity Specialist',
    readTime: '7 min read',
    content: `
      <p class="mb-4">In an age where data breaches and password theft have become increasingly common, relying solely on passwords for account security is no longer sufficient. Two-factor authentication (2FA) has emerged as an essential security measure that adds a crucial layer of protection to your online accounts.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What is Two-Factor Authentication?</h2>

      <p class="mb-4">Two-factor authentication is a security process that requires users to provide two different verification factors to gain access to an account or system. This typically combines:</p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>Something you know</strong> - like a password or PIN</li>
        <li><strong>Something you have</strong> - like a smartphone or security key</li>
        <li><strong>Something you are</strong> - like a fingerprint or facial recognition</li>
      </ul>

      <p class="mb-4">By requiring two of these factors, 2FA significantly reduces the risk of unauthorized access, even if your password is compromised.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Why Traditional Passwords Aren't Enough</h2>

      <p class="mb-4">Despite best practices for creating strong passwords, they have several inherent vulnerabilities:</p>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>People tend to reuse passwords across multiple accounts</li>
        <li>Complex passwords are difficult to remember, leading to unsafe storage practices</li>
        <li>Data breaches can expose passwords en masse</li>
        <li>Phishing attacks can trick users into revealing their passwords</li>
        <li>Password-cracking software becomes more sophisticated each year</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Common Types of Two-Factor Authentication</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">SMS-Based Authentication</h3>
      <p class="mb-4">A one-time code is sent via text message to your phone. While better than passwords alone, this method has vulnerabilities to SIM swapping attacks.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Authenticator Apps</h3>
      <p class="mb-4">Apps like Google Authenticator, Microsoft Authenticator, or Authy generate time-based codes that refresh every 30 seconds. These are more secure than SMS methods.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Physical Security Keys</h3>
      <p class="mb-4">USB or NFC devices that must be physically present to authenticate. These offer excellent security against remote attacks.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Biometric Authentication</h3>
      <p class="mb-4">Fingerprints, facial recognition, or voice recognition provide a convenient and highly secure authentication factor.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Priority Accounts for 2FA</h2>

      <p class="mb-4">While ideally you should enable 2FA on all accounts, these should be your priorities:</p>

      <ol class="list-decimal list-inside mb-4 space-y-2">
        <li><strong>Email accounts</strong> - These are often the recovery method for other accounts</li>
        <li><strong>Financial services</strong> - Banking, investment, and payment platforms</li>
        <li><strong>Cloud storage</strong> - Where your important documents and data are stored</li>
        <li><strong>Social media</strong> - To prevent impersonation and protect your digital identity</li>
        <li><strong>Work-related accounts</strong> - Especially those with access to sensitive information</li>
      </ol>

      <h2 class="text-2xl font-bold mt-8 mb-4">Setting Up 2FA on Major Platforms</h2>

      <p class="mb-4">Most major online services now offer 2FA options. Here's how to enable it on some popular platforms:</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Google</h3>
      <p class="mb-4">Go to your Google Account > Security > 2-Step Verification, then follow the on-screen instructions.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Microsoft</h3>
      <p class="mb-4">Sign in to your Microsoft account > Security > Advanced security options > Add a new way to sign in or verify.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Apple</h3>
      <p class="mb-4">Go to Settings > [your name] > Password & Security > Turn on Two-Factor Authentication.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Best Practices for 2FA</h2>

      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Use authenticator apps or security keys rather than SMS when possible</li>
        <li>Save backup or recovery codes in a secure location</li>
        <li>Don't use the same phone for both email and authenticator apps if possible</li>
        <li>Consider using a password manager that supports 2FA</li>
        <li>Be aware of account recovery options that might bypass 2FA</li>
      </ul>

      <p class="mb-4">While 2FA may add an extra step to your login process, the significant security benefits far outweigh this minor inconvenience. In a world where data breaches occur daily, implementing 2FA across your important accounts is one of the most effective steps you can take to protect your digital identity and information.</p>
    `
  },
  {
    id: '6',
    title: 'Credit Card Scam: The "Police Will Arrest You" Threat',
    excerpt: 'Fraudsters call or message claiming a large withdrawal was made from your credit card and demand immediate payment to avoid police action.',
    coverImage: '/credit-card-fraud-in-india-717x404.jpg',
    date: 'March 30, 2025',
    author: 'Cyber Security Expert',
    readTime: '5 min read',
    content: `
    <p class="mb-4">In this scam, fraudsters call or message claiming to be from your bank. They say that a large amount has been withdrawn from your credit card and that you need to pay immediately, or else police will come to your home.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">How It Works</h2>
        <ul class="list-disc list-inside mb-4 space-y-2">
          <li>Victims receive a call from a fake bank executive or police officer.</li>
          <li>The scammer falsely claims a huge withdrawal was made from the victim's credit card.</li>
          <li>They threaten legal consequences or police action if payment is not made.</li>
          <li>They demand immediate payment via bank transfer, UPI, or gift cards.</li>
          <li>If victims panic and pay, the scammer vanishes with their money.</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">How to Stay Safe</h2>
        <ul class="list-disc list-inside mb-4 space-y-2">
          <li>Banks never demand immediate payments over phone calls.</li>
          <li>Verify any suspicious transactions through official bank channels or by visiting your bank.</li>
          <li>Never share OTPs, CVV, or card details with anyone over the phone.</li>
          <li>If you receive a suspicious call, hang up and report it to your bank’s fraud department.</li>
          <li>Enable transaction alerts on your credit card to monitor any unauthorized activity.</li>
        </ul>
        <p class="mb-4">Stay calm and never rush into making payments over phone calls. Scammers rely on fear tactics. Always verify claims through your bank’s official customer service before taking action.</p>
    `
  }
];

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<typeof blogPosts[0] | null>(null);
  const [nextPost, setNextPost] = useState<typeof blogPosts[0] | null>(null);
  const [prevPost, setPrevPost] = useState<typeof blogPosts[0] | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id) {
      console.log(`BlogPost page loaded - looking for post with ID: ${id}`);
      console.log("Available blog IDs:", blogPosts.map(post => post.id));

      // Find the current post by ID
      const postIndex = blogPosts.findIndex(post => post.id === id);
      console.log("Found post at index:", postIndex);

      if (postIndex !== -1) {
        const currentPost = blogPosts[postIndex];
        console.log("Found post:", currentPost.title);

        setPost(currentPost);

        // Find next and previous posts
        setPrevPost(postIndex > 0 ? blogPosts[postIndex - 1] : null);
        setNextPost(postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null);
        setLoaded(true);
      } else {
        console.error(`Blog post with ID ${id} not found`);
        toast.error("Blog post not found");
        // Delay navigation slightly to allow toast to show
        setTimeout(() => navigate("/blogs"), 1000);
      }
    } else {
      console.error("No blog ID provided in URL");
      // Delay navigation slightly to allow console logging
      setTimeout(() => navigate("/blogs"), 500);
    }
  }, [id, navigate]);

  // If still loading, show placeholder
  if (!loaded) {
    return (
      <div className="min-h-screen bg-cyber-light-gray py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-soft">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Safety check - if we somehow got here without a post
  if (!post) {
    console.error("No post found after loading");
    navigate("/blogs");
    return null;
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
              <Button
                variant="outline"
                onClick={() => navigate("/blogs")}
                className="inline-flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all blogs
              </Button>
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
              <div className="flex justify-between items-center mb-6">
                <div>
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
                <ShareButton 
                  url={window.location.href} 
                  title={post.title || 'CyberTrinetra Blog Post'}
                />
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
                  <Button
                    variant="outline"
                    className="flex items-center"
                    onClick={() => navigate(`/blogs/${prevPost.id}`)}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Previous Article</div>
                      <div className="text-sm font-medium truncate">{prevPost.title}</div>
                    </div>
                  </Button>
                ) : (
                  <div className="flex-1"></div>
                )}

                {nextPost ? (
                  <Button
                    variant="outline"
                    className="flex items-center justify-end"
                    onClick={() => navigate(`/blogs/${nextPost.id}`)}
                  >
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Next Article</div>
                      <div className="text-sm font-medium truncate">{nextPost.title}</div>
                    </div>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
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
