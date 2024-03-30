'use client';

import Link from "next/link";
import { useState } from "react";

import '../style/header.css'

export default function Header(){

    var [active, setActive] = useState("0");

    function handleTransition(e){
        var menuElement = document.getElementById("menu");
        var menuButtonHeader = document.getElementById("menu-header");
        var landingPageHeader = document.getElementById("landing-page");

        if(active === "2") {
            menuElement.style.transition = "none";
            menuElement.style.left = "-110%";
            landingPageHeader.style.color = "gray";
            menuButtonHeader.style.color = "gray"
            menuButtonHeader.style.border = "1px solid gray";
            setActive("0");
        }
        console.log(active)
    }

    function handleClick(e) {
        var menuElement = document.getElementById("menu");
        var menuButtonHeader = document.getElementById("menu-header");
        var landingPageHeader = document.getElementById("landing-page");

        menuElement.style.transition = "left 1.25s ease";
        landingPageHeader.style.transition = "color 1s";
        menuButtonHeader.style.transition = "color 1s, border-radius 1s, border 1s"

        switch (active) {
            case "0":
                menuElement.style.left = "0%";
                landingPageHeader.style.color = "#DBD4D3";
                menuButtonHeader.style.color = "#DBD4D3"
                menuButtonHeader.style.border = "1px solid #DBD4D3";
                setActive("1");
                break;
            case "1":
                menuElement.style.left = "110%";
                landingPageHeader.style.color = "gray";
                menuButtonHeader.style.color = "gray"
                menuButtonHeader.style.border = "1px solid gray";
                setActive("2");
                break;
        }
    }

    const menu = <>
        <div id="menu" onTransitionEnd={handleTransition}>
            <nav onTransitionEnd={(e)=>{e.stopPropagation()}}>
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

            <div id="slogans" onTransitionEnd={(e)=>{e.stopPropagation()}}>
                Embrace Innovation &lt;&gt;&nbsp;
                <span className="lapis-lazuli">Captivate Interest</span>&nbsp;&lt;&gt; 
                Break Boundaries &lt;&gt;&nbsp;
                <span className="lapis-lazuli">Push the Limits</span>&nbsp;&lt;&gt; 
                Forge New Paths &lt;&gt;&nbsp;
                <span className="lapis-lazuli">Redefine Possible</span>&nbsp;&lt;&gt; 
                Lead the Way
            </div>

            <div id="socials" onTransitionEnd={(e)=>{e.stopPropagation()}}>
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