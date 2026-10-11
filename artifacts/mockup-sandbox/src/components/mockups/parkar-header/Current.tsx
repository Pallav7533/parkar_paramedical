import { useState } from 'react';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import './_group.css';

const phone = '6351127074';
const homeMessage = 'Hello Parkar Paramedical Institute & Consultancy. I visited your website and would like admission guidance. Please help me understand the available courses, eligibility, admission process and fees.';
const courses = [
  { slug: 'anm', name: 'ANM', full: 'Auxiliary Nurse Midwifery' },
  { slug: 'gnm', name: 'GNM', full: 'General Nursing and Midwifery' },
  { slug: 'pb-bsc-nursing', name: 'P.B. B.Sc. Nursing', full: 'Post Basic Bachelor of Science in Nursing' },
  { slug: 'bsc-nursing', name: 'B.Sc. Nursing', full: 'Bachelor of Science in Nursing' },
  { slug: 'msc-nursing', name: 'M.Sc. Nursing', full: 'Master of Science in Nursing' },
  { slug: 'mlt', name: 'MLT', full: 'Medical Laboratory Technology' },
  { slug: 'dmlt', name: 'DMLT', full: 'Diploma in Medical Laboratory Technology' },
  { slug: 'x-ray-technician', name: 'X-Ray Technician Diploma', full: 'X-Ray Technician / Radiology Technician Diploma' },
  { slug: 'bhms', name: 'BHMS', full: 'Bachelor of Homoeopathic Medicine and Surgery' },
  { slug: 'bams', name: 'BAMS', full: 'Bachelor of Ayurvedic Medicine and Surgery' },
  { slug: 'mbbs-abroad', name: 'MBBS Abroad', full: 'International Medical Education Guidance' },
  { slug: 'diploma-nursing-assistant', name: 'Diploma in Nursing Assistant', full: 'Diploma in Nursing Assistant' },
  { slug: 'nursing-assistant', name: 'Nursing Assistant (NA)', full: 'Nursing Assistant (NA)' },
  { slug: 'patient-care-assistant', name: 'Patient Care Assistant', full: 'Patient Care Assistant' },
  { slug: 'dental-assistant', name: 'Dental Assistant', full: 'Dental Assistant' },
  { slug: 'icu-assistant', name: 'ICU Assistant', full: 'ICU Assistant' },
  { slug: 'healthcare-diploma', name: 'Healthcare-Related Diploma Courses', full: 'Healthcare-Related Diploma Courses' },
  { slug: 'si-course', name: 'SI Course', full: 'SI Course' },
  { slug: 'nios-class-10', name: 'NIOS Class 10', full: 'NIOS Open Schooling — Class 10' },
  { slug: 'nios-class-12', name: 'NIOS Class 12', full: 'NIOS Open Schooling — Class 12' },
];
const branches = [
  { slug: 'deesa', place: 'Deesa' },
  { slug: 'bapunagar-ahmedabad', place: 'Bapunagar, Ahmedabad' },
  { slug: 'ahmedabad', place: 'Ahmedabad' },
  { slug: 'maninagar-ahmedabad', place: 'Maninagar, Ahmedabad' },
  { slug: 'surendranagar', place: 'Surendranagar' },
  { slug: 'viramgam', place: 'Viramgam' },
  { slug: 'dholka', place: 'Dholka' },
  { slug: 'bavla', place: 'Bavla' },
  { slug: 'thaltej-ahmedabad', place: 'Thaltej, Ahmedabad' },
];

const phoneHref = (number: string) => `tel:+91${number}`;
const wa = (message: string) => `https://wa.me/916351127074?text=${encodeURIComponent(message)}`;

function WhatsApp() {
  return (
    <a className="btn btn-gold" href={wa(homeMessage)} target="_blank" rel="noreferrer">
      <MessageCircle size={17} />
      Enquire on WhatsApp
    </a>
  );
}

export function Current() {
  const [open, setOpen] = useState(false);

  return (
    <div className="parkar-header-preview">
      <div className="topline">
        <div className="wrap">
          <span>Deesa, Banaskantha, Gujarat <span className="hide-small"> · Learn • Care • Excel</span></span>
          <span><a href={phoneHref(phone)}>Call {phone}</a><span className="hide-small"> · 10+ years in the field</span></span>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap headrow">
          <a href="/" className="brand" aria-label="Parkar Institute home">
            <img src="/__mockup/images/parkar-logo.png" alt="Parkar Paramedical Institute logo" />
            <span><b>Parkar Paramedical Institute &amp; Consultancy</b><small>LEARN • CARE • EXCEL</small></span>
          </a>
          <button
            className="mobile-toggle"
            data-testid="button-mobile-menu"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            className={`nav ${open ? 'open' : ''}`}
            aria-label="Main navigation"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest('a')) setOpen(false);
            }}
          >
            <a href="/">Home</a><a href="/about">About Us</a>
            <details>
              <summary>Courses</summary>
              <div className="drop">
                <a href="/courses">All courses</a>
                {courses.map((course) => <a key={course.slug} href={`/courses/${course.slug}`}>{course.name} — {course.full}</a>)}
              </div>
            </details>
            <details>
              <summary>Our Branches</summary>
              <div className="drop">
                <a href="/branches">All branches</a>
                {branches.map((branch) => <a key={branch.slug} href={`/branches/${branch.slug}`}>{branch.place}</a>)}
              </div>
            </details>
            <a href="/admission-consultancy">Consultancy</a><a href="/gallery">Gallery</a><a href="/reviews">Reviews</a><a href="/contact">Contact</a>
          </nav>
          <div className="head-actions">
            <a className="btn btn-outline" href={phoneHref(phone)} aria-label="Call Parkar"><Phone size={16} /><span>Call</span></a>
            <WhatsApp />
          </div>
        </div>
      </header>
    </div>
  );
}
