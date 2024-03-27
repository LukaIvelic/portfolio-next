'use client';

import Link from "next/link";
import '../style/header.css'

export default function Header(){

    const menu = <>
        <div id="menu">
            <nav>
                <Link href="/">
                    <span>✕</span>&nbsp;
                    Work
                </Link>
                <Link href="/">
                    <span>✕</span>&nbsp;
                    Services
                </Link>
                <Link href="/">
                    <span>✕</span>&nbsp;
                    About
                </Link>
                <Link href="/">
                    <span>✕</span>&nbsp;
                    Contact
                </Link>
            </nav>

            {/* <div id="slogans">E. I. C. I. &nbsp;&mdash;&nbsp; Embrace Innovation & Captivate Interest</div> */}
            <div id="slogans">Embrace Innovation &lt;&gt; Captivate Interest &lt;&gt; Break Boundaries &lt;&gt; 
                              Push the Limits &lt;&gt; Forge New Paths &lt;&gt; Redefine Possible &lt;&gt; Lead the Way</div>

            <div id="socials">
                <ul>
                    <li>
                        <Link href="https://www.linkedin.com/in/luka-iveli%C4%87-b55074227/">LinkedIn</Link>&nbsp;
                        <span>✕</span>
                    </li>
                    <li>
                        <Link href="https://github.com/LukaIvelic">GitHub</Link>&nbsp;
                        <span>✕</span>
                    </li>
                    <li>
                        <Link href="">Instagram</Link>&nbsp;
                        <span>✕</span>
                    </li>
                </ul>

                <h3>
                    <Link href="https://open.spotify.com/album/4iqbFIdGOTzXeDtt9owjQn?si=Ja6ydkvsQWSANuStprobDg">Take a look at what I listen to when developing websites</Link>
                    <span>✕</span>
                </h3>
            </div>
        </div>
    </>;

    function handleClick(e){
        e.currentTarget.style.marginBottom = "20rem"
        document.getElementById("menu").style.left = "0";
    }

    const header = <>
        {menu}
        <header>
            <Link href="/" id="landing-page">Luka Ivelić</Link>
            <div id="menu-button">
                <div id="menudiv" onClick={handleClick}>
                    <svg>
                        <rect width="10rem" height="0.5rem"></rect>
                    </svg>
                    <svg>
                        <rect width="5rem" height="0.5rem"></rect>
                    </svg>
                    <svg>
                        <rect width="7rem" height="0.5rem"></rect>
                    </svg>
                </div>
            </div>
        </header>
    </>;

    return (header);
}