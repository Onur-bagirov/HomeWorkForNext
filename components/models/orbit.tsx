'use client'
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

export default function OrbitModel() {

    // Container Ref
    const containerRef = useRef<HTMLDivElement>(null);

    // Səhnə
    const sceneRef = useRef<THREE.Scene>(null);

    // Animation Frame ID
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Səhifənin ölçüləri
        const width = containerRef.current.clientWidth || window.innerWidth;
        const height = containerRef.current.clientHeight || window.innerHeight;

        if (width === 0 || height === 0) return;


        // Səhnə
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x000000);
        sceneRef.current = scene


        // Camera
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;
        scene.add(camera);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);

        // Orbit Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05

        // Ambient Light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Directional Light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        const torusGeometry = new THREE.TorusGeometry(1.5, 0.35, 16, 100);

        const torusMaterial = new THREE.MeshStandardMaterial({
            color: 0x0066ff,
            wireframe: true,
        });

        const torus = new THREE.Mesh(
            torusGeometry,
            torusMaterial
        );

        scene.add(torus);

        // Animation Frame ID
        let frameId: number

        // Animate
        const animate = () => {
            frameId = requestAnimationFrame(animate)

            torus.rotation.x += 0.01;
            torus.rotation.y += 0.01;
            controls.update();
            renderer.render(scene, camera);
        }
        animate()

        // Cleanup Function
        return () => {
            cancelAnimationFrame(frameId);

            

            controls.dispose();

            torusGeometry.dispose();
            torusMaterial.dispose();
            renderer.dispose();
            renderer.domElement.remove();
        };
    }, [])

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div ref={containerRef} className="w-full h-full"></div>
        </div>
    )
}