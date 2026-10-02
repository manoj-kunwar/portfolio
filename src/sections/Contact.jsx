import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile.js";
import { fadeIn } from "../animations/variants.js";
import { WhatsAppIcon, GithubIcon, LinkedinIcon } from "../components/Icons.jsx";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  Loader2,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Spam protection honeypot
  });
  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Spam protection check
    if (formData.honeypot) {
      // Bot filled hidden field
      setStatus("success");
      return;
    }

    // 2. Validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus("error");
      setErrorMessage("Please enter a valid name (at least 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Please enter a detailed message (at least 10 characters).");
      return;
    }

    setStatus("submitting");

    // Simulate sending / preparing mailto dispatch
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const subject = encodeURIComponent(
        formData.subject.trim() || `Portfolio Inquiry from ${formData.name.trim()}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nSubject: ${formData.subject.trim() || "N/A"}\n\nMessage:\n${formData.message.trim()}`
      );

      // Open mailto fallback client
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        honeypot: "",
      });
    } catch {
      setStatus("error");
      setErrorMessage("Failed to initiate email dispatch. Please use direct email or WhatsApp below.");
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-indigo-500/30 text-xs font-mono text-cyan-400 shadow-sm">
            <Mail size={14} />
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Get In <span className="text-gradient-primary">Touch</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Interested in full-stack engineering roles, systems architecture, or technical collaboration? Reach out directly.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Verified Channels */}
          <motion.div
            variants={fadeIn("right", 0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Direct Information Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  Verified Contact Points
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">
                  Connect Directly
                </h3>
              </div>

              {/* Email Block with Copy */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Primary Email</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    <span>{copiedEmail ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors block font-mono"
                >
                  {profile.email}
                </a>
              </div>

              {/* Verified Links */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Professional Channels
                </span>

                <a
                  href="https://github.com/manoj-kunwar"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 transition-all text-xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:text-white">
                      <GithubIcon size={16} />
                    </div>
                    <div>
                      <span className="font-bold text-white block">GitHub</span>
                      <span className="text-[11px] text-slate-400 font-mono">github.com/manoj-kunwar</span>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-500 group-hover:text-cyan-300 transition-colors" />
                </a>

                <a
                  href="https://www.linkedin.com/in/manoj-kunwar56"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900/60 transition-all text-xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                      <LinkedinIcon size={16} />
                    </div>
                    <div>
                      <span className="font-bold text-white block">LinkedIn</span>
                      <span className="text-[11px] text-slate-400 font-mono">linkedin.com/in/manoj-kunwar56</span>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </a>

                <a
                  href={`https://wa.me/${profile.phoneRaw}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900/60 transition-all text-xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <WhatsAppIcon size={16} />
                    </div>
                    <div>
                      <span className="font-bold text-white block">WhatsApp Direct</span>
                      <span className="text-[11px] text-slate-400 font-mono">{profile.phone}</span>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Message Form */}
          <motion.div
            variants={fadeIn("left", 0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden shadow-2xl space-y-6">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500" />

              <div>
                <h3 className="font-heading font-bold text-2xl text-white">
                  Send a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Fill in your details below to initiate direct email correspondence.
                </p>
              </div>

              {/* Status Alert */}
              {status === "success" && (
                <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span>Inquiry Prepared Successfully!</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Your email client should open with your pre-filled inquiry. You can also reach Manoj directly at{" "}
                    <strong className="text-white font-mono">{profile.email}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-xs font-mono underline text-emerald-400 hover:text-white pt-1"
                  >
                    Send another message
                  </button>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 flex items-start gap-2.5 text-xs">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot field (hidden for spam bot protection) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-mono text-slate-300 font-medium">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      placeholder="e.g. Alex Smith"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors disabled:opacity-50"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-mono text-slate-300 font-medium">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-mono text-slate-300 font-medium">
                    Subject / Project Context
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    placeholder="Full-Stack Role / Platform Inquiry"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-mono text-slate-300 font-medium">
                    Message Details <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    placeholder="Hello Manoj, we reviewed your work on CareOS and would like to discuss..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none disabled:opacity-50"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3.5 px-6 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-cyan-600 to-purple-600 shadow-glowPrimary hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Dispatching Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Direct Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
