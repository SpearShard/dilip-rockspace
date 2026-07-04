'use client';

import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { IconClose } from '@/lib/icons';

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00',
];

function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function toGoogleCalendarUrl(date: string, time: string) {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const start = new Date(Date.UTC(year, month - 1, day, hour + 5, minute + 30));
  const end = new Date(start.getTime() + 30 * 60 * 1000);

  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Call with RockSpace Studio',
    dates: `${fmt(start)}/${fmt(end)}`,
    details: '30-minute discovery call with RockSpace Studio.\n\nTell us what you\'re building and we\'ll tell you if we\'re the right fit.',
    location: 'Google Meet',
    add: 'hello@rockspace.io',
    sf: 'true',
    output: 'popup',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function getNextDays(count: number) {
  const days: { label: string; value: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      days.push({ label: formatDate(d), value: d.toISOString().split('T')[0] });
    }
  }
  return days;
}

function DialogInner({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'pick' | 'confirm'>('pick');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const days = useMemo(() => getNextDays(14), []);

  const handleBook = useCallback(() => {
    if (!selectedDate || !selectedTime) return;
    setStep('confirm');
  }, [selectedDate, selectedTime]);

  const calendarUrl = selectedDate && selectedTime ? toGoogleCalendarUrl(selectedDate, selectedTime) : '#';

  return (
    <>
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-accent">Book a call</p>
          <h2 className="text-heading-sm text-text mt-1">30 min · RockSpace Studio</h2>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
        >
          <IconClose className="size-4 text-text-muted" />
        </button>
      </div>

      {step === 'pick' && (
        <div className="px-6 pb-6 pt-4">
          <p className="text-sm text-text-muted mb-4 font-medium-ui">Pick a date and time (IST)</p>

          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none -mx-1 px-1">
            {days.map((d) => (
              <button
                key={d.value}
                onClick={() => setSelectedDate(d.value)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium-ui transition-all duration-200 border ${
                  selectedDate === d.value
                    ? 'bg-accent text-white border-accent shadow-md'
                    : 'bg-surface text-text-muted border-border/60 hover:border-accent/30 hover:text-text'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {selectedDate && (
            <div className="mt-4">
              <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-3">Available times</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-2 rounded-lg text-sm font-medium-ui transition-all duration-200 border ${
                      selectedTime === t
                        ? 'bg-accent text-white border-accent shadow-sm'
                        : 'bg-surface text-text-muted border-border/60 hover:border-accent/30 hover:text-text'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold-ui text-text-muted border border-border/60 hover:bg-surface transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleBook}
              disabled={!selectedDate || !selectedTime}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold-ui text-white bg-accent hover:bg-accent-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-accent/20"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {step === 'confirm' && (
        <div className="px-6 pb-6 pt-4 text-center">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h3 className="text-heading-sm text-text mb-2">Almost there!</h3>
          <p className="text-sm text-text-muted mb-6">
            {selectedDate && formatDate(new Date(selectedDate + 'T' + selectedTime))} at {selectedTime} IST
          </p>
          <p className="text-xs text-text-muted/60 mb-6 max-w-xs mx-auto">
            You&apos;ll be redirected to Google Calendar to confirm. The meeting link will be auto-generated.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setStep('pick')}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold-ui text-text-muted border border-border/60 hover:bg-surface transition-all"
            >
              Change
            </button>
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold-ui text-white bg-accent hover:bg-accent-dark transition-all shadow-lg shadow-accent/20 inline-flex items-center justify-center gap-2"
              onClick={onClose}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Open Calendar
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default function BookCallDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const el = dialogRef.current;
    if (el) {
      gsap.fromTo(el, { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out' });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-border/40 overflow-hidden"
      >
        <DialogInner key={open ? 'open' : 'closed'} onClose={onClose} />
      </div>
    </div>
  );
}
