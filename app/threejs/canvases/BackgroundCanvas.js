import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

function Icosahedron(props){
    const meshRef = useRef();
    const geometryRef = useRef();
    const materialRef = useRef();

    var direction = 1;

    // window.onwheel = (e) => {
    //     let rad = 1;
    //     if (e.deltaX === 0 && e.deltaY === 100){
    //         direction = 1;
    //     }else{
    //         direction = -1;
    //     }
    //     meshRef.current.rotateX(direction * rad * Math.PI / 180);
    // };

    // useFrame((state, delta) =>{
    //     let rad = 0.1 * Math.PI / 180;
    //     meshRef.current.rotateX(direction * rad);
    // })

    const mesh = <>
        <mesh ref={meshRef} position={[0,0,0]}>
            <icosahedronGeometry ref={geometryRef} args={[50, 0]}/>
            <meshPhysicalMaterial ref={materialRef} color={"white"} transmission={0.95} metalness={0} roughness={0} ior={2.33} wireframe={false}/>
        </mesh>
    </>;

    return(mesh);
}

function Ring(props){
    const meshRef = useRef();
    const geometryRef = useRef();
    const materialRef = useRef();

    var direction = 1;

    window.onwheel = (e) => {
        let rad = 1;
        if (e.deltaX === 0 && e.deltaY === 100) {
            direction = 1;
        } else {
            direction = -1;
        }
        meshRef.current.rotateZ(direction * rad * Math.PI / 180);

    };

    useFrame((state, delta) => {
        let rad = 0.1 * Math.PI / 180;
        meshRef.current.rotateZ(direction * rad);
    })

    const mesh = <>
        <mesh ref={meshRef} position={props.position} key={props.key}>
            <ringGeometry ref={geometryRef} args={props.args} />
            <meshPhysicalMaterial ref={materialRef} color={"lightgray"} transmission={0.95} metalness={0} roughness={0} ior={2.33} wireframe={true} side="DoubleSide"/>
        </mesh>
    </>;

    return (mesh);
}

export default function BackgroundCanvas(){
    const canvas = <>
        <div id='canvas' >
            <Canvas flat linear>
                <PerspectiveCamera position={[0,0,200]} makeDefault>
                    <OrbitControls />
                </PerspectiveCamera>
                {/* <axesHelper args={[50, 50, 50]}></axesHelper> */}
                
                <Icosahedron />

                <pointLight color={"#0044aa"} intensity={30000} distance={1000} decay={1.3} position={[150, 150, 150]} />
                <pointLight color={"white"} intensity={5000} distance={1000} decay={1.3} position={[150, 0, 0]} />
                <pointLight color={"#0044aa"} intensity={5000} distance={1000} decay={1.3} position={[0, 0, 150]} />

            </Canvas>
        </div>
    </>;

    return (canvas);
}
