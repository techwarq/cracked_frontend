"use client"

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () =>  <div className="flex justify-center items-center h-screen">
    <img
      src="/Bat Png.png" // Update this with the correct path to your bat image
      alt="Loading Bat"
      className=" w-32 h-32 animate-spinner transform-gpu"
    />
  </div>,
  }
);

export default function Goals() {
  const [dimensions, setDimensions] = useState({ width: '100vw', height: '100vh' });

  useEffect(() => {
    const updateDimensions = () => {
      const headerHeight = document.querySelector('h1')?.offsetHeight || 0;
      setDimensions({
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight - headerHeight}px`,
      });
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col">
      
      <h1 className="text-center text-3xl font-mono text-white py-4">Draw Your Goals</h1>
      <div className="flex-grow" style={{ width: dimensions.width, height: dimensions.height }}>
        <Excalidraw
          theme="dark"
          initialData={{
            appState: {
              viewBackgroundColor: "#1F2937", // Tailwind's gray-800
            },
          }}
        />
      </div>
    </div>
  );
}