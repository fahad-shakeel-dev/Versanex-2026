"use client"

import { forwardRef, useState } from "react"
import NextImage from "next/image"
import cloudinaryImageLoader, { isCloudinaryImage } from "@/lib/cloudinary-image-loader.mjs"
import { mediaUrl } from "@/lib/media-url"

const OptimizedImage = forwardRef(function OptimizedImage({ src, loader, ...props }, ref) {
  const [failedSource, setFailedSource] = useState(null)
  const deliverySrc = failedSource === src ? src : mediaUrl(src)
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
      src={deliverySrc}
      onError={event => {
        if (deliverySrc !== src) setFailedSource(src)
        else props.onError?.(event)
      }}
      style={isMockup ? {
        ...props.style,
        objectFit: isIndusMockup && !isIndusCover && !isIndusPc ? "cover" : "contain",
        objectPosition: "center",
        backgroundColor: isIndusCover ? "#fafaf7" : isIndusPc ? "#e8e5df" : isApexMockup ? "#e7e5eb" : isMaxCoatMockup ? "#e7e3dd" : isFixitMockup ? "#c9dceb" : isCallMindMockup ? "#edf3fb" : isLuxuryStayMockup ? "#eee4d6" : "#08090b",
      } : props.style}
      loader={loader || (isCloudinaryImage(deliverySrc) ? cloudinaryImageLoader : undefined)}
    />
  )
})

export default OptimizedImage
