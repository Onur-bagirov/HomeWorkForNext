"use client"
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader, OrbitControls } from "three-stdlib";

export default function Scooter() {
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvas.current) return;

        const width = 900;
        const height = 900;
        let frameId = 0;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas.current,
            antialias: true,
            alpha: true,
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.6;

        scene.add(new THREE.AmbientLight(0xffffff, 1.1));
        scene.add(new THREE.HemisphereLight(0xe8f6fa, 0x98cbd7, 1.2));

        const key = new THREE.DirectionalLight(0xffffff, 2.2);
        key.position.set(8, 12, 6);
        scene.add(key);

        const fill = new THREE.DirectionalLight(0xffffff, 0.9);
        fill.position.set(-6, 4, -4);
        scene.add(fill);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;

        const loader = new GLTFLoader();
        loader.load(
            "/model/e-scooter/scene.gltf",
            (gltf) => {
                const model = gltf.scene;
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                model.position.sub(center);
                scene.add(model);

                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = camera.fov * (Math.PI / 180);
                const distance = (maxDim / 2 / Math.tan(fov / 2)) * 1.2;
                camera.position.set(0, distance * 0.2, distance);
                controls.target.set(0, 0, 0);
                controls.update();
            },
            undefined,
            (error) => console.error("Error loading model:", error)
        );

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(frameId);
            controls.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className="size-250">
            <canvas ref={canvas} className="block size-full" />
        </div>
    );
}
