import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Mail, Phone, Lock, User, CheckCircle2, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, setAuthModalMode, login, t, language } = useApp();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [forgotInfo, setForgotInfo] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authModalMode === 'login') {
      const isEmail = emailOrPhone.includes('@');
      login({
        name: isEmail ? emailOrPhone.split('@')[0] : (language === 'en' ? 'Makanset Member' : 'Membre Makanset'),
        email: isEmail ? emailOrPhone : 'user@makanset.dz',
        phone: !isEmail ? emailOrPhone : '+213 550 12 34 56',
      });
      setSuccessMessage(t.authSuccessLogin);
    } else {
      login({
        name: fullName || (language === 'en' ? 'New Member' : 'Nouveau membre'),
        email: email || 'membre@makanset.dz',
        phone: phone || '+213 550 00 00 00',
      });
      setSuccessMessage(t.authSuccessSignup);
    }

    setTimeout(() => {
      setSuccessMessage(null);
      closeAuthModal();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E5E2DD] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6B6B6B] hover:text-[#111111] hover:bg-[#F7F5F2] transition-colors cursor-pointer"
          aria-label={language === 'en' ? 'Close' : 'Fermer'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center mb-6">
          <img
            src="/assets/aistudio/MAKANSET_d527bc2c.png"
            alt="MAKANSET"
            className="h-6 w-auto mx-auto mb-3 object-contain"
          />
          <p className="text-xs text-[#6B6B6B]">
            {authModalMode === 'login'
              ? t.authLoginSubtitle
              : t.authSignupSubtitle}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex p-1 bg-[#F7F5F2] rounded-full mb-6 border border-[#E5E2DD]">
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('login');
              setForgotInfo(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
              authModalMode === 'login'
                ? 'bg-white text-[#111111] shadow-xs'
                : 'text-[#6B6B6B] hover:text-[#111111]'
            }`}
          >
            {t.authLoginTab}
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('signup');
              setForgotInfo(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
              authModalMode === 'signup'
                ? 'bg-white text-[#111111] shadow-xs'
                : 'text-[#6B6B6B] hover:text-[#111111]'
            }`}
          >
            {t.authSignupTab}
          </button>
        </div>

        {successMessage ? (
          <div className="py-8 text-center animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-[#111111] mb-1">{successMessage}</h4>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {authModalMode === 'signup' && (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-1.5">
                    {language === 'en' ? 'Full Name' : 'Nom complet'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder={language === 'en' ? 'e.g. Amina Kaci' : 'Ex: Amina Kaci'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-[#E5E2DD] text-xs font-medium text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-1.5">
                    {language === 'en' ? 'Phone (+213)' : 'Téléphone (+213)'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+213 550 12 34 56"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-[#E5E2DD] text-xs font-medium text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-1.5">
                    {language === 'en' ? 'Email Address' : 'Adresse Email'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder={language === 'en' ? 'your.email@domain.dz' : 'votre.email@domaine.dz'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-[#E5E2DD] text-xs font-medium text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                    />
                  </div>
                </div>
              </>
            )}

            {authModalMode === 'login' && (
              <div>
                <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-1.5">
                  {language === 'en' ? 'Email or Phone (+213)' : 'Email ou Numéro (+213)'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder={language === 'en' ? 'contact@domain.dz or +213 550...' : 'contact@exemple.dz ou +213 550...'}
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-[#E5E2DD] text-xs font-medium text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider">
                  {language === 'en' ? 'Password' : 'Mot de passe'}
                </label>
                {authModalMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setForgotInfo(language === 'en' ? 'Please reach out to support@makanset.dz or WhatsApp +213 550 44 21 09 to reset your access.' : 'Veuillez contacter le support Makanset (support@makanset.dz / WhatsApp) pour réinitialiser votre mot de passe.')}
                    className="text-[11px] text-[#D9532B] hover:underline cursor-pointer"
                  >
                    {t.authForgotPass}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-[#E5E2DD] text-xs font-medium text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                />
              </div>
              {forgotInfo && (
                <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 animate-in fade-in">
                  {forgotInfo}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#D9532B] hover:bg-[#C24520] text-white font-bold rounded-full text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer mt-2"
            >
              <span>{authModalMode === 'login' ? t.authLoginBtn : t.authSignupBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
