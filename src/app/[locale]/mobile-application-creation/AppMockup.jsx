'use client';

import Image from "next/image";
import { FaUser, FaCalendarAlt, FaTasks, FaInbox, FaCog } from "react-icons/fa";
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export default function AppMockup() {
  const t = useTranslations('AppMockup');
  
  const tasks = useMemo(() => [
    {
      title: t('tasks.items.financeRedesign.title'),
      desc: t('tasks.items.financeRedesign.description'),
      time: '12:00 PM',
      status: t('tasks.status.completed'),
      icon: <FaCalendarAlt className="text-white/70" />,
      badgeColor: 'bg-green-500'
    },
    {
      title: t('tasks.items.usabilityTest.title'),
      desc: t('tasks.items.usabilityTest.description'),
      time: '10:00 PM',
      status: t('tasks.status.inProgress'),
      icon: <FaCalendarAlt className="text-white/70" />,
      badgeColor: 'bg-yellow-400'
    },
    {
      title: t('tasks.items.alignmentMeeting.title'),
      desc: t('tasks.items.alignmentMeeting.description'),
      time: '11:00 PM',
      status: t('tasks.status.inProgress'),
      icon: <FaUser className="text-white/70" />,
      badgeColor: 'bg-yellow-400'
    }
  ], [t]);

  const days = useMemo(() => [
    { day: "23", weekday: t('calendar.weekdays.tue') },
    { day: "24", weekday: t('calendar.weekdays.wed') },
    { day: "25", weekday: t('calendar.weekdays.thu') },
    { day: "26", weekday: t('calendar.weekdays.fri') }
  ], [t]);

  return (
    <div className="flex justify-center items-center py-10">
      <div className="relative w-[350px] h-[700px] rounded-[2rem] shadow-[0_10px_60px_rgba(0,255,128,0.2)] overflow-hidden p-4 bg-gradient-to-b from-emerald-400/30 via-emerald-500/10 to-emerald-600/30 backdrop-blur-xl border border-white/10">

        {/* Header */}
        <div className="flex items-center justify-between mb-5 text-white">
          <h1 className="text-lg font-bold">{t('header.title')}</h1>
          <span className="relative w-3 h-3 bg-red-500 rounded-full">
            <span className="absolute w-full h-full animate-ping bg-red-500 opacity-75 rounded-full"></span>
          </span>
        </div>

        {/* Datas */}
        <div className="flex justify-between mb-4">
          {days.map((item, idx) => (
            <div
              key={item.day}
              className={`flex flex-col items-center px-2 py-1 rounded-xl transition-all duration-200 ${
                item.day === "25"
                  ? "bg-white/20 text-white font-semibold"
                  : "text-white/70 hover:bg-white/10"
              }`}
            >
              <span className="text-xs">{t('calendar.month')}</span>
              <span className="text-base">{item.day}</span>
              <span className="text-xs">{item.weekday}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex justify-around mb-4 px-1 text-sm font-semibold text-white/80">
          <button className="bg-emerald-500/80 text-white px-3 py-1 rounded-full shadow-sm backdrop-blur-sm hover:brightness-110">
            {t('tabs.all')}
          </button>
          <button className="hover:text-white">{t('tabs.inProgress')}</button>
          <button className="hover:text-white">{t('tabs.completed')}</button>
        </div>

        {/* Lista de Tarefas */}
        <div className="flex flex-col gap-3 overflow-y-auto h-[470px] pr-1 custom-scrollbar">
          {tasks.map((task, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-lg p-3 rounded-xl shadow-md border border-white/10 transition-all text-white">
              <h2 className="text-sm font-semibold">{task.title}</h2>
              <p className="text-xs text-white/70">{task.desc}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-lime-300 font-semibold">{task.time}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${task.badgeColor} text-white px-2 py-0.5 rounded-full`}>
                    {task.status}
                  </span>
                  {task.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão flutuante */}
        <button 
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-lime-400/80 text-white w-14 h-14 rounded-full text-3xl flex items-center justify-center shadow-[0_0_15px_rgba(0,255,128,0.7)] hover:scale-105 transition-all"
          aria-label={t('floatingButton.label')}
        >
          +
        </button>

        {/* Menu Inferior */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-center bg-white/10 backdrop-blur-lg p-3 rounded-t-3xl shadow-inner border-t border-white/10">
          {[FaCalendarAlt, FaTasks, null, FaInbox, FaCog].map((Icon, idx) =>
            Icon ? (
              <Icon key={idx} className="text-lime-300 text-lg hover:scale-110 transition" />
            ) : (
              <span key={idx} className="w-10" />
            )
          )}
        </div>
      </div>
    </div>
  );
}