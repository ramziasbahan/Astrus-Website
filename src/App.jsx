import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Mail,
  CheckCircle2,
  Building2,
  Car,
  HeartPulse,
  HardHat,
  FileText,
  Send,
  Globe2,
  Users,
  Clock3,
  BadgeCheck,
  Menu,
  X,
  AlertCircle,
  ArrowUp,
  Ship,
  Plus,
  Trash2,
  Upload,
} from 'lucide-react';

/* ── Brand tokens ─────────────────────────────────────── */
const BRAND = {
  navy: '#566497',
  lavender: '#9AA4CF',
  ink: '#24304F',
  soft: '#F6F8FC',
  border: '#D9DFF0',
  white: '#FFFFFF',
  accent: '#3D4E80',
  success: '#2E7D5B',
  error: '#C0392B',
};

const COMPANY_EMAIL = 'info@astrusinsurance.com';
const COMPANY_NAME = 'Astrus Insurance Services';

/* ── Insurance types ──────────────────────────────────── */
const insuranceTypes = [
  { value: 'motor', label: 'Motor Insurance', icon: Car, desc: 'Cars, trucks, fleets' },
  { value: 'medical', label: 'Medical Insurance', icon: HeartPulse, desc: 'Health & group cover' },
  { value: 'property', label: 'Property Insurance', icon: Building2, desc: 'Homes, offices, shops' },
  { value: 'shipping', label: 'Shipping Insurance', icon: Ship, desc: 'Land, air, sea cargo' },
  { value: 'workmen', label: 'Workmen Insurance', icon: HardHat, desc: 'Construction & labor' },
  { value: 'other', label: 'Other Requests', icon: FileText, desc: 'Any insurance need' },
];

/* ── Scroll helper ────────────────────────────────────── */
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES
   ═══════════════════════════════════════════════════════ */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@600;700&display=swap');

      :root {
        --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        --font-display: 'Playfair Display', Georgia, serif;
      }

      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }

      body {
        font-family: var(--font-body);
        background: #fff;
        color: ${BRAND.ink};
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
      }

      ::selection { background: ${BRAND.lavender}; color: #fff; }
      a { text-decoration: none; color: inherit; }

      .btn-primary {
        display: inline-flex; align-items: center; justify-content: center;
        gap: 8px; min-height: 46px; padding: 0 22px;
        border-radius: 12px; font-weight: 600; font-size: 14px;
        border: none; background: ${BRAND.ink}; color: #fff;
        cursor: pointer; transition: all 0.2s ease;
        font-family: var(--font-body);
      }
      .btn-primary:hover {
        background: ${BRAND.accent};
        transform: translateY(-1px);
        box-shadow: 0 8px 24px rgba(36,48,79,0.18);
      }

      .btn-outline {
        display: inline-flex; align-items: center; justify-content: center;
        gap: 8px; min-height: 46px; padding: 0 22px;
        border-radius: 12px; font-weight: 600; font-size: 14px;
        border: 1.5px solid ${BRAND.border}; background: #fff;
        color: ${BRAND.ink}; cursor: pointer;
        transition: all 0.2s ease; font-family: var(--font-body);
      }
      .btn-outline:hover {
        border-color: ${BRAND.navy}; background: ${BRAND.soft};
        transform: translateY(-1px);
      }

      .card {
        border: 1px solid ${BRAND.border};
        border-radius: 20px; background: #fff;
        transition: all 0.25s ease;
      }
      .card:hover { box-shadow: 0 16px 40px rgba(86,100,151,0.12); }
      .card-lift { cursor: pointer; }
      .card-lift:hover { transform: translateY(-3px); box-shadow: 0 20px 48px rgba(86,100,151,0.14); }

      input, select, textarea {
        font-family: var(--font-body); width: 100%;
        min-height: 46px; border-radius: 12px;
        border: 1.5px solid ${BRAND.border};
        padding: 0 14px; outline: none; font-size: 14px;
        color: ${BRAND.ink}; background: #fff;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      input:focus, select:focus, textarea:focus {
        border-color: ${BRAND.navy};
        box-shadow: 0 0 0 3px rgba(86,100,151,0.1);
      }
      input.error-field, select.error-field, textarea.error-field {
        border-color: ${BRAND.error};
      }
      textarea { padding: 14px; min-height: 120px; resize: vertical; }
      select { cursor: pointer; }

      .section-container { max-width: 1140px; margin: 0 auto; padding: 0 24px; }

      .nav-link {
        font-size: 14px; font-weight: 500; color: ${BRAND.navy};
        padding: 6px 12px; border-radius: 8px;
        transition: all 0.15s ease;
      }
      .nav-link:hover { background: ${BRAND.soft}; color: ${BRAND.ink}; }

      .scroll-top-btn {
        position: fixed; bottom: 24px; right: 24px; z-index: 50;
        width: 44px; height: 44px; border-radius: 50%;
        background: ${BRAND.ink}; color: #fff; border: none;
        cursor: pointer; display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 16px rgba(36,48,79,0.3);
        transition: all 0.2s ease; opacity: 0; pointer-events: none;
      }
      .scroll-top-btn.visible { opacity: 1; pointer-events: auto; }
      .scroll-top-btn:hover { transform: translateY(-2px); background: ${BRAND.accent}; }

      @media (max-width: 768px) {
        .desktop-nav { display: none !important; }
        .mobile-menu-btn { display: flex !important; }
        .hero-title { font-size: 36px !important; }
        .hero-subtitle { font-size: 16px !important; }
        .section-heading-title { font-size: 28px !important; }
      }
      @media (min-width: 769px) {
        .mobile-menu-btn { display: none !important; }
        .mobile-overlay { display: none !important; }
      }
    `}</style>
  );
}

/* ═══════════════════════════════════════════════════════
   TOAST NOTIFICATION
   ═══════════════════════════════════════════════════════ */
function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg = type === 'success' ? BRAND.success : type === 'error' ? BRAND.error : BRAND.navy;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -20, x: '-50%' }}
      style={{
        position: 'fixed', top: 24, left: '50%', zIndex: 100,
        padding: '14px 24px', borderRadius: 14, background: bg,
        color: '#fff', fontSize: 14, fontWeight: 600,
        boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
        display: 'flex', alignItems: 'center', gap: 10,
        maxWidth: '90vw',
      }}
    >
      {type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      {message}
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginLeft: 8, padding: 0 }}>
        <X size={16} />
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════════════ */
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 90,
        background: 'rgba(36,48,79,0.5)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 20, padding: 32,
          maxWidth: 480, width: '100%',
          boxShadow: '0 24px 64px rgba(36,48,79,0.25)',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   LOGO
   ═══════════════════════════════════════════════════════ */
function LogoBlock() {
  const [logoError, setLogoError] = useState(false);

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <div style={{
        borderRadius: 14, overflow: 'hidden',
        width: 52, height: 52,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {!logoError ? (
          <img
            src="/logo.png"
            alt="Astrus Insurance Services"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={() => setLogoError(true)}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: BRAND.ink, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 16, borderRadius: 14,
          }}>A</div>
        )}
      </div>
      <div style={{ lineHeight: 1.25 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: BRAND.ink, letterSpacing: '-0.01em' }}>{COMPANY_NAME}</div>
        <div style={{ fontSize: 12, color: BRAND.navy, fontWeight: 500 }}>Reliable cover &middot; Clear guidance</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION HEADING
   ═══════════════════════════════════════════════════════ */
function SectionHeading({ eyebrow, title, description }) {
  return (
    <div style={{ maxWidth: 640 }}>
      {eyebrow && (
        <div style={{
          fontSize: 12, fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: BRAND.navy, marginBottom: 12,
        }}>{eyebrow}</div>
      )}
      <h2 className="section-heading-title" style={{
        fontFamily: 'var(--font-display)', fontSize: 36, lineHeight: 1.15,
        color: BRAND.ink, marginBottom: description ? 14 : 0,
      }}>{title}</h2>
      {description && (
        <p style={{ fontSize: 16, lineHeight: 1.75, color: BRAND.navy, margin: 0 }}>{description}</p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INSURANCE CARDS
   ═══════════════════════════════════════════════════════ */
function InsuranceTypeCards({ selectedType, setSelectedType }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 }}>
      {insuranceTypes.map((item) => {
        const Icon = item.icon;
        const active = selectedType === item.value;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => { setSelectedType(item.value); scrollToSection('quote'); }}
            className={active ? '' : 'card-lift'}
            style={{
              textAlign: 'left', borderRadius: 18, padding: '22px 20px',
              border: active ? 'none' : '1.5px solid ' + BRAND.border,
              background: active ? 'linear-gradient(135deg, ' + BRAND.ink + ' 0%, ' + BRAND.navy + ' 100%)' : '#fff',
              color: active ? '#fff' : BRAND.ink,
              boxShadow: active ? '0 16px 40px rgba(36,48,79,0.22)' : '0 4px 16px rgba(86,100,151,0.06)',
              cursor: 'pointer', transition: 'all 0.25s ease',
              fontFamily: 'var(--font-body)',
            }}
            aria-pressed={active}
          >
            <Icon size={22} style={{ marginBottom: 12, color: active ? '#fff' : BRAND.navy }} />
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 13, opacity: active ? 0.85 : 0.7 }}>{item.desc}</div>
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FEATURE CARD
   ═══════════════════════════════════════════════════════ */
function FeatureCard({ icon: Icon, title, text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="card card-lift"
      style={{ padding: '22px 20px', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-body)', width: '100%' }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: BRAND.soft, display: 'flex',
        alignItems: 'center', justifyContent: 'center', marginBottom: 14,
      }}>
        <Icon size={18} style={{ color: BRAND.navy }} />
      </div>
      <div style={{ fontWeight: 700, color: BRAND.ink, marginBottom: 6, fontSize: 15 }}>{title}</div>
      <div style={{ fontSize: 13, lineHeight: 1.7, color: BRAND.navy }}>{text}</div>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   FORM FIELD WRAPPER
   ═══════════════════════════════════════════════════════ */
function FormField({ label, error, children }) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: BRAND.ink }}>{label}</label>
      {children}
      {error && (
        <div style={{ fontSize: 12, color: BRAND.error, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
          <AlertCircle size={12} /> {error}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   REQUEST FORM
   ═══════════════════════════════════════════════════════ */
function RequestForm({ selectedType, onToast }) {
  const [form, setForm] = useState({
    fullName: '', companyName: '', phone: '', email: '',
    type: selectedType, notes: '',
    vehicleMakeModel: '', year: '', estimatedValue: '', usage: '',
    medicalUserType: '', medicalClass: '', employeesCount: '', familyCoverage: '', totalDependents: '', personalAge: '', numParents: '', numChildren: '',
    propertyType: '', location: '', buildArea: '', contentsIncluded: '', propertyValue: '', contentsValue: '',
    shippingSubtype: '', cargoType: '', furnitureBreakable: '', invoiceValue: '', invoiceCurrency: 'USD', originCountry: '', transitCountries: [{ country: '', mode: '' }], destinationCountry: '',
    plotNumber: '', builtUpArea: '', projectType: '', workersCount: '',
    contractValue: '', projectDuration: '',
    otherNeed: '',
  });

  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [medicalFiles, setMedicalFiles] = useState([]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, type: selectedType }));
  }, [selectedType]);

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Please enter your name';
    if (!form.email.trim()) e.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';

    if (form.type === 'motor') {
      if (!form.vehicleMakeModel.trim()) e.vehicleMakeModel = 'Required';
      if (!form.year.trim()) e.year = 'Required';
    }
    if (form.type === 'medical') {
      if (!form.medicalUserType) e.medicalUserType = 'Required';
      if (!form.medicalClass) e.medicalClass = 'Required';
      if (form.medicalUserType === 'Company' && !form.employeesCount.trim()) e.employeesCount = 'Required';
      if (form.medicalUserType === 'Personal' && !form.personalAge.trim()) e.personalAge = 'Required';
      if (medicalFiles.length === 0) e.medicalFiles = 'Please upload required documents';
    }
    if (form.type === 'property') {
      if (!form.propertyType.trim()) e.propertyType = 'Required';
      if (!form.location.trim()) e.location = 'Required';
      if (!form.propertyValue.trim()) e.propertyValue = 'Required';
    }
    if (form.type === 'shipping') {
      if (!form.shippingSubtype) e.shippingSubtype = 'Required';
      if (!form.cargoType) e.cargoType = 'Required';
      if (!form.invoiceValue.trim()) e.invoiceValue = 'Required';
      if (!form.originCountry.trim()) e.originCountry = 'Required';
      if (!form.destinationCountry.trim()) e.destinationCountry = 'Required';
    }
    if (form.type === 'workmen') {
      if (!form.projectType.trim()) e.projectType = 'Required';
      if (!form.workersCount.trim()) e.workersCount = 'Required';
    }
    if (form.type === 'other' && !form.otherNeed.trim()) e.otherNeed = 'Please describe your need';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const subject = useMemo(() => {
    const labels = Object.fromEntries(insuranceTypes.map((t) => [t.value, t.label]));
    return 'Quotation Request — ' + (labels[form.type] || 'Insurance');
  }, [form.type]);

  const emailBody = useMemo(() => {
    const labels = Object.fromEntries(insuranceTypes.map((t) => [t.value, t.label]));
    const lines = [
      'Full Name: ' + form.fullName,
      form.companyName ? 'Company: ' + form.companyName : null,
      form.phone ? 'Phone: ' + form.phone : null,
      'Email: ' + form.email,
      'Insurance Type: ' + (labels[form.type] || form.type),
      '',
    ].filter(Boolean);

    if (form.type === 'motor') {
      lines.push('Vehicle: ' + form.vehicleMakeModel, 'Year: ' + form.year);
      if (form.estimatedValue) lines.push('Value: ' + form.estimatedValue);
      if (form.usage) lines.push('Usage: ' + form.usage);
    }
    if (form.type === 'medical') {
      if (form.medicalUserType) lines.push('User Type: ' + form.medicalUserType);
      if (form.medicalClass) lines.push('Class: ' + form.medicalClass);
      if (form.medicalUserType === 'Company') {
        if (form.employeesCount) lines.push('Employees: ' + form.employeesCount);
        if (form.familyCoverage === 'yes' && form.totalDependents) lines.push('Total Dependents: ' + form.totalDependents);
        if (medicalFiles.length > 0) lines.push('Employee List: ' + medicalFiles.length + ' file(s) uploaded — please request via email');
      }
      if (form.medicalUserType === 'Personal') {
        if (form.personalAge) lines.push('Age: ' + form.personalAge);
        if (form.familyCoverage === 'yes') {
          if (form.numParents) lines.push('Parent Dependents: ' + form.numParents);
          if (form.numChildren) lines.push('Child Dependents: ' + form.numChildren);
        }
        if (medicalFiles.length > 0) lines.push('ID Documents: ' + medicalFiles.length + ' file(s) uploaded — please request via email');
      }
      if (form.familyCoverage) lines.push('Family Coverage: ' + form.familyCoverage);
    }
    if (form.type === 'property') {
      lines.push('Property Type: ' + form.propertyType, 'Location: ' + form.location);
      if (form.buildArea) lines.push('Built Area: ' + form.buildArea + ' sqm');
      lines.push('Property Value (USD): ' + form.propertyValue);
      if (form.contentsIncluded) lines.push('Contents Included: ' + form.contentsIncluded);
      if (form.contentsIncluded === 'yes' && form.contentsValue) lines.push('Contents Value (USD): ' + form.contentsValue);
    }
    if (form.type === 'shipping') {
      lines.push('Shipping Type: ' + form.shippingSubtype);
      lines.push('Cargo Contents: ' + form.cargoType);
      if (form.cargoType === 'Furniture' && form.furnitureBreakable) lines.push('Glass/Breakable Items: ' + form.furnitureBreakable);
      lines.push('Invoice Value: ' + form.invoiceValue + ' ' + form.invoiceCurrency);
      lines.push('Origin Country: ' + form.originCountry);
      var transitList = form.transitCountries.filter(function(c) { return c.country.trim(); }).map(function(c) { return c.country + (c.mode ? ' (' + c.mode + ')' : ''); }).join(', ');
      if (transitList) lines.push('Transit Countries: ' + transitList);
      lines.push('Destination Country: ' + form.destinationCountry);
      if (uploadedFiles.length > 0) lines.push('Attachments: ' + uploadedFiles.length + ' file(s) — please request via email');
    }
    if (form.type === 'workmen') {
      lines.push('Project Type: ' + form.projectType);
      if (form.plotNumber) lines.push('Plot: ' + form.plotNumber);
      if (form.builtUpArea) lines.push('Area: ' + form.builtUpArea + ' sqm');
      lines.push('Workers: ' + form.workersCount);
      if (form.contractValue) lines.push('Contract Value: ' + form.contractValue);
      if (form.projectDuration) lines.push('Duration: ' + form.projectDuration);
    }
    if (form.type === 'other') lines.push('Requirement: ' + form.otherNeed);
    if (form.notes) lines.push('', 'Notes: ' + form.notes);

    return lines.filter(Boolean).join('\n');
  }, [form]);

  const handleSubmit = () => {
    if (!validate()) {
      onToast('Please fill in the required fields.', 'error');
      return;
    }
    setShowConfirm(true);
  };

  const confirmAndSend = () => {
    setShowConfirm(false);
    window.location.href = 'mailto:' + COMPANY_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(emailBody);
    onToast('Your email app is opening — please press Send to submit your request!', 'success');
  };

  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 };

  return (
    <>
      <div className="card" style={{ boxShadow: '0 20px 56px rgba(86,100,151,0.1)' }}>
        <div style={{ padding: '32px 28px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: BRAND.ink }}>
            Request a quotation
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: BRAND.navy, marginTop: 8, marginBottom: 8 }}>
            Tell us what you need and we will help you find the right cover.
          </p>
          <div style={{
            marginBottom: 24, padding: '10px 14px', borderRadius: 12,
            background: BRAND.soft, border: '1px solid ' + BRAND.border,
            fontSize: 12, lineHeight: 1.7, color: BRAND.navy,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Shield size={14} style={{ flexShrink: 0 }} />
            Your information is used only to prepare your quotation. We do not share your details.
          </div>

          <div style={gridStyle}>
            <FormField label="Full name *" error={errors.fullName}>
              <input className={errors.fullName ? 'error-field' : ''} value={form.fullName} onChange={(e) => onChange('fullName', e.target.value)} placeholder="Your full name" />
            </FormField>
            <FormField label="Company name">
              <input value={form.companyName} onChange={(e) => onChange('companyName', e.target.value)} placeholder="Optional" />
            </FormField>
            <FormField label="Phone number">
              <input value={form.phone} onChange={(e) => onChange('phone', e.target.value)} placeholder="Optional" />
            </FormField>
            <FormField label="Email address *" error={errors.email}>
              <input className={errors.email ? 'error-field' : ''} type="email" value={form.email} onChange={(e) => onChange('email', e.target.value)} placeholder="name@company.com" />
            </FormField>
          </div>

          <div style={{ marginTop: 18 }}>
            <FormField label="Insurance type">
              <select value={form.type} onChange={(e) => onChange('type', e.target.value)}>
                {insuranceTypes.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </FormField>
          </div>

          {form.type === 'motor' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ ...gridStyle, marginTop: 18, overflow: 'hidden' }}>
              <FormField label="Vehicle make & model *" error={errors.vehicleMakeModel}>
                <input className={errors.vehicleMakeModel ? 'error-field' : ''} value={form.vehicleMakeModel} onChange={(e) => onChange('vehicleMakeModel', e.target.value)} placeholder="e.g. Toyota Land Cruiser" />
              </FormField>
              <FormField label="Year *" error={errors.year}>
                <input className={errors.year ? 'error-field' : ''} value={form.year} onChange={(e) => onChange('year', e.target.value)} placeholder="e.g. 2024" />
              </FormField>
              <FormField label="Estimated value">
                <input value={form.estimatedValue} onChange={(e) => onChange('estimatedValue', e.target.value)} placeholder="USD or local currency" />
              </FormField>
              <FormField label="Usage">
                <input value={form.usage} onChange={(e) => onChange('usage', e.target.value)} placeholder="Private, commercial, fleet" />
              </FormField>
            </motion.div>
          )}

          {form.type === 'medical' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ marginTop: 18, overflow: 'hidden' }}>
              <div style={gridStyle}>
                <FormField label="User type *" error={errors.medicalUserType}>
                  <select className={errors.medicalUserType ? 'error-field' : ''} value={form.medicalUserType} onChange={(e) => onChange('medicalUserType', e.target.value)}>
                    <option value="">Select</option>
                    <option value="Company">Company</option>
                    <option value="Personal">Personal</option>
                  </select>
                </FormField>
                <FormField label="Insurance class *" error={errors.medicalClass}>
                  <select className={errors.medicalClass ? 'error-field' : ''} value={form.medicalClass} onChange={(e) => onChange('medicalClass', e.target.value)}>
                    <option value="">Select class</option>
                    <option value="Class A">Class A</option>
                    <option value="Class B">Class B</option>
                    <option value="SK">SK</option>
                  </select>
                </FormField>
              </div>

              {form.medicalUserType === 'Company' && (
                <div style={{ marginTop: 14 }}>
                  <div style={gridStyle}>
                    <FormField label="Number of employees *" error={errors.employeesCount}>
                      <input className={errors.employeesCount ? 'error-field' : ''} value={form.employeesCount} onChange={(e) => onChange('employeesCount', e.target.value)} placeholder="e.g. 25" />
                    </FormField>
                    <FormField label="Family coverage?">
                      <select value={form.familyCoverage} onChange={(e) => onChange('familyCoverage', e.target.value)}>
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </FormField>
                    {form.familyCoverage === 'yes' && (
                      <FormField label="Total number of dependents">
                        <input value={form.totalDependents} onChange={(e) => onChange('totalDependents', e.target.value)} placeholder="Total dependents across all employees" />
                      </FormField>
                    )}
                  </div>
                  <div style={{ marginTop: 16, padding: 18, borderRadius: 14, border: '1.5px dashed ' + BRAND.border, background: BRAND.soft, textAlign: 'center' }}>
                    <Upload size={22} style={{ color: BRAND.navy, marginBottom: 8 }} />
                    <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.ink, marginBottom: 4 }}>Upload employee list *</div>
                    <div style={{ fontSize: 12, color: BRAND.navy, marginBottom: 12 }}>Include names, dates of birth, dependents for each employee, and any previous health conditions.</div>
                    <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.csv" id="medical-upload" style={{ display: 'none' }}
                      onChange={(e) => { setMedicalFiles((prev) => [...prev, ...Array.from(e.target.files)]); e.target.value = ''; }} />
                    <label htmlFor="medical-upload" className="btn-outline" style={{ cursor: 'pointer', fontSize: 12, minHeight: 36, padding: '0 16px', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Upload size={14} /> Choose files
                    </label>
                    {medicalFiles.length > 0 && (
                      <div style={{ marginTop: 12, textAlign: 'left' }}>
                        {medicalFiles.map((file, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', marginBottom: 4, borderRadius: 8, background: '#fff', border: '1px solid ' + BRAND.border, fontSize: 13 }}>
                            <span style={{ color: BRAND.ink }}>{file.name}</span>
                            <button type="button" onClick={() => setMedicalFiles((prev) => prev.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: BRAND.error, padding: 0 }}><Trash2 size={14} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {form.medicalUserType === 'Personal' && (
                <div style={{ marginTop: 14 }}>
                  <div style={gridStyle}>
                    <FormField label="Age *" error={errors.personalAge}>
                      <input className={errors.personalAge ? 'error-field' : ''} value={form.personalAge} onChange={(e) => onChange('personalAge', e.target.value)} placeholder="Your age" />
                    </FormField>
                    <FormField label="Family coverage?">
                      <select value={form.familyCoverage} onChange={(e) => onChange('familyCoverage', e.target.value)}>
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </FormField>
                    {form.familyCoverage === 'yes' && (
                      <>
                        <FormField label="Number of parent dependents">
                          <input value={form.numParents} onChange={(e) => onChange('numParents', e.target.value)} placeholder="e.g. 2" />
                        </FormField>
                        <FormField label="Number of child dependents">
                          <input value={form.numChildren} onChange={(e) => onChange('numChildren', e.target.value)} placeholder="e.g. 3" />
                        </FormField>
                      </>
                    )}
                  </div>
                  <div style={{ marginTop: 16, padding: 18, borderRadius: 14, border: '1.5px dashed ' + BRAND.border, background: BRAND.soft, textAlign: 'center' }}>
                    <Upload size={22} style={{ color: BRAND.navy, marginBottom: 8 }} />
                    <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.ink, marginBottom: 4 }}>Upload ID documents *</div>
                    <div style={{ fontSize: 12, color: BRAND.navy, marginBottom: 12 }}>Upload IDs for the principal applicant and all dependents.</div>
                    <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" id="medical-id-upload" style={{ display: 'none' }}
                      onChange={(e) => { setMedicalFiles((prev) => [...prev, ...Array.from(e.target.files)]); e.target.value = ''; }} />
                    <label htmlFor="medical-id-upload" className="btn-outline" style={{ cursor: 'pointer', fontSize: 12, minHeight: 36, padding: '0 16px', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Upload size={14} /> Choose files
                    </label>
                    {medicalFiles.length > 0 && (
                      <div style={{ marginTop: 12, textAlign: 'left' }}>
                        {medicalFiles.map((file, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', marginBottom: 4, borderRadius: 8, background: '#fff', border: '1px solid ' + BRAND.border, fontSize: 13 }}>
                            <span style={{ color: BRAND.ink }}>{file.name}</span>
                            <button type="button" onClick={() => setMedicalFiles((prev) => prev.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: BRAND.error, padding: 0 }}><Trash2 size={14} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {form.type === 'property' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ ...gridStyle, marginTop: 18, overflow: 'hidden' }}>
              <FormField label="Property type *" error={errors.propertyType}>
                <input className={errors.propertyType ? 'error-field' : ''} value={form.propertyType} onChange={(e) => onChange('propertyType', e.target.value)} placeholder="Home, office, shop, warehouse" />
              </FormField>
              <FormField label="Location *" error={errors.location}>
                <input className={errors.location ? 'error-field' : ''} value={form.location} onChange={(e) => onChange('location', e.target.value)} placeholder="City / area" />
              </FormField>
              <FormField label="Built area (sqm)">
                <input value={form.buildArea} onChange={(e) => onChange('buildArea', e.target.value)} placeholder="e.g. 180" />
              </FormField>
              <FormField label="Property value (USD) *" error={errors.propertyValue}>
                <input className={errors.propertyValue ? 'error-field' : ''} value={form.propertyValue} onChange={(e) => onChange('propertyValue', e.target.value)} placeholder="e.g. 250,000" />
              </FormField>
              <FormField label="Contents included?">
                <select value={form.contentsIncluded} onChange={(e) => onChange('contentsIncluded', e.target.value)}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </FormField>
              {form.contentsIncluded === 'yes' && (
                <FormField label="Contents value (USD)">
                  <input value={form.contentsValue} onChange={(e) => onChange('contentsValue', e.target.value)} placeholder="e.g. 50,000" />
                </FormField>
              )}
            </motion.div>
          )}

          {form.type === 'shipping' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ marginTop: 18, overflow: 'hidden' }}>
              <div style={gridStyle}>
                <FormField label="Shipping type *" error={errors.shippingSubtype}>
                  <select className={errors.shippingSubtype ? 'error-field' : ''} value={form.shippingSubtype} onChange={(e) => onChange('shippingSubtype', e.target.value)}>
                    <option value="">Select type</option>
                    <option value="Land">Land</option>
                    <option value="Air">Air</option>
                    <option value="Sea">Sea</option>
                  </select>
                </FormField>
                <FormField label="Cargo contents *" error={errors.cargoType}>
                  <select className={errors.cargoType ? 'error-field' : ''} value={form.cargoType} onChange={(e) => onChange('cargoType', e.target.value)}>
                    <option value="">Select contents</option>
                    <option value="General Merchandise">General merchandise (textiles, plastics, non-perishable)</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Cosmetics">Cosmetics</option>
                    <option value="Fine Liquor">Fine liquor</option>
                    <option value="Specialized Cargo">Specialized cargo (artwork, antiques)</option>
                    <option value="Perishable Goods">Perishable goods (food, temperature-sensitive)</option>
                    <option value="Hazardous Materials">Hazardous materials</option>
                  </select>
                </FormField>
                {form.cargoType === 'Furniture' && (
                  <FormField label="Glass or breakable items present?">
                    <select value={form.furnitureBreakable} onChange={(e) => onChange('furnitureBreakable', e.target.value)}>
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </FormField>
                )}
                <FormField label="Invoice value *" error={errors.invoiceValue}>
                  <input className={errors.invoiceValue ? 'error-field' : ''} value={form.invoiceValue} onChange={(e) => onChange('invoiceValue', e.target.value)} placeholder="e.g. 50,000" />
                </FormField>
                <FormField label="Currency">
                  <select value={form.invoiceCurrency} onChange={(e) => onChange('invoiceCurrency', e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </FormField>
                <FormField label="Origin country *" error={errors.originCountry}>
                  <input className={errors.originCountry ? 'error-field' : ''} value={form.originCountry} onChange={(e) => onChange('originCountry', e.target.value)} placeholder="Country of origin" />
                </FormField>
                <FormField label="Destination country *" error={errors.destinationCountry}>
                  <input className={errors.destinationCountry ? 'error-field' : ''} value={form.destinationCountry} onChange={(e) => onChange('destinationCountry', e.target.value)} placeholder="Final destination" />
                </FormField>
              </div>

              <div style={{ marginTop: 14 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: BRAND.ink }}>Transit countries & shipping mode</label>
                {form.transitCountries.map((tc, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                    <input
                      value={tc.country}
                      onChange={(e) => {
                        const updated = [...form.transitCountries];
                        updated[idx] = { ...updated[idx], country: e.target.value };
                        setForm((prev) => ({ ...prev, transitCountries: updated }));
                      }}
                      placeholder={'Transit country ' + (idx + 1)}
                      style={{ flex: 1 }}
                    />
                    <select
                      value={tc.mode}
                      onChange={(e) => {
                        const updated = [...form.transitCountries];
                        updated[idx] = { ...updated[idx], mode: e.target.value };
                        setForm((prev) => ({ ...prev, transitCountries: updated }));
                      }}
                      style={{ width: 120, flexShrink: 0 }}
                    >
                      <option value="">Mode</option>
                      <option value="Land">Land</option>
                      <option value="Air">Air</option>
                      <option value="Sea">Sea</option>
                    </select>
                    {form.transitCountries.length > 1 && (
                      <button type="button" onClick={() => {
                        const updated = form.transitCountries.filter((_, i) => i !== idx);
                        setForm((prev) => ({ ...prev, transitCountries: updated }));
                      }} style={{
                        width: 36, height: 36, borderRadius: 8, border: '1px solid ' + BRAND.border,
                        background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: BRAND.error, flexShrink: 0,
                      }}>
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => {
                  setForm((prev) => ({ ...prev, transitCountries: [...prev.transitCountries, { country: '', mode: '' }] }));
                }} className="btn-outline" style={{ fontSize: 12, minHeight: 34, padding: '0 14px', marginTop: 4 }}>
                  <Plus size={14} /> Add transit country
                </button>
              </div>

              <div style={{ marginTop: 16, padding: 18, borderRadius: 14, border: '1.5px dashed ' + BRAND.border, background: BRAND.soft, textAlign: 'center' }}>
                <Upload size={22} style={{ color: BRAND.navy, marginBottom: 8 }} />
                <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.ink, marginBottom: 4 }}>Upload invoices & supporting documents</div>
                <div style={{ fontSize: 12, color: BRAND.navy, marginBottom: 12 }}>PDF, JPG, PNG — max 10MB per file</div>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  id="file-upload"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setUploadedFiles((prev) => [...prev, ...files]);
                    e.target.value = '';
                  }}
                />
                <label htmlFor="file-upload" className="btn-outline" style={{ cursor: 'pointer', fontSize: 12, minHeight: 36, padding: '0 16px', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Upload size={14} /> Choose files
                </label>
                {uploadedFiles.length > 0 && (
                  <div style={{ marginTop: 12, textAlign: 'left' }}>
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '8px 12px', marginBottom: 4, borderRadius: 8,
                        background: '#fff', border: '1px solid ' + BRAND.border, fontSize: 13,
                      }}>
                        <span style={{ color: BRAND.ink }}>{file.name}</span>
                        <button type="button" onClick={() => {
                          setUploadedFiles((prev) => prev.filter((_, i) => i !== idx));
                        }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: BRAND.error, padding: 0 }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {form.type === 'workmen' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ ...gridStyle, marginTop: 18, overflow: 'hidden' }}>
              <FormField label="Project type *" error={errors.projectType}>
                <input className={errors.projectType ? 'error-field' : ''} value={form.projectType} onChange={(e) => onChange('projectType', e.target.value)} placeholder="Residential, commercial..." />
              </FormField>
              <FormField label="Plot number">
                <input value={form.plotNumber} onChange={(e) => onChange('plotNumber', e.target.value)} placeholder="Plot number" />
              </FormField>
              <FormField label="Built-up area (sqm)">
                <input value={form.builtUpArea} onChange={(e) => onChange('builtUpArea', e.target.value)} placeholder="e.g. 1,200" />
              </FormField>
              <FormField label="Number of workers *" error={errors.workersCount}>
                <input className={errors.workersCount ? 'error-field' : ''} value={form.workersCount} onChange={(e) => onChange('workersCount', e.target.value)} placeholder="Headcount" />
              </FormField>
              <FormField label="Contract value">
                <input value={form.contractValue} onChange={(e) => onChange('contractValue', e.target.value)} placeholder="Amount" />
              </FormField>
              <FormField label="Project duration">
                <input value={form.projectDuration} onChange={(e) => onChange('projectDuration', e.target.value)} placeholder="e.g. 12 months" />
              </FormField>
            </motion.div>
          )}

          {form.type === 'other' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ marginTop: 18, overflow: 'hidden' }}>
              <FormField label="Tell us what you need *" error={errors.otherNeed}>
                <textarea className={errors.otherNeed ? 'error-field' : ''} value={form.otherNeed} onChange={(e) => onChange('otherNeed', e.target.value)} placeholder="Describe the insurance or risk you need help with." />
              </FormField>
            </motion.div>
          )}

          <div style={{ marginTop: 18 }}>
            <FormField label="Additional notes">
              <textarea value={form.notes} onChange={(e) => onChange('notes', e.target.value)} placeholder="Anything else we should know?" />
            </FormField>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginTop: 24 }}>
            <button className="btn-primary" onClick={handleSubmit}>
              <Send size={15} /> Send quotation request
            </button>
            <span style={{ fontSize: 13, color: BRAND.navy }}>
              Your request goes to {COMPANY_EMAIL}
            </span>
          </div>
        </div>
      </div>

      <Modal open={showConfirm} onClose={() => setShowConfirm(false)}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
            background: BRAND.soft, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Send size={24} style={{ color: BRAND.navy }} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: BRAND.ink, marginBottom: 10 }}>
            Ready to send?
          </h3>
          <p style={{ fontSize: 14, color: BRAND.navy, lineHeight: 1.7, marginBottom: 24 }}>
            This will open your email app with your quotation details pre-filled. Just press <strong>Send</strong> in your email client.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn-outline" onClick={() => setShowConfirm(false)}>Go back</button>
            <button className="btn-primary" onClick={confirmAndSend}><Mail size={15} /> Open email app</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════ */
export default function App() {
  const [selectedType, setSelectedType] = useState('motor');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Why Astrus', href: '#why-us' },
    { label: 'Get a Quote', href: '#quote' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <GlobalStyles />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* ── HEADER ──────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        borderBottom: '1px solid ' + BRAND.border,
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
      }}>
        <div className="section-container" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 24px', gap: 16,
        }}>
          <LogoBlock />

          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
            ))}
            <button className="btn-primary" style={{ marginLeft: 8 }} onClick={() => setShowContactModal(true)}>Contact us</button>
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none', alignItems: 'center', justifyContent: 'center',
              width: 42, height: 42, borderRadius: 10, border: '1.5px solid ' + BRAND.border,
              background: '#fff', cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                position: 'absolute', top: '100%', left: 0, right: 0,
                background: '#fff', borderBottom: '1px solid ' + BRAND.border,
                boxShadow: '0 12px 32px rgba(36,48,79,0.1)',
                padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 8,
              }}
            >
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ padding: '12px 16px', borderRadius: 10, fontSize: 15 }}>
                  {item.label}
                </a>
              ))}
              <button className="btn-primary"
                onClick={() => { setMobileMenuOpen(false); setShowContactModal(true); }}
                style={{ marginTop: 8, textAlign: 'center', width: '100%' }}>
                Contact us
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── HERO ──────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(180deg, ' + BRAND.soft + ' 0%, #fff 70%)',
          borderBottom: '1px solid ' + BRAND.border,
        }}>
          <div className="section-container" style={{
            padding: '72px 24px 80px',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 40, alignItems: 'start',
          }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                borderRadius: 999, border: '1px solid ' + BRAND.border,
                background: '#fff', padding: '8px 14px',
                fontSize: 13, color: BRAND.navy, fontWeight: 500,
                boxShadow: '0 4px 12px rgba(86,100,151,0.06)',
              }}>
                <BadgeCheck size={15} /> Trusted insurance guidance
              </div>

              <h1 className="hero-title" style={{
                fontFamily: 'var(--font-display)', fontSize: 52, lineHeight: 1.08,
                color: BRAND.ink, margin: '22px 0 16px', letterSpacing: '-0.01em',
              }}>
                Insurance made clear, dependable, and refreshingly human.
              </h1>

              <p className="hero-subtitle" style={{
                fontSize: 18, lineHeight: 1.75, color: BRAND.navy,
                maxWidth: 560, marginBottom: 28,
              }}>
                We help you protect what matters with practical advice, responsive service, and solutions tailored to real-life needs. No jargon. No runaround.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
                <a href="#quote" className="btn-primary">Get a quotation</a>
                <button className="btn-outline" onClick={() => setShowContactModal(true)}>Speak with our team</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12 }}>
                <FeatureCard icon={Clock3} title="Fast responses" text="Clear follow-up when you need it." onClick={() => setShowContactModal(true)} />
                <FeatureCard icon={Shield} title="Reliable cover" text="Built around actual risks." onClick={() => scrollToSection('quote')} />
                <FeatureCard icon={Users} title="Human service" text="Straightforward guidance." onClick={() => setShowContactModal(true)} />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
                {[
                  { icon: BadgeCheck, label: 'Licensed brokerage' },
                  { icon: Clock3, label: 'Fast quotations' },
                  { icon: Shield, label: 'Reliable protection' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '8px 14px', borderRadius: 999,
                      border: '1px solid ' + BRAND.border, background: '#fff',
                      fontSize: 13, fontWeight: 600, color: BRAND.ink,
                    }}>
                      <Icon size={14} style={{ color: BRAND.navy }} />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div
                onClick={() => scrollToSection('quote')}
                className="card-lift"
                style={{
                  borderRadius: 22, padding: 32, cursor: 'pointer', color: '#fff',
                  background: 'linear-gradient(135deg, ' + BRAND.ink + ' 0%, ' + BRAND.navy + ' 55%, ' + BRAND.lavender + ' 100%)',
                  boxShadow: '0 24px 56px rgba(36,48,79,0.22)',
                }}
              >
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  borderRadius: 999, background: 'rgba(255,255,255,0.12)',
                  padding: '7px 12px', fontSize: 13,
                }}>
                  <CheckCircle2 size={15} /> Why clients choose Astrus
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, margin: '18px 0 12px', lineHeight: 1.2 }}>
                  Confident decisions start with clear advice.
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.8, opacity: 0.88 }}>
                  Whether you are protecting a vehicle, a home, a team, or a construction site — we simplify the process and help you move forward.
                </p>

                <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
                  {[
                    'Professional communication from first contact',
                    'Tailored quotation for each insurance type',
                    'Direct requests to our team — no middlemen',
                    'Built for trust, clarity, and credible first impressions',
                  ].map((line) => (
                    <div key={line} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <CheckCircle2 size={16} style={{ marginTop: 3, flexShrink: 0, opacity: 0.8 }} />
                      <div style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.92 }}>{line}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SOLUTIONS ─────────────────────────── */}
        <section id="solutions" style={{ paddingTop: 72, paddingBottom: 48 }}>
          <div className="section-container">
            <SectionHeading
              eyebrow="Solutions"
              title="Coverage designed around real needs"
              description="Choose the insurance type that fits your situation. Each form is tailored so your quotation starts with the right details."
            />
            <div style={{ marginTop: 28 }}>
              <InsuranceTypeCards selectedType={selectedType} setSelectedType={setSelectedType} />
            </div>
          </div>
        </section>

        {/* ── VALUE PROPS ───────────────────────── */}
        <section style={{ background: BRAND.soft, borderTop: '1px solid ' + BRAND.border, borderBottom: '1px solid ' + BRAND.border }}>
          <div className="section-container" style={{
            padding: '64px 24px',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16,
          }}>
            {[
              { title: 'Clear recommendations', text: 'Practical cover and straightforward explanations so you can decide with confidence.' },
              { title: 'Tailored intake', text: 'Each insurance line has its own form — cleaner enquiries, faster responses.' },
              { title: 'Professional service', text: 'Credible, calm, and trustworthy from the first click.' },
            ].map((item) => (
              <div key={item.title} onClick={() => scrollToSection('quote')} className="card card-lift" style={{ padding: 26, cursor: 'pointer' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: BRAND.ink, marginBottom: 8 }}>{item.title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: BRAND.navy, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY US ─────────────────────────────── */}
        <section id="why-us" style={{ paddingTop: 72, paddingBottom: 48 }}>
          <div className="section-container">
            <SectionHeading eyebrow="Why Astrus" title="A brokerage that earns your trust" />
            <div style={{
              marginTop: 28,
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16,
            }}>
              {[
                { title: 'Clarity first', text: 'We explain options in plain language so you understand what you are buying and why it matters.', icon: Globe2 },
                { title: 'Responsive service', text: 'Fast, thoughtful follow-up so you feel supported, not ignored.', icon: Clock3 },
                { title: 'Credible presentation', text: 'A clean, professional experience that turns first-time visitors into serious enquiries.', icon: BadgeCheck },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="card" style={{ padding: 28 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12, marginBottom: 16,
                      background: BRAND.soft, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={20} style={{ color: BRAND.navy }} />
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: BRAND.ink, marginBottom: 8 }}>{item.title}</div>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: BRAND.navy, margin: 0 }}>{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── QUOTE FORM ────────────────────────── */}
        <section id="quote" style={{
          background: BRAND.soft,
          borderTop: '1px solid ' + BRAND.border,
          borderBottom: '1px solid ' + BRAND.border,
        }}>
          <div className="section-container" style={{ padding: '72px 24px' }}>
            <div style={{ marginBottom: 32 }}>
              <SectionHeading
                eyebrow="Request a quote"
                title="Start your quotation in minutes"
                description={'Select the insurance type, fill in the details, and send your request directly to ' + COMPANY_EMAIL + '.'}
              />
            </div>
            <RequestForm selectedType={selectedType} onToast={showToast} />
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────── */}
        <section id="contact">
          <div className="section-container" style={{
            padding: '56px 24px',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, alignItems: 'start',
          }}>
            <div>
              <LogoBlock />
              <p style={{ maxWidth: 500, fontSize: 15, lineHeight: 1.75, color: BRAND.navy, marginTop: 16 }}>
                Astrus Insurance Services provides clear, dependable insurance guidance for individuals, families, and businesses seeking protection they can trust.
              </p>
            </div>

            <div className="card" style={{ padding: 22, background: BRAND.soft }}>
              <div style={{ fontWeight: 700, color: BRAND.ink, marginBottom: 8 }}>Send us an email</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: BRAND.navy, margin: '0 0 14px' }}>
                Click below and your email app will open a pre-addressed message to our team.
              </p>
              <a href={'mailto:' + COMPANY_EMAIL + '?subject=' + encodeURIComponent('Astrus Insurance Enquiry')} className="btn-primary" style={{ fontSize: 13 }}>
                <Send size={14} /> {COMPANY_EMAIL}
              </a>
            </div>
          </div>

          <div style={{ borderTop: '1px solid ' + BRAND.border, padding: '18px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: BRAND.lavender, margin: 0 }}>
              &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
            </p>
          </div>
        </section>
      </main>

      {/* Contact Modal */}
      <Modal open={showContactModal} onClose={() => setShowContactModal(false)}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
            background: BRAND.soft, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Mail size={24} style={{ color: BRAND.navy }} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: BRAND.ink, marginBottom: 10 }}>
            Get in touch
          </h3>
          <p style={{ fontSize: 14, color: BRAND.navy, lineHeight: 1.7, marginBottom: 24 }}>
            Send us an email and our team will get back to you promptly with clear, practical guidance.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn-outline" onClick={() => setShowContactModal(false)}>Close</button>
            <a href={'mailto:' + COMPANY_EMAIL + '?subject=' + encodeURIComponent('Astrus Insurance Enquiry')} className="btn-primary" style={{ textDecoration: 'none' }}
              onClick={() => setShowContactModal(false)}>
              <Send size={15} /> Email {COMPANY_EMAIL}
            </a>
          </div>
        </div>
      </Modal>

      <button
        className={'scroll-top-btn ' + (showScrollTop ? 'visible' : '')}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
