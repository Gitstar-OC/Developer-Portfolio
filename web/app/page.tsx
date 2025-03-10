"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { type Designer, getAllDesigners } from "./designers"


// Profile image component with GitHub and Twitter fallbacks
function ProfileImage({ name, github, twitter }) {
  const [imageSrc, setImageSrc] = useState(`/placeholder.svg?height=28&width=28`)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // Try to load GitHub image first
    if (github) {
      const githubImg = new Image()
      githubImg.src = `https://github.com/${github}.png`

      githubImg.onload = () => {
        setImageSrc(`https://github.com/${github}.png`)
        setImageLoaded(true)
      }

      githubImg.onerror = () => {
        // If GitHub fails, try Twitter
        if (twitter) {
          const twitterImg = new Image()
          twitterImg.src = `https://unavatar.io/twitter/${twitter}`

          twitterImg.onload = () => {
            setImageSrc(`https://unavatar.io/twitter/${twitter}`)
            setImageLoaded(true)
          }
        }
      }
    } else if (twitter) {
      // If no GitHub, try Twitter directly
      const twitterImg = new Image()
      twitterImg.src = `https://unavatar.io/twitter/${twitter}`

      twitterImg.onload = () => {
        setImageSrc(`https://unavatar.io/twitter/${twitter}`)
        setImageLoaded(true)
      }
    }
  }, [github, twitter])

  return (
    <Avatar className="h-7 w-7">
      <AvatarImage src={imageSrc} alt={name} />
      <AvatarFallback>
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  )
}

// Designer item component
function DesignerItem({ designer }: { designer: Designer }) {
  const { name, twitter, portfolio, github } = designer
  const portfolioUrl = portfolio.replace(/(^\w+:|^)\/\//, "")
  const twitterUrl = `https://twitter.com/${twitter}`

  return (
    <div className="w-full py-3 px-4 rounded-md transition-colors group duration-200 hover:bg-black/5 dark:hover:bg-white/5">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          {/* Image without link */}
          <div aria-label={`${name}'s profile picture`}>
            <ProfileImage name={name} github={github} twitter={twitter} />
          </div>

          {/* Name with link to Twitter */}
          <Link href={twitterUrl} className="hover:underline">
            {name}
          </Link>
        </div>

        <Link href={portfolio} className="text-black/60 dark:text-white/60 transition-colors duration-300 hover:underline group-hover:text-black group-hover:dark:text-white text-base">
          {portfolioUrl}
        </Link>
      </div>
    </div>
  )
}

// Visual effect components
function VerticalFade({ side, className = "", ...props }) {
  return (
    <div
      aria-hidden
      className={`fixed left-0 right-0 z-10 pointer-events-none ${
        side === "top"
          ? "top-0 bg-gradient-to-b from-white to-transparent dark:from-black"
          : "bottom-0 bg-gradient-to-t from-white to-transparent dark:from-black"
      } ${className}`}
      {...props}
    />
  )
}

function HorizontalFade({ side, className = "", ...props }) {
  return (
    <div
      aria-hidden
      className={`fixed top-0 bottom-0 w-[100px] z-10 pointer-events-none ${
        side === "left"
          ? "left-0 bg-gradient-to-r from-white to-transparent dark:from-black"
          : "right-0 bg-gradient-to-l from-white to-transparent dark:from-black"
      } ${className}`}
      {...props}
    />
  )
}

// Vertical line component
function VerticalLine({ side, className = "", ...props }) {
  return (
    <div
      aria-hidden
      className={`hidden md:block fixed top-0 h-screen w-[1px] bg-cyan-400/80 dark:bg-cyan-900/80 z-[5] ${
        side === "left" ? "left-[calc(50%-450px)]" : "right-[calc(50%-450px)]"
      } ${className}`}
      {...props}
    />
  )
}

// Horizontal line component
function Line({ variant = "defined", direction = "horizontal", className = "", style = {}, ...props }) {
  return (
    <div
      aria-hidden
      className={`absolute ${variant === "subtle" ? "opacity-60" : "opacity-80"} ${
        direction === "horizontal"
          ? "h-[1px] w-[500vw] bg-cyan-400 dark:bg-cyan-900 -translate-x-1/2 left-1/2"
          : "w-[1px] h-[500vw] bg-gradient-to-b from-cyan-400 to-transparent dark:from-cyan-900"
      } z-[15] ${className}`}
      style={style}
      {...props}
    />
  )
}

export default function DesignerProfiles() {
  const contentRef = useRef(null)
  const headingRef = useRef(null)
  const [headingHeight, setHeadingHeight] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const allDesigners = getAllDesigners()

  // Measure heading height
  useEffect(() => {
    if (headingRef.current) {
      setHeadingHeight(headingRef.current.offsetHeight)
    }
  }, [])

  // Set up smooth scroll behavior
  useEffect(() => {
    let animationFrameId
    let currentTransform = headingHeight + 50 // Changed from 350 to 50 to match the inline style

    const handleScroll = () => {
      const scrollY = window.scrollY
      // Calculate target position - slower scroll effect by dividing by 2
      const targetTransform = Math.max(0, headingHeight + 50 - scrollY / 2)

      // Update scroll progress for other animations
      setScrollProgress(Math.min(1, scrollY / 600))

      // Smooth animation function
      const animateScroll = () => {
        // Ease towards target (smaller number = slower animation)
        const ease = 0.08
        const diff = targetTransform - currentTransform

        if (Math.abs(diff) > 0.1) {
          currentTransform += diff * ease
          if (contentRef.current) {
            contentRef.current.style.transform = `translateY(${currentTransform}px)`
          }
          animationFrameId = requestAnimationFrame(animateScroll)
        } else {
          // Snap to target when very close
          if (contentRef.current) {
            contentRef.current.style.transform = `translateY(${targetTransform}px)`
          }
          currentTransform = targetTransform
        }
      }

      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(animateScroll)
    }

    window.addEventListener("scroll", handleScroll)

    // Initial positioning
    if (contentRef.current) {
      contentRef.current.style.transform = `translateY(${headingHeight + 50}px)` // Changed from 350 to 50
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [headingHeight])

  // Line height for heading
  const lineHeight = 72 // 4.5rem = 72px

  return (
    <main className="min-h-screen bg-white text-black relative overflow-hidden font-sans dark:bg-black dark:text-white">
      {/* Fade effects */}
      <VerticalFade side="top" className="h-[300px]" />
      <VerticalFade side="bottom" className="h-[100px] z-[30]" />
      <HorizontalFade side="left" />
      <HorizontalFade side="right" />

      {/* Vertical lines - only visible on md screens and up */}
      <VerticalLine side="left" />
      <VerticalLine side="right" />

      {/* Title section that stays in place */}
      <div
        ref={headingRef}
        className="fixed top-0 left-0 right-0 max-w-[800px] mx-auto pt-32 pb-8 z-[5] pointer-events-none"
      >
        <div className="relative">
          {/* Lines for "Good" - top and bottom */}
          <Line variant="defined" direction="horizontal" style={{ top: "0px" }} />
          <Line variant="subtle" direction="horizontal" style={{ top: "72px" }} />

          {/* Lines for "Engineers" - top and bottom */}
          <Line variant="defined" direction="horizontal" style={{ top: "72px" }} />
          <Line variant="subtle" direction="horizontal" style={{ top: "144px" }} />

          {/* Lines for "Sites" - top and bottom */}
          <Line variant="defined" direction="horizontal" style={{ top: "144px" }} />
          <Line variant="subtle" direction="horizontal" style={{ top: "216px" }} />

          <h1
            className="text-[72px] leading-[72px] font-medium relative tracking-tight pl-6 sm:pl-8 md:pl-4"
            style={{
              fontFamily:
                '"X", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
              letterSpacing: "-0.3px",
            }}
          >
            <span className="relative z-[10] inline-block bg-white dark:bg-black px-1">Good</span> <br />
            <span className="relative z-[10] inline-block bg-white dark:bg-black px-1">Engineers</span> <br />
            <span className="relative z-[10] inline-block bg-white dark:bg-black px-1">Sites</span>
          </h1>
        </div>
      </div>

      {/* Content that scrolls over the title */}
      <div
        ref={contentRef}
        className="relative z-20 min-h-[200vh] w-full will-change-transform"
        style={{ transform: `translateY(${headingHeight + 50}px)` }}
      >
        <div className="max-w-[800px] w-full mx-auto pt-20 pb-64 px-8 bg-[#f9f9f9] dark:bg-[#111] shadow-xl border border-black/5 dark:border-white/5">
          <div className="mb-8 text-black/60 dark:text-white/60 text-lg w-full">
            <p>List of great engineers and their portfolio sites.</p>
          </div>

          <div className="w-full flex flex-col gap-2">
            {allDesigners.map((designer, index) => (
              <DesignerItem key={index} designer={designer} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

