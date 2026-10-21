// // components/projects/SingleProject/tabs/GalleryTab.jsx
// import { useEffect, useState } from "react"
// import Image from "next/image"
// import { motion } from "framer-motion"

// export default function GalleryTab({
//   project,
//   refreshKey,
//   setRefreshKey,
//   fadeIn,
//   staggerContainer,
//   motion,
//   selectedImage,
//   setSelectedImage,
//   zoom,
//   setZoom,
// }) {
//   return (
//     <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//       <motion.div variants={fadeIn}>
//         <div className="flex items-center justify-between mb-4 sm:mb-6">
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Project Gallery</h2>
//           <button
//             onClick={() => setRefreshKey(prev => prev + 1)}
//             className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition"
//           >
//             Refresh
//           </button>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//           {(project.images || []).map((img, index) => {
//             const [imgSrc, setImgSrc] = useState(img.url || "/placeholder.svg?height=300&width=400")
//             const [hasError, setHasError] = useState(false)

//             useEffect(() => {
//               setImgSrc(img.url || "/placeholder.svg?height=300&width=400")
//               setHasError(false)
//             }, [img.url])

//             return (
//               <motion.div
//                 key={`${index}-${refreshKey}`}
//                 variants={fadeIn}
//                 whileHover={{ y: -5, scale: 1.02 }}
//                 className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-md cursor-pointer"
//                 onClick={() => setSelectedImage(img.url)}
//               >
//                 <Image
//                   src={imgSrc}
//                   alt={`${project.title} gallery image ${index + 1}`}
//                   fill
//                   className="object-cover"
//                   onError={() => {
//                     if (!hasError) {
//                       setHasError(true)
//                       setImgSrc("/placeholder.svg?height=300&width=400")
//                     }
//                   }}
//                 />
//               </motion.div>
//             )
//           })}
//         </div>
//         {!(project.images && project.images.length) && (
//           <p className="text-gray-500 text-sm sm:text-base mt-4">
//             No gallery images available for this project.
//           </p>
//         )}
//       </motion.div>
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
//           <div className="relative max-w-6xl w-full flex flex-col items-center">
//             <div className="overflow-auto max-h-[90vh] max-w-full flex justify-center items-center">
//               <img
//                 src={selectedImage}
//                 alt="Full preview"
//                 className="max-h-[90vh] max-w-full rounded-lg shadow-lg transition-transform duration-300"
//                 style={{
//                   transform: `scale(${zoom})`,
//                   objectFit: "contain",
//                   cursor: zoom > 1 ? "grab" : "default",
//                 }}
//                 draggable={false}
//                 onMouseDown={(e) => {
//                   if (zoom <= 1) return;
//                   const img = e.target;
//                   let startX = e.pageX - img.offsetLeft;
//                   let startY = e.pageY - img.offsetTop;
//                   const onMouseMove = (moveEvent) => {
//                     img.parentElement.scrollLeft = moveEvent.pageX - startX;
//                     img.parentElement.scrollTop = moveEvent.pageY - startY;
//                   };
//                   const onMouseUp = () => {
//                     document.removeEventListener("mousemove", onMouseMove);
//                     document.removeEventListener("mouseup", onMouseUp);
//                   };
//                   document.addEventListener("mousemove", onMouseMove);
//                   document.addEventListener("mouseup", onMouseUp);
//                 }}
//               />
//             </div>
//             <div className="flex gap-3 mt-4">
//               <button
//                 onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
//                 className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition"
//               >
//                 -
//               </button>
//               <span className="text-white">{Math.round(zoom * 100)}%</span>
//               <button
//                 onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
//                 className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition"
//               >
//                 +
//               </button>
//               <button
//                 onClick={() => setZoom(1)}
//                 className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition"
//               >
//                 Reset
//               </button>
//               <button
//                 onClick={() => setSelectedImage(null)}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   )
// }












// "use client";
// import { useState, useEffect, memo } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// const ImageCard = memo(function ImageCard({ img, index, fadeIn, refreshKey, project, setSelectedImage }) {
//   const [loaded, setLoaded] = useState(false);
//   const [error, setError] = useState(false);

//   return (
//     <motion.div
//       key={`${index}-${refreshKey}`}
//       variants={fadeIn}
//       whileHover={{ y: -5, scale: 1.02 }}
//       className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-md cursor-pointer bg-gray-100"
//       onClick={() => setSelectedImage(img.url)}
//     >
//       {!loaded && (
//         <div className="absolute inset-0 animate-pulse bg-gray-200" />
//       )}
//       <Image
//         src={!error ? img.url : "/placeholder.svg?height=300&width=400"}
//         alt={`${project.title} gallery image ${index + 1}`}
//         fill
//         sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
//         className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
//         onError={() => setError(true)}
//         onLoadingComplete={() => setLoaded(true)}
//         // ✅ only load first image eagerly
//         loading={index === 0 ? "eager" : "lazy"}
//         priority={index === 0}
//       />
//     </motion.div>
//   );
// });

// export default function GalleryTab({
//   project,
//   refreshKey,
//   setRefreshKey,
//   fadeIn,
//   staggerContainer,
//   motion,
//   selectedImage,
//   setSelectedImage,
//   zoom,
//   setZoom,
// }) {
//   return (
//     <motion.div
//       variants={staggerContainer}
//       initial="hidden"
//       animate="visible"
//       className="w-full"
//     >
//       <motion.div variants={fadeIn}>
//         <div className="flex items-center justify-between mb-4 sm:mb-6">
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Project Gallery</h2>

//           <button
//   onClick={() => setRefreshKey((prev) => prev + 1)}
//   className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-[#f2ad08] text-white rounded-lg shadow hover:bg-[#d88f07] active:bg-[#c27c05] transition"
// >
//   Refresh
// </button>

//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//           {(project.images || []).map((img, index) => (
//             <ImageCard
//               key={index}
//               img={img}
//               index={index}
//               fadeIn={fadeIn}
//               refreshKey={refreshKey}
//               project={project}
//               setSelectedImage={setSelectedImage}
//             />
//           ))}
//         </div>

//         {!(project.images && project.images.length) && (
//           <p className="text-gray-500 text-sm sm:text-base mt-4">
//             No gallery images available for this project.
//           </p>
//         )}
//       </motion.div>

//       {selectedImage && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//           <div className="relative max-w-6xl w-full flex flex-col items-center">
//             <div className="overflow-auto max-h-[90vh] max-w-full flex justify-center items-center">
//               <img
//                 src={selectedImage}
//                 alt="Full preview"
//                 className="max-h-[90vh] max-w-full rounded-lg shadow-lg transition-transform duration-300"
//                 style={{
//                   transform: `scale(${zoom})`,
//                   objectFit: "contain",
//                   cursor: zoom > 1 ? "grab" : "default",
//                 }}
//                 draggable={false}
//                 onMouseDown={(e) => {
//                   if (zoom <= 1) return;
//                   const img = e.target;
//                   let startX = e.pageX - img.offsetLeft;
//                   let startY = e.pageY - img.offsetTop;
//                   const onMouseMove = (moveEvent) => {
//                     img.parentElement.scrollLeft = moveEvent.pageX - startX;
//                     img.parentElement.scrollTop = moveEvent.pageY - startY;
//                   };
//                   const onMouseUp = () => {
//                     document.removeEventListener("mousemove", onMouseMove);
//                     document.removeEventListener("mouseup", onMouseUp);
//                   };
//                   document.addEventListener("mousemove", onMouseMove);
//                   document.addEventListener("mouseup", onMouseUp);
//                 }}
//               />
//             </div>

//             <div className="flex flex-wrap gap-3 mt-4 justify-center">
//               <button
//                 onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
//                 className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition"
//               >
//                 -
//               </button>
//               <span className="text-white">{Math.round(zoom * 100)}%</span>
//               <button
//                 onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
//                 className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition"
//               >
//                 +
//               </button>
//               <button
//                 onClick={() => setZoom(1)}
//                 className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition"
//               >
//                 Reset
//               </button>
//               <button
//                 onClick={() => setSelectedImage(null)}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// }














// "use client";
// import { useState, useEffect, memo, useMemo } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// const ImageCard = memo(function ImageCard({ img, index, fadeIn, project, setSelectedImage }) {
//   const [loaded, setLoaded] = useState(false);
//   const [error, setError] = useState(false);

//   return (
//     <motion.div
//       key={index}
//       variants={fadeIn}
//       whileHover={{ y: -3, scale: 1.01 }}
//       className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-md cursor-pointer bg-gray-100 will-change-transform"
//       onClick={() => setSelectedImage(img.url)}
//     >
//       {!loaded && (
//         <div className="absolute inset-0 animate-pulse bg-gray-200" />
//       )}
//       <Image
//         src={!error ? img.url : "/placeholder.svg?height=300&width=400"}
//         alt={`${project.title} gallery image ${index + 1}`}
//         fill
//         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//         className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
//         onError={() => setError(true)}
//         onLoad={() => setLoaded(true)}
//         loading={index < 3 ? "eager" : "lazy"}   // only eager load first 3
//         priority={index < 3}                     // keep LCP fast
//         placeholder="blur"
//         blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=" // tiny blur placeholder
//       />
//     </motion.div>
//   );
// });

// export default function GalleryTab({
//   project,
//   refreshKey,
//   setRefreshKey,
//   fadeIn,
//   staggerContainer,
//   selectedImage,
//   setSelectedImage,
//   zoom,
//   setZoom,
// }) {
//   const images = useMemo(() => project.images || [], [project.images]);

//   return (
//     <motion.div
//       variants={staggerContainer}
//       initial="hidden"
//       animate="visible"
//       className="w-full"
//     >
//       <motion.div variants={fadeIn}>
//         <div className="flex items-center justify-between mb-4 sm:mb-6">
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Project Gallery</h2>

//           <button
//             onClick={() => setRefreshKey((prev) => prev + 1)}
//             className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-[#f2ad08] text-white rounded-lg shadow hover:bg-[#d88f07] active:bg-[#c27c05] transition"
//           >
//             Refresh
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//           {images.map((img, index) => (
//             <ImageCard
//               key={`${index}-${refreshKey}`}
//               img={img}
//               index={index}
//               fadeIn={fadeIn}
//               project={project}
//               setSelectedImage={setSelectedImage}
//             />
//           ))}
//         </div>

//         {!images.length && (
//           <p className="text-gray-500 text-sm sm:text-base mt-4">
//             No gallery images available for this project.
//           </p>
//         )}
//       </motion.div>

//       {selectedImage && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//           <div className="relative max-w-6xl w-full flex flex-col items-center">
//             <div className="overflow-auto max-h-[90vh] max-w-full flex justify-center items-center">
//               <img
//                 src={selectedImage}
//                 alt="Full preview"
//                 className="max-h-[90vh] max-w-full rounded-lg shadow-lg transition-transform duration-300"
//                 style={{
//                   transform: `scale(${zoom})`,
//                   objectFit: "contain",
//                   cursor: zoom > 1 ? "grab" : "default",
//                 }}
//                 draggable={false}
//                 onMouseDown={(e) => {
//                   if (zoom <= 1) return;
//                   const img = e.target;
//                   let startX = e.pageX - img.offsetLeft;
//                   let startY = e.pageY - img.offsetTop;
//                   const onMouseMove = (moveEvent) => {
//                     img.parentElement.scrollLeft = moveEvent.pageX - startX;
//                     img.parentElement.scrollTop = moveEvent.pageY - startY;
//                   };
//                   const onMouseUp = () => {
//                     document.removeEventListener("mousemove", onMouseMove);
//                     document.removeEventListener("mouseup", onMouseUp);
//                   };
//                   document.addEventListener("mousemove", onMouseMove);
//                   document.addEventListener("mouseup", onMouseUp);
//                 }}
//               />
//             </div>

//             <div className="flex flex-wrap gap-3 mt-4 justify-center">
//               <button
//                 onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
//                 className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition"
//               >
//                 -
//               </button>
//               <span className="text-white">{Math.round(zoom * 100)}%</span>
//               <button
//                 onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
//                 className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition"
//               >
//                 +
//               </button>
//               <button
//                 onClick={() => setZoom(1)}
//                 className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition"
//               >
//                 Reset
//               </button>
//               <button
//                 onClick={() => setSelectedImage(null)}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// }












// "use client";
// import { useState, useEffect, memo, useMemo } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// const ImageCard = memo(function ImageCard({ img, index, fadeIn, project, setSelectedImage }) {
//   const [loaded, setLoaded] = useState(false);
//   const [error, setError] = useState(false);

//   return (
//     <motion.div
//       key={index}
//       variants={fadeIn}
//       className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-md cursor-pointer bg-gray-100 hover:translate-y-[-3px] hover:scale-[1.01] transition-transform duration-200 ease-out will-change-transform"
//       onClick={() => setSelectedImage(img.url)}
//     >
//       {!loaded && (
//         <div className="absolute inset-0 animate-pulse bg-gray-200" />
//       )}
//       <Image
//         src={!error ? img.url : "/placeholder.svg?height=300&width=400"}
//         alt={`${project.title} gallery image ${index + 1}`}
//         fill
//         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//         className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
//         onError={() => setError(true)}
//         onLoad={() => setLoaded(true)}
//         loading={index < 6 ? "eager" : "lazy"}   // Eager load first 6 for smoother initial experience
//         priority={index < 3}                     // Priority only for first 3 to optimize LCP
//         placeholder="blur"
//         blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=" // Tiny blur placeholder
//         quality={75}                             // Default quality, but explicit for thumbnails
//       />
//     </motion.div>
//   );
// });

// export default function GalleryTab({
//   project,
//   refreshKey,
//   setRefreshKey,
//   fadeIn,
//   staggerContainer,
//   selectedImage,
//   setSelectedImage,
//   zoom,
//   setZoom,
// }) {
//   const images = useMemo(() => project.images || [], [project.images]);

//   // Preload images beyond the first few to reduce loading lag during scroll
//   useEffect(() => {
//     images.slice(6).forEach((img) => {
//       const preloadImg = new window.Image();
//       preloadImg.src = img.url;
//     });
//   }, [images]);

//   return (
//     <motion.div
//       variants={staggerContainer}
//       initial="hidden"
//       animate="visible"
//       className="w-full"
//     >
//       <motion.div variants={fadeIn}>
//         <div className="flex items-center justify-between mb-4 sm:mb-6">
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Project Gallery</h2>

//           <button
//             onClick={() => setRefreshKey((prev) => prev + 1)}
//             className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-[#f2ad08] text-white rounded-lg shadow hover:bg-[#d88f07] active:bg-[#c27c05] transition"
//           >
//             Refresh
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//           {images.map((img, index) => (
//             <ImageCard
//               key={`${index}-${refreshKey}`}
//               img={img}
//               index={index}
//               fadeIn={fadeIn}
//               project={project}
//               setSelectedImage={setSelectedImage}
//             />
//           ))}
//         </div>

//         {!images.length && (
//           <p className="text-gray-500 text-sm sm:text-base mt-4">
//             No gallery images available for this project.
//           </p>
//         )}
//       </motion.div>

//       {selectedImage && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//           <div className="relative max-w-6xl w-full flex flex-col items-center">
//             <div className="overflow-auto max-h-[90vh] max-w-full flex justify-center items-center">
//               <img
//                 src={selectedImage}
//                 alt="Full preview"
//                 className="max-h-[90vh] max-w-full rounded-lg shadow-lg transition-transform duration-300"
//                 style={{
//                   transform: `scale(${zoom})`,
//                   objectFit: "contain",
//                   cursor: zoom > 1 ? "grab" : "default",
//                 }}
//                 draggable={false}
//                 onMouseDown={(e) => {
//                   if (zoom <= 1) return;
//                   const img = e.target;
//                   let startX = e.pageX - img.offsetLeft;
//                   let startY = e.pageY - img.offsetTop;
//                   const onMouseMove = (moveEvent) => {
//                     img.parentElement.scrollLeft = moveEvent.pageX - startX;
//                     img.parentElement.scrollTop = moveEvent.pageY - startY;
//                   };
//                   const onMouseUp = () => {
//                     document.removeEventListener("mousemove", onMouseMove);
//                     document.removeEventListener("mouseup", onMouseUp);
//                   };
//                   document.addEventListener("mousemove", onMouseMove);
//                   document.addEventListener("mouseup", onMouseUp);
//                 }}
//               />
//             </div>

//             <div className="flex flex-wrap gap-3 mt-4 justify-center">
//               <button
//                 onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
//                 className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition"
//               >
//                 -
//               </button>
//               <span className="text-white">{Math.round(zoom * 100)}%</span>
//               <button
//                 onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
//                 className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition"
//               >
//                 +
//               </button>
//               <button
//                 onClick={() => setZoom(1)}
//                 className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition"
//               >
//                 Reset
//               </button>
//               <button
//                 onClick={() => setSelectedImage(null)}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// }













"use client";
import { useState, useEffect, memo, useMemo, useRef } from "react";
import Image from "@/components/optimized-image";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaStop, FaVolumeUp, FaVolumeMute, FaBackward, FaForward } from "react-icons/fa";

const getMediaInfo = (url) => {
  let type = 'image';
  let thumbnail = url;
  let embedUrl = url;
  let videoId = null;
  let fileId = null;
  let postId = null;

  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    type = 'video';
    thumbnail = null;
    embedUrl = url;
  } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
    videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop().split('?')[0];
    type = 'youtube';
    thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`;
  } else if (url.includes('drive.google.com')) {
  fileId = url.split('/d/')[1]?.split('/')[0] || url.split('id=')[1]?.split('&')[0];
  type = 'drive';
  thumbnail = `https://drive.google.com/thumbnail?id=${fileId}`;
  embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
}
 else if (url.includes('instagram.com')) {
    if (url.includes('/p/') || url.includes('/reel/')) {
      postId = (url.split('/p/')[1] || url.split('/reel/')[1])?.split('/')[0];
      type = 'instagram';
      thumbnail = `https://www.instagram.com/p/${postId}/media/?size=m`;
      embedUrl = `https://www.instagram.com/p/${postId}/embed/`;
    }
  }

  return { type, thumbnail, embedUrl, videoId, fileId, postId };
};

const MediaCard = memo(function MediaCard({ img, index, fadeIn, project, setSelectedMedia }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { type, thumbnail, embedUrl } = getMediaInfo(img.url);
  const src = thumbnail || (!error ? img.url : "/placeholder.svg?height=300&width=400");

  return (
    <motion.div
      key={index}
      variants={fadeIn}
      className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-md cursor-pointer bg-gray-100 hover:translate-y-[-3px] hover:scale-[1.01] transition-transform duration-200 ease-out will-change-transform"
      onClick={() => setSelectedMedia(getMediaInfo(img.url))}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      <Image
        src={src}
        alt={`${project.title} gallery ${index + 1}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        loading={index < 6 ? "eager" : "lazy"}
        priority={index < 3}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
        quality={75}
      />
      {type !== 'image' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
          <FaPlay className="text-white text-4xl" />
        </div>
      )}
    </motion.div>
  );
});

export default function GalleryTab({
  project,
  refreshKey,
  setRefreshKey,
  fadeIn,
  staggerContainer,
  selectedImage,
  setSelectedImage,
  zoom,
  setZoom,
}) {
  const images = useMemo(() => project.images || [], [project.images]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const playerRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    images.forEach((img) => {
      const { thumbnail } = getMediaInfo(img.url);
      if (thumbnail) {
        const preloadImg = new window.Image();
        preloadImg.src = thumbnail;
      }
    });
  }, [images]);

  useEffect(() => {
    if (selectedMedia?.type === 'youtube') {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player('youtube-player', {
          height: '100%',
          width: '100%',
          videoId: selectedMedia.videoId,
          playerVars: {
            autoplay: 1,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              event.target.playVideo();
            },
          },
        });
      };

      return () => {
        if (playerRef.current) {
          playerRef.current.destroy();
        }
        delete window.onYouTubeIframeAPIReady;
        if (tag.parentNode) {
          tag.parentNode.removeChild(tag);
        }
      };
    }
  }, [selectedMedia]);

  const handlePlay = () => {
    if (selectedMedia.type === 'youtube') playerRef.current.playVideo();
    if (selectedMedia.type === 'video') videoRef.current.play();
  };

  const handlePause = () => {
    if (selectedMedia.type === 'youtube') playerRef.current.pauseVideo();
    if (selectedMedia.type === 'video') videoRef.current.pause();
  };

  const handleStop = () => {
    if (selectedMedia.type === 'youtube') playerRef.current.stopVideo();
    if (selectedMedia.type === 'video') {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleSeek = (seconds) => {
    if (selectedMedia.type === 'youtube') {
      const current = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(current + seconds, true);
    }
    if (selectedMedia.type === 'video') {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleToggleMute = () => {
    if (selectedMedia.type === 'youtube') {
      const muted = playerRef.current.isMuted();
      if (muted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!muted);
    }
    if (selectedMedia.type === 'video') {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const isControllable = selectedMedia && (selectedMedia.type === 'youtube' || selectedMedia.type === 'video');

  const getCropStyles = (type) => {
    if (type === 'instagram') {
      return {
        container: { position: 'relative', overflow: 'hidden', width: '100%', aspectRatio: '16/9' },
        iframe: { position: 'absolute', top: '-60px', left: 0, width: '100%', height: 'calc(100% + 120px)' },
      };
    }
    return {
      container: {},
      iframe: {},
    };
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <motion.div variants={fadeIn}>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Project Gallery</h2>

          <button
            onClick={() => setRefreshKey((prev) => prev + 1)}
            className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-[#f2ad08] text-white rounded-lg shadow hover:bg-[#d88f07] active:bg-[#c27c05] transition"
          >
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {images.map((img, index) => (
            <MediaCard
              key={`${index}-${refreshKey}`}
              img={img}
              index={index}
              fadeIn={fadeIn}
              project={project}
              setSelectedMedia={setSelectedMedia}
            />
          ))}
        </div>

        {!images.length && (
          <p className="text-gray-500 text-sm sm:text-base mt-4">
            No gallery images available for this project.
          </p>
        )}
      </motion.div>

      {selectedMedia && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative max-w-6xl w-full flex flex-col items-center">
            <div className="overflow-auto max-h-[90vh] max-w-full flex justify-center items-center">
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.embedUrl}
                  alt="Full preview"
                  className="max-h-[90vh] max-w-full rounded-lg shadow-lg transition-transform duration-300"
                  style={{
                    transform: `scale(${zoom})`,
                    objectFit: "contain",
                    cursor: zoom > 1 ? "grab" : "default",
                  }}
                  draggable={false}
                  onMouseDown={(e) => {
                    if (zoom <= 1) return;
                    const img = e.target;
                    let startX = e.pageX - img.offsetLeft;
                    let startY = e.pageY - img.offsetTop;
                    const onMouseMove = (moveEvent) => {
                      img.parentElement.scrollLeft = startX - moveEvent.pageX;
                      img.parentElement.scrollTop = startY - moveEvent.pageY;
                    };
                    const onMouseUp = () => {
                      document.removeEventListener("mousemove", onMouseMove);
                      document.removeEventListener("mouseup", onMouseUp);
                    };
                    document.addEventListener("mousemove", onMouseMove);
                    document.addEventListener("mouseup", onMouseUp);
                  }}
                />
              ) : selectedMedia.type === 'youtube' ? (
                <div id="youtube-player" className="w-full aspect-video max-h-[90vh]" />
              ) : selectedMedia.type === 'instagram' ? (
                <div style={getCropStyles(selectedMedia.type).container} className="w-full max-h-[90vh]">
                  <iframe
                    src={selectedMedia.embedUrl}
                    style={getCropStyles(selectedMedia.type).iframe}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                    loading="lazy"
                  />
                </div>
           ) : selectedMedia.type === 'drive' ? (
  <iframe
    src={selectedMedia.embedUrl}
    allow="autoplay; encrypted-media"
    allowFullScreen
    className="w-full max-h-[90vh] rounded-lg"
    loading="lazy"
  />
) : selectedMedia.type === 'video' ? (
  <video
    ref={videoRef}
    src={selectedMedia.embedUrl}
    autoPlay
    controls
    controlsList="nodownload"
    preload="auto"
    className="w-full max-h-[90vh]"
  />
) : null}

            </div>

            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {selectedMedia.type === 'image' ? (
                <>
                  <button
                    onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition"
                  >
                    -
                  </button>
                  <span className="text-white">{Math.round(zoom * 100)}%</span>
                  <button
                    onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setZoom(1)}
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition"
                  >
                    Reset
                  </button>
                </>
              ) : isControllable ? (
                <>
                  <button onClick={handlePlay} className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition">
                    <FaPlay />
                  </button>
                  <button onClick={handlePause} className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition">
                    <FaPause />
                  </button>
                  <button onClick={handleStop} className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition">
                    <FaStop />
                  </button>
                  <button onClick={() => handleSeek(-10)} className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition">
                    <FaBackward />
                  </button>
                  <button onClick={() => handleSeek(10)} className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition">
                    <FaForward />
                  </button>
                  <button onClick={handleToggleMute} className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition">
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                </>
              ) : null}
              <button
                onClick={() => setSelectedMedia(null)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}