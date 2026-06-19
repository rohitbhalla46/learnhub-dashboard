"use client";
import { Rocket, Zap, Database } from "lucide-react";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {


  const icons: any = {
  Rocket,
  Zap,
  Database,
};
  const [courses, setCourses] = useState<any[]>([]);

  const [title, setTitle] = useState("");
const [progress, setProgress] = useState("");

const [editId, setEditId] = useState<number | null>(null);
const [editTitle, setEditTitle] = useState("");

useEffect(() => {
  getCourses();
}, []);

async function addCourse() {
  const { error } = await supabase
    .from("courses")
    .insert([
      {
        title: title,
        progress: Number(progress),
      },
    ]);

  if (!error) {
    getCourses();
    setTitle("");
    setProgress("");
  } else {
    console.log(error);
  }
}
async function deleteCourse(id: number)  {
  const { error } = await supabase
    .from("courses")
    .delete()
    .eq("id", id);

  console.log(error);

  if (!error) {
    getCourses();
  }
}

async function updateCourse() {
  const { error } = await supabase
    .from("courses")
    .update({
      title: editTitle,
    })
    .eq("id", editId);

  if (!error) {
    getCourses();
    setEditId(null);
    setEditTitle("");
  } else {
    console.log(error);
  }
}
async function getCourses() {
  const { data, error } = await supabase
    .from("courses")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (data) {
    setCourses(data);
  }
}
console.log(courses);
  return (
    <main className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 p-5">
        <h2 className="text-2xl font-bold mb-8">LearnHub</h2>

        <ul className="space-y-4">
          <li>🏠 Home</li>
          <li>📚 Courses</li>
          <li>👤 Profile</li>
          <li>⚙️ Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-6">

        <div className="max-w-5xl mx-auto">

          {/* Hero Card */}

          <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="bg-zinc-900 rounded-3xl p-6 mb-6"
>
            <h1 className="text-4xl font-bold">
              Welcome Back, Rohit 👋
            </h1>

            <p className="text-gray-400 mt-2">
              Keep learning and maintain your streak!
            </p>

            <div className="mt-4 text-orange-400 text-xl">
              🔥 12 Day Learning Streak
            </div>
          </motion.div>
          <button className="bg-blue-600 px-4 py-2 rounded-lg mb-4">
  + Add Course
</button>

<div className="bg-zinc-900 p-4 rounded-xl mb-4">
  <input
    type="text"
    placeholder="Course Name"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="w-full p-2 mb-2 rounded text-black"
  />

  <input
    type="number"
    placeholder="Progress"
    value={progress}
    onChange={(e) => setProgress(e.target.value)}
    className="w-full p-2 mb-2 rounded text-black"
  />

  <button
  onClick={addCourse}
  className="bg-green-600 px-4 py-2 rounded"
>
  Save Course
</button>
</div>

{editId && (
  <div className="bg-zinc-900 p-4 rounded-xl mb-4">
    <input
      type="text"
      value={editTitle}
      onChange={(e) => setEditTitle(e.target.value)}
      className="w-full p-2 mb-2 rounded text-black"
    />

    <button
      onClick={updateCourse}
      className="bg-yellow-600 px-4 py-2 rounded"
    >
      Update Course
    </button>
  </div>
)}

          {/* Course Cards */}
          {/*
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

  <div className="bg-zinc-900 rounded-3xl p-5">
    <h3 className="text-lg font-semibold">
      🚀 React
    </h3>

    <p className="text-gray-400 mt-2">
      Progress: 75%
    </p>

    <div className="w-full bg-zinc-700 h-2 rounded-full mt-3">
      <div className="bg-green-500 h-2 rounded-full w-[75%]"></div>
    </div>
  </div>

  <div className="bg-zinc-900 rounded-3xl p-5">
    <h3 className="text-lg font-semibold">
      ⚡ Next.js
    </h3>

    <p className="text-gray-400 mt-2">
      Progress: 60%
    </p>

    <div className="w-full bg-zinc-700 h-2 rounded-full mt-3">
      <div className="bg-blue-500 h-2 rounded-full w-[60%]"></div>
    </div>
  </div>

  <div className="bg-zinc-900 rounded-3xl p-5">
    <h3 className="text-lg font-semibold">
      🗄️ Database
    </h3>

    <p className="text-gray-400 mt-2">
      Progress: 90%
    </p>

    <div className="w-full bg-zinc-700 h-2 rounded-full mt-3">
      <div className="bg-purple-500 h-2 rounded-full w-[90%]"></div>
    </div>
  </div>

</div>
*/}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

  {courses.map((course) => (
    <motion.div
  key={course.id}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  }}
  className="bg-zinc-900 rounded-3xl p-5"
>
      <div className="flex items-center gap-2 mb-2">
  {(() => {
    const Icon = icons[course.icon_name];
    return Icon ? <Icon size={20} /> : null;
  })()}

  <h3 className="text-lg font-semibold">
    {course.title}
  </h3>
</div>

      <p className="text-gray-400 mt-2">
        Progress: {course.progress}%
        </p>
        <button
  onClick={() => {
    setEditId(course.id);
    setEditTitle(course.title);
  }}
  className="bg-yellow-600 px-3 py-1 rounded mt-3 mr-2"
>
  Edit
</button>
        <button
  onClick={() => deleteCourse(course.id)}
  className="bg-red-600 px-3 py-1 rounded mt-3"
>
  Delete
</button>
      

      <div className="w-full bg-zinc-700 h-2 rounded-full mt-3">
        <motion.div
  className="bg-green-500 h-2 rounded-full"
  initial={{ width: 0 }}
  animate={{ width: `${course.progress}%` }}
  transition={{
    duration: 1,
    ease: "easeOut",
  }}
></motion.div>
      </div>
    </motion.div>
  ))}

</div>

          {/* Activity Tile */}
          <div className="bg-zinc-900 rounded-3xl p-5 mt-6">
            <h2 className="text-xl font-bold mb-4">
              Activity
            </h2>

            <div className="grid grid-cols-5 gap-2">
              <div className="h-8 bg-green-500 rounded"></div>
              <div className="h-8 bg-green-500 rounded"></div>
              <div className="h-8 bg-zinc-700 rounded"></div>
              <div className="h-8 bg-green-500 rounded"></div>
              <div className="h-8 bg-green-500 rounded"></div>

              <div className="h-8 bg-green-500 rounded"></div>
              <div className="h-8 bg-zinc-700 rounded"></div>
              <div className="h-8 bg-green-500 rounded"></div>
              <div className="h-8 bg-green-500 rounded"></div>
              <div className="h-8 bg-green-500 rounded"></div>
            </div>
          </div>

        </div>

      </section>

    </main>
  );
}