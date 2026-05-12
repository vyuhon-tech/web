import { useState, useEffect, useRef } from "react";

/* ─── GOOGLE FONTS injected once ─── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&display=swap";
document.head.appendChild(fontLink);

/* ─── GLOBAL STYLES ─── */
const globalCSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; -webkit-font-smoothing: antialiased; }

  :root {
    --ink: #0D0D17; --ink-soft: #1C1C2E;
    --white: #FFFFFF; --off-white: #F7F7FC;
    --violet-1: #9775FF; --violet-2: #6675FF; --violet-mid: #7B6EFF;
    --teal: #29DCA4; --blue: #3B75FD;
    --grad-brand: linear-gradient(135deg, #9775FF 0%, #6675FF 55%, #3B75FD 100%);
    --grad-glow: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(151,117,255,0.18) 0%, transparent 70%);
    --text-secondary: #5A5A7A; --text-muted: #9898B8;
    --text-on-dark-2: rgba(255,255,255,0.65); --text-on-dark-3: rgba(255,255,255,0.35);
    --border-light: rgba(13,13,23,0.08); --border-brand: rgba(151,117,255,0.3);
    --font-body: 'Plus Jakarta Sans', sans-serif; --font-serif: 'Instrument Serif', serif;
    --radius-lg: 20px; --radius-xl: 32px; --radius-sm: 6px;
  }

  @keyframes nav-fade { from { opacity:0 } to { opacity:1 } }
  @keyframes logo-slide { from { opacity:0; transform:translateX(-16px) } to { opacity:1; transform:translateX(0) } }
  @keyframes nav-drop { from { opacity:0; transform:translateY(-12px) } to { opacity:1; transform:translateY(0) } }
  @keyframes bob {
    0%,100%{ transform:translateX(-50%) translateY(0) }
    50%{ transform:translateX(-50%) translateY(6px) }
  }
  @keyframes livepulse {
    0%,100%{ opacity:1; transform:scale(1) }
    50%{ opacity:0.4; transform:scale(0.75) }
  }
  @keyframes ticker-scroll {
    from { transform: translateX(0) }
    to   { transform: translateX(-50%) }
  }

  .reveal { opacity:0; transform:translateY(28px); transition: opacity .65s cubic-bezier(.16,1,.3,1), transform .65s cubic-bezier(.16,1,.3,1); }
  .reveal.in { opacity:1; transform:none; }
  .d1 { transition-delay:.08s } .d2 { transition-delay:.16s }
  .d3 { transition-delay:.24s } .d4 { transition-delay:.32s }

  /* service cell top-bar on hover */
  .svc-cell::before {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
    background: var(--grad-brand);
    transform:scaleX(0); transform-origin:left;
    transition:transform .35s cubic-bezier(.16,1,.3,1);
  }
  .svc-cell:hover::before { transform:scaleX(1); }
  .svc-cell:hover { background: rgba(255,255,255,.05); }
  .svc-cell:hover .svc-icon { border-color:rgba(151,117,255,.4)!important; background:rgba(151,117,255,.1)!important; }
  .svc-cell:hover .svc-arrow { opacity:1!important; transform:none!important; }

  /* feat-card hover */
  .feat-card:hover { border-color:var(--border-brand)!important; transform:translateY(-3px); box-shadow:0 12px 40px rgba(151,117,255,.08); }
  .feat-card:hover .feat-icon { background:rgba(151,117,255,.15)!important; }

  /* pill hover */
  .pill:hover { border-color:var(--violet-mid)!important; color:var(--violet-mid)!important; background:rgba(151,117,255,.05)!important; }

  /* proc-duration line */
  .proc-duration::before {
    content:''; display:block; width:16px; height:2px;
    background: var(--grad-brand); border-radius:2px;
  }

  /* label line */
  .label::before {
    content:''; display:block; width:20px; height:2px;
    border-radius:2px;
  }

  /* soc-btn hover */
  .soc-btn:hover { border-color:var(--violet-1)!important; color:var(--violet-1)!important; background:rgba(151,117,255,.1)!important; }

  /* btn-nav hover */
  .btn-nav:hover { background:var(--ink-soft)!important; transform:translateY(-1px); }

  /* btn-hero hover */
  .btn-hero-primary:hover { transform:translateY(-2px); box-shadow:0 16px 48px rgba(151,117,255,.45)!important; }
  .btn-hero-ghost:hover { background:rgba(255,255,255,.10)!important; }

  /* cta btn hover */
  .btn-cta-primary:hover { transform:translateY(-2px); box-shadow:0 16px 48px rgba(151,117,255,.45)!important; }
  .btn-cta-ghost:hover { border-color:rgba(255,255,255,.3)!important; background:rgba(255,255,255,.08)!important; }

  /* ── MOBILE ── */
  @media (max-width: 768px) {
    .header-inner { padding: 0 20px !important; }
    .nav-links { display: none !important; }
    .btn-nav { padding: 9px 16px !important; font-size: 12px !important; }

    .hero-section { padding: 100px 20px 72px !important; }
    .hero-h1 { font-size: clamp(42px, 12vw, 72px) !important; }
    .hero-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 32px !important; margin-top: 40px !important; }
    .hero-actions { align-items: flex-start !important; }
    .hero-btns { flex-direction: column !important; gap: 12px !important; }
    .btn-hero { width: 100% !important; justify-content: center !important; }

    .about-section { grid-template-columns: 1fr !important; gap: 48px !important; padding: 72px 20px !important; }
    .about-right { padding-top: 0 !important; }

    .services-section { padding: 72px 20px !important; }
    .svc-top { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
    .svc-grid { grid-template-columns: 1fr !important; }

    .ticker-section { padding: 0 !important; }

    .process-section { padding: 72px 20px !important; }
    .proc-steps { grid-template-columns: 1fr !important; border-top: none !important; }
    .proc-step { border-right: none !important; border-top: 1px solid var(--border-light); padding: 32px 0 !important; }
    .proc-step:not(:first-child) { padding-left: 0 !important; }

    .cta-section { padding: 96px 20px !important; }
    .cta-h2 { font-size: clamp(36px, 10vw, 64px) !important; }
    .cta-btns { flex-direction: column !important; align-items: center !important; }
    .btn-cta-primary, .btn-cta-ghost { width: 100% !important; max-width: 320px !important; justify-content: center !important; }
    .cta-trust { gap: 16px !important; }

    .footer-simple { flex-direction: column !important; align-items: flex-start !important; gap: 28px !important; padding: 32px 20px !important; }
    .footer-simple-right { align-items: flex-start !important; }
  }
  @media (max-width: 480px) {
    .section-title { font-size: clamp(28px, 8vw, 42px) !important; }
  }
`;

/* ─── Inject global CSS ─── */
const styleEl = document.createElement("style");
styleEl.textContent = globalCSS;
document.head.appendChild(styleEl);

/* ─── LOGO SVG (full lockup) ─── */
const LogoFull = ({ style }) => (
  <svg width="128" height="34" viewBox="0 0 128 34" fill="none" style={style}>
    <path d="M19.0266 1.84875C19.6266 2.1899 19.9464 2.55776 20.1733 3.21678C20.3003 3.75109 20.3285 4.24674 20.3241 4.79185C20.3244 4.89617 20.3246 5.00049 20.3248 5.10796C20.3252 5.45552 20.3238 5.80304 20.3224 6.1506C20.3223 6.40052 20.3223 6.65045 20.3225 6.90038C20.3226 7.57754 20.321 8.25468 20.3192 8.93183C20.3176 9.63999 20.3174 10.3482 20.3171 11.0563C20.3163 12.3967 20.3142 13.7371 20.3115 15.0776C20.3086 16.6038 20.3072 18.1301 20.3059 19.6564C20.3035 22.314 20.2999 24.9717 20.2953 27.6293C20.2944 28.1673 19.665 28.4177 19.3534 27.9791C18.5319 26.9187 17.5483 26.4379 16.2412 26.1984C15.0509 26.0731 13.9818 26.5046 13.0398 27.2108C11.9907 28.1551 11.3106 29.3423 10.6463 30.57C10.1483 31.4749 9.54991 32.2753 8.53038 32.6023C7.5772 32.7102 6.69161 32.6968 5.91653 32.0796C4.91719 30.9803 5.05012 29.6991 5.10391 28.2918C5.30256 25.5392 6.51496 22.8591 8.00761 20.5786C7.63685 20.7022 7.29584 20.8575 6.94394 21.0263C6.51662 21.2306 6.08613 21.4278 5.65514 21.6242C5.54901 21.6729 5.44287 21.7215 5.33352 21.7717C4.0954 22.2627 2.59883 22.1782 1.38313 21.6681C0.78579 21.323 0.45644 20.8545 0.117046 20.2682C-0.0816878 19.4336 -0.0431583 18.7922 0.355272 18.0173C0.801969 17.3261 1.42236 16.7681 2.00456 16.1914C2.1537 16.0418 2.30272 15.892 2.45165 15.7422C2.8547 15.3373 3.25937 14.9341 3.66441 14.5312C4.08912 14.1083 4.5125 13.6841 4.93607 13.26C5.64752 12.5482 6.36003 11.8375 7.07317 11.1274C7.89621 10.3078 8.71761 9.48664 9.53815 8.66457C10.3293 7.87206 11.1215 7.08066 11.9142 6.28977C12.2507 5.95398 12.5869 5.61781 12.9228 5.28133C13.3188 4.88469 13.7157 4.48905 14.1135 4.09413C14.2588 3.94954 14.4038 3.80462 14.5484 3.65934C17.1978 0.999423 17.1978 0.999423 19.0266 1.84875Z" fill="url(#g1)" />
    <path d="M17.7133 22.2283C18.6599 22.9499 19.6334 23.7658 20.2965 24.7605C20.3189 25.0928 20.3269 25.4103 20.322 25.7422C20.3217 25.8374 20.3213 25.9326 20.3209 26.0307C20.3195 26.3343 20.3162 26.6378 20.3128 26.9415C20.3115 27.1474 20.3103 27.3534 20.3093 27.5594C20.3091 27.5827 20.309 27.6059 20.3089 27.6291C20.3056 28.1711 19.6711 28.4207 19.3572 27.9788C18.5357 26.9184 17.5521 26.4376 16.245 26.1981C15.0547 26.0728 13.9856 26.5043 13.0436 27.2105C11.9945 28.1548 11.3144 29.3421 10.6501 30.5698C10.1521 31.4746 9.55371 32.2751 8.53418 32.6021C7.581 32.7099 6.69541 32.6965 5.92033 32.0793C4.92099 30.98 5.05392 29.6989 5.10771 28.2915C5.28504 25.8344 6.30746 23.3885 7.52131 21.2727C7.57517 21.1779 7.62903 21.083 7.68452 20.9854C8.06951 20.3457 8.06951 20.3457 8.36647 20.2281C11.6582 19.7663 14.9971 20.2472 17.7133 22.2283Z" fill="#29DCA4" />
    <path d="M20.2882 11.9528C20.2882 16.1794 20.2882 20.406 20.2882 24.7607C19.6347 24.1072 19.6347 24.1072 19.3779 23.832C17.5163 21.8672 14.9905 20.411 12.2407 20.2753C11.6337 20.2602 11.0277 20.271 10.4209 20.2845C10.21 20.2871 9.99919 20.2895 9.78835 20.2916C9.2803 20.2973 8.77241 20.3062 8.26445 20.3171C8.87659 19.4879 9.51826 18.7159 10.2248 17.9647C10.2895 17.8955 10.3542 17.8264 10.4209 17.7552C12.7287 15.3081 16.6901 11.9528 20.2882 11.9528Z" fill="#3B75FD" />
    <path d="M40.7986 26L34.0391 7.63467H37.5081L43.0432 23.6533H42.482L48.0172 7.63467H51.3076L44.5737 26H40.7986ZM53.6605 31.229L57.0274 23.6788L57.6141 22.7095L61.2872 12.9912H64.7052L56.9254 31.229H53.6605ZM56.5428 25.8725L51.2628 12.9912H54.7573L59.1701 24.6736L56.5428 25.8725ZM70.5789 26.2551C69.6776 26.2551 68.8954 26.068 68.2322 25.6939C67.586 25.3028 67.0843 24.7756 66.7272 24.1125C66.3871 23.4493 66.2171 22.701 66.2171 21.8678V12.9912H69.431V21.2046C69.431 22.0038 69.6266 22.6075 70.0177 23.0156C70.4258 23.4238 70.9955 23.6278 71.7267 23.6278C72.3899 23.6278 72.968 23.4748 73.4612 23.1687C73.9713 22.8626 74.371 22.4375 74.66 21.8933C74.9661 21.3321 75.1192 20.703 75.1192 20.0058L75.4508 23.1177C75.0256 24.0699 74.388 24.8352 73.5377 25.4133C72.7045 25.9745 71.7182 26.2551 70.5789 26.2551ZM75.2212 26V22.9391H75.1192V12.9912H78.3586V26H75.2212ZM81.7643 26V7.63467H84.9782V26H81.7643ZM90.8959 26V17.7866C90.8959 16.9874 90.6918 16.3837 90.2837 15.9756C89.8756 15.5675 89.2804 15.3634 88.4982 15.3634C87.818 15.3634 87.2058 15.5165 86.6617 15.8225C86.1345 16.1286 85.7179 16.5538 85.4118 17.0979C85.1227 17.6421 84.9782 18.2713 84.9782 18.9855L84.6466 15.8736C85.0887 14.9213 85.7349 14.1646 86.5852 13.6034C87.4354 13.0252 88.4557 12.7361 89.646 12.7361C91.0575 12.7361 92.1543 13.1358 92.9365 13.935C93.7357 14.7342 94.1353 15.797 94.1353 17.1234V26H90.8959ZM103.3 26.2551C101.923 26.2551 100.707 25.966 99.6527 25.3878C98.6154 24.8097 97.8077 24.0104 97.2295 22.9901C96.6513 21.9528 96.3623 20.771 96.3623 19.4446C96.3623 18.1182 96.6513 16.9534 97.2295 15.9501C97.8077 14.9468 98.6154 14.1646 99.6527 13.6034C100.707 13.0252 101.923 12.7361 103.3 12.7361C104.695 12.7361 105.911 13.0252 106.948 13.6034C107.985 14.1646 108.793 14.9468 109.371 15.9501C109.949 16.9534 110.238 18.1182 110.238 19.4446C110.238 20.771 109.941 21.9528 109.346 22.9901C108.767 24.0104 107.96 24.8097 106.922 25.3878C105.885 25.966 104.678 26.2551 103.3 26.2551ZM103.3 23.6788C103.98 23.6788 104.593 23.5088 105.137 23.1687C105.681 22.8116 106.106 22.3184 106.412 21.6892C106.718 21.0431 106.871 20.2863 106.871 19.4191C106.871 18.1437 106.531 17.1404 105.851 16.4092C105.188 15.678 104.338 15.3124 103.3 15.3124C102.263 15.3124 101.404 15.678 100.724 16.4092C100.044 17.1404 99.7037 18.1437 99.7037 19.4191C99.7037 20.2863 99.8568 21.0431 100.163 21.6892C100.486 22.3184 100.911 22.8116 101.438 23.1687C101.982 23.5088 102.603 23.6788 103.3 23.6788ZM112.602 26V12.9912H115.74V16.0521H115.816V26H112.602ZM121.734 26V17.7866C121.734 16.9874 121.53 16.3837 121.122 15.9756C120.714 15.5675 120.118 15.3634 119.336 15.3634C118.656 15.3634 118.044 15.5165 117.5 15.8225C116.973 16.1286 116.556 16.5538 116.25 17.0979C115.961 17.6421 115.816 18.2713 115.816 18.9855L115.485 15.8736C115.927 14.9213 116.573 14.1646 117.423 13.6034C118.273 13.0252 119.294 12.7361 120.484 12.7361C121.896 12.7361 122.992 13.1358 123.775 13.935C124.574 14.7342 124.973 15.797 124.973 17.1234V26H121.734Z" fill="#0D0D17" />
    <defs>
      <linearGradient id="g1" x1="20.3249" y1="-0.8557" x2="-1.0163" y2="21.0783" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9775FF" /><stop offset="1" stopColor="#6675FF" />
      </linearGradient>
    </defs>
  </svg>
);

/* ─── WHITE WORDMARK (footer) ─── */
const LogoWhite = () => (
  <svg width="100" height="26" viewBox="34 7 94 20" fill="none">
    <path d="M40.7986 26L34.0391 7.63467H37.5081L43.0432 23.6533H42.482L48.0172 7.63467H51.3076L44.5737 26H40.7986ZM53.6605 31.229L57.0274 23.6788L57.6141 22.7095L61.2872 12.9912H64.7052L56.9254 31.229H53.6605ZM56.5428 25.8725L51.2628 12.9912H54.7573L59.1701 24.6736L56.5428 25.8725ZM70.5789 26.2551C69.6776 26.2551 68.8954 26.068 68.2322 25.6939C67.586 25.3028 67.0843 24.7756 66.7272 24.1125C66.3871 23.4493 66.2171 22.701 66.2171 21.8678V12.9912H69.431V21.2046C69.431 22.0038 69.6266 22.6075 70.0177 23.0156C70.4258 23.4238 70.9955 23.6278 71.7267 23.6278C72.3899 23.6278 72.968 23.4748 73.4612 23.1687C73.9713 22.8626 74.371 22.4375 74.66 21.8933C74.9661 21.3321 75.1192 20.703 75.1192 20.0058L75.4508 23.1177C75.0256 24.0699 74.388 24.8352 73.5377 25.4133C72.7045 25.9745 71.7182 26.2551 70.5789 26.2551ZM75.2212 26V22.9391H75.1192V12.9912H78.3586V26H75.2212ZM81.7643 26V7.63467H84.9782V26H81.7643ZM90.8959 26V17.7866C90.8959 16.9874 90.6918 16.3837 90.2837 15.9756C89.8756 15.5675 89.2804 15.3634 88.4982 15.3634C87.818 15.3634 87.2058 15.5165 86.6617 15.8225C86.1345 16.1286 85.7179 16.5538 85.4118 17.0979C85.1227 17.6421 84.9782 18.2713 84.9782 18.9855L84.6466 15.8736C85.0887 14.9213 85.7349 14.1646 86.5852 13.6034C87.4354 13.0252 88.4557 12.7361 89.646 12.7361C91.0575 12.7361 92.1543 13.1358 92.9365 13.935C93.7357 14.7342 94.1353 15.797 94.1353 17.1234V26H90.8959ZM103.3 26.2551C101.923 26.2551 100.707 25.966 99.6527 25.3878C98.6154 24.8097 97.8077 24.0104 97.2295 22.9901C96.6513 21.9528 96.3623 20.771 96.3623 19.4446C96.3623 18.1182 96.6513 16.9534 97.2295 15.9501C97.8077 14.9468 98.6154 14.1646 99.6527 13.6034C100.707 13.0252 101.923 12.7361 103.3 12.7361C104.695 12.7361 105.911 13.0252 106.948 13.6034C107.985 14.1646 108.793 14.9468 109.371 15.9501C109.949 16.9534 110.238 18.1182 110.238 19.4446C110.238 20.771 109.941 21.9528 109.346 22.9901C108.767 24.0104 107.96 24.8097 106.922 25.3878C105.885 25.966 104.678 26.2551 103.3 26.2551ZM103.3 23.6788C103.98 23.6788 104.593 23.5088 105.137 23.1687C105.681 22.8116 106.106 22.3184 106.412 21.6892C106.718 21.0431 106.871 20.2863 106.871 19.4191C106.871 18.1437 106.531 17.1404 105.851 16.4092C105.188 15.678 104.338 15.3124 103.3 15.3124C102.263 15.3124 101.404 15.678 100.724 16.4092C100.044 17.1404 99.7037 18.1437 99.7037 19.4191C99.7037 20.2863 99.8568 21.0431 100.163 21.6892C100.486 22.3184 100.911 22.8116 101.438 23.1687C101.982 23.5088 102.603 23.6788 103.3 23.6788ZM112.602 26V12.9912H115.74V16.0521H115.816V26H112.602ZM121.734 26V17.7866C121.734 16.9874 121.53 16.3837 121.122 15.9756C120.714 15.5675 120.118 15.3634 119.336 15.3634C118.656 15.3634 118.044 15.5165 117.5 15.8225C116.973 16.1286 116.556 16.5538 116.25 17.0979C115.961 17.6421 115.816 18.2713 115.816 18.9855L115.485 15.8736C115.927 14.9213 116.573 14.1646 117.423 13.6034C118.273 13.0252 119.294 12.7361 120.484 12.7361C121.896 12.7361 122.992 13.1358 123.775 13.935C124.574 14.7342 124.973 15.797 124.973 17.1234V26H121.734Z" fill="white" />
  </svg>
);

/* ─── ARROW SVG ─── */
const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── useReveal hook ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── HERO CANVAS ─── */
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const COLORS = ["rgba(151,117,255,", "rgba(102,117,255,", "rgba(59,117,253,", "rgba(41,220,164,"];
    let W, H, nodes = [], raf;
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      nodes = Array.from({ length: 60 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.5,
        col: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = nodes[i].col + (1 - d / 130) * 0.18 + ")"; ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
      nodes.forEach((n) => { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fillStyle = n.col + "0.5)"; ctx.fill(); });
      raf = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", resize);
    resize(); draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, zIndex: 1, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════ */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const s = {
    header: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 52px", height: 72,
      background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.75)",
      backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(13,13,23,0.08)",
      transition: "background .3s", animation: "nav-fade .6s ease both",
      fontFamily: "var(--font-body)",
    },
    nav: { display: "flex", alignItems: "center", gap: 36, animation: "nav-drop .7s cubic-bezier(.16,1,.3,1) .2s both" },
    navA: { fontSize: 14, fontWeight: 500, color: "var(--text-secondary)", textDecoration: "none", transition: "color .2s" },
    btnNav: {
      display: "flex", alignItems: "center", gap: 6,
      background: "var(--ink)", color: "#fff", border: "none",
      padding: "10px 22px", borderRadius: 100, fontSize: 13, fontWeight: 600,
      fontFamily: "var(--font-body)", textDecoration: "none", cursor: "pointer",
      transition: "background .2s, transform .15s",
    },
  };

  return (
    <header style={s.header} className="header-inner">
      <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0, animation: "logo-slide .7s cubic-bezier(.16,1,.3,1) .1s both" }}>
        <LogoFull />
      </a>
      <nav style={s.nav} className="nav-links">
        <a href="#services" style={s.navA}>Services</a>
        <a href="#process" style={s.navA}>Process</a>
        <a href="#about" style={s.navA}>Studio</a>
        <a href="mailto:vyuhontech@gmail.com" style={s.btnNav} className="btn-nav">
          Start a project <Arrow />
        </a>
      </nav>
      {/* mobile CTA only */}
      <a href="mailto:vyuhontech@gmail.com" style={{ ...s.btnNav, display: "none" }} className="btn-nav" id="mobile-cta">
        Start a project
      </a>
    </header>
  );
}

/* ═══════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" className="hero-section" style={{
      minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "flex-end",
      padding: "120px 52px 96px", position: "relative", overflow: "hidden",
      background: "var(--ink)", fontFamily: "var(--font-body)",
    }}>
      {/* glow */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "var(--grad-glow)" }} />
      {/* grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(rgba(151,117,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(151,117,255,.04) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />
      <HeroCanvas />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="reveal" style={{ marginBottom: 32 }}>
          <span className="label" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--teal)" }}>
            <span style={{ display: "block", width: 20, height: 2, background: "var(--teal)", borderRadius: 2 }} />
            AI-First Product Studio
          </span>
        </div>

        <h1 className="reveal d1 hero-h1" style={{
          fontSize: "clamp(56px, 9vw, 128px)", fontWeight: 800, lineHeight: 0.92,
          letterSpacing: "-.04em", color: "#fff", fontFamily: "var(--font-body)", marginBottom: 0,
        }}>
          We design, build<br />& launch{" "}
          <em style={{
            fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
            background: "var(--grad-brand)", WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>AI-native</em>
          <br />products.
        </h1>

        <div className="hero-bottom" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 64, gap: 48 }}>
          <p className="reveal d2" style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text-on-dark-2)", maxWidth: 400 }}>
            We help startups <strong style={{ color: "#fff", fontWeight: 600 }}>design, build, and launch</strong> AI-native products end-to-end — from product strategy to engineering and growth. In 12 weeks, not 12 months.
          </p>
          <div className="reveal d3 hero-actions" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 24 }}>
            <div className="hero-btns" style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <a href="mailto:vyuhontech@gmail.com" className="btn-hero-primary" style={{
                display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px",
                borderRadius: 100, fontSize: 15, fontWeight: 700, fontFamily: "var(--font-body)",
                textDecoration: "none", color: "#fff", background: "var(--grad-brand)",
                boxShadow: "0 8px 32px rgba(151,117,255,.35)", transition: "transform .15s, box-shadow .2s",
              }}>
                Start a project <Arrow />
              </a>
              <a href="#about" className="btn-hero-ghost" style={{
                display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px",
                borderRadius: 100, fontSize: 15, fontWeight: 700, fontFamily: "var(--font-body)",
                textDecoration: "none", color: "#fff", background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)", transition: "background .2s",
              }}>
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        color: "var(--text-on-dark-3)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase",
        animation: "bob 2.4s ease-in-out infinite",
      }}>
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(255,255,255,.2), transparent)" }} />
        <span>scroll</span>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════ */
function About() {
  const pills = ["Early-stage founders", "SaaS startups", "Funded teams", "Series A & beyond", "Enterprise AI"];
  const features = [
    { icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />, grad: "url(#gi1)", title: "AI-native from day one", desc: "Intelligence isn't added on — it's architected in. Every product we build compounds in value as it learns from real usage.", id: "gi1", c1: "#9775FF", c2: "#3B75FD" },
    { icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>, grad: "url(#gi2)", title: "First feature in 7 days", desc: "You'll have something real in users' hands within the first week. Not a deck, not a wireframe — a working product.", id: "gi2", c1: "#9775FF", c2: "#29DCA4" },
    { icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>, grad: "url(#gi3)", title: "Embedded team, not a vendor", desc: "We work inside your product, your roadmap, your growth loop. Strategy to engineering to growth — end to end.", id: "gi3", c1: "#29DCA4", c2: "#3B75FD" },
  ];

  return (
    <section id="about" className="about-section" style={{
      padding: "128px 52px", display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: 96, alignItems: "start", background: "#fff", fontFamily: "var(--font-body)",
    }}>
      <div>
        <div className="label reveal" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--violet-mid)", marginBottom: 28 }}>
          <span style={{ display: "block", width: 20, height: 2, background: "var(--grad-brand)", borderRadius: 2 }} />
          About the studio
        </div>
        <h2 className="section-title reveal d1" style={{ fontSize: "clamp(38px,4.5vw,60px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--ink)", marginBottom: 28 }}>
          We build what<br />agencies can't — in<br />
          <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, background: "var(--grad-brand)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>weeks, not quarters.</em>
        </h2>
        <p className="reveal d2" style={{ fontSize: 17, lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: 40 }}>
          Vyuhon is the technical co-founder you never had. We don't bolt AI onto your product as an afterthought — we architect it into the foundation, so it compounds in value over time.
        </p>
        <div className="reveal d3" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {pills.map(p => (
            <span key={p} className="pill" style={{ padding: "8px 18px", border: "1.5px solid var(--border-light)", borderRadius: 100, fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", cursor: "default", transition: "border-color .2s, color .2s, background .2s" }}>{p}</span>
          ))}
        </div>
      </div>

      <div className="about-right" style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 80 }}>
        {features.map((f, i) => (
          <div key={f.id} className={`feat-card reveal${i > 0 ? " d" + i : ""}`} style={{
            display: "flex", gap: 20, alignItems: "flex-start", padding: 28,
            border: "1.5px solid var(--border-light)", borderRadius: "var(--radius-lg)",
            transition: "border-color .3s, transform .3s, box-shadow .3s", background: "#fff",
          }}>
            <div className="feat-icon" style={{ width: 44, height: 44, flexShrink: 0, borderRadius: "var(--radius-sm)", background: "rgba(151,117,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .3s" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={`url(#${f.id})`} strokeWidth="1.8" strokeLinecap="round" width="22" height="22">
                <defs><linearGradient id={f.id} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor={f.c1} /><stop offset="1" stopColor={f.c2} /></linearGradient></defs>
                {f.icon}
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: "var(--ink)" }}>{f.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text-secondary)" }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SERVICES
═══════════════════════════════════════════════ */
const services = [
  { num: "01", color: "#9775FF", title: "AI Integration", desc: "LLM orchestration, RAG pipelines, fine-tuning, and agentic systems — built to scale from day one.", icon: <><path d="M12 2a10 10 0 1 0 10 10" /><circle cx="12" cy="12" r="3" /><path d="M12 9V5M12 15v4M9 12H5M15 12h4" /></> },
  { num: "02", color: "#6675FF", title: "Product Strategy", desc: "Product definition, roadmap design, user research, and go-to-market positioning for AI-native products.", icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></> },
  { num: "03", color: "#3B75FD", title: "Full-Stack Engineering", desc: "Modern web and mobile. React, Next.js, Node, Python, cloud-native. Code that ships and scales.", icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></> },
  { num: "04", color: "#29DCA4", title: "Design Systems", desc: "Branded design languages and component libraries that scale — from first prototype to enterprise product.", icon: <><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M4.93 4.93a10 10 0 0 0 0 14.14" /></> },
  { num: "05", color: "#9775FF", title: "Growth Engineering", desc: "Activation loops, retention mechanics, analytics infrastructure, and experimentation systems.", icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /> },
  { num: "06", color: "#6675FF", title: "Data & Analytics", desc: "Data pipelines, event tracking, ML infrastructure. Make your product smarter over time.", icon: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></> },
];

function Services() {
  return (
    <section id="services" className="services-section" style={{ padding: "128px 52px", background: "var(--ink)", position: "relative", overflow: "hidden", fontFamily: "var(--font-body)" }}>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", top: -200, right: -200, zIndex: 0, background: "radial-gradient(circle, rgba(151,117,255,.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", bottom: -100, left: "10%", zIndex: 0, background: "radial-gradient(circle, rgba(41,220,164,.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="svc-top" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 64, gap: 40 }}>
          <div>
            <div className="label reveal" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(151,117,255,.8)", marginBottom: 20 }}>
              <span style={{ display: "block", width: 20, height: 2, background: "var(--grad-brand)", borderRadius: 2 }} />
              What we do
            </div>
            <h2 className="reveal d1" style={{ fontSize: "clamp(38px,4.5vw,60px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff", maxWidth: 500 }}>
              Everything you need<br />to ship{" "}
              <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, background: "var(--grad-brand)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>and scale.</em>
            </h2>
          </div>
        </div>

        <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, border: "2px solid rgba(255,255,255,.04)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
          {services.map((svc, i) => (
            <div key={svc.num} className={`svc-cell reveal${i % 3 !== 0 ? " d" + (i % 3) : ""}`} style={{ padding: "44px 36px", background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.04)", position: "relative", overflow: "hidden", transition: "background .3s" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: "var(--text-on-dark-3)", marginBottom: 24 }}>{svc.num}</div>
              <div className="svc-icon" style={{ width: 46, height: 46, borderRadius: "var(--radius-sm)", border: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, transition: "border-color .3s, background .3s" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={svc.color} strokeWidth="1.6" strokeLinecap="round" width="22" height="22">{svc.icon}</svg>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: "#fff" }}>{svc.title}</h3>
              <p style={{ fontSize: 14, color: "var(--text-on-dark-2)", lineHeight: 1.65 }}>{svc.desc}</p>
              <div className="svc-arrow" style={{ position: "absolute", bottom: 28, right: 28, width: 32, height: 32, borderRadius: "50%", background: "rgba(151,117,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transform: "translateX(-8px) translateY(4px)", transition: "opacity .25s, transform .25s", color: "var(--violet-1)" }}>
                <Arrow />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TICKER
═══════════════════════════════════════════════ */
const tickerItems = ["AI Integration", "Product Strategy", "Full-Stack Engineering", "Design Systems", "Growth Engineering", "Data & ML", "12 Weeks to Launch", "Fintech · Healthtech · SaaS"];

function Ticker() {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div className="ticker-section" style={{ overflow: "hidden", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)", background: "#fff" }}>
      <div style={{ display: "flex", padding: "22px 0" }}>
        <div style={{ display: "flex", width: "max-content", animation: "ticker-scroll 24s linear infinite" }}>
          {doubled.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, padding: "0 28px", whiteSpace: "nowrap", fontSize: 13, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
              <span style={{ display: "block", width: 5, height: 5, borderRadius: "50%", background: "var(--grad-brand)", flexShrink: 0 }} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PROCESS
═══════════════════════════════════════════════ */
const steps = [
  { ghost: "01", badge: "Week 1–2", title: "Discovery & Strategy", desc: "Deep-dive into your problem, users, and market. We map the product and define the roadmap before writing a line of code.", dur: "2 weeks" },
  { ghost: "02", badge: "Week 2–4", title: "Design & Architecture", desc: "UX, system architecture, and AI infrastructure designed together. Working prototypes in your hands fast.", dur: "2 weeks" },
  { ghost: "03", badge: "Week 4–10", title: "Build & Iterate", desc: "Rapid sprint cycles with weekly demos. Real features shipping to real users. Feedback loops that sharpen the product.", dur: "6 weeks" },
  { ghost: "04", badge: "Week 10–12", title: "Launch & Scale", desc: "Go-to-market execution, infrastructure hardening, and growth systems set up for scale from day one.", dur: "2 weeks" },
];

function Process() {
  return (
    <section id="process" className="process-section" style={{ padding: "128px 52px", background: "var(--off-white)", fontFamily: "var(--font-body)" }}>
      <div style={{ marginBottom: 80 }}>
        <div className="label reveal" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--violet-mid)", marginBottom: 24 }}>
          <span style={{ display: "block", width: 20, height: 2, background: "var(--grad-brand)", borderRadius: 2 }} />
          How it works
        </div>
        <h2 className="reveal d1" style={{ fontSize: "clamp(38px,4.5vw,60px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--ink)", maxWidth: 560 }}>
          From idea to launch<br />in{" "}
          <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, background: "var(--grad-brand)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>twelve weeks.</em>
        </h2>
      </div>
      <div className="proc-steps" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid var(--border-light)" }}>
        {steps.map((s, i) => (
          <div key={s.ghost} className={`proc-step reveal${i > 0 ? " d" + i : ""}`} style={{ padding: `48px ${i < 3 ? "32px" : "0"} 48px ${i > 0 ? "32px" : "0"}`, borderRight: i < 3 ? "1px solid var(--border-light)" : "none", position: "relative" }}>
            <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: "-.05em", lineHeight: 1, marginBottom: 20, background: "var(--grad-brand)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", opacity: 0.12 }}>{s.ghost}</div>
            <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 100, background: "rgba(151,117,255,.1)", color: "var(--violet-mid)", fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 18 }}>{s.badge}</div>
            <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10, color: "var(--ink)" }}>{s.title}</h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}>{s.desc}</p>
            <div className="proc-duration" style={{ marginTop: 28, fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink)", display: "flex", alignItems: "center", gap: 8 }}>{s.dur}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════ */
function CTA() {
  const trustItems = ["No retainers", "First feature in 7 days", "Full launch in 12 weeks"];
  return (
    <section id="cta" className="cta-section" style={{ padding: "160px 52px", background: "var(--ink)", textAlign: "center", position: "relative", overflow: "hidden", fontFamily: "var(--font-body)" }}>
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0, background: "radial-gradient(circle, rgba(151,117,255,.2) 0%, transparent 65%)" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="label reveal" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--teal)", marginBottom: 28, justifyContent: "center" }}>
          <span style={{ display: "block", width: 20, height: 2, background: "var(--teal)", borderRadius: 2 }} />
          Let's build together
        </div>
        <h2 className="cta-h2 reveal d1" style={{ fontSize: "clamp(48px,7vw,96px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-.04em", color: "#fff", marginBottom: 28 }}>
          Ready to ship<br />
          <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, background: "var(--grad-brand)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>something real?</em>
        </h2>
        <p className="reveal d2" style={{ fontSize: 17, color: "var(--text-on-dark-2)", maxWidth: 500, margin: "0 auto 52px", lineHeight: 1.7 }}>
          DM us "BUILD" or book a 30-minute call. No decks. No retainers. No agencies. Just fast, intelligent execution.
        </p>
        <div className="cta-btns reveal d3" style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <a href="mailto:vyuhontech@gmail.com" className="btn-cta-primary" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 44px", borderRadius: 100, background: "var(--grad-brand)", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "var(--font-body)", textDecoration: "none", boxShadow: "0 8px 32px rgba(151,117,255,.35)", transition: "transform .15s, box-shadow .2s" }}>
            Start a project <Arrow />
          </a>
          <a href="#about" className="btn-cta-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 44px", borderRadius: 100, border: "1.5px solid rgba(255,255,255,.14)", color: "#fff", fontSize: 15, fontWeight: 600, fontFamily: "var(--font-body)", textDecoration: "none", background: "rgba(255,255,255,.04)", transition: "border-color .2s, background .2s" }}>
            vyuhontech@gmail.com
          </a>
        </div>
        <div className="cta-trust reveal d4" style={{ marginTop: 56, display: "flex", alignItems: "center", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          {trustItems.map(t => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-on-dark-3)" }}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><polyline points="2 8 6 12 14 4" /></svg>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════ */
function Footer() {
  const socStyle = { width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-on-dark-3)", textDecoration: "none", transition: "border-color .2s, color .2s, background .2s" };
  return (
    <footer style={{ background: "#08080F", borderTop: "1px solid rgba(255,255,255,.04)", fontFamily: "var(--font-body)" }}>
      <div className="footer-simple" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "36px 52px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <LogoWhite />
          <p style={{ fontSize: 13, color: "var(--text-on-dark-3)" }}>AI-first product studio.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-on-dark-3)" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--teal)", animation: "livepulse 2.2s ease infinite" }} />
            Available for new projects
          </div>
        </div>
        <div className="footer-simple-right" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <a href="https://www.linkedin.com/company/vyuhon/" target="_blank" rel="noreferrer" className="soc-btn" style={socStyle}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a href="#" className="soc-btn" style={socStyle}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="https://www.instagram.com/vyuhon" target="_blank" rel="noreferrer" className="soc-btn" style={socStyle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none" /></svg>
            </a>
          </div>
          <p style={{ fontSize: 12, color: "var(--text-on-dark-3)" }}>© 2026 Vyuhon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════ */
export default function Vyuhon() {
  useReveal();
  return (
    <div style={{ fontFamily: "var(--font-body)", background: "#fff", color: "var(--ink)", fontSize: 16, lineHeight: 1.6, overflowX: "hidden" }}>
      <Header />
      <Hero />
      <About />
      <Services />
      <Ticker />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
}
