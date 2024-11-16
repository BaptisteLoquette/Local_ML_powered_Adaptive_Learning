import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Card, Input } from 'web3uikit';
import styles from '../styles/Home.module.css';

const courses = [
  {
    title: "Math 101",
    path: "/courses/course",
    description: "Learn fundamental mathematics concepts",
    category: "Mathematics"
  },
  {
    title: "Physics 101",
    path: "/courses/physics",
    description: "Explore the laws of physics",
    category: "Science"
  },
  {
    title: "Chemistry 101",
    path: "/courses/chemistry",
    description: "Discover chemical reactions",
    category: "Science"
  },
];

const Dashboard = () => {
  const [dragActive, setDragActive] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [timing, setTiming] = useState(Array(courses.length).fill(0));
  const [adhdMode, setAdhdMode] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      console.log("Dropped file:", file);
    }
  };

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTiming(prev => {
        const newTiming = [...prev];
        newTiming[currentCardIndex] = (Date.now() - startTime) / 1000;
        return newTiming;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentCardIndex]);

  const handleEmojiClick = () => {
    if (currentCardIndex < courses.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      alert('You have completed the course!');
    }
  };

  const toggleAdhdMode = () => {
    setAdhdMode(!adhdMode);
  };

  const applyBionicText = (text) => {
    return text.split(' ').map(word => {
      if (word.length > 2) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    }).join(' ');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-purple-900 to-blue-900 text-white">
      <aside className="w-64 bg-black shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-neon">Learn</h1>
        <nav className="space-y-4">
          <Link href="#" className="block text-neon font-semibold">Dashboard</Link>
          <Link href="#" className="block text-gray-400">Members</Link>
          <Link href="#" className="block text-gray-400">My Library</Link>
          <Link href="#" className="block text-gray-400">Works</Link>
          <Link href="#" className="block text-gray-400">Notification</Link>
          <Link href="#" className="block text-gray-400">Messages</Link>
          <Link href="#" className="block text-gray-400">Settings</Link>
          <Link href="#" className="block text-gray-400">Signout</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <Input label="Search" placeholder="Search..." />
            <Button text="Upload" theme="primary" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Link href={course.path} key={index}>
              <Card title={course.title} description={course.description} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
