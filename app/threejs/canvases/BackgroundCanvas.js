'use client'

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

            var moveAmount = 0.5;
            
            if (!camera.position.equals(new THREE.Vector3(x, y, z))){
                if (camera.position.x < x) camera.position.x += moveAmount;
                if (camera.position.x > x) camera.position.x -= moveAmount;

                if (camera.position.y < y) camera.position.y += moveAmount;
                if (camera.position.y > y) camera.position.y -= moveAmount;

                if (camera.position.z < z) camera.position.z += moveAmount;
                if (camera.position.z > z) camera.position.z -= moveAmount;

                requestAnimationFrame(() => { moveCamera(x,y,z) });
            }else{
                animationOngoing = false;
                cancelAnimationFrame(moveCamera);
                return;
            }
            return;
        }

        var animationStage = 0;
        var animationStages = [[0, 0, 125]];
        for(let i=0; i<20; i++){
            animationStages.push(
                [Math.round(Math.random() * 125 * (Math.random() < 0.5 ? -1 : 1), 0),
                    Math.round(Math.random() * 125 * (Math.random() < 0.5 ? -1 : 1), 0),
                    Math.round(Math.random() * 125 * (Math.random() < 0.5 ? -1 : 1), 0)]
            );
        }
        animationStages.push([0,0,125]);

        var limit = Math.max(document.body.scrollHeight, document.body.offsetHeight,
            document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

        window.onwheel = (e) => {

            console.log(window.scrollY + " " + (limit - 1300))

            if (animationOngoing || window.scrollY >= (limit - 1300)) return;

            if(window.scrollY === 0) {
                animationStage = 0;
                moveCamera(animationStages[animationStage][0], animationStages[animationStage][1], animationStages[animationStage][2]);
                return;
            }

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
            <meshPhysicalMaterial ref={materialRef} color={"#f5f5f5"} metalness={0} roughness={0.45} transmission={1} ior={1.33}/>
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
        var sphereMaterial = <meshPhysicalMaterial color={"black"}/>
        dots.push(<mesh key={i} position={[vectors[i].x * props.radius, vectors[i].y * props.radius, vectors[i].z]}>{sphereGeometry}{sphereMaterial}</mesh>);
    }

    var mesh = <mesh ref={meshRef} key={Date.now()}>
        {dots}
    </mesh>

    return (mesh)
}

export default function BackgroundCanvas(){

    let starArray = [];
    for(let i=0; i<25; i++){
        var colors = ["blue", "purple", "#16324F", "white", "navy"]
        starArray.push(
            <pointLight color={colors[i%colors.length]} intensity={Math.random() * 250} distance={1000} decay={1} 
                	    position={[Math.random() * 150 * (Math.random() < 0.5 ? -1 : 1), 
                                   Math.random() * 150 * (Math.random() < 0.5 ? -1 : 1), 
                                   Math.random() * 150 * (Math.random() < 0.5 ? -1 : 1)]}
                        lookAt={[0,0,0]} key={i}/>
        );
    }

    const canvas = <>
        <div id='canvas' >
            <Canvas flat linear>
                <SceneCamera>
                    <OrbitControls />
                </SceneCamera>

                <TorusKnot />
                {
                    starArray.map(e => {
                        return e;
                    })
                }
            </Canvas>
        </div>
    </>;

    return (canvas);
}
