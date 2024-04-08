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
        cameraRef.current.position.set(0, 0, 125);
    }, []);

    function constrain(min, max, curr){
        if(curr < min) return min;
        if(curr > max) return max;
        return curr;
    }

    useThree(({ camera }) => {

        let animationOngoing = false;

        function moveCamera(x, y, z) {
            animationOngoing = true;
            
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            
            var xSign = 0, ySign = 0, zSign = 0;
            if (x < camera.position.x) xSign = -1;
            else if (x > 0) xSign = 1;

            if (y < camera.position.y) ySign = -1;
            else if (y > 0) ySign = 1;

            if (z < camera.position.z) zSign = -1;
            else if (z > 0) zSign = 1;

            if (!camera.position.equals(new THREE.Vector3(x, y, z))){
                if (camera.position.x !== x) {
                    camera.position.x += xSign;
                }
                if (camera.position.y !== y) {
                    camera.position.y += ySign;
                }
                if (camera.position.z !== z) {
                    camera.position.z += zSign;
                }
                requestAnimationFrame(() => { moveCamera(x,y,z) });
            }else{
                animationOngoing = false;
                cancelAnimationFrame(moveCamera);
                return;
            }
            return;
        }

        var animationStage = 0;
        var animationStages = [
            [0, 0, 125],
            [50, 10, 0], 
            [50, 150, 0],
            [5, 0, 5],
            [0, 0, 105],
        ];
        window.onwheel = (e) => {
            if(animationOngoing) return;

            if (e.deltaY === 100) {
                animationStage = constrain(0, animationStages.length-1, ++animationStage);
                moveCamera(animationStages[animationStage][0], animationStages[animationStage][1], animationStages[animationStage][2]);
            }
            else {
                animationStage = constrain(0, animationStages.length-1, --animationStage);
                moveCamera(animationStages[animationStage][0], animationStages[animationStage][1], animationStages[animationStage][2]);
            }
        }
    })

    return <PerspectiveCamera makeDefault ref={cameraRef}></PerspectiveCamera>;
}

function TorusKnot(props){
    const meshRef = useRef();
    const geometryRef = useRef();
    const materialRef = useRef();

    useFrame((state, delta) =>{
        meshRef.current.rotateZ(0.05 * Math.PI / 180);
        meshRef.current.rotateY(0.05 * Math.PI / 180);
        meshRef.current.rotateX(0.05 * Math.PI / 180);
    })

    const mesh = <>
        <mesh ref={meshRef} position={[0,0,0]}>
            <torusKnotGeometry ref={geometryRef} args={[50, 10, 1000, 1000]}/>
            <meshPhysicalMaterial ref={materialRef} color={"white"} metalness={0} roughness={0} transmission={0.5} ior={1.33}/>
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

                <spotLight color={"white"} intensity={500} distance={1000} penumbra={1} decay={1} position={[0, 150, 150]} lookAt={[0,0,0]} />
                <spotLight color={"#16324F"} intensity={10000} distance={1000} penumbra={1} decay={1} position={[-150, -150, -150]} lookAt={[0, 0, 0]} />
                <spotLight color={"#2A628F"} intensity={1000} distance={1000} penumbra={1} decay={1} position={[-150, 150, 0]} lookAt={[0, 0, 0]} />
                <spotLight color={"#B0DAF1"} intensity={500} distance={1000} penumbra={1} decay={1} position={[150, -50, 0]} lookAt={[0, 0, 0]} />


            </Canvas>
        </div>
    </>;

    return (canvas);
}
