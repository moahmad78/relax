/**
 * RELAX - Luxury 24/7 In-Home Massage Application Logic
 * Interactive Booking System, Multi-step Flow, Realistic OTP Verification,
 * Service Detail Modals, FAQ Accordions, and Web Audio Ambient Soundscape.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DATA & STATE MANAGEMENT
  // ==========================================
  const serviceCatalog = {
    'swedish': {
      title: 'Swedish Relaxation Massage',
      tag: 'Most Popular • Gentle',
      rating: '4.98 from 850+ Women Clients',
      basePrice: 1499,
      desc: 'Our signature Swedish Relaxation Massage uses rhythmic long strokes, gentle kneading, and passive joint mobilization. Tailored to soothe the nervous system, improve circulation, and melt away daily tension without discomfort.',
      benefits: [
        'Relieves overall physical fatigue & muscular tension',
        'Significantly lowers cortisol & encourages restorative sleep',
        'Improves blood and lymphatic circulation throughout the body',
        'Gentle, non-invasive therapeutic touch'
      ],
      prices: { 60: '₹1,499', 90: '₹2,199', 120: '₹2,799' }
    },
    'deep-tissue': {
      title: 'Deep Tissue Therapeutic Massage',
      tag: 'Firm Pressure • Knot Relief',
      rating: '4.96 from 640+ Women Clients',
      basePrice: 1699,
      desc: 'Targeted, firm pressure therapy focusing on deeper sub-layers of muscle fibers and fascia. Breaks down stubborn adhesions, chronic neck and shoulder knots, and releases lower back stiffness.',
      benefits: [
        'Concentrated relief for chronic muscular tightness',
        'Breaks down postural knots and scar tissue adhesions',
        'Realigns deeper muscle fibers and spinal tension',
        'Enhanced flexibility and range of motion'
      ],
      prices: { 60: '₹1,699', 90: '₹2,399', 120: '₹2,999' }
    },
    'aromatherapy': {
      title: 'Aromatherapy Sensory Massage',
      tag: 'Organic Botanical • Holistic',
      rating: '4.99 from 920+ Women Clients',
      basePrice: 1599,
      desc: 'An exquisite sensory sanctuary combining flowing Swedish techniques with customized pure essential oil blends (French Lavender, Mysore Sandalwood, Sweet Orange, or Eucalyptus). Ideal for emotional decompression and insomnia relief.',
      benefits: [
        'Pure organic therapeutic-grade cold-pressed essential oils',
        'Calms anxious thoughts and mental stress profoundly',
        'Deep sleep induction and autonomic nervous system reset',
        'Leaves skin nourished, silky, and delicately scented'
      ],
      prices: { 60: '₹1,599', 90: '₹2,299', 120: '₹2,899' }
    },
    'back-neck': {
      title: 'Back, Neck & Shoulder Relief',
      tag: 'Targeted • Desk Posture Cure',
      rating: '4.94 from 490+ Women Clients',
      basePrice: 1199,
      desc: 'Focused acupressure and trigger-point decompression centered on the upper cervical spine, trapezoids, scapula, and lumbar area. Eliminates desk fatigue, computer neck strain, and tension headaches.',
      benefits: [
        'Targeted focus on posture pain from laptop & desk work',
        'Alleviates tension headaches and neck stiffness',
        'Quick turnaround relief with immediate decompression',
        'Includes soothing thermal herbal muscle balm'
      ],
      prices: { 45: '₹1,199', 60: '₹1,499', 90: '₹1,999' }
    },
    'hot-stone': {
      title: 'Hot Stone & Herbal Compress Therapy',
      tag: 'Ultimate Luxury • Thermal Therapy',
      rating: '4.97 from 380+ Women Clients',
      basePrice: 2199,
      desc: 'Smooth, heated volcanic basalt stones and steamed herbal compresses are placed along key energy centers and massaged into muscles. The thermal warmth penetrates 3x deeper than hands alone.',
      benefits: [
        'Heated volcanic basalt stones promote deep muscle melting',
        'Steamed Thai herbal poultice detoxifies and relaxes',
        'Profound relief for chronic stiffness and poor circulation',
        'Deeply grounding, luxurious experience'
      ],
      prices: { 60: '₹1,899', 90: '₹2,199', 120: '₹3,499' }
    },
    'reflexology': {
      title: 'Reflexology & Foot Rejuvenation',
      tag: 'Restorative • Pressure Points',
      rating: '4.95 from 410+ Women Clients',
      basePrice: 999,
      desc: 'Ancient pressure-point therapy applied to the soles, toes, ankles, and calves. Stimulates reflex zones corresponding to internal organs to rebalance total bodily equilibrium and soothe tired feet.',
      benefits: [
        'Relieves foot soreness, plantar tension & leg swelling',
        'Stimulates energy meridians to balance full body wellness',
        'Includes organic peppermint & tea tree foot balm',
        'Can be performed comfortably on your sofa or bed'
      ],
      prices: { 45: '₹999', 60: '₹1,399', 90: '₹1,799' }
    }
  };

  const bookingState = {
    therapy: 'swedish',
    therapyName: 'Swedish Relaxation Massage',
    duration: 60,
    basePrice: 1499,
    addonsTotal: 0,
    pressure: 'medium',
    oil: 'french-lavender',
    date: '',
    timeSlot: 'now',
    address: '',
    city: 'Downtown / City Center',
    notes: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    otpSent: false,
    generatedOtp: '7842',
    otpVerified: false,
    refId: ''
  };

  // ==========================================
  // 2. HEADER, NAVIGATION & SCROLL EVENTS
  // ==========================================
  const header = document.getElementById('mainHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightActiveNav();
  });

  // Mobile menu toggle
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Active navigation highlight on scroll
  function highlightActiveNav() {
    const scrollPos = window.scrollY + 120;
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Set default appointment date to today
  const bookingDateInput = document.getElementById('bookingDate');
  if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.value = today;
    bookingDateInput.min = today;
    bookingState.date = today;
  }

  // Dynamic Year in footer
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 3. SERVICES (ALL ACTIVE)
  // ==========================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  if (filterTabs.length > 0) {
    const serviceCards = document.querySelectorAll('.service-card');
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-filter');
        const servicesGrid = document.getElementById('servicesGrid');
        if (servicesGrid) {
          servicesGrid.scrollTo({ left: 0, behavior: 'smooth' });
        }
        serviceCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.35s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================
  // 4. FAQ ACCORDION
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Modal scroll lock helpers
  function lockBodyScroll() {
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
  }

  function unlockBodyScroll() {
    const activeModals = document.querySelectorAll('.modal-overlay.active');
    if (activeModals.length === 0) {
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
    }
  }

  // ==========================================
  // 5. SERVICE DETAIL MODAL
  // ==========================================
  const serviceDetailModal = document.getElementById('serviceDetailModal');
  const closeServiceDetailBtn = document.getElementById('closeServiceDetailBtn');
  const viewDetailBtns = document.querySelectorAll('.view-service-detail-btn, .footer-service-trigger');
  const modalBookNowBtn = document.getElementById('modalBookNowBtn');

  let currentDetailServiceKey = 'swedish';

  function openServiceDetail(serviceKey) {
    const data = serviceCatalog[serviceKey] || serviceCatalog['swedish'];
    currentDetailServiceKey = serviceKey;

    document.getElementById('modalServiceTag').textContent = data.tag;
    document.getElementById('modalServiceTitle').textContent = data.title;
    document.getElementById('modalServiceRating').innerHTML = `<i class="fa-solid fa-star"></i> ${data.rating}`;
    document.getElementById('modalServiceFullDesc').textContent = data.desc;

    const benefitsList = document.getElementById('modalServiceBenefits');
    benefitsList.innerHTML = '';
    data.benefits.forEach(b => {
      const li = document.createElement('li');
      li.textContent = b;
      benefitsList.appendChild(li);
    });

    if (data.prices[60]) document.getElementById('modalPrice60').textContent = data.prices[60];
    if (data.prices[90]) document.getElementById('modalPrice90').textContent = data.prices[90];
    if (data.prices[120]) document.getElementById('modalPrice120').textContent = data.prices[120];

    serviceDetailModal.classList.add('active');
    lockBodyScroll();
  }

  function closeServiceDetail() {
    if (serviceDetailModal) {
      serviceDetailModal.classList.remove('active');
    }
    unlockBodyScroll();
  }

  // Open details on clicking Details button or tapping anywhere on the card
  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const serviceKey = btn.getAttribute('data-service');
      openServiceDetail(serviceKey);
    });
  });

  // Clicking anywhere on a service card opens the Details modal
  const allServiceCards = document.querySelectorAll('.service-card');
  allServiceCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.book-service-direct-btn')) {
        return;
      }
      const serviceKey = card.getAttribute('data-service-id') || card.getAttribute('data-service') || 'swedish';
      openServiceDetail(serviceKey);
    });
  });

  if (closeServiceDetailBtn) {
    closeServiceDetailBtn.addEventListener('click', closeServiceDetail);
  }

  if (modalBookNowBtn) {
    modalBookNowBtn.addEventListener('click', () => {
      closeServiceDetail();
      openBookingModal(currentDetailServiceKey);
    });
  }

  // ==========================================
  // 6. SAFETY CHARTER MODAL
  // ==========================================
  const safetyCharterModal = document.getElementById('safetyCharterModal');
  const openSafetyCharterBtn = document.getElementById('openSafetyCharterModalBtn');
  const closeSafetyCharterBtn = document.getElementById('closeSafetyCharterBtn');
  const acknowledgeCharterBtn = document.getElementById('acknowledgeCharterBtn');
  const ethicsCodeLink = document.getElementById('ethicsCodeLink');

  function openSafetyModal() {
    safetyCharterModal.classList.add('active');
    lockBodyScroll();
  }

  function closeSafetyModal() {
    if (safetyCharterModal) {
      safetyCharterModal.classList.remove('active');
    }
    unlockBodyScroll();
  }

  if (openSafetyCharterBtn) openSafetyCharterBtn.addEventListener('click', openSafetyModal);
  if (ethicsCodeLink) ethicsCodeLink.addEventListener('click', (e) => { e.preventDefault(); openSafetyModal(); });
  if (closeSafetyCharterBtn) closeSafetyCharterBtn.addEventListener('click', closeSafetyModal);
  if (acknowledgeCharterBtn) acknowledgeCharterBtn.addEventListener('click', closeSafetyModal);

  // ==========================================
  // 7. MULTI-STEP BOOKING MODAL & OTP FLOW
  // ==========================================
  const bookingModal = document.getElementById('bookingModalOverlay');
  const closeBookingModalBtn = document.getElementById('closeBookingModalBtn');
  const closeConfirmationBtn = document.getElementById('closeConfirmationBtn');

  // Trigger buttons
  const headerBookBtn = document.getElementById('openBookingHeaderBtn');
  const heroPrimaryBookBtn = document.getElementById('heroPrimaryBookBtn');
  const finalCtaBookBtn = document.getElementById('finalCtaBookBtn');
  const howItWorksBookBtn = document.getElementById('howItWorksBookBtn');
  const stickyBookBtn = document.getElementById('stickyBookBtn');
  const directBookBtns = document.querySelectorAll('.book-service-direct-btn');

  function openBookingModal(preselectedService = null, preselectedDuration = null) {
    if (preselectedService) {
      bookingState.therapy = preselectedService;
      const radio = document.querySelector(`input[name="modalTherapy"][value="${preselectedService}"]`);
      if (radio) radio.checked = true;
    }

    if (preselectedDuration) {
      bookingState.duration = parseInt(preselectedDuration, 10);
      const durRadio = document.querySelector(`input[name="modalDuration"][value="${preselectedDuration}"]`);
      if (durRadio) durRadio.checked = true;
    }

    updatePriceCalculation();
    goToStep(1);
    bookingModal.classList.add('active');
    lockBodyScroll();
  }

  function closeBookingModal() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
    }
    unlockBodyScroll();
  }

  if (headerBookBtn) headerBookBtn.addEventListener('click', () => openBookingModal());
  if (heroPrimaryBookBtn) heroPrimaryBookBtn.addEventListener('click', () => openBookingModal());
  if (finalCtaBookBtn) finalCtaBookBtn.addEventListener('click', () => openBookingModal());
  if (howItWorksBookBtn) howItWorksBookBtn.addEventListener('click', () => openBookingModal());
  if (stickyBookBtn) stickyBookBtn.addEventListener('click', () => openBookingModal());

  directBookBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const s = btn.getAttribute('data-service');
      openBookingModal(s);
    });
  });

  if (closeBookingModalBtn) closeBookingModalBtn.addEventListener('click', closeBookingModal);
  if (closeConfirmationBtn) closeConfirmationBtn.addEventListener('click', closeBookingModal);

  // Close modals on overlay click
  [bookingModal, serviceDetailModal, safetyCharterModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          unlockBodyScroll();
        }
      });
    }
  });

  // Global Escape key listener to close active modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingModal();
      closeServiceDetail();
      closeSafetyModal();
      if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
      }
    }
  });

  // Hero Quick Form Submission
  const heroQuickForm = document.getElementById('heroQuickForm');
  if (heroQuickForm) {
    heroQuickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = document.getElementById('quickService').value;
      const duration = document.getElementById('quickDuration').value;
      const slotTime = document.getElementById('quickSlotTime').value;
      const city = document.getElementById('quickCity').value;

      bookingState.therapy = service;
      bookingState.duration = parseInt(duration, 10);
      bookingState.city = city;
      if (slotTime !== 'immediate') {
        bookingState.timeSlot = slotTime;
      }

      openBookingModal(service, duration);
      showToast(`Selected ${serviceCatalog[service]?.title || 'Massage'}! Continuing...`);
    });
  }

  // Step Navigation Elements
  const stepIndicators = document.querySelectorAll('.step-indicator');
  const stepContents = document.querySelectorAll('.booking-step-content');
  const step1PricePreview = document.getElementById('step1PricePreview');

  function goToStep(stepNum) {
    stepContents.forEach(c => c.classList.remove('active'));
    const target = document.getElementById(`bookingStep${stepNum}`);
    if (target) target.classList.add('active');

    stepIndicators.forEach(ind => {
      const s = parseInt(ind.getAttribute('data-step'), 10);
      ind.classList.remove('active', 'completed');
      if (s === stepNum) {
        ind.classList.add('active');
      } else if (s < stepNum) {
        ind.classList.add('completed');
      }
    });
  }

  // Price Calculation Engine
  function updatePriceCalculation() {
    const selectedTherapyRadio = document.querySelector('input[name="modalTherapy"]:checked');
    const selectedDurationRadio = document.querySelector('input[name="modalDuration"]:checked');
    
    let base = 1499;
    if (selectedTherapyRadio) {
      bookingState.therapy = selectedTherapyRadio.value;
      base = parseInt(selectedTherapyRadio.getAttribute('data-price'), 10) || 1499;
      bookingState.therapyName = serviceCatalog[bookingState.therapy]?.title || 'Relaxation Massage';
    }

    let durationExtra = 0;
    if (selectedDurationRadio) {
      const dur = parseInt(selectedDurationRadio.value, 10);
      bookingState.duration = dur;
      if (dur === 90) durationExtra = 700;
      if (dur === 120) durationExtra = 1300;
    }

    let addonsTotal = 0;
    const addons = document.querySelectorAll('.addons-grid input[type="checkbox"]:checked');
    addons.forEach(a => {
      addonsTotal += parseInt(a.value, 10) || 0;
    });

    bookingState.basePrice = base;
    bookingState.addonsTotal = addonsTotal;
    const finalTotal = base + durationExtra + addonsTotal;

    if (step1PricePreview) {
      step1PricePreview.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;
    }

    return finalTotal;
  }

  // Event Listeners for Step 1 Choices
  document.querySelectorAll('input[name="modalTherapy"]').forEach(r => {
    r.addEventListener('change', updatePriceCalculation);
  });
  document.querySelectorAll('input[name="modalDuration"]').forEach(r => {
    r.addEventListener('change', updatePriceCalculation);
  });
  document.querySelectorAll('.addons-grid input[type="checkbox"]').forEach(c => {
    c.addEventListener('change', updatePriceCalculation);
  });

  // Step 1 -> Step 2
  const goToStep2Btn = document.getElementById('goToStep2Btn');
  if (goToStep2Btn) {
    goToStep2Btn.addEventListener('click', () => {
      bookingState.pressure = document.getElementById('pressurePref').value;
      bookingState.oil = document.getElementById('oilPref').value;
      goToStep(2);
    });
  }

  // Step 2 -> Step 1
  const backToStep1Btn = document.getElementById('backToStep1Btn');
  if (backToStep1Btn) {
    backToStep1Btn.addEventListener('click', () => goToStep(1));
  }

  // Step 2 -> Step 3
  const goToStep3Btn = document.getElementById('goToStep3Btn');
  if (goToStep3Btn) {
    goToStep3Btn.addEventListener('click', () => {
      const address = document.getElementById('clientAddress').value.trim();
      const city = document.getElementById('clientCity').value.trim();
      const date = document.getElementById('bookingDate').value;
      const timeSlot = document.getElementById('bookingTimeSlot').value;

      if (!address) {
        showToast('Please enter your home address to continue.', 'warning');
        document.getElementById('clientAddress').focus();
        return;
      }

      bookingState.address = address;
      bookingState.city = city || 'Downtown';
      bookingState.date = date;
      bookingState.timeSlot = timeSlot;
      bookingState.notes = document.getElementById('bookingNotes').value.trim();

      goToStep(3);
    });
  }

  // Step 3 -> Step 2
  const backToStep2Btn = document.getElementById('backToStep2Btn');
  if (backToStep2Btn) {
    backToStep2Btn.addEventListener('click', () => goToStep(2));
  }

  // ==========================================
  // 8. MANDATORY CLIENT OTP VERIFICATION LOGIC
  // ==========================================
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  const otpBox = document.getElementById('otpBox');
  const otpTargetPhone = document.getElementById('otpTargetPhone');
  const demoCodeDisplay = document.getElementById('demoCodeDisplay');
  const otpDigits = document.querySelectorAll('.otp-digit');
  const verifyAndConfirmBtn = document.getElementById('verifyAndConfirmBookingBtn');
  const resendOtpBtn = document.getElementById('resendOtpBtn');
  const otpTimerText = document.getElementById('otpTimerText');
  const otpTimerSpan = document.getElementById('otpTimer');

  let otpTimerInterval = null;

  function generateRandomOtp() {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    bookingState.generatedOtp = code;
    return code;
  }

  function startOtpCountdown(seconds = 45) {
    clearInterval(otpTimerInterval);
    let timeLeft = seconds;
    resendOtpBtn.style.display = 'none';
    otpTimerText.style.display = 'inline';
    otpTimerSpan.textContent = `${timeLeft}s`;

    otpTimerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(otpTimerInterval);
        otpTimerText.style.display = 'none';
        resendOtpBtn.style.display = 'inline';
      } else {
        otpTimerSpan.textContent = `${timeLeft}s`;
      }
    }, 1000);
  }

  if (sendOtpBtn) {
    sendOtpBtn.addEventListener('click', () => {
      const phone = document.getElementById('clientPhone').value.trim();
      const name = document.getElementById('clientFullName').value.trim();
      const email = document.getElementById('clientEmail').value.trim();

      if (!name) {
        showToast('Please enter your full name.', 'warning');
        document.getElementById('clientFullName').focus();
        return;
      }
      if (!phone || phone.length < 7) {
        showToast('Please enter a valid mobile number for SMS OTP.', 'warning');
        document.getElementById('clientPhone').focus();
        return;
      }

      bookingState.clientName = name;
      bookingState.clientEmail = email || 'client@relax.com';
      bookingState.clientPhone = phone;

      const code = generateRandomOtp();
      demoCodeDisplay.textContent = code;
      otpTargetPhone.textContent = `+91 ${phone}`;

      otpBox.style.display = 'block';
      bookingState.otpSent = true;

      // Auto fill demo code smoothly or let user type
      otpDigits.forEach(d => d.value = '');
      otpDigits[0].focus();

      startOtpCountdown(45);
      showToast(`📲 Verification OTP sent to +91 ${phone}! (Code: ${code})`, 'success');
    });
  }

  if (resendOtpBtn) {
    resendOtpBtn.addEventListener('click', () => {
      const code = generateRandomOtp();
      demoCodeDisplay.textContent = code;
      startOtpCountdown(45);
      showToast(`🔄 New OTP code sent: ${code}`, 'success');
    });
  }

  // Handle multi-digit OTP inputs
  otpDigits.forEach((digit, idx) => {
    digit.addEventListener('input', (e) => {
      const val = e.target.value;
      if (val.length === 1 && idx < otpDigits.length - 1) {
        otpDigits[idx + 1].focus();
      }
    });

    digit.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !digit.value && idx > 0) {
        otpDigits[idx - 1].focus();
      }
    });

    digit.addEventListener('paste', (e) => {
      e.preventDefault();
      const pastedData = (e.clipboardData || window.clipboardData).getData('text').trim();
      if (pastedData.length >= 4) {
        for (let i = 0; i < 4; i++) {
          if (otpDigits[i]) otpDigits[i].value = pastedData[i];
        }
        verifyAndConfirmBooking();
      }
    });
  });

  // ==========================================
  // 8.1 BACKEND INQUIRY EMAIL DISPATCH (sahilalimail17@gmail.com)
  // ==========================================
  const BACKEND_INQUIRY_EMAIL = 'sahilalimail17@gmail.com';

  async function sendBackendEmailInquiry(inquiryData) {
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${BACKEND_INQUIRY_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New 24/7 Massage Booking Inquiry: ${inquiryData.service || inquiryData.therapyName || 'Session'} [Ref: ${inquiryData.ref || 'Direct'}]`,
          _template: 'table',
          _captcha: 'false',
          'Booking Reference': inquiryData.ref || 'N/A',
          'Client Name': inquiryData.name || 'Not Provided',
          'Phone Number': inquiryData.phone || 'Not Provided',
          'Email Address': inquiryData.email || 'Not Provided',
          'Massage Therapy': inquiryData.service || inquiryData.therapyName || 'N/A',
          'Duration': `${inquiryData.duration || 60} Minutes`,
          'Appointment Date': inquiryData.date || 'Today',
          'Time Slot': inquiryData.timeSlot || 'Express 45m Dispatch',
          'Home Address': inquiryData.address || 'N/A',
          'City / Neighborhood': inquiryData.city || 'N/A',
          'Postal Code': inquiryData.zip || 'N/A',
          'Pressure Preference': inquiryData.pressure || 'Medium Balanced',
          'Aromatherapy Oil': inquiryData.oil || 'French Lavender',
          'Special Instructions': inquiryData.notes || 'None',
          'Estimated Total': inquiryData.total ? `₹${inquiryData.total}` : 'N/A',
          'Submission Time': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        })
      });
      const result = await response.json();
      console.log('Inquiry successfully delivered to backend email:', result);
      return result;
    } catch (err) {
      console.warn('Backend inquiry transmission notice:', err);
    }
  }

  // Verify OTP & Confirm Booking
  function verifyAndConfirmBooking() {
    if (!bookingState.otpSent) {
      showToast('Please click "Send OTP Code" first to verify your phone.', 'warning');
      return;
    }

    let enteredCode = '';
    otpDigits.forEach(d => enteredCode += d.value.trim());

    if (enteredCode.length !== 4) {
      showToast('Please enter the complete 4-digit OTP verification code.', 'warning');
      return;
    }

    // Check code or allow demo verification
    if (enteredCode === bookingState.generatedOtp || enteredCode === '7842') {
      bookingState.otpVerified = true;
      clearInterval(otpTimerInterval);

      // Generate Reference
      const ref = `RLX-${Math.floor(10000 + Math.random() * 90000)}`;
      bookingState.refId = ref;

      // Populate Step 4 Confirmation Card
      document.getElementById('confirmRef').textContent = ref;
      document.getElementById('confirmName').textContent = bookingState.clientName;
      document.getElementById('confirmService').textContent = `${bookingState.therapyName} (${bookingState.duration} Mins)`;
      document.getElementById('confirmSlot').textContent = `${bookingState.date || 'Today'} • ${bookingState.timeSlot === 'now' ? 'Express 45m Dispatch' : bookingState.timeSlot}`;
      document.getElementById('confirmAddress').textContent = `${bookingState.address}, ${bookingState.city}`;
      
      const totalPrice = updatePriceCalculation();
      document.getElementById('confirmTotal').textContent = `₹${totalPrice.toLocaleString('en-IN')} (All-Inclusive • Zero Travel Surcharge)`;

      // Dispatch inquiry to sahilalimail17@gmail.com
      sendBackendEmailInquiry({
        ref: ref,
        name: bookingState.clientName,
        phone: bookingState.clientPhone,
        email: bookingState.clientEmail,
        service: bookingState.therapyName,
        duration: bookingState.duration,
        date: bookingState.date,
        timeSlot: bookingState.timeSlot,
        address: bookingState.address,
        city: bookingState.city,
        zip: document.getElementById('clientZip') ? document.getElementById('clientZip').value : '',
        pressure: bookingState.pressure,
        oil: bookingState.oil,
        notes: bookingState.notes,
        total: totalPrice
      });

      // WhatsApp notification link for client
      const waMsg = encodeURIComponent(`Hello RELAX Wellness Concierge! My booking is confirmed. Ref: ${ref} for ${bookingState.therapyName} (${bookingState.duration} mins). Looking forward to the session!`);
      const waLink = document.getElementById('confirmWaChatLink');
      if (waLink) {
        waLink.href = `https://wa.me/917090120211?text=${waMsg}`;
      }

      goToStep(4);
      showToast(`🎉 Booking Verified & Confirmed! Reference: ${ref}`, 'success');
    } else {
      showToast('Incorrect OTP code. Please check and try again.', 'error');
    }
  }

  if (verifyAndConfirmBtn) {
    verifyAndConfirmBtn.addEventListener('click', verifyAndConfirmBooking);
  }

  // ==========================================
  // 9. SOOTHING SPA SOUNDSCAPE GENERATOR (WEB AUDIO API)
  // ==========================================
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  let audioCtx = null;
  let isPlayingAudio = false;
  let ambientOscillators = [];
  let chimeInterval = null;

  function initAmbientSpaAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      // Master Gain for softness
      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);

      // Harmonic Warm Drones (Calm Frequencies: 174Hz, 285Hz, 528Hz Solfeggio tones)
      const droneFreqs = [174, 261.63, 392, 528];
      ambientOscillators = droneFreqs.map(freq => {
        const osc = audioCtx.createOscillator();
        const oscGain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        oscGain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        return osc;
      });

      // Gentle random crystal chime tones
      const chimePentatonic = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
      chimeInterval = setInterval(() => {
        if (!isPlayingAudio || !audioCtx) return;
        const chimeOsc = audioCtx.createOscillator();
        const chimeGain = audioCtx.createGain();
        const randomFreq = chimePentatonic[Math.floor(Math.random() * chimePentatonic.length)];

        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(randomFreq, audioCtx.currentTime);

        chimeGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.03, audioCtx.currentTime + 0.1);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.5);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(audioCtx.destination);

        chimeOsc.start(audioCtx.currentTime);
        chimeOsc.stop(audioCtx.currentTime + 3.6);
      }, 3500);

      isPlayingAudio = true;
      soundToggleBtn.classList.add('playing');
      soundIcon.className = 'fa-solid fa-volume-high';
      showToast('🎶 Soothing Spa Soundscape Enabled', 'info');
    } catch (e) {
      console.warn('Web Audio Ambient error:', e);
    }
  }

  function stopAmbientSpaAudio() {
    if (audioCtx) {
      ambientOscillators.forEach(osc => {
        try { osc.stop(); } catch (err) {}
      });
      ambientOscillators = [];
      clearInterval(chimeInterval);
      audioCtx.close();
      audioCtx = null;
    }
    isPlayingAudio = false;
    soundToggleBtn.classList.remove('playing');
    soundIcon.className = 'fa-solid fa-volume-xmark';
    showToast('Spa Audio Paused', 'info');
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      if (!isPlayingAudio) {
        initAmbientSpaAudio();
      } else {
        stopAmbientSpaAudio();
      }
    });
  }

  // ==========================================
  // 10. TOAST NOTIFICATION UTILITY
  // ==========================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let icon = '<i class="fa-solid fa-circle-info gold-text"></i>';
    if (type === 'success') icon = '<i class="fa-solid fa-circle-check" style="color: #4ade80;"></i>';
    if (type === 'warning') icon = '<i class="fa-solid fa-triangle-exclamation" style="color: #f59e0b;"></i>';
    if (type === 'error') icon = '<i class="fa-solid fa-circle-xmark" style="color: #ef4444;"></i>';

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-100%)';
      toast.style.transition = 'all 0.35s ease';
      setTimeout(() => toast.remove(), 350);
    }, 4500);
  }

  // Initial welcome toast
  setTimeout(() => {
    showToast('✨ Welcome to RELAX – Verified 24/7 in-home massage for women.', 'info');
  }, 1200);
});
