import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, List, School, CheckCircle, ChevronDown, Menu, X, ArrowRight, GraduationCap, Users, Award } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleFaq = (index) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-gray-900 text-white py-4 sticky top-0 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-400">EduCounsel</h1>
          <nav className="hidden md:flex space-x-6">
            <button onClick={() => scrollToSection('services')} className="text-white hover:text-amber-400 transition-colors">Services</button>
            <button onClick={() => scrollToSection('why-choose-us')} className="text-white hover:text-amber-400 transition-colors">Why Choose Us</button>
            <button onClick={() => scrollToSection('faq')} className="text-white hover:text-amber-400 transition-colors">FAQ</button>
          </nav>
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          <Link
            to="/login"
            className="hidden md:inline-block bg-amber-400 text-gray-900 hover:bg-amber-300 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300"
          >
            Login
          </Link>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-gray-800 p-4">
            <button onClick={() => { scrollToSection('services'); toggleMenu(); }} className="block w-full text-left py-2 text-white hover:text-amber-400 transition-colors">Services</button>
            <button onClick={() => { scrollToSection('why-choose-us'); toggleMenu(); }} className="block w-full text-left py-2 text-white hover:text-amber-400 transition-colors">Why Choose Us</button>
            <button onClick={() => { scrollToSection('faq'); toggleMenu(); }} className="block w-full text-left py-2 text-white hover:text-amber-400 transition-colors">FAQ</button>
            <Link
              to="/login"
              className="block w-full text-center mt-4 bg-amber-400 text-gray-900 hover:bg-amber-300 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300"
            >
              Login
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl font-extrabold mb-6 leading-tight">
              Your Gateway to <span className="text-amber-400">Educational Excellence</span>
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Discover your perfect educational path with our comprehensive resources and expert guidance.
            </p>
            <Link
              to="/signup"
              className="bg-amber-400 text-gray-900 hover:bg-amber-300 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        <section id="services" className="py-24 bg-white">
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
                  link: "/login"
                },
                {
                  title: "College Explorer",
                  description: "Discover and compare colleges and programs tailored to your interests and goals.",
                  icon: <School className="h-12 w-12 text-indigo-600 mb-4" />,
                  link: "/login"
                },
                {
                  title: "Career Assessment",
                  description: "Uncover your ideal career path with our comprehensive interactive assessment.",
                  icon: <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />,
                  link: "/login"
                }
              ].map((service, index) => (
                <div key={index} className="bg-slate-50 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-200">
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
              ))}
            </div>
          </div>
        </section>

        <section id="why-choose-us" className="py-24 bg-slate-100">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">
      Why Choose EduCounsel
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {[
        {
          title: "Expert Guidance",
          description: "Our team of experienced counselors provides personalized advice to help you make informed decisions.",
          icon: <GraduationCap className="h-12 w-12 text-indigo-600 mb-4" />,
        },
        {
          title: "Comprehensive Resources",
          description: "Access a wealth of information on colleges, courses, and career paths all in one place.",
          icon: <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />,
        },
        {
          title: "Tailored Support",
          description: "Receive customized support that adapts to your unique needs and goals, ensuring a personalized experience.",
          icon: <CheckCircle className="h-12 w-12 text-indigo-600 mb-4" />,
        }
      ].map((feature, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-8">
          {feature.icon}
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
          <p className="text-slate-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

        <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-24">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-xl shadow-2xl p-12 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Join Us Today</h2>
              <p className="text-lg mb-8 text-slate-600">
                Embark on your journey to educational success with EduCounsel.
                Our expert guidance is just a click away!
              </p>
              <Link
                to="/signup"
                className="bg-amber-400 text-gray-900 hover:bg-amber-300 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center"
              >
                <span>Get Started Now</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              {[
                {
                  question: "What services does EduCounsel provide?",
                  answer: "EduCounsel offers a range of services including personalized choice lists, college exploration, and career assessments."
                },
                {
                  question: "How do I get started with EduCounsel?",
                  answer: "You can get started by signing up on our website and exploring our various services tailored to your educational needs."
                },
                {
                  question: "Can I contact EduCounsel for personalized advice?",
                  answer: "Yes, you can reach out to our expert counselors through our contact page for personalized advice and support."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-xl shadow-md mb-6">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-6 flex justify-between items-center font-semibold text-gray-900 hover:text-amber-400 transition-colors"
                  >
                    {faq.question}
                    <ChevronDown
                      className={`transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaqIndex === index && (
                    <div className="p-6 text-slate-600">{faq.answer}</div>
                  )}
                </div>
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
