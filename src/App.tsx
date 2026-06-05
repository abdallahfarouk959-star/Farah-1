import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // لو شغال بمكتبة motion/react غير الإستيراد ليها فقط
import { MapPin, Calendar, Heart, MessageSquare } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date("2026-06-18T18:00:00").getTime();

export default function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // حساب العداد التنازلي
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = TARGET_DATE - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // التحكم في السكرول لمنع النزول قبل فتح المظروف
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const formatNum = (num: number): string => num.toString().padStart(2, "0");

  // تحريكات الظهور التتابعي للأقسام داخل الدعوة
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div
      className="min-h-screen bg-[#051611] text-[#f4ecd8] font-sans select-none overflow-x-hidden relative selection:bg-[#d4af37] selection:text-[#051611]"
      dir="rtl"
    >
      {/* ==================== ✉️ البوابة الأولى: المظروف الملكي المقفول ==================== */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.1,
              transition: { duration: 1.2, ease: [0.77, 0, 0.18, 1] },
            }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-[#030f0b] via-[#051611] to-[#0a2e24] flex flex-col items-center justify-center p-4"
          >
            {/* جملة ترحيبية علوية علوية */}
            <div className="text-center absolute top-[15%] space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="font-serif text-[#d4af37] text-2xl tracking-widest italic"
              >
                You are cordially invited to witness
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-xs uppercase tracking-[0.4em] text-[#fbf4e6]/60"
              >
                The Golden Beginning
              </motion.div>
            </div>

            {/* المظروف التفاعلي الفاخر */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              onClick={() => setIsOpen(true)}
              className="relative w-[85%] max-w-[340px] aspect-[1.5/1] bg-gradient-to-br from-[#f4ecd8] to-[#e6d9b8] rounded-2xl shadow-[0_35px_70px_rgba(0,0,0,0.7)] cursor-pointer group border border-amber-400/20 flex items-center justify-center"
            >
              {/* ظل وتأثير بؤري داخلي للمظروف */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(5,22,17,0.06),transparent_70%)] rounded-2xl pointer-events-none"></div>

              {/* الختم الشمعي الملكي الملوكي */}
              <div className="z-20 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
                <svg className="w-[80px] h-[80px]" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="url(#waxGrad)"
                    stroke="#d4af37"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="0.5"
                    opacity="0.4"
                    strokeDasharray="3,3"
                  />
                  <text
                    x="38"
                    y="58"
                    textAnchor="middle"
                    fontFamily="serif"
                    fontSize="24"
                    fontWeight="bold"
                    fill="#f4ecd8"
                  >
                    A
                  </text>
                  <text
                    x="50"
                    y="54"
                    textAnchor="middle"
                    fontStyle="italic"
                    fontFamily="sans-serif"
                    fontSize="16"
                    fill="#d4af37"
                  >
                    &
                  </text>
                  <text
                    x="62"
                    y="58"
                    textAnchor="middle"
                    fontFamily="serif"
                    fontSize="24"
                    fontWeight="bold"
                    fill="#f4ecd8"
                  >
                    F
                  </text>
                  <defs>
                    <radialGradient id="waxGrad" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#1e5142" />
                      <stop offset="65%" stopColor="#0a2e24" />
                      <stop offset="100%" stopColor="#030f0b" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            {/* زر الفتح المضيء */}
            <motion.button
              onClick={() => setIsOpen(true)}
              className="absolute bottom-[20%] px-10 py-3.5 border border-[#d4af37] text-[#d4af37] tracking-[0.4em] text-xs uppercase hover:bg-[#d4af37] hover:text-[#051611] transition-all duration-500 rounded-lg font-bold shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            >
              OPEN INVITATION
            </motion.button>

            {/* تأثير الشموع الفاخرة بالأسفل */}
            <div className="absolute bottom-[6%] w-full flex justify-center gap-10 pointer-events-none opacity-80">
              {[0, 0.3, 0.6, 0.9].map((delay, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.06, 0.95, 1.05, 1],
                      rotate: [-3, 2, -1, 3, 0],
                      opacity: [0.9, 1, 0.8, 1, 0.9],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.6,
                      delay: -delay,
                      ease: "easeInOut",
                    }}
                    className="w-2.5 h-4 bg-gradient-to-b from-[#fff5cc] via-[#d4af37] to-transparent rounded-full origin-bottom mb-0.5"
                  />
                  <div className="w-3 h-10 bg-gradient-to-b from-[#e6d9b8] via-[#a39468] to-[#544a2e] rounded-sm relative"></div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== 👑 المسرح الرئيسي للدعوة الملوكية ==================== */}
      {/* عناصر زخرفية متطايرة في الخلفية (خلفية حية لأوراق ذهبية وورد) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: ["-10vh", "110vh"],
              x: [
                `${Math.random() * 100}vw`,
                `${Math.random() * 100 + (i % 2 === 0 ? 50 : -50)}vw`,
              ],
              rotate: [0, 360],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 10 + 12,
              delay: Math.random() * -10,
              ease: "linear",
            }}
            className="absolute w-3 h-3 bg-gradient-to-br from-[#d4af37] to-[#aa841e] rounded-br-full rounded-tl-full"
          />
        ))}
      </div>

      <div
        className={`w-full max-w-[480px] mx-auto bg-gradient-to-b from-[#051611] via-[#08241c] to-[#03100c] min-h-screen shadow-[0_0_80px_rgba(0,0,0,0.8)] relative z-10 px-6 py-16 flex flex-col items-center justify-center transition-opacity duration-1000 ${isOpen ? "opacity-100" : "opacity-0"}`}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isOpen ? "show" : "hidden"}
          className="w-full space-y-8 text-center flex flex-col items-center"
        >
          {/* سيكشن الهيدر الملكي بعد ضبط الكلمة وتنظيفها 100% */}
          <motion.div
            variants={itemVariants}
            className="space-y-3 w-full flex flex-col items-center"
          >
            <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#d4af37] font-medium opacity-90 block">
              ✦ دعـوة حـفـل زفـاف ✦
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-2"></div>
          </motion.div>

          {/* سيكشن الأسماء الأيقوني بتصميم ذهبي متوهج */}
          <motion.div variants={itemVariants} className="space-y-4 py-4 w-full">
            <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-wide leading-tight text-[#fbf4e6] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              عبدالرحمن
              <span className="block my-3 font-sans italic text-4xl text-[#d4af37] animate-pulse">
                &
              </span>
              فاطمة
            </h1>
            <p className="text-[#f4ecd8]/70 text-sm md:text-base max-w-xs mx-auto leading-relaxed font-serif italic">
              "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
              لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"
            </p>
          </motion.div>

          {/* زينة فاخرة بشكل قلب نابض */}
          <motion.div variants={itemVariants} className="relative py-2">
            <Heart className="w-8 h-8 text-[#d4af37] fill-[#d4af37]/10 animate-ping absolute inset-0 m-auto opacity-40" />
            <Heart className="w-8 h-8 text-[#d4af37] fill-[#d4af37]/20 relative z-10" />
          </motion.div>

          {/* الكلمة الترحيبية الدافئة */}
          <motion.p
            variants={itemVariants}
            className="text-[#f4ecd8]/90 text-base md:text-lg px-4 leading-relaxed"
          >
            بكل حب وسعادة، نتشرف بدعوتكم لمشاركتنا فرحتنا بأجمل ليالي العمر
            وتوثيق عهد وفائنا. حضوركم يكتمل به أنسنا وبناؤنا 🤍
          </motion.p>

          {/* ⏳ العداد التنازلي الزجاجي الزمردي الأنيق جداً */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-3 text-center my-6 w-full max-w-sm"
            dir="ltr"
          >
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.minutes },
              { label: "Secs", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white/[0.04] to-amber-400/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl py-4 px-1 min-w-[76px] sm:min-w-[84px] shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-transform hover:scale-105 duration-300"
              >
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#d4af37] block leading-none tracking-wide">
                  {formatNum(item.value)}
                </span>
                <span className="text-[9px] text-[#f4ecd8]/50 uppercase tracking-[0.2em] font-medium block mt-2">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* 📍 كارت تفاصيل ومكان حفل الزفاف الزجاجي المجسم */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-sm bg-gradient-to-tr from-white/[0.03] to-amber-400/[0.05] backdrop-blur-2xl rounded-3xl p-8 border border-[#d4af37]/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] space-y-6 relative overflow-hidden group"
          >
            {/* لمعة داخلية خفيفة */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

            <div className="space-y-5">
              {/* سطر التاريخ الملكي */}
              <div className="flex items-center gap-4 text-right justify-start">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center shrink-0 border border-[#d4af37]/20">
                  <Calendar className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[#f4ecd8]/50 uppercase tracking-widest block">
                    الـتـاريـخ
                  </span>
                  <span className="text-base sm:text-17px font-bold font-serif text-[#fbf4e6]">
                    الخميس، 18 يونيو 2026
                  </span>
                </div>
              </div>

              {/* خط فاصل أنيق */}
              <div className="h-[1px] bg-gradient-to-r from-[#d4af37]/20 via-transparent to-transparent w-full"></div>

              {/* سطر مكان القاعة */}
              <div className="flex items-center gap-4 text-right justify-start">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center shrink-0 border border-[#d4af37]/20">
                  <MapPin className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[#f4ecd8]/50 uppercase tracking-widest block">
                    الـمـكـان
                  </span>
                  <span className="text-base sm:text-17px font-bold font-serif text-[#fbf4e6]">
                    قاعة شهرزاد - أسوان
                  </span>
                </div>
              </div>
            </div>

            {/* زرار اللوكيشن الأسطوري المجوف بتصميم نيون هادئ */}
            <a
              href="https://maps.google.com/?cid=4295941358937703337"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-6 bg-transparent hover:bg-[#d4af37] text-[#d4af37] hover:text-[#051611] font-medium tracking-wider transition-all duration-500 py-3.5 rounded-xl border border-[#d4af37]/40 block text-center shadow-[0_0_20px_rgba(212,175,55,0.05)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.2)] text-xs uppercase"
            >
              • عـرض مـوقـع الـقـاعـة لايـف •
            </a>
          </motion.div>

          {/* الخاتمة الملكية الفخمة */}
          <motion.div
            variants={itemVariants}
            className="pt-6 text-center space-y-1"
          >
            <div className="text-[10px] tracking-[0.4em] text-[#f4ecd8]/40 uppercase mt-2">
              • WITH LOVE •
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
