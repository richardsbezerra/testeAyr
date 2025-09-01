"use client";

import { useState } from "react";
import {
  HiOutlineNewspaper,
  HiOutlineQuestionMarkCircle,
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineLightBulb,
  HiOutlineDevicePhoneMobile,
  HiOutlineGlobeAlt,
  HiOutlineCog,
  HiOutlineUserGroup,
  HiOutlineSparkles,
  HiOutlineChevronRight,
} from "react-icons/hi2";

const icons = {
  'blog': HiOutlineNewspaper,
  'faq': HiOutlineQuestionMarkCircle,
  'support-center': HiOutlineLightBulb,
  'vacancies': HiOutlineBriefcase,
  'become-a-partner': HiOutlineUsers,
  'saas': HiOutlineSparkles,
  'software-development': HiOutlineLightBulb,
  'corporate-solutions': HiOutlineUserGroup,
  'web-development': HiOutlineGlobeAlt,
  'integrations-and-automations': HiOutlineCog,
  'mobile-application-creation': HiOutlineDevicePhoneMobile,
};

function getIconByHref(href = '') {
  const key = href.startsWith('/') ? href.slice(1) : href;
  return icons[key] || HiOutlineChevronRight;
}

const DropdownLink = ({ link, getIconByKey }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      
      {/* BOTÃO DO DROPDOWN - EXATAMENTE COMO ORIGINAL */}
      <button
        className="text-white font-medium relative group flex items-center gap-2 text-lg transition-all duration-300"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{link.label}</span>
        <svg
          className={`h-4 w-4 transition-transform duration-300 group-hover:rotate-180 ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ff6d4d] to-pink-500 transition-all duration-300 group-hover:w-full"></span>
      </button>

      {/* CONTEÚDO DO DROPDOWN - IGUAL AO ORIGINAL */}
      {isOpen && (
        <div className="absolute top-full left-0 pt-4 z-50 animate-fade-up">
          <div className=" 
w-[600px] p-4 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-blue-950/95 to-slate-800/95 backdrop-blur-lg shadow-2xl transition-all duration-300
">
            <ul className="grid grid-cols-2 gap-3">
              {link.items.map((item) => {
                const Icon = getIconByHref(item.href);
                return (
                  <li key={item.label}>
                    <a
                      href={item.href || "#"}
                      className="flex items-start gap-3 p-3 rounded-xl group hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
                    >
                      <Icon className="text-[#ff6d4d] mt-1 shrink-0 w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:text-pink-500" />
                      <div>
                        <p className="font-semibold text-white leading-tight group-hover:text-pink-400 transition-colors">
                          {item.label}
                        </p>
                        <p className="text-sm text-slate-300">{item.description}</p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownLink;
