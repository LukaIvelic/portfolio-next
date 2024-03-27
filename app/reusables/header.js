'use client';

import Link from "next/link";
import { useState } from "react";

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

            <div id="slogans">
                Embrace Innovation &lt;&gt;&nbsp;
                <span className="lapis-lazuli">Captivate Interest</span>&nbsp;&lt;&gt; 
                Break Boundaries &lt;&gt;&nbsp;
                <span className="lapis-lazuli">Push the Limits</span>&nbsp;&lt;&gt; 
                Forge New Paths &lt;&gt;&nbsp;
                <span className="lapis-lazuli">Redefine Possible</span>&nbsp;&lt;&gt; 
                Lead the Way
            </div>

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
            </div>
        </div>
    </>;

    var [menuActive, setMenuActive] = useState(false);

    function handleClick(e){
        var menuElement = document.getElementById("menu");
        var menuButtonHeader = document.getElementById("menu-header");
        var landingPageHeader = document.getElementById("landing-page");

        landingPageHeader.style.transition = "color 1s";
        menuButtonHeader.style.transition = "color 1s, border-radius 1s, border 1s"
        
        if(!menuActive){
            menuElement.style.left = "0";
            landingPageHeader.style.color = "#DBD4D3";
            menuButtonHeader.style.color = "#DBD4D3"
            menuButtonHeader.style.border = "1px solid #DBD4D3";

            setMenuActive(!menuActive);
        }else{
            menuElement.style.left = "110%";
            menuElement.style.opacity = "0";
            menuElement.style.left = "-110%";
            menuElement.style.opacity = "1";

            landingPageHeader.style.color = "gray";
            menuButtonHeader.style.color = "gray"
            menuButtonHeader.style.border = "1px solid gray";

            setMenuActive(!menuActive);
        }
    }

    const header = <>
        {menu}
        <header>
            <Link href="/" id="landing-page">Luka Ivelić</Link>
            <div id="menu-button">
                <div onClick={handleClick}>
                    <h3 onClick={handleClick} id="menu-header">Menu</h3>
                </div>
            </div>
        </header>
    </>;

    return (header);
}