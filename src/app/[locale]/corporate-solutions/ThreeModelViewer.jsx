"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import {useTranslations} from 'next-intl';

function HologramBrain({ isMobile }) {
  const { scene } = useGLTF("/models/brain_hologram.glb");
  return <primitive object={scene} scale={isMobile ? 1.5 : 2.8} />;
}

export default function ThreeModelViewer() {
  const t = useTranslations('ThreeModelViewer');
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className={`w-full ${isMobile ? "h-[250px]" : "h-[400px]"}`}>
      <Canvas camera={{ position: [0, 0, isMobile ? 4 : 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1} />
        <Suspense fallback={<Html>{t('loading')}</Html>}>
          <HologramBrain isMobile={isMobile} />
        </Suspense>
        <OrbitControls autoRotate enableZoom={false} />
      </Canvas>
    </div>
  );
}