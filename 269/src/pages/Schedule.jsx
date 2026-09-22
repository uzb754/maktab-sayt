import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  User, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Layers, 
  Grid, 
  List, 
  Search, 
  School 
} from 'lucide-react';

const scheduleData = {
  "shift_1": {
    "classes": ["1-A", "1-B", "2-A", "2-B", "3-A", "4-A", "5-A", "6-A", "7-A", "8-A", "9-A", "10-A", "11-A"],
    "teachers": {
      "1-A": "Karimova Z. T.",
      "1-B": "Tursunova M. A.",
      "2-A": "Ahmedova D. S.",
      "2-B": "Qodirova G. R.",
      "3-A": "Rahmonova N. B.",
      "4-A": "Ismoilov B. K.",
      "5-A": "Nazarova M. Sh.",
      "6-A": "Yusupov F. A.",
      "7-A": "Saidova Z. M.",
      "8-A": "Boboyev H. T.",
      "9-A": "Toirova Sh. U.",
      "10-A": "Mamajonov D. R.",
      "11-A": "Alimatova D. G."
    },
    "rooms": {
      "1-A": "101", "1-B": "102", "2-A": "103", "2-B": "104", 
      "3-A": "201", "4-A": "202", "5-A": "301", "6-A": "302", 
      "7-A": "401", "8-A": "402", "9-A": "501", "10-A": "502", "11-A": "503"
    },
    "schedule": {
      "1-A": [
        ["Alifbe", "Matematika", "Ona tili", "Tasviriy san'at", "Jismoniy tarbiya", "Musiqa", "—"],
        ["Matematika", "Alifbe", "Ona tili", "Jismoniy tarbiya", "Atrofimizdagi olam", "Texnologiya", "—"],
        ["Ona tili", "Matematika", "O'qish", "Tasviriy san'at", "Musiqa", "Jismoniy tarbiya", "—"],
        ["Matematika", "Ona tili", "Jismoniy tarbiya", "Atrofimizdagi olam", "Alifbe", "Musiqa", "—"],
        ["Ona tili", "O'qish", "Matematika", "Texnologiya", "Tasviriy san'at", "Jismoniy tarbiya", "—"],
        ["Jismoniy tarbiya", "Matematika", "Ona tili", "Musiqa", "Atrofimizdagi olam", "—", "—"]
      ],
      "5-A": [
        ["Matematika", "Ona tili", "Ingliz tili", "Tarix", "Geografiya", "Biologiya", "Jismoniy tarbiya"],
        ["Ona tili", "Matematika", "Adabiyot", "Ingliz tili", "Informatika", "Fizika", "Musiqa"],
        ["Tarix", "Geografiya", "Matematika", "Ona tili", "Biologiya", "Ingliz tili", "Texnologiya"],
        ["Ingliz tili", "Ona tili", "Matematika", "Fizika", "Informatika", "Jismoniy tarbiya", "Tasviriy san'at"],
        ["Matematika", "Adabiyot", "Tarix", "Geografiya", "Biologiya", "Ingliz tili", "Ona tili"],
        ["Jismoniy tarbiya", "Musiqa", "Texnologiya", "Informatika", "Matematika", "—", "—"]
      ],
      "11-A": [
        ["Algebra", "Fizika", "Kimyo", "Ingliz tili", "O'zbekiston tarixi", "Adabiyot", "Chaqiriqqa qadar boshlang'ich tayyorgarlik"],
        ["Geometriya", "Algebra", "Fizika", "Kimyo", "Ingliz tili", "Informatika", "Iqtisod"],
        ["Adabiyot", "O'zbekiston tarixi", "Algebra", "Fizika", "Biologiya", "Ingliz tili", "Jismoniy tarbiya"],
        ["Fizika", "Kimyo", "Geometriya", "Informatika", "Ingliz tili", "Ona tili", "Huquq asoslari"],
        ["Algebra", "Adabiyot", "O'zbekiston tarixi", "Biologiya", "Kimyo", "Ingliz tili", "Fizika"],
        ["Jismoniy tarbiya", "Chaqiriqqa qadar boshlang'ich tayyorgarlik", "Iqtisod", "Huquq asoslari", "Algebra", "—", "—"]
      ]
    }
  },
  "shift_2": {
    "classes": ["3-B", "4-B", "5-B", "6-B", "7-B", "8-B", "9-B"],
    "teachers": {
      "3-B": "Soliyeva M. K.",
      "4-B": "Ergashev A. B.",
      "5-B": "Qosimova Z. A.",
      "6-B": "Mirzayev S. T.",
      "7-B": "Hakimova D. Sh.",
      "8-B": "Karimov R. F.",
      "9-B": "Umarova N. A."
    },
    "rooms": {
      "3-B": "105", "4-B": "106", "5-B": "203", "6-B": "204", 
      "7-B": "303", "8-B": "304", "9-B": "403"
    },
    "schedule": {
      "3-B": [
        ["Matematika", "Ona tili", "O'qish", "Jismoniy tarbiya", "Musiqa", "—", "—"],
        ["Ona tili", "Matematika", "Tasviriy san'at", "Atrofimizdagi olam", "Jismoniy tarbiya", "—", "—"],
        ["O'qish", "Ona tili", "Matematika", "Texnologiya", "Musiqa", "—", "—"],
        ["Matematika", "Atrofimizdagi olam", "Ona tili", "Jismoniy tarbiya", "Tasviriy san'at", "—", "—"],
        ["Ona tili", "Matematika", "O'qish", "Musiqa", "Texnologiya", "—", "—"],
        ["Jismoniy tarbiya", "Atrofimizdagi olam", "Ona tili", "Matematika", "—", "—", "—"]
      ],
      "5-B": [
        ["Tarix", "Geografiya", "Matematika", "Ona tili", "Ingliz tili", "Jismoniy tarbiya", "—"],
        ["Matematika", "Ona tili", "Fizika", "Informatika", "Biologiya", "Ingliz tili", "—"],
        ["Ingliz tili", "Adabiyot", "Matematika", "Tarix", "Geografiya", "Texnologiya", "—"],
        ["Ona tili", "Fizika", "Matematika", "Informatika", "Jismoniy tarbiya", "Musiqa", "—"],
        ["Biologiya", "Geografiya", "Adabiyot", "Ingliz tili", "Matematika", "Ona tili", "—"],
        ["Jismoniy tarbiya", "Texnologiya", "Musiqa", "Matematika", "—", "—", "—"]
      ]
    }
  }
};

export default function Schedule() {
  const [selectedShift, setSelectedShift] = useState('shift_1');
  const [selectedClass, setSelectedClass] = useState('1-A');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [selectedDay, setSelectedDay] = useState(0); // For mobile card tab view (0-5)
  const [searchQuery, setSearchQuery] = useState('');

  const currentShiftData = scheduleData[selectedShift] || scheduleData['shift_1'];
  const currentClasses = currentShiftData.classes;
  const currentTeachers = currentShiftData.teachers;
  const currentRooms = currentShiftData.rooms;
  const currentScheduleMap = currentShiftData.schedule;

  // Auto-fill fallback schedule if class isn't explicitly defined in sample map
  const getScheduleForClass = (cls) => {
    if (currentScheduleMap[cls]) return currentScheduleMap[cls];
    // Fallback template for any class
    return [
      ["Matematika", "Ona tili", "Ingliz tili", "Tarix", "Biologiya", "Fizika", "Jismoniy tarbiya"],
      ["Ona tili", "Matematika", "Adabiyot", "Informatika", "Kimyo", "Geografiya", "Musiqa"],
      ["Tarix", "Ingliz tili", "Matematika", "Ona tili", "Fizika", "Biologiya", "Texnologiya"],
      ["Ingliz tili", "Ona tili", "Matematika", "Fizika", "Informatika", "Jismoniy tarbiya", "Tasviriy san'at"],
      ["Matematika", "Adabiyot", "Tarix", "Geografiya", "Biologiya", "Ingliz tili", "Ona tili"],
      ["Jismoniy tarbiya", "Musiqa", "Texnologiya", "Informatika", "Matematika", "—", "—"]
    ];
  };

  const classSchedule = getScheduleForClass(selectedClass);
  const teacherName = currentTeachers[selectedClass] || "O'qituvchi tayinlanmagan";
  const roomNumber = currentRooms[selectedClass] || '101';

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

  // Filter classes based on search query
  const filteredClasses = currentClasses.filter(cls => 
    cls.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 text-[#1D1D1F] font-sans antialiased selection:bg-blue-500 selection:text-white pb-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
        
        {/* HEADER SECTION */}
        <div className="bg-white/90 backdrop-blur-2xl p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200/80 shadow-sm text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>

          <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-100 px-4 py-1.5 rounded-full text-blue-600 text-xs sm:text-sm font-medium relative z-10 shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
            <span>269-umumiy o'rta ta'lim maktabi (2026-2027 o'quv yili)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1D1D1F] relative z-10 leading-tight">
            269-umumiy o'rta ta'lim maktabining <br className="hidden sm:inline" /> 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">dars jadvali</span>
          </h1>
          
          {/* Shift Selector */}
          <div className="flex justify-center gap-3 relative z-10">
            {['shift_1', 'shift_2'].map((shift) => (
              <button
                key={shift}
                onClick={() => {
                  setSelectedShift(shift);
                  const newShiftData = scheduleData[shift];
                  setSelectedClass(newShiftData.classes[0]);
                }}
                className={`px-6 sm:px-8 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedShift === shift
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/15 scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 border border-slate-200/60'
                }`}
              >
                <Clock className="w-4 h-4 opacity-80" />
                {shift === 'shift_1' ? '1-Smena (08:00 dan)' : '2-Smena (13:30 dan)'}
              </button>
            ))}
          </div>

          {/* Search & Class Selector Toolbar */}
          <div className="max-w-3xl mx-auto space-y-3 pt-2 relative z-10">
            <div className="flex items-center justify-between gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200/60">
              <div className="flex items-center gap-2 px-3 text-slate-400 w-full">
                <Search className="w-4 h-4 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Sinfni qidirish (masalan: 1-A, 5-B)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs sm:text-sm text-[#1D1D1F] w-full placeholder:text-slate-400"
                />
              </div>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-blue-600 font-medium px-3 py-1 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  Tozalash
                </button>
              )}
            </div>

            {/* Class Buttons Grid */}
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {filteredClasses.length > 0 ? (
                filteredClasses.map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      selectedClass === cls 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-105 ring-2 ring-blue-400/30' 
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 shadow-xs'
                    }`}
                  >
                    {cls}
                  </button>
                ))
              ) : (
                <div className="text-xs text-slate-400 py-3">Bunday sinf topilmadi</div>
              )}
            </div>
          </div>
        </div>

        {/* SCHEDULE CONTENT CONTAINER */}
        <div className="bg-white p-4 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200/80 shadow-sm space-y-6">
          
          {/* CARD HEADER & VIEW MODE TOGGLE */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-5 gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
                {selectedClass}
              </div>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-[#1D1D1F] tracking-tight">
                  {selectedClass} sinfi dars jadvali
                </h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                    <User className="w-3.5 h-3.5 text-blue-600" /> Sinf rahbari: <strong className="text-[#1D1D1F]">{teacherName}</strong>
                  </span>
                  {roomNumber && (
                    <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg font-medium border border-blue-100">
                      <MapPin className="w-3.5 h-3.5" /> {roomNumber}-xona
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* View Mode Toggle Buttons (Table vs Card view for mobile/tablet) */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-xs text-slate-500 hidden lg:block bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100">
                Maktab O'IBDO': <strong className="font-medium text-[#1D1D1F]">D.G. Alimatova</strong>
              </div>
              
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60">
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'table' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Jadval</span>
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'cards' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Kunlik</span>
                </button>
              </div>
            </div>
          </div>

          {/* DESKTOP & SCROLLABLE TABLE VIEW */}
          {viewMode === 'table' ? (
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full min-w-[850px] border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-3 text-center font-semibold text-slate-400 w-12">#</th>
                    <th className="p-3 text-left font-semibold text-slate-400 w-36">Vaqt</th>
                    {weekDays.map(day => (
                      <th key={day.key} className="p-3 text-center font-bold text-[#1D1D1F] text-xs uppercase tracking-wider border-l border-slate-100 bg-slate-50/90 rounded-t-xl">
                        {day.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-slate-100">
                  {timeSlots.map((slot, slotIdx) => (
                    <tr key={slot.num} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 font-bold text-blue-600 text-sm border-r border-slate-100 text-center">{slot.num}</td>
                      <td className="p-3 text-slate-500 font-normal whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{slot.time}</span>
                        </div>
                      </td>
                      
                      {weekDays.map((day, dayIdx) => {
                        const subject = classSchedule[dayIdx]?.[slotIdx] || '—';
                        const isFree = subject === '—';

                        return (
                          <td key={day.key} className="p-3 border-l border-slate-100 align-top">
                            <div className={`p-3 rounded-2xl border transition-all h-full flex flex-col justify-between ${
                              isFree 
                                ? 'bg-transparent border-transparent opacity-30 text-center py-5 text-slate-300' 
                                : 'bg-slate-50/70 border-slate-200/70 shadow-2xs hover:border-blue-300 hover:bg-white hover:shadow-md'
                            }`}>
                              <div className="font-semibold text-[#1D1D1F] text-xs sm:text-sm tracking-tight">
                                {subject}
                              </div>
                              {!isFree && (
                                <div className="text-[10px] text-slate-400 font-light pt-2 mt-2 border-t border-slate-200/50 flex items-center justify-between">
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
          ) : (
            /* MOBILE / TABLET FRIENDLY CARD / TABBED VIEW */
            <div className="space-y-6">
              {/* Day Selector Tabs */}
              <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-none">
                {weekDays.map((day, idx) => (
                  <button
                    key={day.key}
                    onClick={() => setSelectedDay(idx)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                      selectedDay === idx 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>

              {/* Selected Day Schedule Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {timeSlots.map((slot, slotIdx) => {
                  const subject = classSchedule[selectedDay]?.[slotIdx] || '—';
                  const isFree = subject === '—';

                  if (isFree && slot.time === '—') return null;

                  return (
                    <div 
                      key={slot.num}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                        isFree 
                          ? 'bg-slate-50/40 border-dashed border-slate-200 text-slate-400 opacity-60' 
                          : 'bg-white border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                          isFree ? 'bg-slate-100 text-slate-400' : 'bg-blue-50 text-blue-600 border border-blue-100'
                        }`}>
                          {slot.num}
                        </div>
                        <div>
                          <div className={`font-semibold text-sm sm:text-base ${isFree ? 'text-slate-400 italic' : 'text-[#1D1D1F]'}`}>
                            {subject}
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-1 pt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>{slot.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        {selectedClass}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* FOOTER INFO */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-light">
            <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Dars jadvali rasman tasdiqlangan va yangilangan</span>
            </div>
            <div className="flex items-center gap-2">
              <School className="w-3.5 h-3.5 text-slate-400" />
              <span>269-umumiy o'rta ta'lim maktabi • Toshkent shahar</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}