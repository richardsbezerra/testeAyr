export default function ServiceCard({ icon, title, description }) {
  return (
    <div className="group h-full w-full rounded-xl shadow-2xl bg-slate-800/20 backdrop-blur-md border border-white/10 transition-all duration-300 hover:border-[#ff6d4d] hover:-translate-y-2">
      <div className="flex h-[380px] w-full flex-col items-center justify-center p-8 text-center">
        {icon}
        <h3 className="mt-6 text-2xl font-semibold text-white tracking-tight">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-slate-300">
          {description}
        </p>
      </div>
    </div>
  );
}