'use client';

import { useEffect } from 'react';
import '../style/landingPage.css'
import BackgroundCanvas from '../threejs/canvases/BackgroundCanvas';

export default function LandingPage(){

    const landingPage = <>
        <div id='blur-div'></div>
        <BackgroundCanvas />
        <main>
            
        </main>
    </>;

    return (landingPage);
}

