import { useEffect, useRef } from "react";
import type * as THREE from "three";

/* Lightweight Three.js architectural effect for the /home-2 hero.
 * A slow-rotating low-poly wireframe (icosahedron edges) in the brand gold — a restrained
 * spatial backdrop, not a heavy scene. Renders only after hydration, only when motion is
 * allowed, and degrades to an empty div (the hero still works) if Three.js fails to load. */
type Cleanup = () => void;

export function ArchitecturalCanvas({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: Cleanup | null = null;

    (async () => {
      try {
        const THREE = await import("three");
        if (disposed || !mountRef.current) return;

        const width = mountRef.current.clientWidth || 1;
        const height = mountRef.current.clientHeight || 1;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 6;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        // Wireframe icosahedron — restrained, architectural.
        const geo = new THREE.IcosahedronGeometry(2.4, 1);
        const edges = new THREE.EdgesGeometry(geo);
        const gold = new THREE.LineBasicMaterial({
          color: 0xc9a24a,
          transparent: true,
          opacity: 0.55,
        });
        const wire = new THREE.LineSegments(edges, gold);
        scene.add(wire);

        // A faint inner sphere for depth.
        const inner = new THREE.Mesh(
          new THREE.IcosahedronGeometry(1.2, 0),
          new THREE.MeshBasicMaterial({
            color: 0x1f3d2b,
            wireframe: true,
            transparent: true,
            opacity: 0.25,
          }),
        );
        scene.add(inner);

        const onResize = () => {
          if (!mountRef.current) return;
          const w = mountRef.current.clientWidth || 1;
          const h = mountRef.current.clientHeight || 1;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        let frame = 0;
        const animate = () => {
          frame = requestAnimationFrame(animate);
          wire.rotation.y += 0.0016;
          wire.rotation.x += 0.0008;
          inner.rotation.y -= 0.001;
          renderer.render(scene, camera);
        };
        animate();

        cleanup = () => {
          window.removeEventListener("resize", onResize);
          cancelAnimationFrame(frame);
          geo.dispose();
          edges.dispose();
          inner.geometry.dispose();
          (inner.material as THREE.Material).dispose();
          gold.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        // Three.js failed to load — hero still works without it.
      }
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden />;
}
