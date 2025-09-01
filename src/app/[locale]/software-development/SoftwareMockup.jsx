'use client';

import React, { memo, useMemo, useState, useCallback, Suspense } from 'react';
import {
  FaRegChartBar, FaTasks, FaInbox, FaCog, FaUserCircle, FaBell, FaPlus,
  FaFlag, FaRegCircle, FaCheckCircle, FaEllipsisV, FaSpinner, FaRegPaperPlane,
  FaBars, FaTimes
} from "react-icons/fa";
import { Cell } from 'recharts'; // mantém só o que usamos diretamente
import { useTranslations } from 'next-intl';

/* --- CONSTANTES --- */
const getKpiData = (t) => [
  { name: t('mockup.chart.months.jan'), value: 2400, color: '#8884d8' },
  { name: t('mockup.chart.months.feb'), value: 1398, color: '#83a6ed' },
  { name: t('mockup.chart.months.mar'), value: 9800, color: '#8dd1e1' },
  { name: t('mockup.chart.months.apr'), value: 3908, color: '#82ca9d' },
  { name: t('mockup.chart.months.may'), value: 4800, color: '#a4de6c' },
  { name: t('mockup.chart.months.jun'), value: 3800, color: '#d0ed57' },
];

const PRIORITY_STYLES = {
  'Alta': 'text-red-500',
  'Média': 'text-yellow-500',
  'Baixa': 'text-sky-500',
};

const STATUS_STYLES = {
  'Concluído': { Icon: FaCheckCircle, className: 'text-green-500' },
  'Em Progresso': { Icon: FaSpinner, className: 'text-blue-500 animate-spin' },
  'Pendente': { Icon: FaRegPaperPlane, className: 'text-slate-500' },
};

const TOOLTIP_STYLE = {
  background: 'rgba(30, 41, 59, 0.9)',
  borderColor: 'rgba(255, 255, 255, 0.06)',
  backdropFilter: 'blur(6px)',
  borderRadius: '0.5rem'
};

const CHART_STYLE = { height: 'min(28vh, 280px)' };

/* --- Lazy-load do ChartBlock (reduz bundle inicial) --- */
const ChartBlock = React.lazy(() => import('@/app/[locale]/software-development/ChartBlock'));

/* --- COMPONENTES --- */
const KpiCard = memo(({ kpi, t }) => {
  const changeClass = kpi.changeType === 'increase' ? 'text-green-400' : 'text-red-400';
  return (
    <div className="bg-slate-800/50 border border-white/6 rounded-xl p-3 sm:p-4 hover:shadow-lg transition">
      <h3 className="text-slate-400 text-xs sm:text-sm font-medium">{kpi.title}</h3>
      <p className="text-lg sm:text-2xl font-bold text-white mt-1">{kpi.value}</p>
      <p className={`text-xs mt-1 ${changeClass}`}>
        {kpi.change} {t('mockup.kpis.vsLastMonth')}
      </p>
    </div>
  );
});

const TaskItem = memo(({ task, onToggle, t }) => {
  const status = STATUS_STYLES[task.status];
  const StatusIcon = status?.Icon ?? null;
  
  return (
    <div className="group flex items-center justify-between p-2 sm:p-3 bg-slate-900/50 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer">
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          aria-label={task.completed ? t('mockup.tasks.markAsNotCompleted') : t('mockup.tasks.markAsCompleted')}
          className="text-slate-400"
          onClick={(e) => { e.stopPropagation(); onToggle(task.id); }}
        >
          {task.completed ? <FaCheckCircle className="text-purple-500" /> : <FaRegCircle className="group-hover:text-white" />}
        </button>

        <div>
          <p className={`text-sm ${task.completed ? 'text-slate-500 line-through' : 'text-slate-200 group-hover:text-white'}`}>
            {task.title}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
            <FaFlag className={PRIORITY_STYLES[task.priority]} />
            <span>{task.priority}</span>
            <span className="hidden sm:inline text-slate-600">&middot;</span>
            {StatusIcon && <StatusIcon className={`${status.className}`} />}
            <span className="truncate max-w-[8rem]">{task.status}</span>
          </div>
        </div>
      </div>

      <button aria-label={t('mockup.tasks.taskOptions')} className="text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <FaEllipsisV />
      </button>
    </div>
  );
});

/* --- PRINCIPAL --- */
function SoftwareMockupInner() {
  const t = useTranslations('SoftwareDevelopmentPage');
  const [mobileOpen, setMobileOpen] = useState(false);
  const KPI_DATA = useMemo(() => getKpiData(t), [t]);
  
  // Dados que dependem de tradução - movidos para dentro do componente
  const TASKS_INITIAL = useMemo(() => [
    { 
      id: 'req-cliente-x', 
      title: t('mockup.tasks.items.clientAnalysis'), 
      status: t('mockup.tasks.status.inProgress'), 
      priority: t('mockup.tasks.priority.high'), 
      completed: false 
    },
    { 
      id: 'mod-faturamento', 
      title: t('mockup.tasks.items.billingModule'), 
      status: t('mockup.tasks.status.completed'), 
      priority: t('mockup.tasks.priority.medium'), 
      completed: true 
    },
  ], [t]);

  const KPIS = useMemo(() => [
    { 
      id: 'roi', 
      title: t('mockup.kpis.items.projectRoi'), 
      value: '+120%', 
      change: '+15%', 
      changeType: 'increase' 
    },
    { 
      id: 'efic', 
      title: t('mockup.kpis.items.operationalEfficiency'), 
      value: '↑ 45%', 
      change: '+5%', 
      changeType: 'increase' 
    },
    { 
      id: 'tarefas', 
      title: t('mockup.kpis.items.completedTasks'), 
      value: '82', 
      change: '-3', 
      changeType: 'decrease' 
    },
  ], [t]);

  const [tasks, setTasks] = useState(() => TASKS_INITIAL);

  // Atualiza tasks quando TASKS_INITIAL mudar (mudança de idioma)
  React.useEffect(() => {
    setTasks(TASKS_INITIAL);
  }, [TASKS_INITIAL]);

  // toggle do mobile menu — useCallback para referência estável
  const handleToggleMobile = useCallback(() => setMobileOpen(v => !v), []);

  // toggle completo/incompleto (recebe id) — estável
  const handleToggleTask = useCallback((id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);

  // kpiCards e taskItems memoizados
  const kpiCards = useMemo(() => 
    KPIS.map(k => <KpiCard key={k.id} kpi={k} t={t} />), 
    [KPIS, t]
  );
  
const taskItems = useMemo(() => 
  tasks.map(task => <TaskItem key={task.id} task={task} onToggle={handleToggleTask} t={t} />), 
  [tasks, handleToggleTask, t]
);

  return (
    <div className="dashboard-root flex justify-center items-start py-6 sm:py-10 bg-[#000d2e] min-h-screen">
      <div className="dashboard-container w-full max-w-[1400px] rounded-2xl shadow-[0_20px_80px_rgba(74,0,224,0.25)] overflow-hidden bg-slate-900/70 backdrop-blur-xl border border-white/6 flex flex-col md:flex-row font-sans">

        {/* SIDEBAR / TOPBAR */}
        <aside className={`
            sidebar
            md:w-20 lg:w-24
            w-full md:w-auto
            bg-black/20 p-2 sm:p-3
            flex md:flex-col items-center justify-between gap-3 md:gap-6
            border-b md:border-b-0 md:border-r border-white/5
            transition-all
          `}>
          <div className="w-full flex items-center justify-between md:flex-col md:items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-600 rounded-lg">
                <FaRegChartBar className="text-white text-lg sm:text-xl" />
              </div>
              <span className="sr-only">{t('mockup.sidebar.dashboard')}</span>
            </div>

            <button
              onClick={handleToggleMobile}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t('mockup.sidebar.closeMenu') : t('mockup.sidebar.openMenu')}
              className="md:hidden p-2 rounded-md text-slate-200 hover:bg-slate-800/40"
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <nav className="hidden md:flex md:flex-col gap-3 sm:gap-5">
            <a className="p-2 sm:p-3 bg-slate-700/50 rounded-lg text-purple-400"><FaRegChartBar className="text-lg sm:text-xl" /></a>
            <a className="p-2 sm:p-3 text-slate-400 hover:bg-slate-700/50 rounded-lg"><FaTasks className="text-lg sm:text-xl" /></a>
            <a className="p-2 sm:p-3 text-slate-400 hover:bg-slate-700/50 rounded-lg"><FaInbox className="text-lg sm:text-xl" /></a>
            <a className="p-2 sm:p-3 text-slate-400 hover:bg-slate-700/50 rounded-lg"><FaCog className="text-lg sm:text-xl" /></a>
          </nav>

          <div className="hidden md:block mt-auto">
            <FaUserCircle className="text-slate-500 text-2xl sm:text-3xl" />
          </div>
        </aside>

        {/* MOBILE NAV (aparece quando mobileOpen=true) */}
        {mobileOpen && (
          <div className="md:hidden bg-slate-900/95 border-b border-white/6 p-3 absolute inset-x-0 top-[64px] z-40">
            <nav className="flex gap-3">
              <a className="p-2 bg-slate-700/50 rounded-lg text-purple-400"><FaRegChartBar /></a>
              <a className="p-2 text-slate-400 hover:bg-slate-700/50 rounded-lg"><FaTasks /></a>
              <a className="p-2 text-slate-400 hover:bg-slate-700/50 rounded-lg"><FaInbox /></a>
              <a className="p-2 text-slate-400 hover:bg-slate-700/50 rounded-lg"><FaCog /></a>
            </nav>
          </div>
        )}

        {/* CONTEÚDO */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto text-white min-h-[420px]">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-[clamp(1.25rem,2vw,1.875rem)] font-bold">
                {t('mockup.header.title')}
              </h1>
              <p className="text-slate-400 text-sm sm:text-base">
                {t('mockup.header.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="p-2 rounded-lg bg-slate-800/70">
                <FaBell className="text-slate-300" />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 sm:px-4 rounded-lg bg-purple-600">
                <FaPlus size={12} />
                <span className="text-sm">{t('mockup.header.newTask')}</span>
              </button>
            </div>
          </header>

          {/* KPIs responsivos */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
            {kpiCards}
          </section>

          {/* Gráfico + Tarefas */}
          <section className="grid grid-cols-1 xl:grid-cols-5 gap-3 sm:gap-4">
            <Suspense fallback={
              <div className="lg:col-span-3 bg-slate-800/50 border border-white/6 rounded-xl p-3 sm:p-5">
                <div style={CHART_STYLE} className="w-full flex items-center justify-center">
                  <div className="animate-pulse w-3/4 h-6 bg-slate-700 rounded" />
                </div>
              </div>
            }>
              <ChartBlock data={KPI_DATA} chartStyle={CHART_STYLE} CellComponent={Cell} tooltipStyle={TOOLTIP_STYLE} />
            </Suspense>

            <div className="xl:col-span-2 bg-slate-800/50 border border-white/6 rounded-xl p-3 sm:p-5 flex flex-col min-w-[260px]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base sm:text-lg font-semibold truncate">
                  {t('mockup.tasks.priorityTasks')}
                </h3>
                <a className="text-sm text-purple-400 whitespace-nowrap">
                  {t('mockup.tasks.viewAll')}
                </a>
              </div>
              <div className="space-y-2 sm:space-y-3 overflow-hidden">
                {taskItems}
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* MEDIA QUERY ESPECIAL PARA RESOLUÇÕES PARECIDAS A 1280x800 */}
      <style jsx global>{`
        /* Ajustes finos para notebooks com altura limitada (ex.: 1280x800) */
        @media (min-width: 1200px) and (max-width: 1366px) and (min-height: 720px) and (max-height: 840px) {
          .dashboard-root { padding-top: 12px; padding-bottom: 12px; }
          .dashboard-container { max-width: 1280px !important; border-radius: 14px; }
          .sidebar { width: 56px !important; } /* sidebar mais compacta */
          .sidebar .p-2 { padding: 6px !important; }
          main { padding: 16px !important; }
          h1 { font-size: 1.35rem !important; }
          h3 { font-size: 0.98rem !important; }
          .dashboard-container .gap-4 { gap: 10px !important; }
          .dashboard-container .gap-6 { gap: 12px !important; }
          /* reduzir altura do gráfico pra caber melhor verticalmente */
          .dashboard-container div[style*="min(28vh, 280px)"] { height: 180px !important; }
          .dashboard-container .min-h-\\[420px\\] { min-height: 380px !important; }
        }

        /* Caso a tela seja estreita em altura (laptops de 768-820px altura) */
        @media (max-height: 760px) {
          .dashboard-root { padding-top: 8px; padding-bottom: 8px; }
          .dashboard-container { border-radius: 12px; }
          main { padding-top: 12px !important; padding-bottom: 12px !important; }
        }

        /* reduzir gaps em resoluções intermediárias para evitar cartões minúsculos */
        @media (min-width: 900px) and (max-width: 1199px) {
          .dashboard-container { max-width: 1100px !important; }
          .dashboard-container .grid-cols-3 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }

        @media (max-width: 1280px) {
          .xl\:grid-cols-5 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default memo(SoftwareMockupInner);