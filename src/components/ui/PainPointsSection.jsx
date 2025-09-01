import React from 'react';

// O ícone é recebido como uma prop 'icon'.
// Para renderizá-lo como um componente, atribuímos a uma variável com a primeira letra maiúscula (PascalCase).
const PainPointCard = ({ icon: Icon, title, description }) => (
   <div
    className="group relative flex h-full flex-col rounded-2xl bg-slate-900/60 p-8
               backdrop-blur-sm transition-all duration-400 ease-in-out
               border border-white/10 hover:border-[#ff6d4d]/80 hover:bg-slate-900/80
               hover:-translate-y-2"
  >
    {/* Efeito de brilho no hover */}
    <div
      className="absolute top-0 left-0 h-full w-full rounded-2xl
                 bg-gradient-to-tr from-transparent via-[#ff6d4d]/10 to-transparent
                 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    ></div>

    {/* Conteúdo do cartão */}
    <div className="relative z-10 flex h-full flex-col items-center text-center">
      {/* Container do Ícone */}
      <div
        className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#ff6d4d]/15 to-transparent p-4
                   shadow-lg shadow-black/20 transition-all duration-300
                   group-hover:scale-110 group-hover:shadow-[#ff6d4d]/30"
      >
        <Icon className="h-8 w-8 text-[#ff6d4d]" aria-hidden="true" />
      </div>

      {/* Título */}
      <h3 className="mt-6 text-xl font-bold text-white tracking-tight">
        {title}
      </h3>

      {/* Descrição */}
      <p className="mt-3 text-base leading-relaxed text-slate-400 flex-grow">
        {description}
      </p>
    </div>
  </div>
);

const PainPointsSection = ({ painPoints, sectionTitle, sectionSubtitle, className }) => {
  // Removi o useEffect daqui, pois a animação GSAP já está sendo controlada na página principal.
  // Manter duas lógicas de animação para os mesmos elementos poderia causar conflitos.
  
  return (
   <div className={`py-24 sm:py-32 bg-slate-800/20 ${className || ''}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {sectionTitle}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            {sectionSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {painPoints.map(({ icon, title, description }) => (
            <PainPointCard 
              key={title} 
              icon={icon} 
              title={title} 
              description={description} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PainPointsSection;