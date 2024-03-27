import * as THREE from 'three'
import { size } from '../handlers/size';

export default function Renderer(){

    let windowSize = size();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(windowSize.width, windowSize.height);
    renderer.domElement.style.position = {
        position: "absolute",
        left: "0",
        top: "0"
    }
}