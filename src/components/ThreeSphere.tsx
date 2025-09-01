"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib"; // precisa do three-stdlib

export default function ThreeSphere() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Cena, câmera, renderizador
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e0f12);

    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountRef.current.appendChild(renderer.domElement);

    // Luzes
    const hemi = new THREE.HemisphereLight(0xffffff, 0x202033, 0.7);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1);
    keyLight.position.set(3, 2, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x4f79ff, 0.8);
    rimLight.position.set(-3, -1, -2);
    scene.add(rimLight);

    // Geometria/material
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: 0x3a66ff,
      metalness: 0.2,
      roughness: 0.35,
      // envMapIntensity aumenta aspecto “brilhante” se usar um envMap (opcional)
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Controles de órbita (mouse/touch)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animação
    let raf = 0;
    const tick = () => {
      sphere.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    // Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const { clientWidth, clientHeight } = mountRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(mountRef.current);

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "400px" }} />;
}
