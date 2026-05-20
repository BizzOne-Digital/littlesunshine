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

const resources = [
  {
    category: 'Licensing & Regulations',
    color: '#D12B2B',
    bg: '#FFE8E8',
    icon: <DocSVG />,
    items: [
      {
        title: 'Saskatchewan Licensee Manual',
        desc: 'The official Ministry of Education licensing manual for child care providers in Saskatchewan. Contains regulations, standards, and guidelines.',
        url: 'https://21be2725-069d-4cdf-8c5f-bd7fc3740155.filesusr.com/ugd/e086f8_fe5eb28289da47de84ecf9be0cfad72c.pdf',
        type: 'PDF Document',
      }
    ]
  },
  {
    category: 'Government & Funding',
    color: '#2D7A3A',
    bg: '#E8F5EA',
    icon: <GovSVG />,
    items: [
      {
        title: 'Saskatchewan Ministry of Education – Child Care',
        desc: 'Information about Saskatchewan\'s child care programs, regulations, and funding support for families.',
        url: 'https://www.saskatchewan.ca/residents/family-and-social-support/child-care',
        type: 'Government Website',
      },
      {
        title: 'Child Care Subsidy Program',
        desc: 'Learn about financial assistance programs available to Saskatchewan families to help offset child care costs.',
        url: 'https://www.saskatchewan.ca/residents/family-and-social-support/child-care/child-care-subsidy',
        type: 'Government Resource',
      }
    ]
  },
  {
    category: 'Early Learning Resources',
    color: '#1A7FAD',
    bg: '#E8F4FF',
    icon: <BookSVG />,
    items: [
      {
        title: 'Saskatchewan Curriculum Framework',
        desc: 'The provincial early learning and child care curriculum framework guiding quality programming.',
        url: 'https://www.saskatchewan.ca/government/government-structure/ministries/education',
        type: 'Curriculum Guide',
      },
      {
        title: 'How Does Learning Happen? (Ontario Framework)',
        desc: 'A widely recognized early childhood framework describing foundational conditions for optimal learning.',
        url: 'https://www.ontario.ca/document/how-does-learning-happen-ontarios-pedagogy-early-years',
        type: 'Educational Resource',
      }
    ]
  },
];

export default function Resources() {
  return (
    <div className="resources-page">
      <section className="page-hero resources-hero">
        <div className="container">
          <span className="section-tag">Links & Resources</span>
          <h1 className="section-title">Helpful <span>Resources</span> for Families</h1>
          <p className="section-sub">Important documents, government links, and early learning resources for families at Little Sunshine.</p>
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
                  <a key={j} href={item.url} target="_blank" rel="noreferrer" className="resource-card" style={{ '--r-color': cat.color }}>
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
