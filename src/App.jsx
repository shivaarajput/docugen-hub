import React, { useState, useEffect } from 'react';
import {
  FileText, Moon, Sun, Send, CheckCircle2, FileDown,
  ExternalLink, X, AlertCircle, GraduationCap,
  UserCircle, BookOpen, Sparkles, ChevronRight, Loader2
} from 'lucide-react';

const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwWCU944AYw1Pw4UuOlydaoVMeJ9BzzpVn4vxYX7WD4RwnA7fz2Z7ilj_IIOP1pRaM8/exec'; // Replace with your actual Apps Script URL

// --- MOCK DATA & CONSTANTS ---
const INITIAL_STATE = {
  faculty: '', dept: '', student_name: '', registration_number: '',
  subject_name: '', subject_code: '', teacher_name: '', course: '',
  year: '', semester: '', session: ''
};

const COURSE_MAPPING = {
  'B.Tech': { faculty: 'ENGINEERING & TECHNOLOGY', dept: 'COMPUTER SCIENCE AND ENGINEERING' },
  'M.Tech': { faculty: 'ENGINEERING & TECHNOLOGY', dept: 'COMPUTER SCIENCE AND ENGINEERING' },
  'BCA': { faculty: 'SCIENCE & HUMANITIES', dept: 'COMPUTER APPLICATIONS' },
  'MCA': { faculty: 'SCIENCE & HUMANITIES', dept: 'COMPUTER APPLICATIONS' },
  'MBA': { faculty: 'MANAGEMENT', dept: 'MASTER OF BUSINESS ADMINISTRATION' },
  'B.Pharm': { faculty: 'MEDICINE & HEALTH SCIENCES', dept: 'BACHELOR OF PHARMACY' }
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleGenerate = async (formData) => {
    setIsGenerating(true);

    try {
      if (API_ENDPOINT.includes("YOUR_GOOGLE_SCRIPT_URL")) {
        await new Promise((res) => setTimeout(res, 6000));
        setPdfUrl("https://file-examples.com/wp-content/storage/2017/10/file-sample_150kB.pdf");
        showToast("Document generated successfully! (Simulated)");
        setIsGenerating(false);
        return;
      }

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();

      if (data?.pdfUrl) {
        setPdfUrl(data.pdfUrl);
        showToast("Document generated successfully!");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      showToast("Failed to generate document. Please try again.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => setPdfUrl(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-violet-500/30 relative flex flex-col">

      {/* Background Decorative Blobs - Moved to a fixed wrapper to fix double scrollbar */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-500/10 dark:bg-violet-900/20 blur-[100px] rounded-full -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-fuchsia-500/10 dark:bg-fuchsia-900/20 blur-[100px] rounded-full translate-x-1/3" />
        <div className="absolute bottom-0 left-10 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-900/20 blur-[120px] rounded-full translate-y-1/3" />
      </div>

      {/* Custom Toast UI */}
      {toast && (
        <div className="fixed top-24 right-6 z-[9999] animate-in slide-in-from-right-8 fade-in duration-300">
          <div className={`flex items-center space-x-3 px-5 py-4 rounded-2xl shadow-2xl border text-sm font-semibold backdrop-blur-xl
                        ${toast.type === 'success'
              ? 'bg-white/90 dark:bg-slate-900/90 border-emerald-200/50 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400'
              : 'bg-white/90 dark:bg-slate-900/90 border-rose-200/50 dark:border-rose-900/50 text-rose-700 dark:text-rose-400'}`}>
            {toast.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-violet-600 p-2.5 rounded-xl shadow-lg shadow-violet-500/20">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              DocuGen<span className="text-violet-600 dark:text-violet-400">.</span>
            </span>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all hover:scale-105 active:scale-95"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10 flex flex-col">

        {/* Hero Title Area - Centered and Compact */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 px-4 py-1.5 rounded-full text-sm font-semibold text-violet-700 dark:text-violet-300 mb-6 shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>Lightning fast generation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Craft your academic files <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
              in seconds.
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
            Fill out the details below to instantly generate standard university practical file covers and bonafide certificates.
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full relative">
          <DocumentForm onSubmit={handleGenerate} isGenerating={isGenerating} />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-500 dark:text-slate-500 text-sm font-medium pb-8">
          Made with{" "}
          <span className="inline-block animate-heartbeat text-red-500">❤️</span>{" "}
          by{" "}
          <a
            href="https://github.com/shivaarajput"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Shiva
          </a>
        </div>
      </main>

      {/* Success Fullscreen Overlay */}
      {pdfUrl && <SuccessCard pdfUrl={pdfUrl} onReset={handleReset} />}
    </div>
  );
}

// --- DOCUMENT FORM COMPONENT ---
function DocumentForm({ onSubmit, isGenerating }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Analyzing your academic details...",
    "Structuring the cover template...",
    "Applying university formatting guidelines...",
    "Generating high-resolution PDF...",
    "Finalizing document..."
  ];

  useEffect(() => {
    let progressInterval;
    let stepInterval;

    if (isGenerating) {
      setProgress(0);
      setLoadingStep(0);

      progressInterval = setInterval(() => {
        setProgress(prev => (prev < 98 ? prev + 1 : prev));
      }, 60);

      stepInterval = setInterval(() => {
        setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 1200);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [isGenerating, loadingMessages.length]);

  useEffect(() => {
    const savedData = localStorage.getItem('docGenUserData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsedData }));
      } catch (e) {
        console.error("Error parsing saved data", e);
      }
    }
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'subject_code') value = value.toUpperCase();

    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === 'course' && COURSE_MAPPING[value]) {
        newData.faculty = COURSE_MAPPING[value].faculty;
        newData.dept = COURSE_MAPPING[value].dept;
      }
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('docGenUserData', JSON.stringify(formData));
    onSubmit(formData);
  };

  const inputClasses = "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all shadow-sm placeholder-slate-400 dark:placeholder-slate-500 font-medium";
  const labelClasses = "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 tracking-wide uppercase text-[11px]";

  return (
    <div className="relative w-full">
      {/* Elegant FLOATING Loading Overlay (Fixes the blank screen issue) */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 dark:bg-slate-950/60 backdrop-blur-[4px] transition-all duration-500 p-4">
          <div className="w-full max-w-sm p-8 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-white/50 dark:border-slate-700 text-center animate-in zoom-in-95 fade-in duration-300 relative overflow-hidden">

            {/* Decorative background glow inside modal */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-violet-500/10 to-transparent dark:from-violet-500/5 pointer-events-none" />

            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-violet-500 rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="w-20 h-20 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full border border-violet-100 dark:border-slate-700 relative z-10 shadow-lg">
                <Loader2 className="h-10 w-10 text-violet-600 dark:text-violet-400 animate-spin" />
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Crafting Document</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm h-5 transition-opacity">
              {loadingMessages[loadingStep]}
            </p>

            <div className="mt-8 relative">
              <div className="overflow-hidden h-2.5 flex rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div style={{ width: `${progress}%` }} className="flex flex-col text-center whitespace-nowrap text-white justify-center bg-violet-600 transition-all duration-300 ease-out relative">
                  <div className="absolute top-0 right-0 bottom-0 left-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8L3N2Zz4=')] opacity-30"></div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs font-semibold text-slate-400">Processing...</span>
                <span className="text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-100 dark:border-violet-500/20">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form is beautifully dimmed and slightly shrunk while generating instead of disappearing entirely */}
      <form onSubmit={handleSubmit} className={`transition-all duration-500 ease-in-out ${isGenerating ? 'opacity-40 scale-[0.99] blur-[2px] pointer-events-none' : 'opacity-100 scale-100 blur-0'}`}>

        {/* WIDE GRID LAYOUT FOR DESKTOP */}
        <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md p-6 md:p-8 lg:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">

          <div className="space-y-10">
            {/* Section 1: Personal Information (3 Columns) */}
            <div>
              <div className="flex items-center space-x-3 mb-6 pb-2 border-b border-slate-100 dark:border-slate-800/50">
                <UserCircle className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Student Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className={labelClasses}>Full Name</label>
                  <input required name="student_name" value={formData.student_name} onChange={handleChange} className={inputClasses} placeholder="e.g., Jane Doe" />
                </div>
                <div>
                  <label className={labelClasses}>Registration Number</label>
                  <input required name="registration_number" value={formData.registration_number} onChange={handleChange} className={inputClasses} placeholder="e.g., RA201100..." pattern="^[A-Za-z]{2}[0-9]{13}$" title="Enter correct 15-character registration number" />
                </div>
                <div>
                  <label className={labelClasses}>Academic Session</label>
                  <input required name="session" value={formData.session} onChange={handleChange} className={inputClasses} placeholder="e.g., 2024-2025" />
                </div>
              </div>
            </div>

            {/* Section 2: Academic Profile (Mixed Grid to fit perfectly) */}
            <div>
              <div className="flex items-center space-x-3 mb-6 pb-2 border-b border-slate-100 dark:border-slate-800/50">
                <GraduationCap className="h-5 w-5 text-violet-500" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Program Profile</h2>
              </div>

              {/* Row 1: Course, Year, Semester */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                <div>
                  <label className={labelClasses}>Course</label>
                  <select required name="course" value={formData.course} onChange={handleChange} className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em_1.2em] bg-no-repeat bg-[position:right_1rem_center]`}>
                    <option value="" disabled>Select Course</option>
                    <option value="MCA">MCA</option>
                    <option value="BCA">BCA</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="MBA">MBA</option>
                    <option value="B.Pharm">B.Pharm</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Year</label>
                  <select required name="year" value={formData.year} onChange={handleChange} className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em_1.2em] bg-no-repeat bg-[position:right_1rem_center]`}>
                    <option value="" disabled>Select Year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Semester</label>
                  <select required name="semester" value={formData.semester} onChange={handleChange} className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em_1.2em] bg-no-repeat bg-[position:right_1rem_center]`}>
                    <option value="" disabled>Select Semester</option>
                    <option value="1st">1st Semester</option>
                    <option value="2nd">2nd Semester</option>
                    <option value="3rd">3rd Semester</option>
                    <option value="4th">4th Semester</option>
                    <option value="5th">5th Semester</option>
                    <option value="6th">6th Semester</option>
                    <option value="7th">7th Semester</option>
                    <option value="8th">8th Semester</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Faculty, Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}>Faculty</label>
                  <select required name="faculty" value={formData.faculty} onChange={handleChange} className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em_1.2em] bg-no-repeat bg-[position:right_1rem_center]`}>
                    <option value="" disabled>Select Faculty</option>
                    <option value="SCIENCE & HUMANITIES">Science & Humanities</option>
                    <option value="ENGINEERING & TECHNOLOGY">Engineering & Technology</option>
                    <option value="MEDICINE & HEALTH SCIENCES">Medicine & Health Sciences</option>
                    <option value="MANAGEMENT">Management</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Department</label>
                  <select required name="dept" value={formData.dept} onChange={handleChange} className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em_1.2em] bg-no-repeat bg-[position:right_1rem_center]`}>
                    <option value="" disabled>Select Department</option>
                    <option value="COMPUTER APPLICATIONS">Computer Applications</option>
                    <option value="BACHELOR OF PHARMACY">Bachelor of Pharmacy (B.Pharm)</option>
                    <option value="MASTER OF BUSINESS ADMINISTRATION">Master of Business Administration (MBA)</option>
                    <option value="HOTEL MANAGEMENT">Hotel Management</option>
                    <option value="MECHANICAL ENGINEERING">Mechanical Engineering</option>
                    <option value="ELECTRONICS AND COMMUNICATION ENGINEERING">Electronics and Communication Engineering</option>
                    <option value="COMPUTER SCIENCE AND ENGINEERING">Computer Science and Engineering</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Subject Details (3 Columns) */}
            <div>
              <div className="flex items-center space-x-3 mb-6 pb-2 border-b border-slate-100 dark:border-slate-800/50">
                <BookOpen className="h-5 w-5 text-emerald-500" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Subject Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className={labelClasses}>Subject Name</label>
                  <input required name="subject_name" list="subject-suggestions" value={formData.subject_name} onChange={handleChange} className={inputClasses} placeholder="e.g., Data Structures" />
                  <datalist id="subject-suggestions">
                    <option value="Data Structures and Algorithms" />
                    <option value="Database Management Systems" />
                    <option value="Object Oriented Programming" />
                    <option value="Computer Networks" />
                    <option value="Operating Systems" />
                  </datalist>
                </div>
                <div>
                  <label className={labelClasses}>Subject Code</label>
                  <input required name="subject_code" list="code-suggestions" value={formData.subject_code} onChange={handleChange} className={inputClasses} placeholder="e.g., CS101" />
                  <datalist id="code-suggestions">
                    <option value="PCA25C01J" />
                    <option value="PCA25C02J" />
                    <option value="PCA25C03J" />
                    <option value="PCA25C04J" />
                  </datalist>
                </div>
                <div>
                  <label className={labelClasses}>Teacher Name</label>
                  <input required name="teacher_name" list="teacher-suggestions" value={formData.teacher_name} onChange={handleChange} className={inputClasses} placeholder="e.g., Dr. Alan Turing" />
                  <datalist id="teacher-suggestions">
                    <option value="Mr. Vikash Sharma" />
                    <option value="Mrs. Vaishali Gupta" />
                    <option value="Dr. Rajeev Kumar Sharma" />
                  </datalist>
                </div>
              </div>
            </div>

          </div>

          {/* Submit Button Container */}
          <div className="mt-12 flex flex-col items-center">
            <button
              type="submit"
              className="group w-full max-w-md flex justify-center items-center py-4 rounded-2xl text-lg font-bold text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:ring-violet-500/30 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
            >
              <span>Generate PDF Document</span>
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-4 font-medium flex items-center">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-emerald-500" />
              All form data is securely saved locally for your next visit.
            </p>
          </div>

        </div>
      </form>
    </div>
  );
}

// --- PREMIUM SUCCESS CARD (FLOATING WORKSPACE UI) ---
function SuccessCard({ pdfUrl, onReset }) {
  const embedUrl = pdfUrl ? pdfUrl.replace(/\/view.*/, '/preview') : '';

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-slate-100/80 dark:bg-slate-950/80 backdrop-blur-2xl animate-in zoom-in-95 fade-in duration-300 p-4 sm:p-6 lg:p-8">

      {/* Ambient Background Glow for the Success Page */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl h-full max-h-[1000px] flex flex-col relative z-10 animate-in slide-in-from-bottom-8 duration-500 delay-150">

        {/* Floating Premium Header */}
        <div className="shrink-0 flex flex-col sm:flex-row items-center justify-between p-4 px-6 mb-4 sm:mb-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-xl">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0 w-full sm:w-auto">
            <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                Document Generated
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Your practical file cover is ready.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center px-4 py-2.5 border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-bold rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:shadow-md"
            >
              <ExternalLink className="mr-2 h-4 w-4 text-slate-400" />
              Open in Drive
            </a>

            <a
              href={pdfUrl}
              download="Generated_Document.pdf"
              className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold rounded-xl shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)] text-white bg-emerald-500 hover:bg-emerald-600 transition-all hover:-translate-y-0.5"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download PDF
            </a>

            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>

            <button
              onClick={onReset}
              className="shrink-0 inline-flex items-center justify-center p-2.5 border border-slate-200 dark:border-slate-700 shadow-sm rounded-xl text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
              title="Close preview"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Preview Frame */}
        <div className="flex-1 w-full rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 shadow-2xl bg-slate-100 dark:bg-slate-900 relative ring-4 ring-white/50 dark:ring-slate-800/50">
          {/* Loading placeholder behind iframe */}
          <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 bg-slate-50 dark:bg-slate-900">
            <Loader2 className="h-8 w-8 text-slate-300 dark:text-slate-600 animate-spin mb-4" />
            <span className="text-slate-400 dark:text-slate-500 font-medium text-sm animate-pulse">Loading preview...</span>
          </div>

          <iframe
            src={embedUrl}
            className="w-full h-full border-0 relative z-10 mix-blend-multiply dark:mix-blend-normal"
            title="PDF Preview"
            allow="autoplay"
          ></iframe>
        </div>

      </div>
    </div>
  );
}