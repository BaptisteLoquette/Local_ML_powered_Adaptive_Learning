import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const courses = [
  { title: "Math 101", path: "/courses/course" },
  // Add more courses here
];

const Dashboard = () => {
  const [dragActive, setDragActive] = useState(false);

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
      // Handle the file upload logic here
    }
  };

  return (
    <div className={styles.dashboard}>
      <h1>Course Dashboard</h1>
      <div className={styles.courseList}>
        {courses.map((course, index) => (
          <div key={index} className={styles.courseBox}>
            <Link href={course.path}>
              {course.title}
            </Link>
          </div>
        ))}
      </div>
      <div
        className={`${styles.dragDropBox} ${dragActive ? styles.active : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        Drag & Drop your PDF here
      </div>
    </div>
  );
};

export default Dashboard;
