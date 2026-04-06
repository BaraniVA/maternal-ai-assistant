import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Globe, 
  Volume2, 
  MessageSquare, 
  Calendar, 
  Activity, 
  User, 
  Home as HomeIcon,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Info,
  Send,
  Mic,
  Plus,
  Utensils,
  Trash2,
  Settings,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MOODS = [
  { id: 'happy', label: 'HAPPY', emoji: '😊' },
  { id: 'calm', label: 'CALM', emoji: '😌' },
  { id: 'tired', label: 'TIRED', emoji: '😴' },
  { id: 'anxious', label: 'ANXIOUS', emoji: '😰' },
  { id: 'excited', label: 'EXCITED', emoji: '🤩' },
];

const LANGUAGES = [
  { id: 'en', label: 'English', native: 'English' },
  { id: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { id: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { id: 'mr', label: 'Marathi', native: 'मराठी' },
  { id: 'hi', label: 'Hindi', native: 'हिन्दी' },
];

const REMINDER_OPTIONS = [
  { id: '1h', label: '1 Hour Before', offset: 60 * 60 * 1000 },
  { id: '6h', label: '6 Hours Before', offset: 6 * 60 * 60 * 1000 },
  { id: '1d', label: '1 Day Before', offset: 24 * 60 * 60 * 1000 },
  { id: '3d', label: '3 Days Before', offset: 3 * 24 * 60 * 60 * 1000 },
];

const NAV_ITEMS = [
  { id: 'home', label: 'HOME', icon: HomeIcon },
  { id: 'chat', label: 'CHAT', icon: MessageSquare },
  { id: 'plan', label: 'PLAN', icon: Calendar },
  { id: 'yoga', label: 'YOGA', icon: Activity },
  { id: 'profile', label: 'PROFILE', icon: User },
];

const POSES = [
  {
    title: "🤰 Cow Pose",
    video: "https://cdnl.iconscout.com/lottie/premium/preview-watermark/cow-pose-yoga-animation-gif-download-4562624.mp4",
    benefits: "Relieves back pain, improves spine flexibility, reduces stress.",
    voice: "Step 1. Come to your hands and knees, mama. Step 2. Inhale slowly... Lift your chest... and look forward. Step 3. Let your belly soften... toward the floor. Affirmation: My body is strong... and capable of amazing things. You're doing great."
  },
  {
    title: "🐱 Cat Pose",
    video: "https://cdnl.iconscout.com/lottie/premium/preview-watermark/cat-pose-yoga-animation-gif-download-4562623.mp4",
    benefits: "Reduces lower back tension, improves posture, helps pelvic flexibility.",
    voice: "Step 1. Start on all fours. Step 2. Exhale slowly... Round your back toward the sky. Step 3. Tuck your chin gently. Affirmation: I trust my body's wisdom. Breathe deep... and relax, you are doing perfectly."
  },
  {
    title: "🤰 Yoga Ball Exercise",
    video: "https://cdnl.iconscout.com/lottie/premium/preview-watermark/yoga-ball-animation-gif-download-6638140.mp4",
    benefits: "Improves balance, reduces pelvic pressure, helps relaxation during pregnancy.",
    voice: "Step 1. Sit tall on your yoga ball. Step 2. Find your balance. Step 3. Rotate your hips... in slow, gentle circles. Affirmation: I am creating a peaceful space for my baby. You and your baby are doing wonderfully."
  },
  {
    title: "🤰 Forward Bending Stretch",
    video: "https://cdnl.iconscout.com/lottie/premium/preview-watermark/woman-doing-spinal-flexion-forward-bending-stretching-animation-gif-download-12803958.mp4",
    benefits: "Gently stretches the back, improves flexibility, relieves tension. Do slowly and avoid deep bending during pregnancy.",
    voice: "Step 1. Stand with your feet wide for stability. Step 2. Hinge forward slowly... only as far as feels good. Step 3. Relax your neck... and arms. Affirmation: I am connected to my baby's strength. Take a deep, nourishing breath, mama."
  }
];

export default function App() {
  const [selectedMood, setSelectedMood] = useState('excited');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[1]); // Default to Tamil as per image
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! I'm your Maternal AI assistant. How can I support you today? Whether you have questions about pregnancy, postpartum care, or newborn health, I'm here to help.", sender: 'ai' },
    { id: 2, text: "What should I eat today?", sender: 'user' },
    { id: 3, text: "Eating a balanced diet is very important for you and your baby. Focus on iron-rich foods, leafy greens, and lean proteins.", sender: 'ai' },
  ]);
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isTimerRunningRef = useRef(false);
  const timerValueRef = useRef(300);

  useEffect(() => {
    isTimerRunningRef.current = isTimerRunning;
  }, [isTimerRunning]);

  useEffect(() => {
    timerValueRef.current = timer;
  }, [timer]);

  const [appointments, setAppointments] = useState([
    { id: 1, title: 'Prenatal Checkup', date: '2026-04-10', time: '10:00', description: 'Regular monthly checkup with Dr. Sarah.', reminderOffset: 24 * 60 * 60 * 1000 },
    { id: 2, title: 'Ultrasound Scan', date: '2026-04-15', time: '14:30', description: '20-week anatomy scan.', reminderOffset: 24 * 60 * 60 * 1000 },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [apptToDelete, setApptToDelete] = useState<number | null>(null);
  const [newAppt, setNewAppt] = useState({ title: '', date: '', time: '', description: '', reminderOffset: 24 * 60 * 60 * 1000 });
  const [femaleVoice, setFemaleVoice] = useState<SpeechSynthesisVoice | null>(null);
  const notificationTimeoutsRef = useRef<{[key: number]: NodeJS.Timeout}>({});

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    // Schedule notifications for all appointments
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    // Clear existing timeouts
    Object.values(notificationTimeoutsRef.current).forEach(clearTimeout);
    notificationTimeoutsRef.current = {};

    const now = new Date().getTime();

    appointments.forEach((appt) => {
      // Ensure time is in HH:mm format for ISO string
      const timeStr = appt.time.includes(' ') ? appt.time.split(' ')[0] : appt.time;
      const apptDateTime = new Date(`${appt.date}T${timeStr}`).getTime();
      
      if (isNaN(apptDateTime)) return;

      const reminderTime = apptDateTime - (appt.reminderOffset || 24 * 60 * 60 * 1000);

      if (reminderTime > now) {
        const delay = reminderTime - now;
        
        // Only schedule if it's within a reasonable range (e.g., next 30 days) to avoid 32-bit int overflow in setTimeout
        if (delay < 2147483647) {
          const timeout = setTimeout(() => {
            const reminderLabel = REMINDER_OPTIONS.find(opt => opt.offset === appt.reminderOffset)?.label || '24 hours before';
            new Notification('Upcoming Appointment Reminder', {
              body: `You have an appointment: ${appt.title} (${reminderLabel}).`,
              icon: '/favicon.ico'
            });
          }, delay);
          notificationTimeoutsRef.current[appt.id] = timeout;
        }
      }
    });

    return () => {
      Object.values(notificationTimeoutsRef.current).forEach(clearTimeout);
    };
  }, [appointments]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('woman') ||
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('victoria') ||
        v.name.toLowerCase().includes('google us english') ||
        v.name.toLowerCase().includes('microsoft zira')
      );
      if (voice) setFemaleVoice(voice);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppt.title || !newAppt.date || !newAppt.time) return;
    setAppointments([...appointments, { ...newAppt, id: Date.now() }]);
    setNewAppt({ title: '', date: '', time: '', description: '', reminderOffset: 24 * 60 * 60 * 1000 });
    setShowAddModal(false);
  };

  const handleDeleteAppointment = () => {
    if (apptToDelete !== null) {
      setAppointments(appointments.filter(appt => appt.id !== apptToDelete));
      setApptToDelete(null);
    }
  };

  useEffect(() => {
    if (activeTab === 'yoga' && isTimerRunning && timer > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (!isTimerRunning && activeTab === 'yoga') window.speechSynthesis.cancel();
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [activeTab, isTimerRunning, timer]);

  useEffect(() => {
    if (isTimerRunning && activeTab === 'yoga') {
      speakPose();
    } else if (activeTab === 'yoga') {
      window.speechSynthesis.cancel();
    }
  }, [isTimerRunning, activeTab, currentPoseIndex]);

  useEffect(() => {
    // Reset timer when pose changes
    setTimer(300);
    setIsTimerRunning(false);
  }, [currentPoseIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDisplayTime = (timeStr: string) => {
    if (!timeStr) return '';
    try {
      const [hours, minutes] = timeStr.split(':');
      const h = parseInt(hours);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${h12}:${minutes} ${ampm}`;
    } catch (e) {
      return timeStr;
    }
  };

  const nextPose = () => {
    const nextIndex = (currentPoseIndex + 1) % POSES.length;
    setCurrentPoseIndex(nextIndex);
    speakPose(nextIndex);
  };

  const speakPose = (index: number = currentPoseIndex) => {
    if (!isTimerRunningRef.current && activeTab === 'yoga') {
      // If manually triggered via button, we still want it to play once
      // but the auto-repeat logic depends on isTimerRunning
    }

    const speech = new SpeechSynthesisUtterance(POSES[index].voice);
    
    if (femaleVoice) {
      speech.voice = femaleVoice;
    } else {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('woman') ||
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('victoria') ||
        v.name.toLowerCase().includes('google us english') ||
        v.name.toLowerCase().includes('microsoft zira')
      );
      if (voice) speech.voice = voice;
    }

    speech.rate = 0.75;
    speech.pitch = 1.1;
    speech.lang = "en-US";

    speech.onend = () => {
      if (isTimerRunningRef.current && timerValueRef.current > 0 && activeTab === 'yoga') {
        // Wait 3 seconds before repeating to give the user a breather
        setTimeout(() => {
          if (isTimerRunningRef.current && activeTab === 'yoga') {
            speakPose(index);
          }
        }, 3000);
      }
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Mobile App Container */}
      <div className="w-[375px] h-[760px] bg-white rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col border-[8px] border-white">
        
        {/* Header */}
        <header className="px-6 pt-8 pb-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-maternal-pink flex items-center justify-center shadow-lg shadow-maternal-pink/30">
              <Heart className="text-white fill-white w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif italic text-2xl text-gray-800 leading-none">Maternal</h1>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">AI Assistant</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 relative">
            <button 
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-1.5 bg-gray-50/80 px-3.5 py-2 rounded-full border border-gray-100 active:scale-95 transition-transform"
            >
              <Globe className="w-3.5 h-3.5 text-maternal-pink" />
              <span className="text-xs font-medium text-gray-600">{selectedLanguage.native}</span>
            </button>

            {showLanguageDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setShowLanguageDropdown(false);
                    }}
                    className={cn(
                      "w-full px-4 py-2.5 text-left text-xs font-medium transition-colors",
                      selectedLanguage.id === lang.id ? "bg-red-50 text-maternal-pink" : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {lang.native}
                  </button>
                ))}
              </motion.div>
            )}

            <button className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <Volume2 className="w-4.5 h-4.5 text-maternal-pink" />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className={cn(
          "flex-1 px-6 pb-24 scrollbar-hide",
          activeTab === 'chat' ? "flex flex-col overflow-hidden" : "overflow-y-auto"
        )}>
          {activeTab === 'home' && (
            <>
              {/* Hero Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="maternal-gradient rounded-[36px] p-7 mt-3 card-shadow relative overflow-hidden"
              >
                <div className="relative z-10">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-white/70 uppercase">Welcome Back</span>
                  <h2 className="font-serif italic text-[34px] text-white mt-1.5 mb-3 leading-tight">Hello, Mama!</h2>
                  <p className="text-white/90 text-[15px] leading-relaxed max-w-[200px]">
                    Your journey is beautiful. How can I help you today?
                  </p>
                  
                  <div className="flex gap-2.5 mt-7">
                    <button className="bg-white text-maternal-pink px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-black/5 active:scale-95 transition-transform">
                      Start Chat
                    </button>
                    <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-3 rounded-2xl font-bold text-sm active:bg-white/30 transition-colors">
                      Daily Tips
                    </button>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -left-10 -top-10 w-44 h-44 bg-black/5 rounded-full blur-3xl" />
              </motion.div>

              {/* Mood Section */}
              <section className="mt-8">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">How are you feeling?</h3>
                  <span className="text-[10px] font-bold text-maternal-pink">Last: Excited</span>
                </div>
                
                <div className="flex justify-between items-start">
                  {MOODS.map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className={cn(
                        "w-[54px] h-[54px] rounded-2xl flex items-center justify-center text-2xl transition-all duration-300",
                        selectedMood === mood.id 
                          ? "bg-white border-2 border-maternal-pink/10 card-shadow scale-105" 
                          : "bg-gray-50/50 grayscale group-hover:grayscale-0"
                      )}>
                        {mood.emoji}
                      </div>
                      <span className={cn(
                        "text-[8px] font-bold tracking-wider transition-colors",
                        selectedMood === mood.id ? "text-maternal-pink" : "text-gray-400"
                      )}>
                        {mood.label}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Daily Insight Section */}
              <section className="mt-8">
                <div className="bg-gray-50/80 rounded-[32px] p-6 border border-gray-100/50">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Sparkles className="w-4.5 h-4.5 text-maternal-pink" />
                    <h3 className="text-[10px] font-bold tracking-[0.2em] text-maternal-pink uppercase">Daily Insight</h3>
                  </div>
                  <p className="text-gray-600 text-[13px] leading-relaxed">
                    Take a moment to breathe deeply today. Your body is doing amazing work creating life.
                  </p>
                </div>
              </section>

              {/* Dashboard Grid from Image */}
              <section className="mt-8 space-y-4">
                {/* Next Appointment Card */}
                <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-maternal-pink" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase">Next Appointment</h4>
                    <p className="text-gray-800 font-serif italic text-lg mt-0.5">No upcoming visits</p>
                  </div>
                  <div className="text-gray-300">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Health Tips */}
                  <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm">Health Tips</h4>
                    <p className="text-gray-400 text-[10px] mt-1 leading-relaxed">Personalized advice for your week.</p>
                  </div>
                  {/* Resources */}
                  <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4">
                      <Info className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm">Resources</h4>
                    <p className="text-gray-400 text-[10px] mt-1 leading-relaxed">Guides on pregnancy & care.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Pregnancy Progress */}
                  <div className="bg-red-50/50 border border-red-100/50 rounded-[32px] p-6 shadow-sm relative overflow-hidden">
                    <h4 className="text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase">Pregnancy</h4>
                    <h5 className="font-serif italic text-xl text-gray-800 mt-1">Week 24</h5>
                    <p className="text-gray-500 text-[10px] mt-1">Baby is the size of a <span className="text-maternal-pink font-bold">Corn</span></p>
                    <div className="mt-4 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-maternal-pink w-[60%]" />
                    </div>
                  </div>
                  {/* Kick Counter */}
                  <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                      </div>
                      <span className="text-[9px] font-bold text-orange-500 uppercase">Daily</span>
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm">Kick Counter</h4>
                    <p className="text-gray-400 text-[10px] mt-1 leading-relaxed">Track baby's movement.</p>
                  </div>
                </div>
              </section>
            </>
          )}

          {activeTab === 'chat' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col h-full"
            >
              <div className="flex-1 overflow-y-auto space-y-6 pb-6 pt-4 scrollbar-hide">
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={cn(
                      "max-w-[85%] p-5 rounded-[32px] text-[13px] leading-relaxed shadow-sm",
                      msg.sender === 'ai' 
                        ? "bg-white text-gray-700 rounded-tl-none border border-gray-50/50" 
                        : "bg-maternal-pink text-white ml-auto rounded-tr-none shadow-maternal-pink/20 font-medium"
                    )}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3 overflow-x-auto pb-4 pt-2 scrollbar-hide -mx-6 px-6 shrink-0">
                <button className="flex items-center gap-2 bg-white border border-red-50 px-4 py-3 rounded-full shadow-sm whitespace-nowrap shrink-0 active:scale-95 transition-transform">
                  <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                    <Plus className="w-3 h-3 text-maternal-pink" />
                  </div>
                  <span className="text-[10px] font-bold text-maternal-pink uppercase">Quick Actions</span>
                </button>
                <button className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-3 rounded-full shadow-sm whitespace-nowrap shrink-0 active:scale-95 transition-transform">
                  <Utensils className="w-4 h-4 text-purple-400" />
                  <span className="text-[10px] font-bold text-gray-500">What should I eat today?</span>
                </button>
                <button className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-3 rounded-full shadow-sm whitespace-nowrap shrink-0 active:scale-95 transition-transform">
                  <Activity className="w-4 h-4 text-yellow-500" />
                  <span className="text-[10px] font-bold text-gray-500">Is light exercise safe?</span>
                </button>
              </div>

              {/* Input Area */}
              <div className="pb-4 shrink-0">
                <div className="bg-gray-50/80 rounded-full p-2 flex items-center gap-2 border border-gray-100/50 shadow-inner">
                  <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 active:scale-90 transition-transform">
                    <Mic className="w-5 h-5" />
                  </button>
                  <input 
                    type="text" 
                    placeholder="Ask anything..."
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2 text-gray-600 placeholder:text-gray-400"
                  />
                  <button className="w-12 h-12 rounded-full bg-maternal-pink/10 flex items-center justify-center text-maternal-pink active:scale-90 transition-transform">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'plan' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif italic text-3xl text-gray-800">Your Plan</h2>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="w-10 h-10 rounded-full bg-maternal-pink text-white flex items-center justify-center shadow-lg shadow-maternal-pink/20 active:scale-90 transition-transform"
                >
                  <Calendar className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Upcoming Appointments</h3>
                {appointments.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-400 text-sm italic">No appointments scheduled yet.</p>
                  </div>
                ) : (
                  appointments.map((appt) => (
                    <div key={appt.id} className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-800 text-lg">{appt.title}</h4>
                        <div className="flex items-center gap-2">
                          <div className="bg-red-50 text-maternal-pink text-[10px] font-bold px-2 py-1 rounded-lg">
                            {REMINDER_OPTIONS.find(opt => opt.offset === appt.reminderOffset)?.label.toUpperCase() || 'REMINDER'}
                          </div>
                          <button 
                            onClick={() => setApptToDelete(appt.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-maternal-pink transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-gray-500 text-xs mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {appt.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Volume2 className="w-3.5 h-3.5" />
                          {formatDisplayTime(appt.time)}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {appt.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'yoga' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <h2 className="font-serif italic text-3xl text-gray-800 mb-6">Pregnancy Yoga</h2>
              
              <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{POSES[currentPoseIndex].title}</h3>
                  <div className="flex items-center gap-2 bg-maternal-pink/10 px-3 py-1.5 rounded-full">
                    <Activity className="w-4 h-4 text-maternal-pink" />
                    <span className="text-sm font-bold text-maternal-pink font-mono">{formatTime(timer)}</span>
                  </div>
                </div>
                
                <div className="aspect-video w-full bg-gray-50 rounded-2xl overflow-hidden mb-4 border border-gray-100 relative">
                  <video 
                    key={POSES[currentPoseIndex].video}
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover"
                  >
                    <source src={POSES[currentPoseIndex].video} type="video/mp4" />
                  </video>
                  {!isTimerRunning && timer === 300 && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <button 
                        onClick={() => setIsTimerRunning(true)}
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl text-maternal-pink active:scale-90 transition-transform"
                      >
                        <Play className="w-8 h-8 fill-maternal-pink" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-red-50/50 rounded-2xl p-4 mb-6">
                  <p className="text-maternal-pink text-sm font-medium leading-relaxed">
                    {POSES[currentPoseIndex].benefits}
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <button 
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={cn(
                      "col-span-2 font-bold py-3.5 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2",
                      isTimerRunning 
                        ? "bg-gray-100 text-gray-600 shadow-none" 
                        : "maternal-gradient text-white shadow-maternal-pink/20"
                    )}
                  >
                    {isTimerRunning ? <><Pause className="w-5 h-5" /> Pause</> : <><Play className="w-5 h-5" /> Start</>}
                  </button>
                  <button 
                    onClick={() => {
                      setTimer(300);
                      setIsTimerRunning(false);
                    }}
                    className="bg-gray-50 text-gray-500 rounded-2xl flex flex-col items-center justify-center border border-gray-100 active:bg-gray-100 transition-colors py-2"
                  >
                    <RotateCcw className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold uppercase">Reset</span>
                  </button>
                  <button 
                    onClick={() => speakPose()}
                    className="bg-gray-50 text-maternal-pink rounded-2xl flex flex-col items-center justify-center border border-gray-100 active:bg-gray-100 transition-colors py-2"
                  >
                    <Volume2 className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold uppercase">Voice</span>
                  </button>
                </div>
                
                <button 
                  onClick={nextPose}
                  className="w-full mt-3 bg-gray-50 text-gray-600 font-bold py-3 rounded-2xl border border-gray-100 active:bg-gray-100 transition-colors"
                >
                  Next Pose
                </button>
              </div>
              
              <p className="text-gray-400 text-[10px] mt-6 px-4 leading-relaxed">
                Always consult your doctor before starting any new exercise routine during pregnancy.
              </p>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 flex flex-col items-center"
            >
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-[40px] bg-maternal-pink flex items-center justify-center shadow-xl shadow-maternal-pink/20">
                  <User className="w-16 h-16 text-white" />
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-50 text-gray-400 active:scale-90 transition-transform">
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              <h2 className="font-serif italic text-3xl text-gray-800 mb-1">Mama Bear</h2>
              <p className="text-[10px] font-bold tracking-[0.2em] text-maternal-pink uppercase mb-10">24 Weeks Pregnant</p>

              <div className="w-full space-y-6">
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Your Journey</h3>
                
                <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5 text-maternal-pink" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <h4 className="font-bold text-gray-800">Second Trimester</h4>
                        <span className="bg-red-50 text-maternal-pink text-[9px] font-bold px-2 py-1 rounded-full uppercase">Active</span>
                      </div>
                      <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">Week 13 - 27</p>
                    </div>
                  </div>

                  <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-50">
                    <div className="relative flex items-center gap-4">
                      <div className="absolute -left-[19px] w-4 h-4 rounded-full bg-maternal-pink flex items-center justify-center shadow-lg shadow-maternal-pink/20">
                        <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 text-sm">First Ultrasound</h4>
                        <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">Week 12</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab !== 'home' && activeTab !== 'plan' && activeTab !== 'yoga' && activeTab !== 'chat' && activeTab !== 'profile' && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 italic">
              <p>{activeTab.toUpperCase()} feature coming soon...</p>
            </div>
          )}
        </main>

        {/* Add Appointment Modal */}
        {showAddModal && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end">
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              className="bg-white w-full rounded-t-[40px] p-8 pb-12"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif italic text-2xl text-gray-800">New Appointment</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400">
                  <Globe className="w-6 h-6 rotate-45" /> {/* Using Globe as a close icon replacement for simplicity */}
                </button>
              </div>
              <form onSubmit={handleAddAppointment} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Title</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-maternal-pink/30"
                    placeholder="e.g., Prenatal Checkup"
                    value={newAppt.title}
                    onChange={(e) => setNewAppt({...newAppt, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Date</label>
                    <input 
                      type="date" 
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-maternal-pink/30"
                      value={newAppt.date}
                      onChange={(e) => setNewAppt({...newAppt, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Time</label>
                    <input 
                      type="time" 
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-maternal-pink/30"
                      value={newAppt.time}
                      onChange={(e) => setNewAppt({...newAppt, time: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Description</label>
                  <textarea 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-maternal-pink/30 h-24 resize-none"
                    placeholder="Add details..."
                    value={newAppt.description}
                    onChange={(e) => setNewAppt({...newAppt, description: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Reminder Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    {REMINDER_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setNewAppt({...newAppt, reminderOffset: opt.offset})}
                        className={cn(
                          "py-2.5 rounded-xl text-[10px] font-bold transition-all border",
                          newAppt.reminderOffset === opt.offset 
                            ? "bg-maternal-pink text-white border-maternal-pink shadow-md" 
                            : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full maternal-gradient text-white font-bold py-4 rounded-2xl shadow-lg shadow-maternal-pink/20 active:scale-95 transition-transform mt-4"
                >
                  Set Reminder
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {apptToDelete !== null && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-3xl bg-red-50 flex items-center justify-center mb-6 mx-auto">
                <Trash2 className="w-8 h-8 text-maternal-pink" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Delete Appointment?</h3>
              <p className="text-gray-500 text-sm text-center mb-8">
                Are you sure you want to remove this appointment? This action cannot be undone.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setApptToDelete(null)}
                  className="py-4 rounded-2xl font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteAppointment}
                  className="py-4 rounded-2xl font-bold text-white bg-maternal-pink shadow-lg shadow-maternal-pink/20 active:scale-95 transition-transform"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-gray-100 px-6 pt-4 pb-6 rounded-t-[36px] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.08)]">
          <div className="flex justify-between items-center">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="flex flex-col items-center gap-1.5 relative group"
                >
                  <div className={cn(
                    "p-1.5 rounded-xl transition-all duration-300",
                    isActive ? "text-maternal-pink" : "text-gray-300 group-hover:text-gray-400"
                  )}>
                    <Icon className={cn("w-5.5 h-5.5", isActive && "fill-maternal-pink/10")} />
                  </div>
                  <span className={cn(
                    "text-[8px] font-bold tracking-widest transition-colors",
                    isActive ? "text-maternal-pink" : "text-gray-300"
                  )}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-dot"
                      className="w-1 h-1 rounded-full bg-maternal-pink absolute -bottom-1"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
