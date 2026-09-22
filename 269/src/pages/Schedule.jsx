import React, { useState } from 'react';
import { Clock, User, CheckCircle2, Sparkles, MapPin, Calendar, LayoutGrid, Table as TableIcon } from 'lucide-react';
import scheduleData from '../../../schedule.json';

export default function Schedule() {
  const [selectedShift, setSelectedShift] = useState('shift_1');
  const [selectedClass, setSelectedClass] = useState('1-A');
  const [viewMode, setViewMode] = useState('cards'); // Telefonda birinchi bo'lib kartochka (qulayroq) ko'rinishi turadi

  const currentShiftData = scheduleData[selectedShift] || {};
  const currentClasses = currentShiftData.classes || [];
  const currentTeachers = currentShiftData.teachers || {};
  const currentRooms = currentShiftData.rooms || {};
  const currentScheduleMap = currentShiftData.schedule || {};

  const weekDays = [
    { key: 'DUSHANBA', label: 'Dushanba' },
    { key: 'SESHANBA', label: 'Seshanba' },
    { key: 'CHORSHANBA', label: 'Chorshanba' },
    { key: 'PAYSHANBA', label: 'Payshanba' },
    { key: 'JUMA', label: 'Juma' },
    { key: 'SHANBA', label: 'Shanba' }
  ];

  const timeSlots = [
    { num: 1, time: selectedShift === 'shift_1' ? '08:00 - 08:45' : '13:30 - 14:15' },
    { num: 2, time: selectedShift === 'shift_1' ? '08:50 - 09:35' : '14:20 - 15:05' },
    { num: 3, time: selectedShift === 'shift_1' ? '09:40 - 10:25' : '15:10 - 15:55' },
    { num: 4, time: selectedShift === 'shift_1' ? '10:35 - 11:20' : '16:05 - 16:50' },
    { num: 5, time: selectedShift === 'shift_1' ? '11:25 - 12:10' : '16:55 - 17:40' },
    { num: 6, time: selectedShift === 'shift_1' ? '12:15 - 13:00' : '17:45 - 18:30' },
    { num: 7, time: selectedShift === 'shift_1' ? '13:05 - 13:50' : '—' },
  ];

  const classSchedule = currentScheduleMap[selectedClass] || Array(6).fill(Array(7).fill('—'));
  const teacherName = currentTeachers[selectedClass] || "O'qituvchi";
  const roomNumber = currentRooms[selectedClass] || '';

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6 text-[#1D1D1F] font-sans antialiased">
      {/* HEADER SECTION */}
      <div className="bg-white/90 backdrop-blur-xl p-4 sm:p-8 rounded-3xl sm:rounded-[2.5rem] border border-slate-200/75 shadow-xs text-center space-y-3 sm:space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-20 bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>

        <div className="inline-flex items-center gap-1.5 bg-blue-50/80 border border-blue-100 px-3 py-1 rounded-full text-blue-600 text-[11px] sm:text-xs font-medium relative z-10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>269-umumiy o'rta ta'lim maktabi (2026-2027 o'quv yili)</span>
        </div>

        <h1 className="text-xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] relative z-10 leading-tight">
          269-umumiy o'rta ta'lim maktabining <br className="hidden sm:inline" /> dars jadvali
        </h1>
        
        {/* Smena tanlash */}
        <div className="flex justify-center gap-2 pt-1 relative z-10">
          {['shift_1', 'shift_2'].map((shift) => (
            <button
              key={shift}
              onClick={() => {
                setSelectedShift(shift);
                const shiftClasses = scheduleData[shift]?.classes || [];
                if (shiftClasses.length > 0) {
                  setSelectedClass(shiftClasses[0]);
                }
              }}
              className={`px-4 sm:px-6 py-2 rounded-xl sm:rounded-2xl text-xs font-semibold transition-all duration-300 ${
                selectedShift === shift
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
              }`}
            >
              {shift === 'shift_1' ? '1-Smena' : '2-Smena'}
            </button>
          ))}
        </div>

        {/* Sinf tanlash tugmalari (Mobil uchun silliq gorizontal skanerlash) */}
        <div className="flex overflow-x-auto pb-2 pt-1 gap-1.5 max-w-4xl mx-auto relative z-10 no-scrollbar justify-start sm:justify-center">
          {currentClasses.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-300 shrink-0 ${
                selectedClass === cls 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-105' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* SCHEDULE CONTAINER */}
      <div className="bg-white p-4 sm:p-8 rounded-3xl sm:rounded-[2.5rem] border border-slate-200/75 shadow-xs space-y-4 sm:space-y-6">
        
        {/* INFO & VIEW TOGGLE BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-4 sm:pb-5 gap-3 sm:gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-sm sm:text-base shrink-0">
              {selectedClass}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm sm:text-lg font-semibold text-[#1D1D1F] tracking-tight truncate">{selectedClass} sinfi dars jadvali</h2>
              <p className="text-[11px] sm:text-xs text-slate-400 font-light flex flex-wrap items-center gap-2 pt-0.5">
                <span className="flex items-center gap-1 text-slate-600 font-medium truncate">
                  <User className="w-3.5 h-3.5 text-blue-600 shrink-0" /> {teacherName}
                </span>
                {roomNumber && (
                  <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg font-medium shrink-0">
                    <MapPin className="w-3 h-3" /> {roomNumber}-xona
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
            {/* Ko'rinishni almashtirish (Jadval yoki Kartochkalar) */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 w-full sm:w-auto justify-center">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'cards' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Kunlik
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" /> Jadval
              </button>
            </div>
          </div>
        </div>

        {/* 1. MOBILE/CARDS VIEW (Telefonda eng qulay ko'rinish) */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {weekDays.map((day, dayIdx) => {
              const daySubjects = classSchedule[dayIdx] || [];
              const hasClasses = daySubjects.some(sub => sub && sub !== '—' && sub !== '');

              return (
                <div key={day.key} className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-3.5 sm:p-4 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="font-semibold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" /> {day.label}
                    </span>
                    <span className="text-[10px] bg-blue-50 text-blue-600 font-medium px-2 py-0.5 rounded-md">
                      {selectedClass}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {timeSlots.map((slot, slotIdx) => {
                      const subject = daySubjects[slotIdx] || '—';
                      if (subject === '—' || !subject) return null;

                      return (
                        <div key={slot.num} className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs flex items-center justify-between gap-2">
                          <div className="space-y-0.5 min-w-0">
                            <span className="text-[10px] font-medium text-blue-600 block">{slot.num}-soat • <span className="text-slate-400">{slot.time}</span></span>
                            <h4 className="font-medium text-xs text-slate-800 truncate">{subject}</h4>
                          </div>
                        </div>
                      );
                    })}

                    {!hasClasses && (
                      <div className="text-center py-4 text-slate-400 text-xs font-light">
                        Bu kunga darslar belgilanmagan
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 2. TABLE VIEW (Keng ekranlar uchun jadval) */
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[850px] border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200/70">
                  <th className="p-3 text-left font-medium text-slate-400 w-14">#</th>
                  <th className="p-3 text-left font-medium text-slate-400 w-32">Vaqt</th>
                  {weekDays.map(day => (
                    <th key={day.key} className="p-3 text-center font-semibold text-[#1D1D1F] text-xs uppercase tracking-wider border-l border-slate-100 bg-slate-50/80 rounded-t-xl">
                      {day.label}
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody className="divide-y divide-slate-100">
                {timeSlots.map((slot, slotIdx) => (
                  <tr key={slot.num} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-blue-600 text-base border-r border-slate-100/60 text-center">{slot.num}</td>
                    <td className="p-4 text-slate-500 font-light flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {slot.time}
                    </td>
                    
                    {weekDays.map((day, dayIdx) => {
                      const subject = classSchedule[dayIdx]?.[slotIdx] || '—';
                      const isFree = subject === '—';

                      return (
                        <td key={day.key} className="p-3 border-l border-slate-100 align-top">
                          <div className={`p-3 rounded-2xl border transition-all ${
                            isFree 
                              ? 'bg-transparent border-transparent opacity-30 text-center py-6 text-slate-300' 
                              : 'bg-slate-50/80 border-slate-200/60 shadow-2xs hover:border-blue-200 hover:bg-white hover:shadow-xs'
                          }`}>
                            <div className="font-semibold text-[#1D1D1F] text-[13px] tracking-tight">
                              {subject}
                            </div>
                            {!isFree && (
                              <div className="text-[10px] text-slate-400 font-light pt-1 mt-1 border-t border-slate-200/40 flex items-center justify-between">
                                <span>{selectedClass}</span>
                                <span className="text-blue-600 font-medium">{slot.num}-soat</span>
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* FOOTER */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-400 font-light gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Dars jadvali Xojimurodov Jaloliddin tomonidan tahrirlandi
          </div>
          <p>269-umumiy o'rta ta'lim maktabi</p>
        </div>
      </div>
    </div>
  );
}