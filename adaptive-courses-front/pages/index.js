import React, { useState, useEffect, useRef } from 'react';
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
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      const validTypes = ['application/pdf', 'text/plain'];

      if (validTypes.includes(file.type)) {
        const formData = new FormData();
        formData.append('file', file);

        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your Cloud OCR service
        fetch('YOUR_API_ENDPOINT', {
          method: 'POST',
          body: formData,
          headers: {
            // Add any required headers here
            // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
          },
        })
          .then(response => response.json())
          .then(data => {
            console.log('File processed successfully:', data);
            // Handle the response data as needed
          })
          .catch(error => {
            console.error('Error processing file:', error);
          });

        setFileError('');
      } else {
        setFileError('Only PDF and TXT files are allowed.');
      }
    }
  };

  const saveFileToIndexedDB = (fileName, fileData) => {
    const request = indexedDB.open('fileStorage', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files', { keyPath: 'name' });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction('files', 'readwrite');
      const store = transaction.objectStore('files');
      store.put({ name: fileName, data: fileData });

      transaction.oncomplete = () => {
        console.log('File saved successfully');
      };

      transaction.onerror = (error) => {
        console.error('Error saving file:', error);
      };
    };

    request.onerror = (error) => {
      console.error('Error opening IndexedDB:', error);
    };
  };

  const getFileFromIndexedDB = (fileName) => {
    const request = indexedDB.open('fileStorage', 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction('files', 'readonly');
      const store = transaction.objectStore('files');
      const getRequest = store.get(fileName);

      getRequest.onsuccess = () => {
        const fileData = getRequest.result;
        if (fileData) {
          console.log('Retrieved file:', fileData);
          // Process the file data as needed<<
        } else {
          console.log('File not found');
        }
      };

      getRequest.onerror = (error) => {
        console.error('Error retrieving file:', error);
      };
    };

    request.onerror = (error) => {
      console.error('Error opening IndexedDB:', error);
    };
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

  const handleFileSelect = (e) => {
    const files = e.target.files;
    handleFiles(files);
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

      <main className="flex-1 p-12">
        <nav style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '64rem', height: '100%' }}>
          <Input
            label="Search Courses"
            placeholder="Type to search..."
            onChange={(e) => console.log(e.target.value)}
            size="large"
            width="300px"
            validation={{
              characterMaxLength: 50
            }}
            style={{
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              border: '2px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '9999px',
              padding: '12px 24px',
              fontSize: '16px',
              color: 'white'
            }}
            className="rounded-full"
          />
          <div
            onClick={() => fileInputRef.current.click()}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed ${dragActive ? 'bg-blue-100' : 'bg-white'}`}
            style={{
              width: '300px',
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              backgroundColor: dragActive ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.1)',
              border: '2px dashed rgba(99, 102, 241, 0.3)',
              borderRadius: '8px',
              padding: '20px',
              boxSizing: 'border-box'
            }}
          >
            <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: 'black' }}>
              {dragActive ? 'Drop here' : 'Drag and Drop PDF or TXT files here'}
            </span>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileSelect}
              accept=".pdf,.txt"
            />
          </div>
        </nav>
        {fileError && <p className="text-red-500 mt-2">{fileError}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-20">
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
