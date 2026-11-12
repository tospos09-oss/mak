import React, { useState } from 'react';
import { Space, Booking } from '../../types';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AvailabilityCalendarReadOnlyProps {
  space: Space;
  bookings: Booking[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const AvailabilityCalendarReadOnly: React.FC<AvailabilityCalendarReadOnlyProps> = ({
  space,
  bookings,
  selectedDate,
  onSelectDate,
}) => {
  const { language } = useApp();

  // Current month view state (November 2026 based on mock timeline)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(10); // 0-indexed, 10 = Nov

  const monthNamesFr = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const monthNamesEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthNames = language === 'en' ? monthNamesEn : monthNamesFr;
  const daysOfWeek = language === 'en' 
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  // Days in month calculation
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  const isDateOccupied = (dateStr: string) => {
    // Check if whole day blocked
    const isBlocked = space.blockedSlots?.some(
      (b) => b.date === dateStr && (b.wholeDay || (b.startHour !== undefined && b.endHour !== undefined))
    );
    // Check if booked
    const isBooked = bookings.some(
      (b) => b.spaceId === space.id && b.date === dateStr && (b.status === 'confirmed' || b.status === 'pending')
    );
    return isBlocked || isBooked;
  };

  return (
    <div className="bg-[#F7F5F2] rounded-2xl p-6 border border-[#E5E2DD]">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-base font-bold text-[#111111] font-display">
          {monthNames[currentMonth]} {currentYear}
        </h4>
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-[#111111] shadow-xs"
            aria-label="Mois précédent"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-[#111111] shadow-xs"
            aria-label="Mois suivant"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week Header */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#6B6B6B] mb-2 uppercase">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {/* Empty slots before first day */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="h-10" />
        ))}

        {/* Days */}
        {Array.from({ length: totalDays }).map((_, i) => {
          const dayNum = i + 1;
          const monthPad = String(currentMonth + 1).padStart(2, '0');
          const dayPad = String(dayNum).padStart(2, '0');
          const dateStr = `${currentYear}-${monthPad}-${dayPad}`;

          const isOccupied = isDateOccupied(dateStr);
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={dateStr}
              type="button"
              disabled={isOccupied}
              onClick={() => onSelectDate(dateStr)}
              className={`h-10 rounded-xl text-xs font-semibold flex items-center justify-center relative transition-all ${
                isSelected
                  ? 'bg-[#D9532B] text-white shadow-md font-bold'
                  : isOccupied
                  ? 'bg-transparent text-[#AAAAAA] line-through cursor-not-allowed'
                  : 'bg-white hover:bg-[#D9532B]/10 text-[#111111] shadow-xs'
              }`}
            >
              <span>{dayNum}</span>
              {/* Dot indicator */}
              {!isOccupied && !isSelected && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[#E5E2DD] text-[11px] text-[#6B6B6B]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Créneau disponible</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D9532B]" />
          <span>Date sélectionnée</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 line-through" />
          <span>Réservé / Bloqué</span>
        </div>
      </div>
    </div>
  );
};
