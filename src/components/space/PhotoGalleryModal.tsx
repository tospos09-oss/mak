import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoGalleryModalProps {
  photos: string[];
  initialIdx?: number;
  isOpen: boolean;
  onClose: () => void;
  spaceTitle: string;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
  photos,
  initialIdx = 0,
  isOpen,
  onClose,
  spaceTitle,
}) => {
  const [currentIdx, setCurrentIdx] = useState(initialIdx);

  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200">
      
      {/* Top Bar: Title & Close Button */}
      <div className="flex items-center justify-between text-white pb-4 border-b border-white/10 max-w-7xl mx-auto w-full">
        <div>
          <span className="text-xs uppercase tracking-wider text-white/60">Galerie photos</span>
          <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
            {spaceTitle}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono font-bold text-white/70">
            {currentIdx + 1} / {photos.length}
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Large Image & Navigation */}
      <div className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4">
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Photo précédente"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <img
          src={photos[currentIdx]}
          alt={`${spaceTitle} photo ${currentIdx + 1}`}
          referrerPolicy="no-referrer"
          className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
        />

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Photo suivante"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 max-w-7xl mx-auto w-full">
        {photos.map((photo, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 transition-all ${
              idx === currentIdx ? 'ring-2 ring-[#D9532B] scale-105 opacity-100' : 'opacity-50 hover:opacity-80'
            }`}
          >
            <img
              src={photo}
              alt="Thumbnail"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
