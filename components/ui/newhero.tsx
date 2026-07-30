"use client"

import * as React from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"

// Register ScrollTrigger securely
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export default function NewHero() {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const bgImageRef = React.useRef<HTMLDivElement>(null)
    const overlayRef = React.useRef<HTMLDivElement>(null)
    const contentRef = React.useRef<HTMLDivElement>(null)
    const headlineRef = React.useRef<HTMLHeadingElement>(null)
    const taglineRef = React.useRef<HTMLParagraphElement>(null)
    const buttonsRef = React.useRef<HTMLDivElement>(null)

    React.useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // --- Initial Load Animations ---
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

            tl.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.5, ease: "power2.inOut" }
            )
                .fromTo(
                    headlineRef.current,
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
                    "-=0.5"
                )
                .fromTo(
                    taglineRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    "-=0.6"
                )
                .fromTo(
                    buttonsRef.current?.children || [],
                    { y: 30, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "back.out(1.7)",
                    },
                    "-=0.6"
                )

            // --- ScrollTrigger Parallax & Effects ---

            // 1. Subtle Parallax for Background Image
            gsap.to(bgImageRef.current, {
                yPercent: 20, // Move image slower than scroll
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            })

            // 2. Cinematic Slow Zoom on Background
            gsap.to(bgImageRef.current, {
                scale: 1.1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 2, // Smooth scrubbing
                },
            })

            // 3. Content Fade Out & Slight Parallax on Scroll
            gsap.to(contentRef.current, {
                yPercent: -10, // Move text up slightly faster
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "70% top", // Fade out before completely scrolling past
                    scrub: true,
                },
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Background Container for Parallax */}
            <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <div ref={bgImageRef} className="relative w-full h-full">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="object-cover w-full h-full"
                    >
                        <source src="/last.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* Dark Overlay */}
            <div ref={overlayRef} className="absolute inset-0 bg-black/50 z-0" />

            {/* Hero Content */}
            <div
                ref={contentRef}
                className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center gap-6 md:gap-8 translate-y-0 backdrop-blur-[2px] sm:backdrop-blur-none py-10 rounded-3xl"
            >
                {/* Headline */}
                <h1
                    ref={headlineRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wide opacity-0 bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-2xl leading-tight md:leading-snug"
                >
                    Best quality products  <br className="hidden md:block" />
                    for Marksmans
                </h1>

                {/* Tagline */}
                <p
                    ref={taglineRef}
                    className="max-w-2xl text-lg md:text-xl text-gray-300 font-medium tracking-wide opacity-0 drop-shadow-md"
                >
                    Elevate your performance with world-class equipment tailored for champions.
                </p>

                {/* CTA Buttons */}
                <div
                    ref={buttonsRef}
                    className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center mt-4"
                >
                    <Button
                        asChild
                        size="lg"
                        className="w-full sm:w-auto min-w-[180px] rounded-full h-14 text-lg font-bold bg-red-600 hover:bg-red-700 text-white border-0 shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] opacity-0"
                    >
                        <Link href="/">Shop Now</Link>
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto min-w-[180px] h-14 text-lg font-bold border-2 border-white text-white bg-transparent rounded-full hover:bg-white hover:text-black transition-all hover:scale-105 opacity-0"
                    >
                        <Link href="/explore">Explore Collection</Link>
                    </Button>
                </div>
            </div>
            {/* Gradient Fade to Bottom for Seamless Transition */}
            <div className="absolute bottom-0 left-0 w-full h-32 sm:h-48 bg-gradient-to-b from-transparent via-black/60 to-black z-[5] pointer-events-none" />
        </section>
    )
}
