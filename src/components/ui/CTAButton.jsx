"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const CTAButton = React.memo(({ href, children }) => {
  const buttonRef = useRef(null);
  const ballRef = useRef(null);
  const clickAnim = useRef(null);
  const isSmallScreenRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");

    const updateIsSmallScreen = () => {
      isSmallScreenRef.current = mq.matches;
      // Ajusta posição inicial/final da bola imediatamente para evitar glitches
      if (ballRef.current) {
        gsap.set(ballRef.current, {
          x: isSmallScreenRef.current ? "-130%" : "-200%",
        });
      }
    };
    updateIsSmallScreen();
    mq.addEventListener("change", updateIsSmallScreen);

    const EASE = "power2.out";
    const BTN_BG = "linear-gradient(90deg, #ff6d4d, #ff8d4d)";
    const SHADOW = "0 15px 30px rgba(255, 109, 77, 0.4)";

    // Rotação contínua da bola (loop infinito)
    const rotateBall = gsap.to(ballRef.current, {
      rotation: 360,
      duration: 5,
      ease: "linear",
      repeat: -1,
      overwrite: "auto",
    });

    let colorChanged = false;

    const colorAnim = gsap.to(buttonRef.current, {
      scale: 1.1,
      background: BTN_BG,
      color: "#fff",
      boxShadow: SHADOW,
      duration: 0.35,
      ease: EASE,
      paused: true,
    });

    // Valores dinâmicos para animação da bola
    const getBallStartX = () => (isSmallScreenRef.current ? "-130%" : "-200%");
    const getBallEndX = () => (isSmallScreenRef.current ? "810%" : "794%");

    const hoverAnim = gsap.timeline({ paused: true })
      .fromTo(
        ballRef.current,
        { x: getBallStartX() },
        {
          x: getBallEndX(),
          duration: 1.1,
          ease: "power4.inOut",
          onUpdate: () => {
            if (!colorChanged) {
              const ballX = gsap.getProperty(ballRef.current, "x");
              if (ballX >= 0) {
                colorAnim.play();
                colorChanged = true;
              }
            }
          },
        },
        0
      )
      .to(
        buttonRef.current,
        { scale: 1.1, duration: 0.35, ease: EASE },
        0
      );

    clickAnim.current = () => {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.95 },
        { scale: 1.1, duration: 0.3, ease: "elastic.out(1, 0.4)" }
      );
    };

    const onMouseMove = (e) => {
      if (isSmallScreenRef.current) return; // desativa 3D no mobile

      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -10;
      const rotateY = ((x - rect.width / 2) / rect.width) * 10;

      gsap.to(buttonRef.current, {
        x: (x - rect.width / 2) * 0.2,
        y: (y - rect.height / 2) * 0.2,
        rotateX,
        rotateY,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const resetPosition = () => {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const onMouseEnter = () => {
      colorChanged = false;
      colorAnim.pause(0);
      hoverAnim.play();
    };
    const onMouseLeave = () => {
      hoverAnim.reverse();
      colorAnim.reverse();
      resetPosition();
    };
    const onMouseDown = () => clickAnim.current();

    const btn = buttonRef.current;
    btn.addEventListener("mouseenter", onMouseEnter);
    btn.addEventListener("mouseleave", onMouseLeave);
    btn.addEventListener("mousemove", onMouseMove);
    btn.addEventListener("mousedown", onMouseDown);

    return () => {
      rotateBall.kill();
      hoverAnim.kill();
      colorAnim.kill();
      btn.removeEventListener("mouseenter", onMouseEnter);
      btn.removeEventListener("mouseleave", onMouseLeave);
      btn.removeEventListener("mousemove", onMouseMove);
      btn.removeEventListener("mousedown", onMouseDown);
      mq.removeEventListener("change", updateIsSmallScreen);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <a
        ref={buttonRef}
        href={href}
        role="button"
        aria-label={typeof children === "string" ? children : undefined}
        className="rounded-md bg-white px-5 py-3 text-base font-semibold text-blue-900 shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all transform hover:-translate-y-0.5"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span className="relative z-10">{children}</span>
      </a>

      {/* Bola animada */}
      <div
        ref={ballRef}
        className="absolute top-1/2 left-0 pointer-events-none filter brightness-70 w-13 h-13 sm:w-12 sm:h-12"
        style={{
          transform: "translateY(-50%)",
          zIndex: 5,
        }}
      >
        <Image
          src="/img/bolaGrande.svg"
          alt="bola animada"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </div>
  );
});

CTAButton.displayName = "CTAButton";
export default CTAButton;
