import React from 'react';
import './Resources.css';

const ExternalSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);

const DocSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
);

const BookSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
);

const GovSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

const HeartSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
);

const AlertSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);

const PhoneSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
);

const SchoolSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
);

const resources = [
  {
    category: 'Early Learning & Play',
    color: '#E8B84B',
    bg: '#FFF8E7',
    icon: <BookSVG />,
    items: [
      {
        title: 'Play and Exploration Guide',
        desc: 'Saskatchewan\'s official guide supporting play and exploration in early childhood settings.',
        url: 'https://publications.saskatchewan.ca/api/v1/products/74066/formats/82946/download',
        type: 'PDF Guide',
      },
    ],
  },
  {
    category: 'Health & Nutrition',
    color: '#2D7A3A',
    bg: '#E8F5EA',
    icon: <HeartSVG />,
    items: [
      {
        title: "Health Canada's Healthy Eating Strategy",
        desc: 'Health Canada\'s vision and strategy for healthy eating across Canada, including resources for young children.',
        url: 'https://www.saskhealthauthority.ca/',
        type: 'Government Resource',
      },
    ],
  },
  {
    category: 'Licensing & Regulations',
    color: '#D12B2B',
    bg: '#FFE8E8',
    icon: <DocSVG />,
    items: [
      {
        title: 'Licensee Manual',
        desc: 'The official Ministry of Education licensing manual for child care providers in Saskatchewan.',
        url: 'https://21be2725-069d-4cdf-8c5f-bd7fc3740155.filesusr.com/ugd/e086f8_fe5eb28289da47de84ecf9be0cfad72c.pdf',
        type: 'PDF Document',
      },
    ],
  },
  {
    category: 'Government & Ministry Contacts',
    color: '#1A7FAD',
    bg: '#E8F4FF',
    icon: <GovSVG />,
    items: [
      {
        title: 'Ministry of Education – Early Years Branch',
        desc: 'Contact: Karla Bakken — Phone: 306-778-8531 | Email: Karla.Bakken@gov.sk.ca',
        url: 'mailto:Karla.Bakken@gov.sk.ca',
        type: 'Ministry Contact',
      },
      {
        title: 'Public Health – Cypress Health Region',
        desc: 'Public health programs and services available in the Cypress Health region.',
        url: 'https://cypresshealth.ca/programs-services/public-health/',
        type: 'Health Authority',
      },
    ],
  },
  {
    category: 'Child Safety & Reporting',
    color: '#7B4FAB',
    bg: '#F3EBFF',
    icon: <AlertSVG />,
    items: [
      {
        title: 'Child Abuse & Neglect Reporting – Saskatchewan',
        desc: 'You are required by law to report suspected cases of neglect or abuse. Learn how to report here.',
        url: 'https://www.saskatchewan.ca/residents/justice-crime-and-the-law/child-protection/child-abuse-and-neglect',
        type: 'Legal Obligation',
      },
    ],
  },
  {
    category: 'Community Resources',
    color: '#D4802A',
    bg: '#FFF0E0',
    icon: <PhoneSVG />,
    items: [
      {
        title: '211 Saskatchewan – Community Services',
        desc: 'Find community, social, and government services across Saskatchewan.',
        url: 'https://sk.211.ca/',
        type: 'Community Directory',
      },
      {
        title: 'RCMP, Fire & Other Emergencies',
        desc: 'For all emergencies including police, fire, and medical — call 911.',
        url: 'tel:911',
        type: 'Emergency Services',
      },
      {
        title: 'Saskatchewan Early Childhood Association (SECA)',
        desc: 'Professional association supporting early childhood educators across Saskatchewan.',
        url: 'https://seca-sk.org',
        type: 'Professional Association',
      },
      
    ],
  },
  {
    category: 'Local Schools',
    color: '#2D7A3A',
    bg: '#E8F5EA',
    icon: <SchoolSVG />,
    items: [
      {
        title: 'All Saints Catholic School',
        desc: 'Holy Trinity Catholic School Division – All Saints Catholic School in Swift Current.',
        url: 'https://allsaints.htcsd.ca/',
        type: 'School Website',
      },
      {
        title: 'Chinook School Division',
        desc: 'Chinook School Division serving the Swift Current area and surrounding communities.',
        url: 'https://www.chinooksd.ca/',
        type: 'School Division',
      },
    ],
  },
];

export default function Resources() {
  return (
    <div className="resources-page">
      <section className="page-hero resources-hero">
        <div className="container">
          <span className="section-tag">Links & Resources</span>
          <h1 className="section-title">Helpful <span>Resources</span> for Families</h1>
          <p className="section-sub">Important documents, government links, community services, and early learning resources for families at Little Sunshine.</p>
        </div>
      </section>

      <section className="resources-section">
        <div className="container">
          {resources.map((cat, i) => (
            <div key={i} className="resource-category">
              <div className="cat-header" style={{ '--cat-color': cat.color, '--cat-bg': cat.bg }}>
                <div className="cat-icon">{cat.icon}</div>
                <h2>{cat.category}</h2>
              </div>
              <div className="resource-cards">
                {cat.items.map((item, j) => (
                  <a key={j} href={item.url} target={item.url.startsWith('mailto:') || item.url.startsWith('tel:') ? '_self' : '_blank'} rel="noreferrer" className="resource-card" style={{ '--r-color': cat.color }}>
                    <div className="rc-content">
                      <span className="rc-type">{item.type}</span>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                    <div className="rc-arrow" style={{ color: cat.color }}>
                      <ExternalSVG />
                      <span>Open</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="resources-disclaimer">
        <div className="container">
          <p><strong>Note:</strong> External links are provided for reference only. Little Sunshine Early Learning Centre is not responsible for content on external websites. For questions about any resource, please contact us directly.</p>
        </div>
      </section>
    </div>
  );
}