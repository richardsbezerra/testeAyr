"use client";
import React, { useRef, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ApproachSection({ id, title, description, items }) {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);

    const addToRefs = useCallback((el) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    }, []);

    const handleCardHover = useCallback((index, isHovering) => {
        if (cardRefs.current[index]) {
            gsap.to(cardRefs.current[index], {
                y: isHovering ? -10 : 0,
                boxShadow: isHovering
                    ? "0px 20px 30px rgba(0,0,0,0.2)"
                    : "0px 0px 0px rgba(0,0,0,0)",
                backgroundColor: isHovering
                    ? "rgba(30, 41, 59, 0.2)"
                    : "transparent",
                duration: 0.3,
                ease: "power2.out",
            });
        }
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(`#${id}-title, #${id}-p`, {
                opacity: 0,
                y: 50,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });

            gsap.from(`.${id}-card`, {
                opacity: 0,
                y: 40,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [id]);

    return (
        <div
            ref={sectionRef}
            id={`${id}-section`}
            className="py-24 sm:py-32 bg-slate-800/10"
        >
            <div className="container mx-auto px-8 lg:px-16">
                <div className="text-center mb-16">
                    <h2
                        id={`${id}-title`}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                    >
                        {title}
                    </h2>
                    <p
                        id={`${id}-p`}
                        className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto"
                    >
                        {description}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {items.map((item, index) => {
                        const icon = item.icon || item.Icon;
                        return (
                            <div
                                key={item.title}
                                ref={addToRefs}
                                onMouseEnter={() => handleCardHover(index, true)}
                                onMouseLeave={() => handleCardHover(index, false)}
                                className={`flex gap-6 items-start rounded-xl p-4 transition-colors duration-300 cursor-pointer ${id}-card`}
                            >
                                <div className="flex-shrink-0 p-3 bg-purple-500/10 rounded-lg">
                                    {icon && (
                                        React.isValidElement(icon)
                                            ? icon
                                            : typeof icon === 'function'
                                                ? <icon className="h-10 w-10 text-[#ff6d4d]" />
                                                : null
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1 text-slate-400">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
