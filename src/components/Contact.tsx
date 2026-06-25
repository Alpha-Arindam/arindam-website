import { useState, FormEvent, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { Mail, Linkedin, MapPin, Send, CheckCircle, XCircle, Loader, Terminal, Users, UserCheck } from 'lucide-react';
import { useI18n } from '../locales';
import { handleLinkedInClick } from '../utils/linkedin';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface Signature {
  id: string;
  name: string;
  message: string;
  created_at: string;
  nodeIndex: number;
}

export default function Contact() {
  const { t } = useI18n();
  const headingRef = useInView({ threshold: 0.1 });
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Guestbook states
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [guestbookState, setGuestbookState] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Load signatures from LocalStorage or seed defaults
  useEffect(() => {
    const saved = localStorage.getItem('guestbook_signatures');
    if (saved) {
      setSignatures(JSON.parse(saved));
    } else {
      const defaultSignatures: Signature[] = [
        {
          id: 'sig-1',
          name: t('contact.signatures.connor.name'),
          message: t('contact.signatures.connor.message'),
          created_at: new Date(Date.now() - 3600000 * 2.5).toISOString(),
          nodeIndex: 42
        },
        {
          id: 'sig-2',
          name: t('contact.signatures.lexcorp.name'),
          message: t('contact.signatures.lexcorp.message'),
          created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
          nodeIndex: 88
        },
        {
          id: 'sig-3',
          name: t('contact.signatures.cyberdyne.name'),
          message: t('contact.signatures.cyberdyne.message'),
          created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
          nodeIndex: 12
        }
      ];
      setSignatures(defaultSignatures);
      localStorage.setItem('guestbook_signatures', JSON.stringify(defaultSignatures));
    }
  }, [t]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 5000);
  };

  const validateField = (field: keyof FormData, value: string) => {
    const trimmed = value.trim();
    let error = '';

    if (field === 'name') {
      if (!trimmed) {
        error = t('contact.errors.nameRequired');
      } else if (trimmed.length < 3) {
        error = t('contact.errors.nameMin');
      }
    } else if (field === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!trimmed) {
        error = t('contact.errors.emailRequired');
      } else if (!emailRegex.test(trimmed)) {
        error = t('contact.errors.emailInvalid');
      }
    } else if (field === 'message') {
      if (!trimmed) {
        error = t('contact.errors.messageRequired');
      } else if (trimmed.length < 5) {
        error = t('contact.errors.messageMin');
      }
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error || undefined,
    }));

    return error;
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formState === 'loading') return;

    const nameTrimmed = formData.name.trim();
    const emailTrimmed = formData.email.trim();
    const messageTrimmed = formData.message.trim();

    // Mark all fields as touched to show errors immediately
    setTouched({ name: true, email: true, message: true });

    // Validate all fields
    const nameError = validateField('name', nameTrimmed);
    const emailError = validateField('email', emailTrimmed);
    const messageError = validateField('message', messageTrimmed);

    if (nameError || emailError || messageError) {
      setFormState('error');
      const firstError = nameError || emailError || messageError;
      showToast(t('common.validationErrorTitle', { error: firstError }), 'error');
      setTimeout(() => setFormState('idle'), 3000);
      return;
    }

    setErrors({});
    setFormState('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameTrimmed,
          email: emailTrimmed,
          message: messageTrimmed,
        }),
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', message: '' });
        setTouched({});
        showToast(t('common.messageSentSuccess'), 'success');
      } else {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || t('common.somethingWentWrong'));
      }
    } catch (err: any) {
      setFormState('error');
      showToast(err.message || t('common.somethingWentWrong'), 'error');
    } finally {
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  // Handle guestbook entry submission
  const handleGuestbookSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim() || guestbookState === 'submitting') return;

    setGuestbookState('submitting');

    setTimeout(() => {
      const newSignature: Signature = {
        id: `sig-${Date.now()}`,
        name: guestName.trim(),
        message: guestMessage.trim(),
        created_at: new Date().toISOString(),
        nodeIndex: Math.floor(Math.random() * 99) + 1
      };

      const updated = [newSignature, ...signatures];
      setSignatures(updated);
      localStorage.setItem('guestbook_signatures', JSON.stringify(updated));
      
      setGuestName('');
      setGuestMessage('');
      setGuestbookState('success');
      showToast(t('contact.signatureRecorded'), 'success');

      setTimeout(() => setGuestbookState('idle'), 2000);
    }, 800);
  };

  const isLoading = formState === 'loading';

  return (
    <section id="contact" className="py-24 bg-white dark:bg-surface-900 relative">
      {/* Toast */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl border text-sm font-medium transition-all duration-300 max-w-sm ${
          toastType === 'success'
            ? 'bg-white dark:bg-surface-800 border-accent-200 dark:border-accent-800 text-surface-800 dark:text-surface-100'
            : 'bg-white dark:bg-surface-800 border-red-200 dark:border-red-800 text-surface-800 dark:text-surface-100'
        }`}>
          {toastType === 'success' ? (
            <CheckCircle size={18} className="text-accent-500 shrink-0" />
          ) : (
            <XCircle size={18} className="text-red-500 shrink-0" />
          )}
          {toastMessage}
        </div>
      )}

      <div className="section-container">
        
        {/* Title */}
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className="opacity-0 [&.in-view]:animate-fade-up mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-900 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-widest mb-4">
            {t('contact.sectionTitle')}
          </div>
          <h2 className="section-heading text-surface-900 dark:text-white">
            {t('contact.heading')}
          </h2>
          <p className="section-subheading">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 mb-16">
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="card p-6 relative flex-1 flex flex-col justify-center">
              <div className="absolute -top-[1px] -left-[1px] w-5 h-5 border-t-2 border-l-2 border-indigo-500 rounded-tl-2xl pointer-events-none" />
              <div className="absolute -top-[1px] -right-[1px] w-5 h-5 border-t-2 border-r-2 border-indigo-500 pointer-events-none rounded-tr-2xl" />
              <div className="absolute -bottom-[1px] -left-[1px] w-5 h-5 border-b-2 border-l-2 border-indigo-500 rounded-bl-2xl pointer-events-none" />
              <div className="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-b-2 border-r-2 border-indigo-500 rounded-br-2xl pointer-events-none" />

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wide mb-0.5">{t('contact.emailLink').split(' ')[1] || 'Email'}</div>
                    <a href="mailto:arindambetal1994@gmail.com" className="text-sm font-medium text-surface-800 dark:text-surface-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors break-all">
                      arindambetal1994@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center shrink-0">
                    <Linkedin size={18} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wide mb-0.5">LinkedIn</div>
                    <a
                      href="https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bjuek2v8FTM631TBlBI1C8A%3D%3D"
                      onClick={handleLinkedInClick}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-surface-800 dark:text-surface-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      linkedin.com/in/arindambetal
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wide mb-0.5">{t('education.location').split(',')[1]?.trim() || 'Location'}</div>
                    <div className="text-sm font-medium text-surface-800 dark:text-surface-200">
                      Kolkata, India
                    </div>
                    <div className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">{t('contact.subtitle')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-950/40 dark:to-primary-900/20 border-primary-200 dark:border-primary-800 relative flex-1 flex flex-col justify-center">
              <div className="absolute -top-[1px] -left-[1px] w-5 h-5 border-t-2 border-l-2 border-indigo-500 rounded-tl-2xl pointer-events-none" />
              <div className="absolute -top-[1px] -right-[1px] w-5 h-5 border-t-2 border-r-2 border-indigo-500 pointer-events-none rounded-tr-2xl" />
              <div className="absolute -bottom-[1px] -left-[1px] w-5 h-5 border-b-2 border-l-2 border-indigo-500 rounded-bl-2xl pointer-events-none" />
              <div className="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-b-2 border-r-2 border-indigo-500 rounded-br-2xl pointer-events-none" />
              <h3 className="font-bold text-surface-900 dark:text-white mb-2 text-sm uppercase font-mono tracking-wider">[{t('contact.targetDirectives')}]</h3>
              <ul className="space-y-1.5">
                {[
                  t('contact.directivesList.0'),
                  t('contact.directivesList.1'),
                  t('contact.directivesList.2'),
                  t('contact.directivesList.3')
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-surface-600 dark:text-surface-300 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3 flex flex-col">
            <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8 relative flex-1 flex flex-col justify-between">
              <div className="absolute -top-[1px] -left-[1px] w-5 h-5 border-t-2 border-l-2 border-indigo-500 rounded-tl-2xl pointer-events-none" />
              <div className="absolute -top-[1px] -right-[1px] w-5 h-5 border-t-2 border-r-2 border-indigo-500 pointer-events-none rounded-tr-2xl" />
              <div className="absolute -bottom-[1px] -left-[1px] w-5 h-5 border-b-2 border-l-2 border-indigo-500 rounded-bl-2xl pointer-events-none" />
              <div className="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-b-2 border-r-2 border-indigo-500 rounded-br-2xl pointer-events-none" />
              
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono font-bold text-surface-700 dark:text-surface-300 mb-1.5">
                      {t('contact.senderName')}
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder={t('contact.namePlaceholder')}
                      className={`w-full px-4 py-3 rounded-xl border bg-surface-50 dark:bg-surface-800 text-surface-900 dark:text-white placeholder-surface-400 dark:placeholder-surface-500 focus:outline-none focus:ring-2 transition-all text-sm font-mono ${
                        touched.name && errors.name
                          ? 'border-red-500 dark:border-red-500/80 focus:ring-red-500/30 focus:border-red-500'
                          : 'border-surface-200 dark:border-surface-600 focus:ring-primary-500 focus:border-transparent'
                      }`}
                      disabled={isLoading}
                    />
                    {touched.name && errors.name && (
                      <span className="text-red-500 dark:text-red-400 text-xs mt-1.5 block font-mono font-semibold animate-fade-up">
                        ⚠️ {errors.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono font-bold text-surface-700 dark:text-surface-300 mb-1.5">
                      {t('contact.emailLink')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder={t('contact.emailPlaceholder')}
                      className={`w-full px-4 py-3 rounded-xl border bg-surface-50 dark:bg-surface-800 text-surface-900 dark:text-white placeholder-surface-400 dark:placeholder-surface-500 focus:outline-none focus:ring-2 transition-all text-sm font-mono ${
                        touched.email && errors.email
                          ? 'border-red-500 dark:border-red-500/80 focus:ring-red-500/30 focus:border-red-500'
                          : 'border-surface-200 dark:border-surface-600 focus:ring-primary-500 focus:border-transparent'
                      }`}
                      disabled={isLoading}
                    />
                    {touched.email && errors.email && (
                      <span className="text-red-500 dark:text-red-400 text-xs mt-1.5 block font-mono font-semibold animate-fade-up">
                        ⚠️ {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono font-bold text-surface-700 dark:text-surface-300 mb-1.5">
                    {t('contact.payloadMessage')}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    placeholder={t('contact.messagePlaceholder')}
                    className={`w-full px-4 py-3 rounded-xl border bg-surface-50 dark:bg-surface-800 text-surface-900 dark:text-white placeholder-surface-400 dark:placeholder-surface-500 focus:outline-none focus:ring-2 transition-all resize-none text-sm font-mono ${
                      touched.message && errors.message
                        ? 'border-red-500 dark:border-red-500/80 focus:ring-red-500/30 focus:border-red-500'
                        : 'border-surface-200 dark:border-surface-600 focus:ring-primary-500 focus:border-transparent'
                    }`}
                    disabled={isLoading}
                  />
                  {touched.message && errors.message && (
                    <span className="text-red-500 dark:text-red-400 text-xs mt-1.5 block font-mono font-semibold animate-fade-up">
                      ⚠️ {errors.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-xs font-mono font-bold"
                >
                  {isLoading ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      {t('contact.sendingDirectiveButton')}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t('contact.transmitButton')}
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-surface-400 dark:text-surface-500 font-mono">
                  {t('common.directMailConnection')}:{' '}
                  <a href="mailto:arindambetal1994@gmail.com" className="text-primary-600 dark:text-primary-400 hover:underline">
                    arindambetal1994@gmail.com
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* ACCESS SIGNATURE LOG (GUESTBOOK) */}
        <div className="relative rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-slate-950/20 p-6 sm:p-8 shadow-md">
          {/* Cybernetic Corner Brackets */}
          <div className="absolute -top-[1px] -left-[1px] w-5 h-5 border-t-2 border-l-2 border-indigo-500 rounded-tl-2xl pointer-events-none" />
          <div className="absolute -top-[1px] -right-[1px] w-5 h-5 border-t-2 border-r-2 border-indigo-500 pointer-events-none rounded-tr-2xl" />
          <div className="absolute -bottom-[1px] -left-[1px] w-5 h-5 border-b-2 border-l-2 border-indigo-500 rounded-bl-2xl pointer-events-none" />
          <div className="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-b-2 border-r-2 border-indigo-500 rounded-br-2xl pointer-events-none" />

          {/* Heading */}
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/[0.06] pb-4 mb-6 select-none">
            <Users size={18} className="text-indigo-400" />
            <h3 className="text-sm font-bold text-surface-900 dark:text-white uppercase font-mono tracking-wider">
              [{t('contact.accessSignatureLog')}]
            </h3>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider select-none">
              {t('contact.activeLogs')}
            </span>
          </div>

          <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
            {/* Signature entry form */}
            <form onSubmit={handleGuestbookSubmit} className="space-y-4 bg-white dark:bg-slate-900/40 p-5 rounded-xl border border-slate-200 dark:border-white/[0.04]">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold block mb-1">
                {t('contact.recordNewEntry')}
              </span>
              <div>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={t('contact.visitorNamePlaceholder')}
                  className="w-full px-3 py-2 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-surface-900 dark:text-white placeholder-surface-400 dark:placeholder-surface-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs font-mono"
                />
              </div>
              <div>
                <textarea
                  required
                  rows={3}
                  value={guestMessage}
                  onChange={(e) => setGuestMessage(e.target.value)}
                  placeholder={t('contact.visitorMessagePlaceholder')}
                  className="w-full px-3 py-2 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-surface-900 dark:text-white placeholder-surface-400 dark:placeholder-surface-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none text-xs font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={guestbookState === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-mono font-bold transition-all disabled:opacity-60"
              >
                {guestbookState === 'submitting' ? (
                  <>
                    <Loader size={12} className="animate-spin" />
                    {t('contact.signingNode')}
                  </>
                ) : guestbookState === 'success' ? (
                  <>
                    <UserCheck size={12} className="text-emerald-400" />
                    {t('contact.signatureRecorded')}
                  </>
                ) : (
                  <>
                    <Terminal size={11} />
                    {t('contact.signVisitorLog')}
                  </>
                )}
              </button>
            </form>

            {/* Signature list */}
            <div className="space-y-4 max-h-[260px] overflow-y-auto pr-2 scrollbar-thin">
              {signatures.length === 0 ? (
                <div className="text-center py-10 font-mono text-slate-500 text-xs animate-fade-up">
                  {t('contact.noAccessRecords')}
                </div>
              ) : (
                signatures.map((sig) => (
                  <div
                    key={sig.id}
                    className="p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.04] flex gap-4 transition-all hover:bg-slate-100/30 dark:hover:bg-white/[0.03]"
                  >
                    {/* Mecha Avatar Initials Circle */}
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col items-center justify-center font-mono text-xs font-bold text-indigo-400 shrink-0 select-none">
                      <span>{sig.name.charAt(0).toUpperCase()}</span>
                      <span className="text-[7px] text-slate-500">N.{sig.nodeIndex || 42}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 truncate">
                          {sig.name}
                        </h4>
                        <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 select-none">
                          {new Date(sig.created_at).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
                        {sig.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
