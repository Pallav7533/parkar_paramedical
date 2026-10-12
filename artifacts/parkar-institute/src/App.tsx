import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Link, useLocation, useParams, Router as WouterRouter } from 'wouter';
import { ArrowRight, BookOpen, HeartPulse, MapPin, Menu, X, Phone, Mail, MessageCircle, GraduationCap, Users, BriefcaseMedical, ClipboardList, ChevronRight, ShieldCheck, Clock3, Award, Landmark, UserRound, Quote, Navigation } from 'lucide-react';

const queryClient = new QueryClient();
const logo = '/parkar-logo.png';
const phone = '6351127074';
const secondary = '8347330309';
const email = 'pandyasuresh87@gmail.com';
const address = 'Sports Club Road, Opposite Ravi Patel Hospital, Deesa, Banaskantha, Gujarat 385535';
const homeMessage = 'Hello Parkar Paramedical Institute & Consultancy. I visited your website and would like admission guidance. Please help me understand the available courses, eligibility, admission process and fees.';
const wa = (message: string) => `https://wa.me/916351127074?text=${encodeURIComponent(message)}`;
const phoneHref = (n: string) => `tel:+91${n}`;

type Course = { slug:string; name:string; full:string; category:string; intro:string; about:string; learn:string; audience:string; pathway:string; related:string[] };
const courses: Course[] = [
 {slug:'anm',name:'ANM',full:'Auxiliary Nurse Midwifery',category:'Nursing Courses',intro:'ANM is a nursing-related pathway focused on foundational care, community health and maternal and child health concepts.',about:'Students exploring ANM should review the exact program structure, recognition, training arrangements and professional requirements with the institution offering it. The title and scope of practice depend on applicable rules.',learn:'Foundational nursing concepts, community health, basic patient care, maternal and child health topics and practical learning where the program provides it.',audience:'Students interested in community-oriented care and foundational nursing education.',pathway:'Possible next steps may depend on the qualification awarded and applicable admission rules. Confirm further-study and registration pathways before enrolling.',related:['gnm','nursing-assistant','patient-care-assistant']},
 {slug:'gnm',name:'GNM',full:'General Nursing and Midwifery',category:'Nursing Courses',intro:'GNM is a nursing education pathway covering general nursing concepts and midwifery-related learning.',about:'Compare the exact syllabus, clinical learning arrangements, recognition status and registration eligibility of each specific program. GNM is distinct from assistant-level training.',learn:'General nursing concepts, patient observation, care planning, community health and midwifery topics; practical components vary by institution.',audience:'Learners considering a structured nursing qualification and ready to verify its entry and registration conditions.',pathway:'Further education may be possible subject to the qualification, institution and current admission requirements.',related:['anm','bsc-nursing','pb-bsc-nursing']},
 {slug:'pb-bsc-nursing',name:'P. B.Sc. Nursing',full:'Post Basic Bachelor of Science in Nursing',category:'Nursing Courses',intro:'A post-basic degree pathway intended for eligible nursing candidates seeking further academic study.',about:'Entry normally depends on a prior nursing qualification and institution-specific conditions. Confirm current eligibility, recognition and any professional registration requirements directly.',learn:'Advanced nursing concepts, evidence-informed practice, community health and subject areas defined by the institution curriculum.',audience:'Nursing-qualified students exploring a bachelor-level continuation pathway.',pathway:'Further study options depend on the recognized award and applicable institutional rules.',related:['gnm','bsc-nursing','msc-nursing']},
 {slug:'bsc-nursing',name:'B.Sc. Nursing',full:'Bachelor of Science in Nursing',category:'Nursing Courses',intro:'B.Sc. Nursing is a degree-level nursing education pathway with academic and practice-oriented components.',about:'Before applying, verify the institution, current admission criteria, course recognition, clinical learning arrangements and professional registration rules.',learn:'Nursing foundations, human health sciences, patient care, community health and supervised practical learning where included.',audience:'Students considering degree-level nursing education and the responsibilities of a regulated profession.',pathway:'Further study depends on eligibility, the awarding institution and current regulations.',related:['anm','gnm','pb-bsc-nursing','msc-nursing']},
 {slug:'msc-nursing',name:'M.Sc. Nursing',full:'Master of Science in Nursing',category:'Nursing Courses',intro:'M.Sc. Nursing is postgraduate nursing study for candidates who meet the relevant entry criteria.',about:'Specializations, eligibility, duration and recognition are specific to the institution and applicable regulations. Verify all details before applying.',learn:'Advanced nursing study, research methods and specialization-specific topics as provided by the institution.',audience:'Qualified nursing graduates exploring postgraduate academic and professional development.',pathway:'Further academic pathways may be available subject to admission rules and recognized qualifications.',related:['bsc-nursing','pb-bsc-nursing','gnm']},
 {slug:'mlt',name:'MLT',full:'Medical Laboratory Technology',category:'Laboratory & Diagnostics',intro:'Medical Laboratory Technology relates to laboratory processes that support diagnostic testing and health services.',about:'Program names and qualification levels differ. Ask which exact award is offered, what facilities and supervised practice apply, and what roles the qualification supports.',learn:'Depending on the curriculum: laboratory safety, specimen handling, basic testing concepts and quality practices.',audience:'Learners interested in laboratory science, careful procedures and diagnostic support work.',pathway:'Possible work or further study depends on qualification, employer criteria and relevant rules.',related:['dmlt','x-ray-technician','healthcare-diploma']},
 {slug:'dmlt',name:'DMLT',full:'Diploma in Medical Laboratory Technology',category:'Laboratory & Diagnostics',intro:'DMLT refers to a diploma-level pathway in medical laboratory technology; the exact curriculum depends on the provider.',about:'Confirm the exact diploma title, awarding institution, eligibility, practical arrangements and recognition status before admission.',learn:'Laboratory fundamentals, safe sample handling and diagnostic support concepts where included in the approved curriculum.',audience:'Students drawn to laboratory-based healthcare support and methodical work.',pathway:'Further study and employment requirements vary by qualification and institution.',related:['mlt','x-ray-technician','healthcare-diploma']},
 {slug:'x-ray-technician',name:'X-Ray Technician Diploma',full:'X-Ray Technician / Radiology Technician Diploma',category:'Laboratory & Diagnostics',intro:'A radiology-support learning pathway introduces imaging services and their safety principles, subject to the program offered.',about:'Imaging work involves regulated equipment and safety practices. Confirm qualification recognition, supervised practical training and role limits before choosing a program.',learn:'Imaging fundamentals, patient preparation, radiation safety concepts and equipment principles where present in the course.',audience:'Students interested in diagnostic imaging support and careful, safety-led work.',pathway:'Any imaging role depends on applicable regulations, qualification and employer requirements.',related:['mlt','dmlt','healthcare-diploma']},
 {slug:'bhms',name:'BHMS',full:'Bachelor of Homoeopathic Medicine and Surgery',category:'Medical Degree Guidance',intro:'BHMS is a medical degree pathway in homoeopathy. Parkar can discuss admission guidance; the receiving institution and authorities determine eligibility and recognition.',about:'This is a professional degree, not an assistant course. Verify the institution’s current recognition, admission rules, entrance requirements and professional registration pathway with official sources.',learn:'The exact curriculum is prescribed by the recognized institution and applicable rules. Confirm the current syllabus and clinical requirements directly.',audience:'Students researching homoeopathic medical education and prepared to verify official rules carefully.',pathway:'Professional practice depends on recognized qualifications and valid registration under applicable rules.',related:['bams','mbbs-abroad','bsc-nursing']},
 {slug:'bams',name:'BAMS',full:'Bachelor of Ayurvedic Medicine and Surgery',category:'Medical Degree Guidance',intro:'BAMS is a medical degree pathway in Ayurveda. Admission, recognition and practice rules are decided by institutions and competent authorities.',about:'Check current entrance requirements, institution recognition, course details and registration eligibility against official sources. Consultancy is guidance, not an admission or recognition decision.',learn:'The institution’s prescribed curriculum covers Ayurveda and related medical subjects; consult the institution for the verified syllabus.',audience:'Students exploring Ayurvedic medical education and willing to confirm regulatory and professional requirements.',pathway:'Further study and practice depend on valid recognized qualifications and applicable registration.',related:['bhms','mbbs-abroad','bsc-nursing']},
 {slug:'mbbs-abroad',name:'MBBS Abroad',full:'International Medical Education Guidance',category:'Medical Degree Guidance',intro:'Explore international medical education options with careful attention to institution, country and return-to-practice requirements.',about:'Overseas medical study needs detailed independent verification. Check the university and program against current Indian rules, entrance eligibility, course structure, clinical exposure, licensing steps and total costs with official sources.',learn:'Academic content and clinical training vary by country and university; request official curriculum and training details from the institution.',audience:'Students and families comparing international medical education with an informed, cautious approach.',pathway:'Eligibility to practise in India or elsewhere is not automatic. Current examinations, recognition and licensing rules apply.',related:['bhms','bams','bsc-nursing']},
 {slug:'diploma-nursing-assistant',name:'Diploma in Nursing Assistant',full:'Diploma in Nursing Assistant',category:'Healthcare Assistant Courses',intro:'A support-level learning option related to assisting with routine care under appropriate supervision.',about:'This is not a nursing licence or a substitute for registered nurse education. Confirm exact course title, scope, duration and provider before enrolling.',learn:'Depending on the verified curriculum: communication, hygiene support, safe assistance and basic patient-care awareness.',audience:'Learners interested in supportive care roles and clear understanding of their limits and supervision.',pathway:'Assistant responsibilities differ from those of registered nurses and licensed professionals.',related:['nursing-assistant','patient-care-assistant','icu-assistant']},
 {slug:'nursing-assistant',name:'Nursing Assistant (NA)',full:'Nursing Assistant (NA)',category:'Healthcare Assistant Courses',intro:'Nursing assistant training may introduce supportive tasks in care environments, as defined by the specific provider.',about:'Assistant training does not qualify a person as a registered nurse. Ask the institution what tasks are taught, what supervision applies and what credential is awarded.',learn:'Potential subject areas may include patient comfort, hygiene, communication and safe assistance, depending on the confirmed syllabus.',audience:'Students interested in supervised care support rather than independent clinical practice.',pathway:'Role scope depends on employer policy and applicable rules; professional nursing requires separate recognized education and registration.',related:['diploma-nursing-assistant','patient-care-assistant','icu-assistant']},
 {slug:'patient-care-assistant',name:'Patient Care Assistant',full:'Patient Care Assistant',category:'Healthcare Assistant Courses',intro:'Patient care assistant options focus on support for patient comfort and daily care, according to the specific program.',about:'The role is distinct from doctor, registered nurse and other licensed professional responsibilities. Verify the course award, learning and supervision arrangements.',learn:'Patient communication, comfort, hygiene support and safety awareness may be included where confirmed by the provider.',audience:'People who value practical, respectful support for patients and families in care settings.',pathway:'Employment expectations vary. A short course does not itself confer professional registration or clinical authority.',related:['nursing-assistant','diploma-nursing-assistant','icu-assistant']},
 {slug:'dental-assistant',name:'Dental Assistant',full:'Dental Assistant',category:'Healthcare Assistant Courses',intro:'Dental assistant learning can introduce supportive duties around dental practice operations and patient care.',about:'Exact tasks, qualification and training arrangements depend on the institution and local rules. Assistants do not independently diagnose or provide licensed dental treatment.',learn:'Possible concepts include clinic hygiene, patient preparation, instrument awareness and communication where taught.',audience:'Students interested in clinical support in dental settings and careful teamwork.',pathway:'Role scope is determined by regulations and employer supervision; it is not a dentist qualification.',related:['patient-care-assistant','healthcare-diploma','nursing-assistant']},
 {slug:'icu-assistant',name:'ICU Assistant',full:'ICU Assistant',category:'Healthcare Assistant Courses',intro:'An ICU assistant program may introduce non-licensed supportive duties in intensive care environments.',about:'An intensive care unit is a highly supervised clinical setting. Training does not authorize independent clinical decisions or replace registered professional qualifications.',learn:'Subject matter varies; ask about patient safety, infection prevention, support boundaries and supervised practice in the actual course.',audience:'Learners interested in care support who understand the importance of scope, supervision and patient safety.',pathway:'Clinical responsibilities remain with appropriately qualified and licensed professionals.',related:['patient-care-assistant','nursing-assistant','diploma-nursing-assistant']},
 {slug:'healthcare-diploma',name:'Healthcare-Related Diploma Courses',full:'Healthcare-Related Diploma Courses',category:'Other Healthcare Diplomas',intro:'A broad starting point for comparing healthcare and allied-health diploma options offered by different providers.',about:'The name, award, eligibility and scope can differ substantially between programs. Contact Parkar for exact current program names and institutions, and verify recognition before deciding.',learn:'Topics depend entirely on the confirmed course; request a syllabus and practical learning information from its provider.',audience:'Students who know they are interested in healthcare but want to compare specific pathways first.',pathway:'Do not infer professional status from a course title. Verify the qualification and any registration rules.',related:['mlt','dmlt','x-ray-technician','patient-care-assistant']},
 {slug:'si-course',name:'SI Course',full:'SI Course',category:'Other Course',intro:'Parkar lists an SI Course inquiry option. The full form and nature of this course have not yet been confirmed.',about:'To avoid sharing inaccurate information, this page does not expand “SI” or describe unverified curriculum, eligibility or outcomes. Please ask the team to confirm the exact course identity and provider.',learn:'Course contents are pending confirmation. Request the official syllabus and exact qualification name before applying.',audience:'Anyone who has heard about the SI Course and wants to confirm what it refers to.',pathway:'Possible routes depend on the confirmed program, institution and applicable rules.',related:['healthcare-diploma','mlt','dmlt']},
 {slug:'nios-class-10',name:'NIOS Class 10',full:'NIOS Open Schooling — Class 10',category:'Open Schooling',intro:'NIOS Class 10 offers an open-schooling route for learners seeking secondary-level education through the National Institute of Open Schooling.',about:'Subject choices, learner eligibility, examination and current enrolment rules can change. Confirm them directly with NIOS and check that the subjects meet requirements for your intended next course.',learn:'Subjects depend on the current NIOS options selected by the learner. Plan choices around the next educational pathway.',audience:'Learners seeking a flexible secondary education route and families comparing recognized options.',pathway:'Progression to Class 12 or vocational study depends on current rules and the chosen subjects.',related:['nios-class-12','anm','healthcare-diploma']},
 {slug:'nios-class-12',name:'NIOS Class 12',full:'NIOS Open Schooling — Class 12',category:'Open Schooling',intro:'NIOS Class 12 is an open-schooling route at senior secondary level. It may suit learners needing flexibility in completing school education.',about:'Eligibility, subject combinations and examination rules must be checked against current NIOS guidance. For healthcare courses, verify required subjects and marks with the specific institution before selecting subjects.',learn:'The learner’s selected subjects and current NIOS curriculum determine study content.',audience:'Students planning further education who need to carefully align subjects with entry requirements.',pathway:'Course admission after Class 12 is not automatic; each institution sets current eligibility and selection conditions.',related:['nios-class-10','bsc-nursing','bhms','bams']}
];

type Branch = { slug:string; place:string; title:string; intro:string; focus:string; local:string };
const branches: Branch[] = [
 {slug:'deesa',place:'Deesa',title:'Parkar Paramedical Institute — Deesa',intro:'Deesa is Parkar’s main branch and the contact point for students and families in Banaskantha seeking healthcare education information and admission guidance.',focus:'Speak with the Deesa team about course options, eligibility questions and next steps. Course availability, facilities and admission details should be confirmed directly.',local:'The main branch is on Sports Club Road, opposite Ravi Patel Hospital. This is the only branch address currently verified for directions.'},
 {slug:'bapunagar-ahmedabad',place:'Bapunagar, Ahmedabad',title:'Parkar Paramedical Institute — Bapunagar, Ahmedabad',intro:'Students in Bapunagar can contact Parkar to discuss healthcare education pathways and ask how to confirm options associated with this listed location.',focus:'Share your previous qualification and preferred course so the team can clarify current availability and whether this location suits your inquiry.',local:'Bapunagar is a listed Parkar branch area. A street address and branch-specific facilities have not been supplied; please confirm before travelling.'},
 {slug:'ahmedabad',place:'Ahmedabad',title:'Parkar Paramedical Institute — Ahmedabad',intro:'The Ahmedabad listing gives students and parents a starting point for discussing course selection and admission guidance in the city.',focus:'Ask the team which courses and guidance services can currently be discussed for this location. Programs may vary by branch and institution.',local:'This listing identifies Ahmedabad only. No exact street address or map point has been verified.'},
 {slug:'maninagar-ahmedabad',place:'Maninagar, Ahmedabad',title:'Parkar Paramedical Institute — Maninagar, Ahmedabad',intro:'Parkar’s Maninagar listing serves as a local inquiry route for learners comparing healthcare study choices in Ahmedabad.',focus:'Students can discuss their education background, program interests and admission questions with the team before choosing a next step.',local:'Maninagar, Ahmedabad is the confirmed area name only; an exact address and local course list are not supplied.'},
 {slug:'surendranagar',place:'Surendranagar',title:'Parkar Paramedical Institute — Surendranagar',intro:'Students and families in Surendranagar can contact Parkar to explore the listed branch and seek guidance about healthcare education options.',focus:'Use an inquiry to verify what is currently available in this area, and ask which institution awards any qualification you are considering.',local:'The branch is listed in Surendranagar. No street address, directions pin or facilities are confirmed.'},
 {slug:'viramgam',place:'Viramgam',title:'Parkar Paramedical Institute — Viramgam',intro:'Viramgam students can begin with a conversation about course interests, current eligibility questions and the right institution to contact.',focus:'The Parkar team can help you frame questions and understand next steps, subject to confirming the program and its provider.',local:'Viramgam is a listed location; exact address and local availability require confirmation.'},
 {slug:'dholka',place:'Dholka',title:'Parkar Paramedical Institute — Dholka',intro:'This location page helps Dholka families connect with Parkar for education information and admission consultancy enquiries.',focus:'Ask about the course you are considering, the branch serving your inquiry and the institution-specific conditions before deciding.',local:'No verified street address or map location has been supplied for Dholka.'},
 {slug:'bavla',place:'Bavla',title:'Parkar Paramedical Institute — Bavla',intro:'Learners in Bavla can contact Parkar to discuss healthcare education interests and clarify the current arrangements for this listed location.',focus:'Share your course and preferred location; the team can guide your questions and confirm whether a suitable option is currently available.',local:'Bavla is listed as a branch location. Exact address, facilities and offered courses are not yet verified.'},
 {slug:'thaltej-ahmedabad',place:'Thaltej, Ahmedabad',title:'Parkar Paramedical Institute — Thaltej, Ahmedabad',intro:'Parkar’s Thaltej listing is a starting point for Ahmedabad-area students seeking course information and admission guidance.',focus:'Confirm the available programs and arrangements with the team. Do not assume every Parkar location offers the same courses.',local:'The verified information is the Thaltej area name only; a specific address has not been provided.'}
];

const courseMessage = (course:string) => `Hello Parkar Team. I am interested in ${course}. Please guide me regarding eligibility, course duration, fees, available institutions and the admission process. My preferred location is [Location].`;
const branchMessage = (branch:string) => `Hello Parkar Team. I would like to enquire about the ${branch} branch. Please share the available courses and admission guidance details.`;
const categories = [...new Set(courses.map(c=>c.category))];
const faqs:[string,string][] = [
 ['What is Parkar Paramedical Institute & Consultancy?','Parkar is an education institute and admission consultancy based in Deesa, Gujarat. The team helps students and parents explore healthcare course information and admission options.'],
 ['How many Parkar branches are there?','There are nine listed branch locations. Contact the team to confirm current facilities, address and course availability for a particular branch.'],
 ['Which paramedical and nursing courses can I enquire about?','The directory includes nursing, laboratory and diagnostic, assistant-level, medical degree guidance, diploma and open-schooling options. Each course has its own information page.'],
 ['Can Parkar help with admission at other colleges?','Yes, the team can discuss possible opportunities and help you understand questions to verify. The receiving institution makes the admission decision.'],
 ['How do I know which course is suitable for me?','Share your last qualification, interests and preferred location. Compare the course award, entry requirements, recognition and the work or further-study path with official sources.'],
 ['What qualifications are required for nursing courses?','Requirements vary by course, institution and current rules. Confirm the exact eligibility with the institution offering the program.'],
 ['How can I learn about course duration and fees?','These details vary by provider and program. Contact Parkar for course-specific information and confirm final terms directly with the institution.'],
 ['What documents may be needed for admission?','Institutions may request academic marksheets, identity proof, photographs and other documents. Ask the receiving institution for its final current list.'],
 ['Can students from other cities contact Parkar?','Yes. Students and parents from other cities can contact the team by WhatsApp or phone for an initial discussion.'],
 ['How can I enquire about MBBS abroad?','Contact the team with your education background and questions. Independently verify the university, course, eligibility, recognition and licensing requirements through official sources.'],
 ['Does Parkar provide NIOS Class 10 and Class 12 guidance?','Separate NIOS Class 10 and Class 12 information pages are available. Check current eligibility and subject requirements with NIOS and your intended further-course institution.'],
 ['How can I contact the Deesa branch?','Call 6351127074 or 8347330309, email pandyasuresh87@gmail.com, or use the verified Deesa directions link on the contact page.'],
 ['Does every branch offer the same courses?','Not necessarily. Confirm course availability, facilities and admissions directly for the location and program you are considering.'],
 ['Are jobs guaranteed after course completion?','No blanket job guarantee is stated. Career Guidance and Placement Assistance — Contact Us for Course-Specific Details. Outcomes depend on qualification, requirements and opportunities.'],
 ['How do I speak to an admission counsellor?','Use any Enquire on WhatsApp link or call the team. You can share your qualification, course interest, preferred location and question.']
];

function WhatsApp({message=homeMessage,children='Enquire on WhatsApp',className='btn btn-gold'}:{message?:string;children?:ReactNode;className?:string}) {
 return <a data-testid="link-whatsapp" className={className} href={wa(message)} target="_blank" rel="noreferrer"><MessageCircle size={17}/>{children}</a>;
}
function BtnLink({href,children,className='btn btn-navy'}:{href:string;children:ReactNode;className?:string}) { return <Link data-testid={`link-${href.replaceAll('/','-')}`} href={href} className={className}>{children}</Link>; }
function Shell({children}:{children:ReactNode}) {
 const [open,setOpen]=useState(false);
 return <>
  <div className="topline"><div className="wrap"><span>Deesa, Banaskantha, Gujarat <span className="hide-small"> · Learn • Care • Excel</span></span><span><a href={phoneHref(phone)}>Call {phone}</a><span className="hide-small"> · 10+ years in the field</span></span></div></div>
  <header className="site-header"><div className="wrap headrow">
   <Link href="/" className="brand" aria-label="Parkar Institute home"><img src={logo} alt="Parkar Paramedical Institute logo"/><span><b>Parkar Paramedical Institute & Consultancy</b><small>LEARN • CARE • EXCEL</small></span></Link>
   <button className="mobile-toggle" data-testid="button-mobile-menu" aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
   
<nav
  className={`nav ${open ? 'open' : ''}`}
  aria-label="Main navigation"
  onClick={(e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  }}
>
  <Link href="/">Home</Link>
  <Link href="/about">About Us</Link>

  <div className="nav-dropdown">
    <Link href="/courses" className="nav-dropdown-trigger">
      Courses <span className="dropdown-arrow">▾</span>
    </Link>
    <div className="nav-dropdown-menu">
      <Link href="/courses">All Courses</Link>
      {courses.map((c) => (
        <Link key={c.slug} href={`/courses/${c.slug}`}>
          {c.name} — {c.full}
        </Link>
      ))}
    </div>
  </div>

  <div className="nav-dropdown">
    <Link href="/branches" className="nav-dropdown-trigger">
      Our Branches <span className="dropdown-arrow">▾</span>
    </Link>
    <div className="nav-dropdown-menu">
      <Link href="/branches">All Branches</Link>
      {branches.map((b) => (
        <Link key={b.slug} href={`/branches/${b.slug}`}>
          {b.place}
        </Link>
      ))}
    </div>
  </div>

  <Link href="/admission-consultancy">Consultancy</Link>
  <Link href="/gallery">Gallery</Link>
  <Link href="/reviews">Reviews</Link>
  <Link href="/contact">Contact</Link>
</nav>

   <div className="head-actions"><a className="btn btn-outline" href={phoneHref(phone)} aria-label="Call Parkar"><Phone size={16}/><span>Call</span></a><WhatsApp/></div>
  </div></header>
  {children}
  <Footer/>
  <WhatsApp className="btn btn-gold mobile-wa" message={homeMessage}>Ask Parkar</WhatsApp>
 </>;
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <img src={logo} alt="Parkar logo" />
              <div>
                <strong>
                  Parkar Paramedical
                  <br />
                  Institute &amp; Consultancy
                </strong>
                <p style={{ margin: '5px 0 0' }}>
                  Learn • Care • Excel
                </p>
              </div>
            </div>

            <p>
              Course information and admission guidance for students and
              families exploring healthcare education pathways across Gujarat.
            </p>

            <p>
              Learn • Care • Excel — Guiding Students Towards a Brighter Future.
            </p>

            <WhatsApp
              className="btn btn-gold"
              message={homeMessage}
            >
              Enquire on WhatsApp
            </WhatsApp>
          </div>

          <div>
            <h3>Explore</h3>
            <div className="footer-links">
              <Link href="/about">About Us</Link>
              <Link href="/courses">All Courses</Link>
              <Link href="/branches">All Branches</Link>
              <Link href="/admission-consultancy">
                Admission Consultancy
              </Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/reviews">Student Reviews</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </div>

          <div>
            <h3>Course pathways</h3>
            <div className="footer-links">
              {categories.map((cat) => (
                <a key={cat} href="/courses">
                  {cat}
                </a>
              ))}
              <Link href="/courses/nios-class-10">NIOS Class 10</Link>
              <Link href="/courses/nios-class-12">NIOS Class 12</Link>
            </div>
          </div>

          <div>
            <h3>Reach us</h3>
            <div className="footer-links">
              <a href={phoneHref(phone)}>Call {phone}</a>
              <a href={phoneHref(secondary)}>Call {secondary}</a>
              <a href={`mailto:${email}`}>{email}</a>
              <Link href="/branches/deesa">Deesa main branch</Link>
              <p className="address">{address}</p>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-and-conditions">
                Terms and Conditions
              </Link>
              <Link href="/disclaimer">Disclaimer</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Parkar Paramedical Institute
            &amp; Consultancy
          </span>

          <span className="footer-tagline">
            Learn • Care • Excel
          </span>

          <span className="developer-credit">
            Designed &amp; Developed by{' '}
            <a
              href="https://www.darshanmediahouse.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Darshan Media House website"
            >
              Darshan Media House, Deesa
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function Breadcrumb({items}:{items:{label:string;href?:string}[]}) { return <div className="breadcrumbs"><Link href="/">Home</Link>{items.map((it,i)=><span key={i}> <ChevronRight size={13} style={{verticalAlign:'middle'}}/> {it.href?<Link href={it.href}>{it.label}</Link>:it.label}</span>)}</div>; }
function PageHero({eyebrow,title,description,crumbs=[]}:{eyebrow:string;title:string;description:string;crumbs?:{label:string;href?:string}[]}) { return <div className="page-hero"><div className="wrap"><Breadcrumb items={crumbs}/><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="lead" style={{maxWidth:760}}>{description}</p></div></div>; }
function SectionHead({kicker,title,children}:{kicker?:string;title:string;children?:ReactNode}) { return <div className="section-head">{kicker&&<div className="eyebrow">{kicker}</div>}<h2>{title}</h2>{children&&<p>{children}</p>}</div>; }
function FaqList({items=faqs}:{items?:[string,string][]}) { return <div>{items.map(([q,a],i)=><details className="faq" key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>; }
function CourseCard({course}:{course:Course}) { return <article className="card course-card" data-testid={`card-course-${course.slug}`}><span className="badge">{course.category}</span><h3>{course.name}</h3><p>{course.intro}</p><Link className="link-arrow" href={`/courses/${course.slug}`}>View course details <ArrowRight size={15}/></Link><div style={{marginTop:10}}><WhatsApp message={courseMessage(course.name)} className="link-arrow">Ask about this course <MessageCircle size={15}/></WhatsApp></div></article>; }
function BranchCard({branch}:{branch:Branch}) { return <article className="card branch-item" data-testid={`card-branch-${branch.slug}`}><div className="icon-box"><MapPin/></div><div><span className="badge">Listed location</span><h3>{branch.place}</h3><p>{branch.intro}</p><Link className="link-arrow" href={`/branches/${branch.slug}`}>View branch details <ArrowRight size={15}/></Link><div style={{marginTop:9}}><WhatsApp className="link-arrow" message={branchMessage(branch.title)}>Enquire about this branch <MessageCircle size={14}/></WhatsApp></div></div></article>; }
function FormInquiry({defaultCourse='',defaultBranch=''}:{defaultCourse?:string;defaultBranch?:string}) {
 const [error,setError]=useState('');
 function submit(e:FormEvent<HTMLFormElement>) {
  e.preventDefault(); const fd=new FormData(e.currentTarget);
  const name=String(fd.get('name')||'').trim(), qualification=String(fd.get('qualification')||'').trim(), interest=String(fd.get('course')||'').trim(), city=String(fd.get('city')||'').trim(), question=String(fd.get('question')||'').trim();
  if(!name||!qualification||!interest||!city||!question){setError('Please complete all required fields before continuing.');return;}
  const msg=`Hello Parkar Paramedical Institute & Consultancy. I would like admission guidance.\n\nStudent name: ${name}\nContact number: ${String(fd.get('phone')||'Not provided').trim()}\nLast qualification: ${qualification}\nInterested course: ${interest}\nPreferred branch or city: ${city}\nQuestion: ${question}`;
  window.open(wa(msg),'_blank','noopener,noreferrer'); setError('');
 }
 return <form className="inquiry-form" onSubmit={submit} noValidate>
   <div className="field"><label htmlFor="student-name">Student name *</label><input id="student-name" name="name" required placeholder="Your name" data-testid="input-student-name"/></div>
   <div className="field"><label htmlFor="student-phone">Contact number <span style={{fontWeight:400}}>(optional)</span></label><input id="student-phone" name="phone" type="tel" placeholder="Your phone number" data-testid="input-student-phone"/></div>
   <div className="field"><label htmlFor="student-qualification">Last qualification *</label><input id="student-qualification" name="qualification" required placeholder="For example, Class 12" data-testid="input-qualification"/></div>
   <div className="field"><label htmlFor="student-course">Interested course *</label><select id="student-course" name="course" required defaultValue={defaultCourse} data-testid="select-course"><option value="">Choose a course</option>{courses.map(c=><option key={c.slug} value={c.name}>{c.name} — {c.full}</option>)}</select></div>
   <div className="field full"><label htmlFor="student-city">Preferred branch or city *</label><select id="student-city" name="city" required defaultValue={defaultBranch} data-testid="select-branch"><option value="">Choose a branch or city</option>{branches.map(b=><option key={b.slug} value={b.place}>{b.place}</option>)}</select></div>
   <div className="field full"><label htmlFor="student-question">Question or message *</label><textarea id="student-question" name="question" required placeholder="What would you like to understand?" data-testid="input-question"/></div>
   <div className="field full">{error&&<div className="form-error" role="alert">{error}</div>}<button className="btn btn-gold" type="submit" data-testid="button-continue-whatsapp"><MessageCircle size={17}/>Continue on WhatsApp</button><small style={{color:'#68778b',lineHeight:1.5}}>Your details are used only to prepare a message for WhatsApp; this form does not submit or save information on this website.</small></div>
  </form>;
}
function HomePage() {
 return <main>
  <section className="hero"><div className="wrap hero-grid"><div className="reveal"><div className="eyebrow">Paramedical education • Nursing • Healthcare career guidance</div><h1>Your future in healthcare starts here.</h1><p>Welcome to Parkar Paramedical Institute & Consultancy, Deesa — a student-focused destination for paramedical education, nursing courses and healthcare admission guidance.</p><p>With more than 10 years of experience and a network of nine listed branches, we help students and families explore opportunities, understand course requirements and take informed next steps.</p><div className="hero-actions" style={{display:'flex',gap:11,flexWrap:'wrap',marginTop:23}}><BtnLink href="/courses" className="btn btn-navy">Explore all courses <ArrowRight size={16}/></BtnLink><BtnLink href="/admission-consultancy" className="btn btn-outline">Get admission guidance</BtnLink><WhatsApp message={homeMessage}>Enquire on WhatsApp</WhatsApp></div></div><div className="hero-visual"><div className="hero-frame"><img className="hero-photo" src="/hero-healthcare-learning.jpg" alt="Illustrative healthcare-learning image; not a photograph of Parkar students or activities."/></div><div className="visual-note">Learn Today. Care Tomorrow.<br/><span style={{fontSize:12,fontWeight:500,color:'#64748b'}}>Building Skills for a Healthier Future.</span></div></div></div></section>
  <section className="stats"><div className="wrap stats-row">{[[Clock3,'10+ years','Experience in the field'],[MapPin,'9 locations','Listed branch network'],[BookOpen,'Many pathways','Healthcare education options'],[Users,'Personal guidance','For students and parents']].map(([I,top,sub]:any)=><div className="stat" key={top}><I size={27}/><span><b>{top}</b><small>{sub}</small></span></div>)}</div></section>
  <section className="section"><div className="wrap grid-2"><div><div className="eyebrow">About Parkar</div><h2>A trusted guide for your healthcare education journey</h2><div className="gold-line"/><div className="prose-copy"><p>Choosing the right educational pathway is an important decision for every student and family. Understanding course eligibility, institutions and future opportunities can sometimes feel confusing.</p><p>Based in Deesa, Banaskantha, Parkar combines institute services with admission guidance for students exploring opportunities at its own branches and other institutions. Our team helps students understand available pathways, ask the right questions and identify next steps according to their background and interests.</p><p>From nursing and paramedical courses to healthcare assistant programs, medical degree guidance and open schooling options, contact us to discuss what may suit your goals.</p></div><div style={{display:'flex',gap:11,flexWrap:'wrap',marginTop:20}}><BtnLink href="/about">Learn more about Parkar</BtnLink><WhatsApp message="Hello Parkar Team. I would like to speak with your team about education guidance." className="btn btn-outline">Speak to our team</WhatsApp></div></div><div className="card soft"><div className="icon-box"><GraduationCap/></div><h3>Education, institute services and admission consultancy — all in one place</h3><p>Clear course information and guidance to help you make informed decisions.</p><div className="grid-3" style={{gridTemplateColumns:'1fr',gap:12,marginTop:18}}>{[['Paramedical & healthcare education','Explore programs and confirm current availability with the relevant branch.','/courses'],['Admission consultancy','Discuss opportunities at Parkar branches and other suitable institutions.','/admission-consultancy'],['Career and education guidance','Understand possible pathways, qualifications and questions to verify.','/about']].map(([title,desc,href])=><div className="card" key={title}><h3 style={{marginTop:0}}>{title}</h3><p>{desc}</p><Link className="link-arrow" href={href}>Explore <ArrowRight size={14}/></Link></div>)}</div></div></div></section>
  <section className="section soft"><div className="wrap"><SectionHead kicker="Course directory" title="Explore courses for your future in healthcare">Every student has different interests, qualifications and goals. Explore our course pages and contact Parkar to confirm eligibility, availability, duration, fees and admission procedures.</SectionHead>{categories.map(cat=><div key={cat} style={{marginBottom:28}}><h3 style={{fontSize:20,marginBottom:14}}>{cat}</h3><div className="course-grid">{courses.filter(c=>c.category===cat).map(c=><CourseCard key={c.slug} course={c}/>)}</div></div>)}<BtnLink href="/courses">Browse the complete course directory <ArrowRight size={16}/></BtnLink></div></section>
  <section className="section"><div className="wrap"><SectionHead kicker="Why Parkar" title="Why students and parents choose Parkar">Clear conversations, a broad set of pathways and practical support as you research a consequential decision.</SectionHead><div className="grid-3">{[[Clock3,'More than 10 years of experience','Our experience helps us understand common questions students and families have when exploring healthcare education.'],[MapPin,'Nine listed locations','Contact us to confirm facilities and programs at your preferred branch.'],[Users,'Personalized admission guidance','Discuss your background, interests, preferred location and questions.'],[BookOpen,'Support for course selection','Understand program differences, entry requirements and potential future pathways.'],[ClipboardList,'Admission process assistance','Ask about application steps, documents and the questions to raise with institutions.'],[MessageCircle,'Student and parent communication','Speak directly with our team to clarify doubts and understand next steps.']].map(([Icon,title,desc]:any)=><article className="card" key={title}><div className="icon-box"><Icon/></div><h3>{title}</h3><p>{desc}</p></article>)}</div></div></section>
  <section className="section soft"><div className="wrap grid-2"><div><div className="eyebrow">Admission consultancy</div><h2>Looking for admission at another college or institute?</h2><p className="prose-copy">Parkar also assists students exploring admission opportunities beyond its own branches. Discuss your education background, preferred course and location with us. We can help you identify questions to ask and requirements to verify. The receiving institution makes the final admission decision.</p><BtnLink href="/admission-consultancy">Explore admission consultancy <ArrowRight size={15}/></BtnLink></div><div className="steps">{[['01','Tell us about yourself','Share your last qualification and preferred course.'],['02','Discuss your options','Talk through possible institutions and requirements to verify.'],['03','Understand the process','Ask about applications, documentation and admission conditions.'],['04','Take the next step','Contact the appropriate institution and follow its process.']].map(([num,title,body])=><div className="card" key={num}><div className="step-num">{num}</div><h3>{title}</h3><p>{body}</p></div>)}</div></div></section>
  <section className="section"><div className="wrap"><SectionHead kicker="Our branches" title="Find your nearest Parkar branch">Nine listed locations across Gujarat. Explore each location and contact the team to confirm courses, address and admission details before visiting.</SectionHead><div className="branch-grid">{branches.map(b=><BranchCard key={b.slug} branch={b}/>)}</div></div></section>
  <section className="section soft"><div className="wrap"><SectionHead kicker="Career pathways" title="Explore potential career pathways">Healthcare education can open different possibilities depending on the qualification, training, practical experience and applicable professional requirements. Completing one course does not qualify a learner for every role.</SectionHead><div className="career-grid">{[['Nursing and patient care','Pathways depend on a recognized nursing qualification and applicable registration.'],['Laboratory and diagnostic services','Laboratory support roles depend on the specific award and employer criteria.'],['Healthcare assistance','Assistant roles have defined support responsibilities and require appropriate supervision.'],['Dental and clinical support','Support work differs from licensed dental or clinical practice.'],['Further healthcare education','Progression depends on eligibility and the receiving institution.'],['International medical education guidance','Recognition and licensing requirements must be verified with official sources.']].map(([t,d])=><article className="card" key={t}><div className="icon-box"><BriefcaseMedical/></div><h3>{t}</h3><p>{d}</p></article>)}</div><p style={{marginTop:18,fontWeight:700,color:'#082b59'}}>Career Guidance and Placement Assistance — Contact Us for Course-Specific Details.</p></div></section>
  <section className="section"><div className="wrap grid-2"><div><div className="eyebrow">Learning and student life</div><h2>A glimpse into learning and student life</h2><p className="prose-copy">Explore spaces reserved for authentic institute photographs, once supplied by Parkar. Current gallery tiles are explicitly illustrative placeholders and do not depict Parkar students, branches or activities.</p><BtnLink href="/gallery">View full gallery <ArrowRight size={16}/></BtnLink></div>
  
  
<div className="gallery-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
  
{[
  {
    title: 'Classroom',
    src: '/images/classroom.jpg',
  },
  {
    title: 'Students',
    src: '/images/students.jpg',
  },
  {
    title: 'Practical Training',
    src: '/images/practical-training.jpg',
  },
  {
    title: 'Healthcare Lab',
    src: '/images/healthcare-lab.jpg',
  },
].map((photo) => (
  <div
    key={photo.title}
    className="illustrative"
    style={{ padding: 0, overflow: 'hidden' }}
  >
    <img
      src={photo.src}
      alt={photo.title}
      loading="lazy"
      style={{
        display: 'block',
        width: '100%',
        height: '180px',
        objectFit: 'cover',
        borderRadius: 'inherit',
      }}
    />
  </div>
))}

</div>


  </div></section>
  <section className="section soft"><div className="wrap grid-2"><div><div className="eyebrow">Student and parent experiences</div><h2>Your feedback matters</h2><p className="prose-copy">We welcome feedback from students and families. Genuine review content has not yet been supplied, so these review areas remain clearly marked placeholders rather than invented experiences.</p><BtnLink href="/reviews">Explore feedback page</BtnLink></div><div className="review-placeholder"><div className="review-mark"><Quote/></div><strong>Feedback slot — awaiting authentic submission</strong><span style={{fontSize:13,marginTop:7}}></span></div></div></section>
  <section className="section"><div className="wrap"><SectionHead kicker="Frequently asked questions" title="Helpful answers before you enquire">Requirements and availability vary by course and institution. Our team can help you find the right details to verify.</SectionHead><FaqList/></div></section>
  <section className="cta-band"><div className="wrap"><div className="eyebrow" style={{color:'#f1d47b'}}>Your next step</div><h2>Ready to take the next step towards your healthcare career?</h2><p>Tell us about your education background and the course you are interested in. Contact Parkar for guidance on eligibility, admission requirements and available opportunities.</p><div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:22}}><WhatsApp message={homeMessage}>Enquire on WhatsApp</WhatsApp><a className="btn btn-white" href={phoneHref(phone)}><Phone size={16}/>Call our team</a></div></div></section>
  <section className="section"><div className="wrap grid-2"><div><div className="eyebrow">Visit or contact Parkar — Deesa</div><h2>We’re here to help you understand your options</h2><p className="address"><strong>Parkar Paramedical Institute & Consultancy</strong><br/>{address}</p><p>GR reference: GJ/63/VG/01. </p><div style={{display:'flex',gap:10,flexWrap:'wrap'}}><a className="btn btn-navy" href={phoneHref(phone)}><Phone size={16}/>Call now</a><WhatsApp message={homeMessage}>WhatsApp us</WhatsApp><a className="btn btn-outline" href={`mailto:${email}`}><Mail size={16}/>Email us</a><a className="btn btn-outline" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}><Navigation size={16}/>Get directions</a></div></div><div className="card"><h3>Talk with our team</h3><div className="contact-card"><div className="icon-box"><UserRound/></div><div><strong>Sureshbhai Shrimali</strong><br/><a href={phoneHref(phone)}>{phone}</a></div></div><hr style={{border:0,borderTop:'1px solid #e5ebf0',margin:'16px 0'}}/><div className="contact-card"><div className="icon-box"><UserRound/></div><div><strong>Jitubhai Barot</strong><br/><a href={phoneHref(secondary)}>{secondary}</a></div></div></div></div></section>
 </main>;
}
function CoursesPage() {
 const [filter,setFilter]=useState('All courses');
 const filtered=filter==='All courses'?courses:courses.filter(c=>c.category===filter);
 return <main><PageHero eyebrow="Course directory" title="Explore healthcare education pathways" description="Browse nursing, diagnostic, assistant-level, medical degree guidance and open-schooling options. Contact Parkar to verify specific program availability, eligibility, duration, fees and admission procedures." crumbs={[{label:'Courses'}]}/><section className="section"><div className="wrap"><div className="filter-row"><button className={`filter-pill ${filter==='All courses'?'active':''}`} onClick={()=>setFilter('All courses')}>All courses ({courses.length})</button>{categories.map(c=><button key={c} onClick={()=>setFilter(c)} className={`filter-pill ${filter===c?'active':''}`}>{c}</button>)}</div><div className="course-grid">{filtered.map(c=><CourseCard key={c.slug} course={c}/>)}</div><div className="notice" style={{marginTop:24}}>Course names and pathways listed for information. Confirm the exact award, provider, current eligibility, duration, fees, recognition and availability with the relevant institution before enrolling.</div></div></section><section className="section soft"><div className="wrap grid-2"><div><SectionHead kicker="A considered decision" title="Questions worth asking before you enrol">Understanding the actual qualification and the institution behind it helps families make an informed choice.</SectionHead><ul className="info-list"><li>What exact award will I receive, and who awards it?</li><li>What is the current eligibility and selection process?</li><li>What supervised practical learning is included?</li><li>What recognition or registration rules apply to my intended role?</li><li>What are the complete fees, timeline and refund terms?</li></ul></div><div className="card"><h3>Talk through your options</h3><p>Share your previous qualification, course interest and preferred location for guidance on what to verify next.</p><WhatsApp message={homeMessage}>Ask about a course</WhatsApp></div></div></section></main>;
}
function CoursePage() {
 const {slug=''}=useParams(); const c=courses.find(item=>item.slug===slug);
 if(!c)return <NotFound/>;
 const related=c.related.map(s=>courses.find(x=>x.slug===s)).filter(Boolean) as Course[];
 const courseFaqs:[string,string][]=[
  [`What is ${c.name}?`,c.intro],
  ['Who can apply?',`Exact eligibility for ${c.name} depends on the specific institution, prior qualification and current applicable rules. Contact the provider for its current written criteria.`],
  ['How long does the course take?','Contact us to confirm the duration offered by the relevant institution. Do not rely on a general estimate; the program and provider matter.'],
  ['What documents may be needed?','Institutions commonly request prior academic marksheets, identity proof, photographs and additional institution-specific documents. Confirm the final list with the institution.'],
  ['What careers can this qualification lead to?',`${c.pathway} No specific job, salary or professional status is promised.`],
  ['Is practical learning included?','Practical or clinical arrangements vary by institution. Ask for details in writing and confirm supervision, facilities and any applicable requirements.']
 ];
 return <main><PageHero eyebrow={c.category} title={`${c.name} — ${c.full}`} description={c.intro} crumbs={[{label:'Courses',href:'/courses'},{label:c.name}]}/><section className="section"><div className="wrap course-detail-grid"><div className="prose-copy">
  <SectionHead kicker="Course introduction" title={`Understanding ${c.name}`}/><p>{c.about}</p><h2>About this course</h2><p>{c.about} Parkar can help you frame questions and explore available pathways; verify the details with the institution offering the course.</p>
  <h2>What you may learn</h2><p>{c.learn}</p><h2>Eligibility and admission</h2><p>Exact eligibility is not stated here because it depends on the specific program, institution and applicable regulations. Ask the receiving institution for current admission criteria. A typical inquiry may involve sharing your last qualification, checking eligibility, understanding documents and application steps, and confirming admission directly with the institution.</p>
  <h2>Course duration</h2><p>Contact us to confirm the duration offered by the relevant institution.</p>
  <h2>Documents to ask about</h2><p>Previous academic marksheets, identity proof, photographs and other institution-specific documents may be requested. Requirements vary; obtain the final list from the relevant institution.</p>
  <h2>Practical learning and responsibilities</h2><p>{c.category==='Healthcare Assistant Courses'?'Assistant-level training is not a nursing licence and does not replace doctors, registered nurses or other licensed professionals. Responsibilities must remain within the role and supervision permitted by applicable rules. ':''}Practical training, clinical exposure and facilities vary. Confirm any specific arrangements before admission.</p>
  <h2>Career opportunities and further study</h2><p>{c.pathway} {c.audience}</p>
  <h2>Who should explore {c.name}?</h2><p>{c.audience} Compare the exact qualification and your preferred future path before making a decision.</p>
  {c.slug==='bhms'||c.slug==='bams'||c.slug==='mbbs-abroad'?<div className="notice"><strong>Professional degree guidance:</strong> Confirm institution recognition, current entrance eligibility, professional registration and applicable medical education rules through official sources. Admission guidance is not a recognition or practice decision.</div>:null}
  {c.slug.startsWith('nios')?<div className="notice">NIOS subject choices and current eligibility should be checked directly with NIOS. Before selecting subjects, verify the requirements of the specific further course you intend to pursue.</div>:null}
  {c.slug==='si-course'?<div className="notice">SI Course – Learn, Grow & Build Your Future.</div>:null}
  <h2>Frequently asked questions</h2><FaqList items={courseFaqs}/>
 </div><aside className="side-panel"><div className="card"><span className="badge">Personal guidance</span><h3>Ask about {c.name}</h3><p>Tell us your qualification and preferred location. We can help you understand questions to confirm with the institution.</p><WhatsApp message={courseMessage(c.name)}>Enquire about {c.name}</WhatsApp><div style={{marginTop:14}}><a className="link-arrow" href={phoneHref(phone)}><Phone size={15}/>Call {phone}</a></div><div className="gold-line"/><strong>Career Guidance and Placement Assistance — Contact Us for Course-Specific Details.</strong><p style={{marginTop:10}}>Guiding You Towards a Brighter Future.</p></div></aside></div></section>
 <section className="section soft"><div className="wrap"><SectionHead title="Related courses">Explore related pathways and compare their course-specific entry requirements.</SectionHead><div className="course-grid">{related.map(item=><CourseCard key={item.slug} course={item}/>)}</div></div></section>
 <section className="cta-band"><div className="wrap"><h2>Need help understanding {c.name}?</h2><p>Share your last qualification, preferred location and questions. The institution confirms final eligibility and admission.</p><WhatsApp message={courseMessage(c.name)}>Ask about {c.name}</WhatsApp></div></section></main>;
}
function AboutPage() { return <main><PageHero eyebrow="About Parkar" title="A steady guide for students and families" description="Parkar Paramedical Institute & Consultancy supports people exploring healthcare education pathways, course information and admission processes in Gujarat." crumbs={[{label:'About Us'}]}/><section className="section"><div className="wrap grid-2"><div className="prose-copy"><div className="eyebrow">Our story</div><h2>Education guidance grounded in clear conversations</h2><p>Parkar is based in Deesa, Banaskantha, Gujarat, and has more than 10 years of experience in the field. Across nine listed branch locations, the organization provides institute services and admission consultancy for students comparing healthcare education options.</p><p>Students and parents can discuss course interests, prior qualifications, locations and application questions. When opportunities involve another institution, that institution determines its eligibility, recognition and admissions.</p><p>Our aim is to make unfamiliar course pathways easier to understand—not to replace official advice or promise outcomes.</p><div className="notice"> Guiding Aspirations. Supporting Education. Building Healthcare Careers.

Parkar Paramedical Institute & Consultancy is committed to helping students explore educational opportunities and make informed decisions about their future.</div></div><div className="card soft"><div className="icon-box"><Landmark/></div><h3>Parkar at a glance</h3><ul className="info-list"><li><strong>Location:</strong> Deesa, Banaskantha, Gujarat</li><li><strong>Experience:</strong> More than 10 years in the field</li><li><strong>Network:</strong> Nine listed locations</li><li><strong>Tagline:</strong> Learn • Care • Excel</li><li><strong>Services:</strong> Course guidance, institute services and admission consultancy</li></ul></div></div></section>
 <section className="section soft"><div className="wrap grid-2"><article className="card"><div className="icon-box"><HeartPulse/></div><h3>Our mission</h3><p>To help students and families understand healthcare education pathways and make informed decisions about courses, institutions and future opportunities.</p></article><article className="card"><div className="icon-box"><Award/></div><h3>Our vision</h3><p>To become a trusted education guidance destination for aspiring healthcare professionals across Gujarat.</p></article></div></section>
 <section className="section"><div className="wrap"><SectionHead title="Guidance that starts with your goals">We encourage every learner to verify the facts that matter before choosing a program.</SectionHead><div className="grid-3">{[['Understand the course','Explore course purpose, award and intended learning.'],['Check the institution','Verify recognition, eligibility and current admission process directly.'],['Choose your next step','Ask about documents, location and timelines before committing.']].map(([title,body])=><div className="card" key={title}><div className="icon-box"><ShieldCheck/></div><h3>{title}</h3><p>{body}</p></div>)}</div></div></section>
 <section className="section soft"><div className="wrap grid-2"><div><SectionHead title="Meet the management">For course questions and admission guidance, contact the team directly.</SectionHead></div><div className="card"><h3>Sureshbhai Shrimali</h3><a className="link-arrow" href={phoneHref(phone)}><Phone size={15}/>Call {phone}</a><hr style={{border:0,borderTop:'1px solid #e5ebf0',margin:'18px 0'}}/><h3>Jitubhai Barot</h3><a className="link-arrow" href={phoneHref(secondary)}><Phone size={15}/>Call {secondary}</a><p style={{marginTop:16}}>Committed to Education. Dedicated to Your Future</p></div></div></section><section className="cta-band"><div className="wrap"><h2>Let’s discuss your next step</h2><p>Tell us what you are considering and we will help you understand what details to verify.</p><WhatsApp message="Hello Parkar Team. I would like to learn more about Parkar and discuss healthcare education guidance.">Speak with Parkar</WhatsApp></div></section></main>; }
function BranchesPage() { return <main><PageHero eyebrow="Our locations" title="Nine listed Parkar branch locations" description="Explore each location and contact the team to confirm address, current services, course availability and admission details before you travel." crumbs={[{label:'Our Branches'}]}/><section className="section"><div className="wrap"><div className="branch-grid">{branches.map(b=><BranchCard key={b.slug} branch={b}/>)}</div><div className="notice" style={{marginTop:24}}>For other branch enquiries, please visit our Contact Us page and call us for details.</div></div></section></main>; }
function BranchPage() {
 const {slug=''}=useParams();const b=branches.find(x=>x.slug===slug);if(!b)return <NotFound/>;
 const branchFaqs:[string,string][]=[
  [`Where is the ${b.place} branch?`,b.slug==='deesa'?address:`${b.place} is the listed area. An exact street address has not been supplied; please contact Parkar to confirm before travelling.`],
  ['Which courses are available at this branch?','Course availability can vary by location and institution. Contact Parkar to confirm the current offering for this branch.'],
  ['Can I get admission guidance here?','Contact the team with your qualification, course interest and questions. Guidance can help you understand what to verify; the receiving institution decides admission.'],
  ['What should I ask before applying?','Confirm the course award, provider, eligibility, duration, fees, recognition, practical arrangements and required documents directly with the relevant institution.'],
  ['Can parents contact the team?','Yes. Students and parents are welcome to discuss course information and next steps by phone or WhatsApp.']
 ];
 return <main><PageHero eyebrow="Listed Parkar location" title={b.title} description={b.intro} crumbs={[{label:'Our Branches',href:'/branches'},{label:b.place}]}/><section className="section"><div className="wrap grid-2"><div><SectionHead kicker="Your local inquiry" title={`Education guidance for ${b.place}`}/><div className="prose-copy"><p>{b.intro}</p><p>{b.focus}</p><p>Parkar supports students and parents with course information across nursing, paramedical, laboratory and diagnostic, healthcare assistant, medical degree guidance and open-schooling pathways. The exact course and institution availability for this location must be confirmed with the team.</p><p>{b.local}</p></div><WhatsApp message={branchMessage(b.title)}>Enquire about {b.place}</WhatsApp></div><div className="card"><div className="icon-box"><MapPin/></div><h3>Contact about this location</h3><p>Ask about current course options, branch arrangements and admission guidance.</p><WhatsApp message={branchMessage(b.title)}>Message the team</WhatsApp><div style={{marginTop:15}}><a className="link-arrow" href={phoneHref(phone)}><Phone size={15}/>Call {phone}</a></div>{b.slug==='deesa'?<><div className="gold-line"/><p className="address"><strong>Verified Deesa address</strong><br/>{address}</p><a className="link-arrow" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}><Navigation size={15}/>Get directions</a></>:<div className="notice" style={{marginTop:17}}>For branch details and directions, please contact us. We're happy to assist you!</div>}</div></div></section>
 <section className="section soft"><div className="wrap grid-2"><div><SectionHead title="Questions about this branch?">The team can help clarify your inquiry, while the course provider confirms final program details.</SectionHead><FaqList items={branchFaqs}/></div><div className="card"><h3>Explore course options</h3><p>Browse the course directory, then ask which options can be confirmed for {b.place}.</p><BtnLink href="/courses">View all courses <ArrowRight size={15}/></BtnLink><div className="gold-line"/><h3>Related pathways to explore</h3>{courses.slice(0,4).map(c=><p key={c.slug}><Link className="link-arrow" href={`/courses/${c.slug}`}>{c.name} <ArrowRight size={14}/></Link></p>)}</div></div></section>
 <section className="section"><div className="wrap"><SectionHead title="Other Parkar locations">If another location suits your inquiry, contact the team to confirm current details.</SectionHead><div className="branch-grid">{branches.filter(x=>x.slug!==b.slug).slice(0,3).map(x=><BranchCard key={x.slug} branch={x}/>)}</div></div></section><section className="cta-band"><div className="wrap"><h2>Ask about the {b.place} location</h2><p>Tell us your course interest and preferred location. Availability and final admission are confirmed by the institution.</p><WhatsApp message={branchMessage(b.title)}>Enquire about this branch</WhatsApp></div></section></main>;
}
function ConsultancyPage() {
 return <main><PageHero eyebrow="Admission consultancy" title="Make your next education decision with clarity" description="Parkar helps students explore healthcare admission opportunities at its own listed branches and other suitable institutions. Guidance supports your research; the receiving institution and relevant authorities determine eligibility, recognition and admission." crumbs={[{label:'Admission Consultancy'}]}/>
  <section className="section"><div className="wrap grid-2"><div className="prose-copy"><h2>Guidance that starts with your situation</h2><p>Choosing an education pathway often raises practical questions: Which course fits my prior qualification? What should I ask a college? How do I compare institutions or apply from outside my home district?</p><p>Parkar can discuss your course interests, preferred location and education background, and help you identify information to verify. This service may relate to a Parkar branch or an external institution, including international medical education options where relevant.</p><p>Consultancy is guidance, not a promise of admission, recognition, eligibility or professional registration. Always obtain current written details from the institution and official authorities.</p><WhatsApp message="Hello Parkar Team. I am looking for admission consultancy. My last qualification is [qualification] and I am interested in [course]. Please guide me on suitable options and requirements to verify.">Get personalised admission guidance</WhatsApp></div><div className="card soft"><div className="icon-box"><ClipboardList/></div><h3>What we can discuss</h3><ul className="info-list"><li>Course selection guidance based on your interests</li><li>Eligibility-related questions to verify with providers</li><li>Institution selection considerations</li><li>Application steps and documentation questions</li><li>Options for students outside their home district</li><li>Careful questions for international medical education</li></ul></div></div></section>
  <section className="section soft"><div className="wrap"><SectionHead title="A four-step admission conversation">The process helps you prepare and ask informed questions; the institution controls its own application and decision process.</SectionHead><div className="steps">{[['01','Tell us about yourself','Share your last qualification, course interest and preferred location.'],['02','Discuss your options','Explore possible pathways and requirements that need confirmation.'],['03','Understand the process','Ask about applications, documents and institution-specific conditions.'],['04','Take your next step','Contact the appropriate institution and follow its current admission process.']].map(([n,t,d])=><article className="card" key={n}><div className="step-num">{n}</div><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
  <section className="section"><div className="wrap grid-2"><div><SectionHead title="Start an inquiry">Use the short form to prepare a readable WhatsApp message. It is not stored or sent until you choose to send it in WhatsApp.</SectionHead><div className="notice">Please share your details, and our team will be happy to assist you with your enquiry.</div></div><div className="card"><FormInquiry/></div></div></section>
  <section className="section soft"><div className="wrap"><SectionHead title="Admission consultancy questions"/><FaqList items={[
   ['Does Parkar guarantee admission?','No. Parkar provides guidance. The receiving institution makes admission decisions and authorities determine eligibility and recognition.'],
   ['Can I ask about colleges outside Gujarat?','You can discuss your interests with the team. Verify the current course, institution and admission rules directly with the provider.'],
   ['What should I share in an inquiry?','Your name, last qualification, course interest, preferred city and question are useful. A phone number is optional. Do not send sensitive documents through this website.'],
   ['Can Parkar help with MBBS abroad?','You can request guidance on questions to research. Independently verify the institution and program, entry eligibility, recognition and licensing requirements through official sources.'],
   ['Are course fees and duration fixed?','Fees and duration vary by program and provider. Confirm current written details with the relevant institution.']
  ]}/></div></section></main>;
}

const galleryItems = [
  { title: 'Institute and classrooms', category: 'Institute and Classrooms', image: '/images/classroom.jpg' },
  { title: 'A learning environment', category: 'Institute and Classrooms', image: '/images/students.jpg' },
  { title: 'Practical learning', category: 'Practical Training', image: '/images/practical-training.jpg' },
  { title: 'Skills practice area', category: 'Practical Training', image: '/images/nursing-skills-lab.jpg' },
  { title: 'Internship moments', category: 'Internship', image: '/images/paramedical-classroom.jpg' },
  { title: 'Clinical exposure', category: 'Clinical Exposure', image: '/images/patient-care-training.jpg' },
  { title: 'Student activities', category: 'Student Activities', image: '/images/students.jpg' },
  { title: 'Interview preparation', category: 'Interviews', image: '/images/admission-counselling.jpg' },
  { title: 'Career guidance conversation', category: 'Career Guidance', image: '/images/medical-studies.jpg' },
  { title: 'Institute event', category: 'Events and Achievements', image: '/images/medical-laboratory.jpg' },
  { title: 'Learning together', category: 'Student Activities', image: '/images/medical-studies.jpg' },
  { title: 'Celebrating a milestone', category: 'Events and Achievements', image: '/images/clinical-simulation.jpg' },
];
const galleryCategories=['All','Institute and Classrooms','Practical Training','Internship','Clinical Exposure','Student Activities','Interviews','Career Guidance','Events and Achievements'];

function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [active, setActive] =
    useState<(typeof galleryItems)[number] | null>(null);

  const list =
    filter === 'All'
      ? galleryItems
      : galleryItems.filter((g) => g.category === filter);

  return (
    <main>
      <PageHero
        eyebrow="Gallery"
        title="A place for Parkar’s real stories"
        description="Authentic photographs of institute spaces, learning and activities have not been supplied yet. Every tile below is an explicitly illustrative placeholder to be replaced with a genuine Parkar image."
        crumbs={[{ label: 'Gallery' }]}
      />

      <section className="section">
        <div className="wrap">
          <div className="notice" style={{ marginBottom: 22 }}>
            A Glimpse into Our Learning Journey &amp; Student Community.
          </div>

          <div className="filter-row">
            {galleryCategories.map((c) => (
              <button
                key={c}
                className={`filter-pill ${filter === c ? 'active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {list.map((g, i) => (
              <button
                type="button"
                className="gallery-tile"
                onClick={() => setActive(g)}
                key={g.title}
                data-testid={`button-gallery-${i}`}
                aria-label={`View image: ${g.title}`}
              >
                <div className="gallery-image-frame">
                  <img
                    src={g.image}
                    alt={g.title}
                    className="gallery-image"
                    loading="lazy"
                  />
                </div>

                <strong>{g.title}</strong>
                <small>{g.category}</small>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <WhatsApp message="Hello Parkar Team. I would like to enquire about your institute activities and student learning.">
              Ask Parkar a question
            </WhatsApp>
          </div>
        </div>
      </section>

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <div
            className="lightbox-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="close-btn"
              aria-label="Close image view"
              onClick={() => setActive(null)}
            >
              <X />
            </button>

            <div className="lightbox-image-frame">
              <img
                src={active.image}
                alt={active.title}
                className="lightbox-image"
              />
            </div>

            <h3>{active.title}</h3>
            <p>{active.category}</p>
          </div>
        </div>
      )}
    </main>
  );
}


function ReviewsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Student & Parent Feedback"
        title="Your Experience Matters to Us"
        description="Every student's journey is unique. We welcome your thoughts, suggestions and feedback to help us make the learning and guidance experience better."
        crumbs={[{ label: 'Student Reviews' }]}
      />

      <section className="section">
        <div className="wrap">

          {/* Welcome section */}
          <div className="reviews-intro">
            <div className="reviews-intro-content">
              <span className="reviews-eyebrow">
                YOUR VOICE. OUR MOTIVATION.
              </span>

              <h2>
                Every Journey Has a Story.
                <br />
                <span>Your Feedback Helps Us Grow.</span>
              </h2>

              <p>
                At Parkar Paramedical Institute & Consultancy, we value
                the opinions of students and parents. Your feedback helps
                us understand your experience, improve our guidance and
                serve future students better.
              </p>

              <div className="reviews-actions">
                <WhatsApp message="Hello Parkar Team. I would like to share my feedback about my experience. Please guide me on how I can share it.">
                  Share Your Feedback
                </WhatsApp>
              </div>
            </div>

            <div className="reviews-visual" aria-hidden="true">
              <div className="reviews-visual-circle">
                <GraduationCap size={76} strokeWidth={1.4} />
              </div>
              <div className="reviews-floating-card reviews-card-top">
                <HeartPulse size={22} />
                <span>Student First</span>
              </div>
              <div className="reviews-floating-card reviews-card-bottom">
                <MessageCircle size={22} />
                <span>Your Voice Matters</span>
              </div>
            </div>
          </div>

          {/* What feedback helps us improve */}
          <div className="reviews-section-heading">
            <span className="reviews-eyebrow">WE VALUE YOUR INPUT</span>
            <h2>Help Us Make Your Experience Better</h2>
            <p>
              Your suggestions can help us improve different aspects of
              student support and educational guidance.
            </p>
          </div>

          <div className="reviews-benefits">
            <article className="reviews-benefit">
              <div className="reviews-benefit-icon">
                <GraduationCap size={27} />
              </div>
              <h3>Learning Experience</h3>
              <p>
                Share your thoughts about the learning environment and
                educational support.
              </p>
            </article>

            <article className="reviews-benefit">
              <div className="reviews-benefit-icon">
                <Users size={27} />
              </div>
              <h3>Student Guidance</h3>
              <p>
                Tell us how we can make course information and career
                guidance more helpful.
              </p>
            </article>

            <article className="reviews-benefit">
              <div className="reviews-benefit-icon">
                <HeartPulse size={27} />
              </div>
              <h3>Support & Communication</h3>
              <p>
                Help us understand how we can improve communication
                and support for students and families.
              </p>
            </article>
          </div>

          {/* Feedback call to action */}
          <div className="reviews-cta">
            <div className="reviews-cta-icon">
              <MessageCircle size={30} />
            </div>

            <div className="reviews-cta-content">
              <h2>We'd Love to Hear From You</h2>
              <p>
                Are you a student or parent who would like to share
                an experience or suggestion? Contact our team on
                WhatsApp. We welcome honest feedback and will seek
                your permission before publishing any testimonial.
              </p>
            </div>

            <div className="reviews-cta-action">
              <WhatsApp message="Hello Parkar Team. I am a student/parent and would like to share my feedback or suggestions. Please guide me.">
                Contact Parkar
              </WhatsApp>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

function ContactPage() {
 return <main><PageHero eyebrow="Contact Parkar" title="Talk with our team" description="Contact the Deesa main branch for course inquiries, admission guidance and questions about the listed locations." crumbs={[{label:'Contact Us'}]}/><section className="section"><div className="wrap contact-layout"><div><div className="card contact-card"><div className="icon-box"><UserRound/></div><div><h3 style={{margin:'0 0 4px'}}>Sureshbhai Shrimali</h3><a href={phoneHref(phone)}><Phone size={14}/> {phone}</a></div></div><div className="card contact-card" style={{marginTop:12}}><div className="icon-box"><UserRound/></div><div><h3 style={{margin:'0 0 4px'}}>Jitubhai Barot</h3><a href={phoneHref(secondary)}><Phone size={14}/> {secondary}</a></div></div><div className="card" style={{marginTop:12}}><h3>Parkar Paramedical Institute & Consultancy</h3><p className="address">{address}</p><p><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></p><p><strong>GR reference:</strong> GJ/63/VG/01</p><p className="prose-copy">This is a supplied institute reference. It does not establish accreditation for every listed course.</p><div style={{display:'flex',gap:9,flexWrap:'wrap'}}><a className="btn btn-navy" href={phoneHref(phone)}><Phone size={15}/>Call now</a><WhatsApp message={homeMessage}>WhatsApp</WhatsApp><a className="btn btn-outline" href={`mailto:${email}`}><Mail size={15}/>Email</a></div><div style={{marginTop:12}}><a className="link-arrow" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}><Navigation size={15}/>Directions to verified Deesa address</a></div></div><div className="notice" style={{marginTop:12}}>Need directions? Contact our team for branch locations and assistance.</div></div><div className="card"><div className="eyebrow">Student inquiry</div><h2 style={{fontSize:30}}>Continue your inquiry on WhatsApp</h2><p>Required fields help prepare a clear message. Contact number is optional. The form does not save or send information from this site.</p><FormInquiry/><hr style={{border:0,borderTop:'1px solid #e3eaf0',margin:'25px 0'}}/><h3>Contact FAQs</h3><FaqList items={[[`What is the Deesa address?`,address],['Can I contact Parkar by email?',`Yes. Write to ${email}.`],['Is the phone number on this page clickable?','Yes. Use the call links to contact the primary or secondary number from your device.'],['How can I reach another branch?','Open the relevant branch page and use its WhatsApp inquiry. Confirm its address before travelling.']]}/></div></div></section></main>;
}
const legalContent:Record<string,{title:string;desc:string;sections:[string,string][]}> = {
 'privacy-policy':{title:'Privacy Policy',desc:'How this information website handles the details you choose to use in an inquiry.',sections:[
  ['Information you enter','The inquiry form uses your name, optional phone number, last qualification, course interest, preferred city or branch and question to prepare a message in your browser. The website does not submit or save that message.'],
  ['WhatsApp handoff','When you select Continue on WhatsApp, your browser opens WhatsApp with the prepared message addressed to Parkar’s primary number. You decide whether to send it. WhatsApp is a third-party service with its own privacy practices.'],
  ['Calls, email and directions','When you choose to call, email or open directions, your device or the destination service handles that interaction. The site does not claim that a call or email has been received.'],
  ['Data minimisation','Do not enter sensitive documents or confidential information into the inquiry form. Contact Parkar directly if you need to ask how to share information safely.'],
  ['Questions','For privacy questions about an inquiry, contact Parkar at '+email+' or '+phone+'.']
 ]},
 'terms-and-conditions':{title:'Terms and Conditions',desc:'Terms for using Parkar’s public course and admission information website.',sections:[
  ['Information purpose','Website content is general educational information and guidance. It is not a substitute for current admission rules, professional advice or official institutional information.'],
  ['Course and branch details','Program availability, names, eligibility, duration, fees, recognition, addresses and facilities can vary and may change. Confirm current details directly with Parkar and the relevant institution before making a decision or travelling.'],
  ['Admission decisions','Parkar may provide guidance, but the receiving institution and applicable authorities determine admission, eligibility, recognition and professional registration.'],
  ['No outcome promise','No job, placement, salary, admission, licence or professional status is guaranteed. Career Guidance and Placement Assistance — Contact Us for Course-Specific Details.'],
  ['Third-party services','WhatsApp, email, calls and mapping services are operated by third parties and may have separate terms and privacy practices.']
 ]},
 'disclaimer':{title:'Disclaimer',desc:'Important limits and accuracy notes for course and institute information.',sections:[
  ['Course information','Course descriptions on this site are introductory. Confirm exact qualifications, providers, eligibility, syllabus, practical learning, duration, fees and current requirements with the institution offering the program.'],
  ['Recognition and professional practice','No affiliation, approval, accreditation or recognition is claimed for any course by this website. The supplied GR reference GJ/63/VG/01 is an institute reference and does not establish course accreditation. For professional degrees and international medical education, independently verify current recognition, entrance and licensing rules through official sources.'],
  ['Assistant roles','Assistant-level courses do not make a learner a doctor, registered nurse, dentist or other licensed professional. Duties and supervision are governed by applicable rules and employer policies.'],
  ['NIOS','Check current NIOS eligibility, subject and examination rules with NIOS. Confirm that selected subjects meet the entry requirements of the intended further course.'],
  ['Branches and locations','Only the Deesa address shown on this site has been supplied as verified. Other branch areas are listed without street addresses or map pins; call before travelling.'],
  ['Career guidance','Career outcomes depend on the individual qualification, institution, applicable rules and employer requirements. Guiding You Towards a Brighter Future.']
 ]}
};
function LegalPage({slug}:{slug:string}) {
 const content=legalContent[slug];if(!content)return <NotFound/>;
 return <main><PageHero eyebrow="Website information" title={content.title} description={content.desc} crumbs={[{label:content.title}]}/><section className="section"><div className="wrap" style={{maxWidth:850}}><p className="prose-copy">Last updated: 2025. Please contact Parkar if you need clarification about information on this website.</p>{content.sections.map(([h,p])=><section className="prose-copy" key={h}><h2 style={{fontSize:24}}>{h}</h2><p>{p}</p></section>)}<div className="card soft"><h3>Questions about this notice?</h3><p>Contact Parkar directly using the verified contact details.</p><WhatsApp message={`Hello Parkar Team. I have a question about the ${content.title} page.`}>Contact Parkar</WhatsApp></div></div></section></main>;
}
function NotFound() { return <main className="empty404"><div className="eyebrow">Page not found</div><h1>We couldn’t find that page.</h1><p className="lead">The page may have moved. Explore the course directory or return to the Parkar home page.</p><div style={{display:'flex',justifyContent:'center',gap:10,flexWrap:'wrap',marginTop:22}}><BtnLink href="/">Go to home</BtnLink><BtnLink href="/courses" className="btn btn-outline">Browse courses</BtnLink></div></main>; }
function Seo({title,description}:{title:string;description:string}) {
 useEffect(()=>{document.title=`${title} | Parkar Paramedical Institute & Consultancy`;let meta=document.querySelector('meta[name="description"]');if(!meta){meta=document.createElement('meta');meta.setAttribute('name','description');document.head.appendChild(meta);}meta.setAttribute('content',description);let og=document.querySelector('meta[property="og:title"]');if(!og){og=document.createElement('meta');og.setAttribute('property','og:title');document.head.appendChild(og);}og.setAttribute('content',document.title);let ogDescription=document.querySelector('meta[property="og:description"]');if(!ogDescription){ogDescription=document.createElement('meta');ogDescription.setAttribute('property','og:description');document.head.appendChild(ogDescription);}ogDescription.setAttribute('content',description);let twitterTitle=document.querySelector('meta[name="twitter:title"]');if(twitterTitle)twitterTitle.setAttribute('content',document.title);let twitterDescription=document.querySelector('meta[name="twitter:description"]');if(twitterDescription)twitterDescription.setAttribute('content',description);},[title,description]);return null;
}
function HomeRoute() {return <><Seo title="Healthcare Education & Admission Guidance in Gujarat" description="Explore healthcare courses, nine listed locations and admission guidance from Parkar Paramedical Institute & Consultancy, Deesa."/><HomePage/></>;}
function CourseRoute() {const {slug=''}=useParams();const c=courses.find(x=>x.slug===slug);return <><Seo title={c?`${c.name} Course Information`:'Course Not Found'} description={c?c.intro:'Course page not found.'}/><CoursePage/></>;}
function BranchRoute() {const {slug=''}=useParams();const b=branches.find(x=>x.slug===slug);return <><Seo title={b?`${b.place} Branch`:'Branch Not Found'} description={b?b.intro:'Branch page not found.'}/><BranchPage/></>;}
function SimpleRoute({title,description,children}:{title:string;description:string;children:ReactNode}) {return <><Seo title={title} description={description}/>{children}</>;}
function Router() {
 const [location]=useLocation();
 return <ErrorBoundary resetKey={location}><Shell><Switch>
   <Route path="/" component={HomeRoute}/>
   <Route path="/about">{()=> <SimpleRoute title="About Parkar" description="Learn about Parkar’s education guidance, experience and nine listed locations."><AboutPage/></SimpleRoute>}</Route>
   <Route path="/courses">{()=> <SimpleRoute title="Courses" description="Browse nursing, paramedical, assistant, medical degree guidance and NIOS course pathways."><CoursesPage/></SimpleRoute>}</Route>
   <Route path="/courses/:slug" component={CourseRoute}/>
   <Route path="/branches">{()=> <SimpleRoute title="Our Branches" description="Explore nine listed Parkar locations across Gujarat. Confirm exact branch details before visiting."><BranchesPage/></SimpleRoute>}</Route>
   <Route path="/branches/:slug" component={BranchRoute}/>
   <Route path="/admission-consultancy">{()=> <SimpleRoute title="Admission Consultancy" description="Discuss course selection, eligibility questions and admission steps with Parkar."><ConsultancyPage/></SimpleRoute>}</Route>
   <Route path="/gallery">{()=> <SimpleRoute title="Gallery" description="Illustrative image placeholders reserved for authentic Parkar institute photographs."><GalleryPage/></SimpleRoute>}</Route>
   <Route path="/reviews">{()=> <SimpleRoute title="Student Reviews" description="Clearly marked feedback slots awaiting authentic student and parent reviews."><ReviewsPage/></SimpleRoute>}</Route>
   <Route path="/contact">{()=> <SimpleRoute title="Contact Us" description="Call, email or WhatsApp Parkar Paramedical Institute & Consultancy in Deesa, Gujarat."><ContactPage/></SimpleRoute>}</Route>
   <Route path="/privacy-policy">{()=> <SimpleRoute title="Privacy Policy" description="How Parkar’s website inquiry form and WhatsApp handoff work."><LegalPage slug="privacy-policy"/></SimpleRoute>}</Route>
   <Route path="/terms-and-conditions">{()=> <SimpleRoute title="Terms and Conditions" description="Terms for using Parkar’s course information website."><LegalPage slug="terms-and-conditions"/></SimpleRoute>}</Route>
   <Route path="/disclaimer">{()=> <SimpleRoute title="Disclaimer" description="Important accuracy, recognition and course information limitations."><LegalPage slug="disclaimer"/></SimpleRoute>}</Route>
   <Route>{()=> <SimpleRoute title="Page Not Found" description="This Parkar page could not be found."><NotFound/></SimpleRoute>}</Route>
  </Switch></Shell></ErrorBoundary>;
}
function App() { return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/,'')}><Router/></WouterRouter><Toaster/></TooltipProvider></QueryClientProvider>; }
export default App;
