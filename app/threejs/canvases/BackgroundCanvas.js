// 'use client'

import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

import '../../style/three.css'

function SceneCamera() {
    const cameraRef = useRef();
    
    useEffect(() => {
        cameraRef.current.fov = 75;
        cameraRef.current.near = 1;
        cameraRef.current.far = 1000;
        cameraRef.current.position.set(0, 0, 150);
    }, []);

    var animatingForwards = false;
    var animatingBackwards = false;
    useThree(({ camera }) => {
        window.onwheel = (e) => {
            if (animatingForwards || animatingBackwards) return;

            if (e.deltaY === 100) {
                moveCamera();
                function moveCamera() {
                    if (camera.position.z === 10) {
                        animatingForwards = false;
                        cancelAnimationFrame(moveCamera)
                        return;
                    } else {
                        animatingForwards = true;
                        camera.position.z -= 1;
                        camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), 1 * Math.PI / 180)
                        requestAnimationFrame(moveCamera);
                    }
                }
            }
            else {
                moveCamera();
                function moveCamera() {
                    if (camera.position.z === 150) {
                        animatingBackwards = false;
                        cancelAnimationFrame(moveCamera)
                        return;
                    } else {
                        animatingBackwards = true;
                        camera.position.z += 1;
                        camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), -1 * Math.PI / 180)
                        requestAnimationFrame(moveCamera);
                    }
                }
            }
        }
    })

    return <PerspectiveCamera makeDefault ref={cameraRef}></PerspectiveCamera>;
}

function TorusKnot(props){
    const meshRef = useRef();
    const geometryRef = useRef();
    const materialRef = useRef();

    const mesh = <>
        <mesh ref={meshRef} position={[0,0,0]}>
            <torusKnotGeometry ref={geometryRef} args={[40, 10, 1000, 1000]}/>
            <meshPhongMaterial ref={materialRef} color={"white"}/>
        </mesh>
    </>;

    return(mesh);
}

function Circles(props){

    var meshRef = useRef();

    var degree = 0;
    useFrame((state, delta)=>{
        degree = props.speed;
        let rad = degree * Math.PI / 180;
        meshRef.current.rotateZ(rad * props.direction);
    });

    let vectors = [];
    for(let degree = 0; degree < 360; degree += props.spread){
        let rad = degree * Math.PI / 180;
        vectors.push(new THREE.Vector3(Math.cos(rad), Math.sin(rad), 0));
    }

    let dots = [];
    for(let i=0; i < vectors.length; i++){
        var sphereGeometry = <sphereGeometry args={[0.1, 10, 10]}/>
        var sphereMaterial = <meshPhysicalMaterial color={"white"}/>
        dots.push(<mesh key={i} position={[vectors[i].x * props.radius, vectors[i].y * props.radius, vectors[i].z]}>{sphereGeometry}{sphereMaterial}</mesh>);
    }

    var mesh = <mesh ref={meshRef} key={Date.now()}>
        {dots}
    </mesh>

    return (mesh)
}

export default function BackgroundCanvas(){

    const canvas = <>
        <div id='canvas' >
            <Canvas flat linear>
                <SceneCamera>
                    <OrbitControls />
                </SceneCamera>

                {/* <axesHelper args={[50]}/> */}
                <TorusKnot />
                <spotLight color={"gray"} intensity={2000} distance={1000} penumbra={1} decay={1} position={[0, 150, 150]} lookAt={[0,0,0]} />
                <Circles radius={100} spread={0.75} direction={-1} speed={0.05} />
            </Canvas>
        </div>
    </>;

    return (canvas);
}
