'use client'

import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, List, School, ChevronDown, Users, Award, Edit, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import LoadingPage from '../components/LoadingPage';

// Placeholder for Button component
const Button = ({ children, ...props }) => (
  <button {...props} className={`px-4 py-2 rounded ${props.className}`}>
    {children}
  </button>
);

// Placeholder for Card component
const Card = ({ children, ...props }) => (
  <div {...props} className={`bg-white rounded-lg shadow-md ${props.className}`}>
    {children}
  </div>
);

export default function Profile() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const servicesRef = useRef(null);
  const whyChooseUsRef = useRef(null);
  const faqRef = useRef(null);

  const toggleFaq = (index) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  useEffect(() => {
    const fetchUserData = async () => {
      const authUnsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const userDoc = doc(db, 'Users', currentUser.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            setUser(docSnap.data());
          }
        }
        setLoading(false);
      });

      return () => authUnsubscribe();
    };

    fetchUserData();
  }, []);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };
   
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-gray-900 text-white py-4 sticky top-0 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-400">EduCounsel</h1>
          <nav className="hidden md:flex space-x-6">
            <Button variant="ghost" onClick={() => scrollToSection(servicesRef)} className="text-white hover:text-amber-400 transition-colors">Services</Button>
            <Button variant="ghost" onClick={() => scrollToSection(whyChooseUsRef)} className="text-white hover:text-amber-400 transition-colors">Why Choose Us</Button>
            <Button variant="ghost" onClick={() => scrollToSection(faqRef)} className="text-white hover:text-amber-400 transition-colors">FAQ</Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl font-extrabold mb-6 leading-tight">
              Welcome to Your Profile, <span className="text-amber-400">{user ? user.name : 'User'}</span>
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Manage your account and access personalized features tailored to your educational journey.
            </p>
          </div>
        </section>

        <section ref={servicesRef} id="services" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Choice List",
                  description: "Create and manage your personalized list of preferred colleges and courses.",
                  icon: <List className="h-12 w-12 text-indigo-600 mb-4" />,
                  link: "/choice-list"
                },
                {
                  title: "College Explorer",
                  description: "Discover and compare colleges and programs tailored to your interests and goals.",
                  icon: <School className="h-12 w-12 text-indigo-600 mb-4" />,
                  link: "/available-colleges"
                },
                {
                  title: "Career Assessment",
                  description: "Uncover your ideal career path with our comprehensive interactive assessment.",
                  icon: <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />,
                  link: "/take-quiz"
                }
              ].map((service, index) => (
                <Card key={index} className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-200">
                  <div className="p-6">
                    {service.icon}
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">{service.title}</h3>
                    <p className="text-slate-600 mb-6">{service.description}</p>
                    <Link
                      to={service.link}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300 inline-flex items-center"
                    >
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section ref={whyChooseUsRef} id="why-choose-us" className="py-24 bg-slate-100">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Card>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Expert Guidance</h3>
                  <p className="text-slate-600">
                    Our team of experienced counselors provides personalized advice to help you make informed decisions about your educational journey. With years of experience in college admissions and career development, we offer insights that can significantly impact your future.
                  </p>
                </div>
              </Card>
              <Card>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Comprehensive Resources</h3>
                  <p className="text-slate-600">
                    Access a wide range of tools and information to explore colleges, careers, and scholarships all in one place. Our platform integrates the latest data and trends in education and employment, ensuring you have the most up-to-date information at your fingertips.
                  </p>
                </div>
              </Card>
              <Card>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Personalized Approach</h3>
                  <p className="text-slate-600">
                    We understand that every student's journey is unique. Our services are tailored to your individual needs, goals, and circumstances. From customized college lists to personalized career advice, we're committed to helping you achieve your full potential.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section ref={faqRef} id="faq" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto"> {/* Increased width */}
              {[
                {
                  question: "How can I update my profile information?",
                  answer: "You can update your profile information by navigating to the Edit Profile section in your dashboard. Here, you'll be able to modify your personal details, academic information, and preferences. It's important to keep your profile up-to-date to ensure you receive the most relevant recommendations and advice. Remember to review and update your information regularly, especially after significant academic achievements or changes in your educational goals."
                },
                {
                  question: "What types of career assessments do you offer?",
                  answer: "We offer a comprehensive range of career assessments designed to help you understand yourself better and make informed decisions about your future. These include: 1) Personality Tests: Based on psychological theories, these assessments help you understand your traits, preferences, and how they align with various career paths. 2) Skills Evaluations: These assessments measure your proficiency in various areas, helping you identify your strengths and areas for improvement. 3) Interest Inventories: These tools help you explore careers that align with your passions and interests. 4) Work Values Assessments: These evaluate what's most important to you in a job, such as work-life balance, creativity, or leadership opportunities. Our career counselors can help you interpret the results and use them to guide your educational and career planning."
                },
                {
                  question: "How often is the college information updated?",
                  answer: "We are committed to providing the most accurate and up-to-date information about colleges and universities. Our college database undergoes regular updates to ensure you have access to the latest information. Here's our update schedule: 1) General Information: We perform a comprehensive review and update of all college profiles annually. This includes information about programs offered, campus facilities, and overall college characteristics. 2) Admission Statistics: These are updated as soon as new data is released by the institutions, typically once a year after the admission cycle concludes. 3) Application Deadlines and Requirements: We update these as soon as colleges announce any changes, which can happen at any time during the year. 4) Financial Aid and Scholarship Information: This is reviewed and updated multiple times a year to reflect the most current opportunities. We also have a dedicated team that monitors college websites and official announcements to implement any immediate changes. If you notice any discrepancies or have received more recent information, we encourage you to let us know so we can verify and update our database promptly."
                },
                {
                  question: "Can I get personalized college recommendations?",
                  answer: "Yes, absolutely! Our platform offers highly personalized college recommendations based on your unique profile, academic performance, and preferences. Here's how it works: 1) Profile Analysis: We consider factors such as your GPA, standardized test scores, extracurricular activities, and academic interests. 2) Preference Matching: Your stated preferences for factors like location, campus size, available majors, and campus culture are taken into account. 3) Career Goals: We align recommendations with your long-term career aspirations. 4) Financial Considerations: We factor in your financial needs and the availability of financial aid at different institutions. 5) Admissions Likelihood: We provide a mix of 'reach,' 'match,' and 'safety' schools based on your academic profile. As you interact more with our platform and update your information, our recommendation engine becomes even more refined. You can expect your college suggestions to evolve as you progress through your high school years and your profile changes. Remember, while our recommendations are data-driven and personalized, it's always beneficial to discuss these suggestions with your school counselor or one of our expert advisors to ensure they align with your overall educational strategy."
                }
              ].map((faq, index) => (
                <Card key={index} className="mb-8"> {/* Increased vertical margin */}
                  <div className="p-0">
                    <Button
                      variant="ghost"
                      onClick={() => toggleFaq(index)}
                      className="w-full justify-between p-6 font-semibold text-gray-900 hover:text-amber-400 flex items-center text-xl" // Increased text size
                    >
                      {faq.question}
                      <ChevronDown
                        className={`transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}
                      />
                    </Button>
                    {openFaqIndex === index && (
                      <div className="p-8 text-slate-600 text-lg leading-relaxed"> {/* Increased padding, text size, and line height */}
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 EduCounsel. All rights reserved.</p>
          <Link to="/privacy-policy" className="text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}