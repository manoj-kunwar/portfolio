import { profile, navLinks } from "../constants/data.js";
import { GithubIcon, LinkedinIcon, FacebookIcon, WhatsAppIcon, InstagramIcon } from "../components/Icons.jsx";
import GsapMagnetic from "../components/GsapMagnetic.jsx";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";

export default function Footer() {

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const socialIconsMap = {
    Linkedin: <LinkedinIcon size={18} />,
    Github: <GithubIcon size={18} />,
    Mail: <Mail size={18} className="text-red-500 dark:text-red-400" />,
    WhatsApp: <WhatsAppIcon size={18} className="text-emerald-500 dark:text-emerald-400" />,
    Facebook: <FacebookIcon size={18} className="text-blue-500 dark:text-blue-400" />,
    Instagram: <InstagramIcon size={18} className="text-pink-500 dark:text-pink-400" />,
  };

  return (
    <footer className="relative bg-slate-100 dark:bg-[#070C18] border-t border-slate-300 dark:border-slate-800/80 pt-16 pb-12 overflow-hidden transition-colors">
      {/* Background ambient radial lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-44 bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Brand Info & Status */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-cyan-500 to-purple-500 p-0.5 shadow-glowPrimary">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center font-heading font-extrabold text-base text-white">
                  MK
                </div>
              </div>
              <span className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
                {profile.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              MERN Stack & Full Stack Engineer specializing in production web applications, sub-300ms APIs, real-time WebRTC communications, and algorithmic problem solving.
            </p>
          </div>

          {/* Column 2: Navigation Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-bold flex items-center gap-1.5">
              <Sparkles size={14} className="text-cyan-500" />
              Navigation Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left py-1 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Direct Contact & Social Connections */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-bold flex items-center gap-1.5">
              <Mail size={14} className="text-indigo-500" />
              Direct Contacts
            </h4>

            <div className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
              >
                <Mail size={14} className="text-red-500 dark:text-red-400 shrink-0" />
                <span>{profile.email}</span>
              </a>

              <a
                href={`https://wa.me/${profile.phoneRaw}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
              >
                <Phone size={14} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>{profile.phone}</span>
              </a>

              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <MapPin size={14} className="text-indigo-500 dark:text-indigo-400 shrink-0" />
                <span>{profile.location}</span>
              </div>
            </div>

            {/* Social Links Bar with Instagram */}
            <div className="flex items-center flex-wrap gap-2 pt-2">
              {profile.socials.map((social) => (
                <GsapMagnetic key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="p-2.5 rounded-xl glass-card text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:border-indigo-500/50 hover:scale-110 transition-all block shadow-sm"
                  >
                    {socialIconsMap[social.icon] || null}
                  </a>
                </GsapMagnetic>
              ))}
            </div>

          </div>

        </div>



      </div>
    </footer>
  );
}
