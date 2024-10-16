import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BarChart2, Target, Zap, LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactElement<LucideIcon>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300">
    <div className="text-purple-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-purple-950 to-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen w-full text-center px-4 space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold max-w-[62rem] animate-fade-in-down">
          Create Your Own{" "}
          <span className="text-purple-400">DashBoard</span> And Get Into{" "}
          <span className="text-purple-400">Beast Mode</span> With Your Goals
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl animate-fade-in-up">
          Track, analyze, and conquer your goals with our powerful dashboard. Unleash your potential today!
        </p>
        <Link href="/dashboard">
          <Button variant="outline" className="rounded-full px-8 py-4 text-lg font-semibold hover:bg-purple-700 hover:text-white transition-colors duration-300 animate-pulse">
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Powerful Features to Boost Your Productivity</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard 
            icon={<BarChart2 size={40} />}
            title="Advanced Analytics"
            description="Gain insights with our powerful analytics tools. Visualize your progress and identify areas for improvement."
          />
          <FeatureCard 
            icon={<Target size={40} />}
            title="Goal Tracking"
            description="Set, track, and achieve your goals with ease. Our intuitive interface keeps you motivated and on track."
          />
          <FeatureCard 
            icon={<Zap size={40} />}
            title="Productivity Boost"
            description="Streamline your workflow and boost your productivity with our efficient task management system."
          />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">What Our Users Say</h2>
          <blockquote className="text-xl italic text-gray-300">
          This dashboard has completely transformed how I manage my goals. Ive never been more productive
          </blockquote>
          <p className="mt-4 font-semibold">- Sarah J., Entrepreneur</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Unleash Your Potential?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of users who have transformed their productivity with our dashboard.</p>
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full px-8 py-4 text-lg font-semibold hover:bg-purple-700 hover:text-white transition-colors duration-300">
              Start Your Journey Now <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}