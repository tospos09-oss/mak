import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, language, setLanguage, openAuthModal, t } = useApp();

  return (
    <footer className="bg-[#111111] text-[#E5E2DD] pt-16 pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top brand & columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-[#2A2A2A]">
          
          {/* Col 1: Brand & Algiers presence */}
          <div className="col-span-2">
            <div className="mb-4">
              <img
                src="/assets/aistudio/MAKANSET-1_d1924897.png"
                alt="MAKANSET"
                className="h-[22px] w-auto object-contain"
              />
            </div>
            <p className="text-sm text-[#999999] max-w-sm mb-6 leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="space-y-2 text-xs text-[#AAAAAA]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D9532B]" />
                <span>Val d’Hydra & Didouche Mourad, Alger</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D9532B]" />
                <span>+213 21 00 00 00 / +213 550 00 00 00</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D9532B]" />
                <span>contact@makanset.dz</span>
              </div>
            </div>
          </div>

          {/* Col 2: Explorer */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.footerExploreTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#AAAAAA]">
              <li>
                <button onClick={() => navigateTo('browse')} className="hover:text-white transition-colors cursor-pointer">
                  {t.actMeeting}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('browse')} className="hover:text-white transition-colors cursor-pointer">
                  {t.actPhoto}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('browse')} className="hover:text-white transition-colors cursor-pointer">
                  {t.actEvent}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('browse')} className="hover:text-white transition-colors cursor-pointer">
                  {t.actFilming}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('browse')} className="hover:text-white transition-colors cursor-pointer">
                  {t.actWorkshop}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Propriétaires & Aide */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.footerHostTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#AAAAAA]">
              <li>
                <button onClick={() => navigateTo('host')} className="hover:text-white transition-colors cursor-pointer text-[#D9532B] font-semibold">
                  + {t.navPublishSpace}
                </button>
              </li>
              <li>
                <button onClick={() => openAuthModal('login')} className="hover:text-white transition-colors cursor-pointer">
                  {language === 'en' ? 'Member Portal & Login' : 'Espace membre & Connexion'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('browse')} className="hover:text-white transition-colors cursor-pointer">
                  {t.navExplore}
                </button>
              </li>
              <li>
                <span className="text-[#888888]">{language === 'en' ? 'Chargily & CIB / Edahabia Payment' : 'Paiement Chargily & CIB / Edahabia'}</span>
              </li>
              <li>
                <a
                  href="https://wa.me/213550442109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>{language === 'en' ? 'WhatsApp Customer Support' : 'Support client WhatsApp'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Communes phares */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.footerDistrictsTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#AAAAAA]">
              <li><button onClick={() => navigateTo('browse')} className="hover:text-white transition-colors cursor-pointer">Alger-Centre</button></li>
              <li><button onClick={() => navigateTo('browse')} className="hover:text-white transition-colors cursor-pointer">Hydra & Paradou</button></li>
              <li><button onClick={() => navigateTo('browse')} className="hover:text-white transition-colors cursor-pointer">El Biar</button></li>
              <li><button onClick={() => navigateTo('browse')} className="hover:text-white transition-colors cursor-pointer">Kouba</button></li>
              <li><button onClick={() => navigateTo('browse')} className="hover:text-white transition-colors cursor-pointer">Bab Ezzouar</button></li>
              <li><button onClick={() => navigateTo('browse')} className="hover:text-white transition-colors cursor-pointer">Dely Ibrahim & Cheraga</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          <div>
            &copy; 2026 {t.footerRights}
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setLanguage('fr')} className={`hover:text-white cursor-pointer ${language === 'fr' ? 'text-[#D9532B] font-bold' : ''}`}>
              Français
            </button>
            <button onClick={() => setLanguage('en')} className={`hover:text-white cursor-pointer ${language === 'en' ? 'text-[#D9532B] font-bold' : ''}`}>
              English
            </button>
            <span>·</span>
            <span>{t.termsBooking}</span>
            <span>{t.termsPrivacy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
