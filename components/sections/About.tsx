"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap, Briefcase, Rocket, Code2 } from "lucide-react";
import { profile } from "@/content/profile";
import { useInView } from "@/hooks/useInView";

const STATS = [
  { value: "6+", label: "Projects built", icon: <Rocket size={16} className="text-accent-500" aria-hidden="true" /> },
  { value: "2", label: "Internships / Trainings", icon: <Briefcase size={16} className="text-blue-500" aria-hidden="true" /> },
  { value: "4+", label: "Hackathons", icon: <Code2 size={16} className="text-purple-500" aria-hidden="true" /> },
  { value: "7.7", label: "CGPA / 10", icon: <GraduationCap size={16} className="text-orange-500" aria-hidden="true" /> },
];

export function About() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
  };

  return (
    <section id="about" className="section-padding relative overflow-hidden" aria-labelledby="about-heading">
      {/* Top right accent */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-max relative z-10">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            custom={0}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-accent-600 dark:text-accent-400 text-sm font-semibold uppercase tracking-widest mb-3"
          >
            About me
          </motion.p>
          <motion.h2
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            id="about-heading"
            className="heading-lg text-slate-900 dark:text-slate-100 mb-12"
          >
            A little about <span className="gradient-text">Shifa</span>
          </motion.h2>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Bio — takes 3 cols */}
            <div className="lg:col-span-3 space-y-5 text-slate-600 dark:text-slate-400 leading-relaxed">
              <motion.p
                custom={2}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                I&apos;m a final-year{" "}
                <strong className="text-slate-800 dark:text-slate-200">
                  B.Tech student in Electronics and Computer Engineering
                </strong>{" "}
                at PES College of Engineering, Chhatrapati Sambhajinagar (BATU), graduating in 2026 with a CGPA of 7.7/10.
              </motion.p>
              <motion.p
                custom={3}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                My passion lives at the intersection of{" "}
                <strong className="text-slate-800 dark:text-slate-200">
                  AI/ML, full-stack development and quality assurance
                </strong>
                . I build end-to-end projects — training models, shipping them behind FastAPI or React, and writing the tests for them.
              </motion.p>
              <motion.p
                custom={4}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                I&apos;m actively seeking fresher roles in{" "}
                {profile.openToRoles.map((r, i) => (
                  <span key={r}>
                    <strong className="text-accent-700 dark:text-accent-400">{r}</strong>
                    {i < profile.openToRoles.length - 1 ? ", " : "."}
                  </span>
                ))}
              </motion.p>

              {/* Community pills */}
              <motion.div
                custom={5}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="flex flex-wrap gap-2 pt-2"
              >
                {profile.community.map((item) => (
                  <span key={item} className="badge-muted">
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Stats grid — takes 2 cols */}
            <motion.div
              custom={3}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="lg:col-span-2 grid grid-cols-2 gap-4"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="card-base card-hover text-center flex flex-col items-center gap-2 py-6"
                >
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80">
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold gradient-text-subtle">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}

              {/* Location card */}
              <div className="col-span-2 card-base card-hover flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-accent-500/10">
                  <MapPin size={18} className="text-accent-500" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Location</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{profile.location}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
