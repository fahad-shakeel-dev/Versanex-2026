"use client"

import { forwardRef } from "react"
import NextImage from "next/image"
import cloudinaryImageLoader, { isCloudinaryImage } from "@/lib/cloudinary-image-loader.mjs"

const OptimizedImage = forwardRef(function OptimizedImage({ src, loader, ...props }, ref) {
  const isMockup = typeof src === "string" && (src.startsWith("/project-mockups/") || src.startsWith("/mockups/")) && !/\/logo\.[a-z]+(?:\?|$)/i.test(src)
  const isIndusMockup = typeof src === "string" && src.startsWith("/mockups/Indus&Olive/")
  const isIndusCover = typeof src === "string" && src.split("?")[0] === "/mockups/Indus&Olive/main-img.png"
  const isIndusPc = typeof src === "string" && src.split("?")[0] === "/mockups/Indus&Olive/pc-mockup.png"
  const isApexMockup = typeof src === "string" && src.startsWith("/mockups/apex-ielts-writing/")
  const isMaxCoatMockup = typeof src === "string" && src.startsWith("/mockups/maxcoat/")
  const isFixitMockup = typeof src === "string" && src.startsWith("/mockups/fixit/")
  const isCallMindMockup = typeof src === "string" && src.startsWith("/mockups/callmind-ai/")
  const isLuxuryStayMockup = typeof src === "string" && src.startsWith("/mockups/luxurystay/")
  return (
    <NextImage
      {...props}
      ref={ref}
      src={src}
      style={isMockup ? {
        ...props.style,
        objectFit: isIndusMockup && !isIndusCover && !isIndusPc ? "cover" : "contain",
        objectPosition: "center",
        backgroundColor: isIndusCover ? "#fafaf7" : isIndusPc ? "#e8e5df" : isApexMockup ? "#e7e5eb" : isMaxCoatMockup ? "#e7e3dd" : isFixitMockup ? "#c9dceb" : isCallMindMockup ? "#edf3fb" : isLuxuryStayMockup ? "#eee4d6" : "#08090b",
      } : props.style}
      loader={loader || (isCloudinaryImage(src) ? cloudinaryImageLoader : undefined)}
    />
  )
})

export default OptimizedImage
