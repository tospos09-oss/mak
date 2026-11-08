import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Space } from '../../types';
import { formatCurrency } from '../../i18n/translations';
import { useApp } from '../../context/AppContext';

interface LeafletMapProps {
  spaces: Space[];
  selectedSpaceId?: string | null;
  onSelectSpace?: (spaceId: string) => void;
  className?: string;
  zoom?: number;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  spaces,
  selectedSpaceId,
  onSelectSpace,
  className = 'h-full w-full',
  zoom,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const { language, navigateTo } = useApp();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialCenter: [number, number] =
      spaces.length === 1
        ? [spaces[0].coordinates.lat, spaces[0].coordinates.lng]
        : [36.7538, 3.0588];

    const initialZoom = zoom || (spaces.length === 1 ? 15 : 12);

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: 'topright' }).addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    const bounds: L.LatLngExpression[] = [];

    spaces.forEach((space) => {
      const isSelected = selectedSpaceId === space.id || spaces.length === 1;
      const formattedPrice = formatCurrency(space.pricing.pricePerHour, language);

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: ${isSelected ? '#D9532B' : '#111111'};
            color: #FFFFFF;
            padding: 5px 12px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 700;
            white-space: nowrap;
            box-shadow: 0 4px 14px rgba(0,0,0,0.25);
            border: 2px solid #FFFFFF;
            cursor: pointer;
            transform: scale(1.08);
            transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease;
          ">
            ${spaces.length === 1 ? space.commune : formattedPrice}
          </div>
        `,
        iconSize: [90, 32],
        iconAnchor: [45, 16],
      });

      const marker = L.marker([space.coordinates.lat, space.coordinates.lng], {
        icon: customIcon,
      }).addTo(map);

      if (spaces.length > 1) {
        const popupContent = document.createElement('div');
        popupContent.style.minWidth = '220px';
        popupContent.style.cursor = 'pointer';
        popupContent.innerHTML = `
          <div style="border-radius: 12px; overflow: hidden; font-family: inherit;">
            <img src="${space.photos[0]}" alt="${space.title}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px;" />
            <div style="padding-top: 8px;">
              <div style="font-size: 11px; text-transform: uppercase; color: #6B6B6B; font-weight: 600; letter-spacing: 0.05em;">${space.commune} · ${space.capacity} pers</div>
              <div style="font-size: 13px; font-weight: 700; color: #111111; margin-top: 2px; line-height: 1.25; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${space.title}</div>
              <div style="font-size: 13px; font-weight: 800; color: #D9532B; margin-top: 4px;">${formattedPrice} /h</div>
            </div>
          </div>
        `;

        popupContent.addEventListener('click', () => {
          navigateTo('space-detail', space.id);
        });

        marker.bindPopup(popupContent);
      } else {
        // Single space view: informative tooltip with address
        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 12px; padding: 4px;">
            <div style="font-weight: 700; color: #111111;">${space.title}</div>
            <div style="color: #6B6B6B; margin-top: 2px;">${space.address}</div>
          </div>
        `);
      }

      if (onSelectSpace) {
        marker.on('click', () => {
          onSelectSpace(space.id);
        });
      }

      markersRef.current[space.id] = marker;
      bounds.push([space.coordinates.lat, space.coordinates.lng]);
    });

    if (spaces.length === 1) {
      map.setView([spaces[0].coordinates.lat, spaces[0].coordinates.lng], 15);
    } else if (bounds.length > 0) {
      map.fitBounds(L.latLngBounds(bounds), { padding: [50, 50], maxZoom: 14 });
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }, [spaces, selectedSpaceId, language, onSelectSpace, navigateTo, zoom]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
};
