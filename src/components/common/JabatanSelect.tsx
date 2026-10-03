import React, { useState } from 'react';
import { JABATAN_OPTIONS } from '../../data/pangkatJabatanData';
import { Edit3, ListFilter } from 'lucide-react';

interface JabatanSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  id?: string;
}

export const JabatanSelect: React.FC<JabatanSelectProps> = ({
  value,
  onChange,
  className = '',
  placeholder = 'Pilih Jabatan Dinas...',
  label,
  id,
}) => {
  // Check if current value matches any option in standard list
  const isStandardOption = JABATAN_OPTIONS.some((g) =>
    g.options.some((opt) => opt.value === value)
  );

  const [isManualInput, setIsManualInput] = useState<boolean>(!isStandardOption && value !== '');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected === '__MANUAL__') {
      setIsManualInput(true);
    } else {
      setIsManualInput(false);
      onChange(selected);
    }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
            {label}
          </label>
          <button
            type="button"
            onClick={() => setIsManualInput(!isManualInput)}
            className="text-[10px] text-emerald-700 hover:text-emerald-800 font-medium inline-flex items-center gap-1 hover:underline cursor-pointer"
            title="Ganti mode antara pilihan dropdown dan ketik manual"
          >
            {isManualInput ? (
              <>
                <ListFilter className="w-3 h-3 text-emerald-600" />
                <span>Pilih dari Dropdown</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3 h-3 text-slate-500" />
                <span>Ketik Manual</span>
              </>
            )}
          </button>
        </div>
      )}

      {isManualInput ? (
        <div className="relative flex items-center">
          <input
            id={id}
            type="text"
            className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors pr-8"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setIsManualInput(false)}
            className="absolute right-2 text-slate-400 hover:text-emerald-600 p-1"
            title="Kembali ke Dropdown"
          >
            <ListFilter className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <select
            id={id}
            value={isStandardOption ? value : '__CUSTOM__'}
            onChange={handleSelectChange}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors cursor-pointer text-slate-800 font-medium"
          >
            <option value="" disabled>
              -- {placeholder} --
            </option>
            {!isStandardOption && value !== '' && (
              <option value="__CUSTOM__">
                📝 Kustom: {value}
              </option>
            )}
            {JABATAN_OPTIONS.map((group) => (
              <optgroup key={group.group} label={group.group} className="font-bold text-slate-700">
                {group.options.map((opt) => (
                  <option key={opt.value} value={opt.value} className="font-normal text-slate-900">
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value="__MANUAL__" className="text-emerald-700 font-semibold bg-emerald-50">
              ✏️ + Ketik Jabatan Lainnya...
            </option>
          </select>
        </div>
      )}
    </div>
  );
};
