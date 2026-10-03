import React from 'react';
import { MadrasahConfig } from '../types/letter';
import { KemenagLogo } from './KemenagLogo';

interface KopSuratViewProps {
  config: MadrasahConfig;
}

export const KopSuratView: React.FC<KopSuratViewProps> = ({ config }) => {
  const sizeClasses = {
    sm: 'w-14 h-14',
    md: 'w-16 h-16 sm:w-18 sm:h-18',
    lg: 'w-19 h-19 sm:w-21 sm:h-21',
  }[config.logoSize || 'md'];

  const isDual = config.logoType === 'dual';

  // Dynamic font sizing for long agency/school names to strictly prevent line breaks
  const kementerianText = config.kementerian || 'KEMENTERIAN AGAMA REPUBLIK INDONESIA';
  const satkerText = config.satkerUtama || 'KANTOR KEMENTERIAN AGAMA KABUPATEN JENEPONTO';
  const unitKerjaText = config.unitKerja || 'MADRASAH ALIYAH NEGERI (MAN) 1 JENEPONTO';
  const alamatText = `${config.alamatKontak || ''}${config.kodePos ? ` Kodepos ${config.kodePos}` : ''}`;
  
  const getSatkerClass = () => {
    if (satkerText.length > 52) return 'text-[9.5pt] sm:text-[10pt]';
    if (satkerText.length > 44) return 'text-[10pt] sm:text-[10.5pt]';
    return 'text-[10.5pt] sm:text-[11pt]';
  };

  const getUnitKerjaClass = () => {
    if (unitKerjaText.length > 46) return 'text-[12pt] sm:text-[12.5pt]';
    if (unitKerjaText.length > 38) return 'text-[13pt] sm:text-[13.5pt]';
    return 'text-[13.5pt] sm:text-[14pt]';
  };

  const getAlamatClass = () => {
    if (alamatText.length > 85) return 'text-[7.5pt] sm:text-[8pt]';
    if (alamatText.length > 70) return 'text-[8pt] sm:text-[8.5pt]';
    return 'text-[8.5pt] sm:text-[9pt]';
  };

  return (
    <div className="w-full text-black select-none relative">
      {/* Header Area with Absolute Logo and Symmetrically Centered Text */}
      <div className="relative flex items-center justify-center min-h-[72px] sm:min-h-[82px] mb-1">
        {/* Left Logo: Kemenag Official / Monochrome / Custom */}
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 shrink-0 ${sizeClasses} flex items-center justify-center z-10`}>
          {config.logoType === 'custom' && config.customLogoUrl ? (
            <img
              src={config.customLogoUrl}
              alt="Logo Madrasah"
              className="max-h-full max-w-full object-contain drop-shadow-2xs"
              referrerPolicy="no-referrer"
            />
          ) : config.logoType === 'kemenag_monochrome' ? (
            <KemenagLogo className="w-full h-full" variant="monochrome" />
          ) : (
            <KemenagLogo className="w-full h-full" variant="color" />
          )}
        </div>

        {/* Kop Text Hierarchical Header - Fully Centered across Entire Page Width */}
        <div className="w-full text-center font-bookman tracking-tight">
          {/* Baris 1: 11pt */}
          <h2 className="text-[10.5pt] sm:text-[11pt] font-bold uppercase leading-tight tracking-normal text-black whitespace-nowrap">
            {kementerianText}
          </h2>

          {/* Baris 2: 11pt */}
          <h3 className={`${getSatkerClass()} font-bold uppercase leading-tight tracking-tight text-black mt-0.5 whitespace-nowrap`}>
            {satkerText}
          </h3>

          {/* Baris 3: 14pt */}
          <h1 className={`${getUnitKerjaClass()} font-extrabold uppercase leading-tight tracking-tight text-black mt-0.5 whitespace-nowrap`}>
            {unitKerjaText}
          </h1>
          
          {/* Baris 4: 9pt & Baris 5: 9pt */}
          <div className="leading-tight text-neutral-800 mt-1 font-normal">
            <p className={`${getAlamatClass()} whitespace-nowrap tracking-tight`}>
              {alamatText}
            </p>
            <p className="text-[8pt] sm:text-[8.5pt] text-neutral-700 mt-0.5 whitespace-nowrap tracking-tight">
              {config.telepon && `Telepon: ${config.telepon}`}
              {config.telepon && config.email && ' | '}
              {config.email && `Pos-el: ${config.email}`}
              {config.website && ` | Laman: ${config.website}`}
            </p>
          </div>
        </div>

        {/* Right Logo if dual */}
        {isDual && config.secondaryLogoUrl && (
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 shrink-0 ${sizeClasses} flex items-center justify-center z-10`}>
            <img
              src={config.secondaryLogoUrl}
              alt="Logo Pendukung / Akreditasi"
              className="max-h-full max-w-full object-contain drop-shadow-2xs"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>

      {/* Official Kemenag Double Border Line (spans 100% of page width) */}
      <div className="kemenag-kop-line" />
    </div>
  );
};
