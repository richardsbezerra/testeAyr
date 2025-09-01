"use client";

import React from 'react';

import FooterAry from '@/components/layout/FooterAry'

// --- ÍCONE ---
// Um ícone que representa "laboratório" ou "em desenvolvimento"
const BeakerIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.69a1.5 1.5 0 01-.67 1.282l-5.02 3.765A1.5 1.5 0 003 15.25v3.5a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5v-3.5a1.5 1.5 0 00-.56-1.109l-5.02-3.765a1.5 1.5 0 01-.67-1.282v-5.69a6.75 6.75 0 00-6-6.694H9.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15.25h18" />
    </svg>
);


export default function BlogComingSoonPage() {
    return (
        <div className="bg-[#000d2e] text-white">
            {/* Usamos min-h-screen e flex para centralizar o conteúdo perfeitamente na tela,
                ideal para uma página com pouca informação.
            */}
            <div className="relative isolate min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 lg:px-8">
                
                {/* Efeito de gradiente no fundo, mantendo a consistência visual */}
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#800080] to-[#4a00e0] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
                </div>
                
                {/* Ícone principal */}
                <BeakerIcon className="h-16 w-16 text-o[#ff6d4d]" />

                {/* Título */}
                <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    Nosso Blog está a caminho.
                </h1>

                {/* Texto descritivo */}
                <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl">
                    Estamos preparando um espaço incrível com artigos, insights e novidades sobre tecnologia, desenvolvimento de software e inovação. A ayrCore está cozinhando algo especial para você.
                </p>

                {/* Links para outras seções do site, para não ser um beco sem saída */}
                <div className="mt-12 flex items-center justify-center gap-x-6">
                    <a href="/" className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                        Voltar para o Início
                    </a>
                    <a href="/about-us" className="text-sm font-semibold leading-6 text-white hover:text-orange-300 transition-colors">
                        Conheça nossa história <span aria-hidden="true">→</span>
                    </a>
                </div>

            </div>
            <FooterAry />
        </div>
    );
}