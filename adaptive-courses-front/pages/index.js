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
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-purple-900 to-blue-900 text-white">
      <aside className="w-full bg-black shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-neon">Learn</h1>
        <nav style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
          <Button
            text="Dashboard"
            theme="primary"
            color="green"
            onClick={() => console.log('Dashboard clicked')}
            size="large"
            style={{
              background: 'linear-gradient(to right, #38b2ac, #3182ce)',
              flex: '1'
            }}
          />
          <Button
            text="Exercises"
            theme="primary"
            color="pink"
            onClick={() => console.log('Exercises clicked')}
            size="large"
            style={{
              background: 'linear-gradient(to right, #ed64a6, #9f7aea)',
              flex: '1'
            }}
          />
          <Button
            text="Notification"
            theme="primary"
            color="yellow"
            onClick={() => console.log('Notification clicked')}
            size="large"
            style={{
              background: 'linear-gradient(to right, #ecc94b, #ed8936)',
              flex: '1'
            }}
          />
          <Button
            text="Signout"
            theme="primary"
            color="red"
            onClick={() => console.log('Signout clicked')}
            size="large"
            style={{
              background: 'linear-gradient(to right, #f56565, #ed64a6)',
              flex: '1'
            }}
          />
        </nav>
      </aside>

      <main className="flex-1 p-8 flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <Input
              label="Search"
              placeholder="Search..."
              onChange={(e) => console.log(e.target.value)}
              style={{ minWidth: '200px' }}
            />
            <Button
              text="Upload"
              theme="primary"
              style={{ marginLeft: 'auto' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
          {courses.map((course, index) => (
            <Link href={course.path} key={index} className="block transform hover:scale-105 transition-all duration-300">
              <Card
                title={course.title}
                description={course.description}
                style={{
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '2rem',
                  background: `linear-gradient(135deg, 
                    ${index % 3 === 0 ? 'rgba(98, 126, 234, 0.1)' :
                      index % 3 === 1 ? 'rgba(134, 239, 172, 0.1)' :
                        'rgba(249, 168, 212, 0.1)'}, 
                    rgba(17, 24, 39, 0.2))`,
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${index % 3 === 0 ? 'rgba(98, 126, 234, 0.3)' :
                    index % 3 === 1 ? 'rgba(134, 239, 172, 0.3)' :
                      'rgba(249, 168, 212, 0.3)'
                    }`,
                  borderRadius: '1.5rem',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                }}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );

}
export default Dashboard;
