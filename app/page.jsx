'use client';

import './style/landingPage.css'
import BackgroundCanvas from './threejs/canvases/BackgroundCanvas';

export default function LandingPage() {

    const landingPage = <>
        <div id='blur-div'></div>
        <BackgroundCanvas />
        <main>
            <h1 id='embrace-innovation'>Embrace Innovation</h1>
            <h1 id='captivate-interest'>Captivate Interest</h1>
        </main>
    </>;

    return (landingPage);
}