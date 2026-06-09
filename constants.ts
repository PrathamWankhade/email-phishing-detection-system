import { FacultyMember, NavItem, EventItem } from './types';

export const DEPARTMENT_INFO = {
  name: "Information Technology Department",
  college: "Tulsiramji Gaikwad-Patil College of Engineering and Technology",
  parentOrg: "Vidarbha Bahu-uddeshiya Shikshan Sanstha",
  group: "the Gaikwad-Patil Group of Institutions",
  accreditation: [
    "An Autonomous Institute",
    "Accredited by the National Assessment and Accreditation Council (NAAC) with A+ Grade",
    "Programmes under the process of accreditation by the National Board of Accreditation (NBA)",
    "Approved by the Directorate of Technical Education (DTE), Maharashtra (Code: 4151)"
  ],
  location: "Nagpur, Maharashtra",
  tagline: "Excellence in Technical Education and Research",
  contact: {
    email: "hod.it@tgpcet.com",
    phone: "+91 90110 09856",
    address: "Mohgaon, Wardha Road, Nagpur - 441108"
  },
  socials: {
    facebook: "#",
    linkedin: "#",
    instagram: "#"
  }
};

export const CONTACT_DETAILS = [
  {
    role: "Head of Department",
    name: "Dr. Anup Gade",
    email: "hod.it@tgpcet.com",
    phone: "+91 90110 09856",
    hours: "Mon-Fri, 10:00 AM - 4:00 PM"
  },
  {
    role: "Department Office",
    name: "Admin Desk",
    email: "admin.it@tgpcet.com",
    phone: "+91 712 664 4555",
    hours: "Mon-Sat, 9:30 AM - 5:00 PM"
  },
  {
    role: "Student Section",
    name: "Support Team",
    email: "student.support@tgpcet.com",
    phone: "+91 712 664 4556",
    hours: "Mon-Fri, 11:00 AM - 3:00 PM"
  }
];

export const STUDENT_NOTICES = [
  {
    id: 1,
    title: "End Semester Exam Schedule Released",
    date: "Oct 24, 2024",
    type: "Exam",
    isNew: true
  },
  {
    id: 2,
    title: "Workshop on Cloud Computing: Registration Open",
    date: "Oct 22, 2024",
    type: "Event",
    isNew: true
  },
  {
    id: 3,
    title: "Submission Deadline for Mini-Project Extended",
    date: "Oct 20, 2024",
    type: "Academic",
    isNew: false
  },
  {
    id: 4,
    title: "Campus Recruitment Drive - TCS",
    date: "Oct 18, 2024",
    type: "Placement",
    isNew: false
  }
];

export const STUDENT_RESULTS = [
  { semester: "VI", sgpa: "8.45", status: "Pass", date: "June 2024" },
  { semester: "V", sgpa: "8.10", status: "Pass", date: "Dec 2023" },
  { semester: "IV", sgpa: "7.92", status: "Pass", date: "June 2023" },
];

/* 
  NOTE: To use local images for faculty:
  1. Add images to assets/faculty/
  2. Import them at the top (if using a bundler) or reference the public path.
  3. Replace the 'image' string below with the imported variable or path.
*/

export const FACULTY_DATA: FacultyMember[] = [
  {
    id: "hod-1",
    name: "Dr. Anup Gade",
    designation: "Head of Department & Associate Professor",
    qualification: "Ph.D (CSE)",
    joiningDate: "08-July-2007",
    email: "hod.it@tgpcet.com",
    specialization: ["Computer Science", "Network Security"],
    isHod: true,
    image: "https://picsum.photos/id/1/300/300?grayscale", // Local: "/assets/faculty/hod.jpg"
    experience: 17,
    subjects: ["Advanced Computer Architecture", "Network Security", "Research Methodology"],
    researchInterests: ["Cyber Security", "IoT", "Educational Technology"],
    publications: 25,
    bio: "Dr. Anup Gade leads the IT department with a vision for research-driven education. With over 17 years of academic experience, he has guided numerous post-graduate scholars and plays a pivotal role in curriculum development and industry-academia partnerships.",
    socialLinks: { linkedin: "#", googleScholar: "#" }
  },
  {
    id: "fac-1",
    name: "Dr. Mukul Pande",
    designation: "Assistant Professor",
    qualification: "Ph.D",
    joiningDate: "04-April-2015",
    email: "mukul.pande@tgpcet.com",
    specialization: ["Cloud Computing", "Web Technologies"],
    image: "https://picsum.photos/id/2/300/300?grayscale",
    experience: 9,
    subjects: ["Cloud Computing", "Web Design", "Distributed Systems"],
    researchInterests: ["Cloud Security", "Serverless Architecture"],
    publications: 12,
    bio: "Dr. Mukul Pande specializes in Cloud Computing and modern web frameworks. He is actively involved in student innovation projects and leads the departmental cloud infrastructure initiative."
  },
  {
    id: "fac-2",
    name: "Prof. Abhay Rewatkar",
    designation: "Assistant Professor",
    qualification: "M.Tech (CSE)",
    joiningDate: "13-July-2013",
    email: "abhay.rewatkar@tgpcet.com",
    specialization: ["Computer Science", "Algorithms"],
    image: "https://picsum.photos/id/3/300/300?grayscale",
    experience: 11,
    subjects: ["Data Structures", "Analysis of Algorithms", "Theory of Computation"],
    researchInterests: ["Algorithm Optimization", "Complexity Theory"],
    publications: 8,
    bio: "Prof. Abhay Rewatkar is a dedicated academician with a strong focus on core computer science fundamentals. He mentors students for competitive coding and algorithm design."
  },
  {
    id: "fac-3",
    name: "Prof. Nilesh Nagrale",
    designation: "Assistant Professor",
    qualification: "Ph.D (Pursuing)",
    joiningDate: "05-June-2024",
    email: "nilesh.nagrale@tgpcet.com",
    specialization: ["Electronics", "Embedded Systems"],
    image: "https://picsum.photos/id/4/300/300?grayscale",
    experience: 10,
    subjects: ["Digital Electronics", "Microprocessors", "Embedded Systems"],
    researchInterests: ["IoT", "Embedded AI"],
    publications: 5,
    bio: "Prof. Nilesh Nagrale brings expertise in the intersection of hardware and software. His current research focuses on efficient embedded systems for AI applications."
  },
  {
    id: "fac-4",
    name: "Prof. Sushil Bhise",
    designation: "Assistant Professor",
    qualification: "M.Tech (AI & ML)",
    joiningDate: "06-July-2020",
    email: "sushil.bhise@tgpcet.com",
    specialization: ["Artificial Intelligence", "Machine Learning"],
    image: "https://picsum.photos/id/5/300/300?grayscale",
    experience: 5,
    subjects: ["Artificial Intelligence", "Deep Learning", "Python Programming"],
    researchInterests: ["Computer Vision", "NLP"],
    publications: 6,
    bio: "Prof. Sushil Bhise is an AI enthusiast and researcher. He heads the AI/ML laboratory and guides final year students in cutting-edge projects involving deep learning."
  },
  {
    id: "fac-5",
    name: "Prof. Anita Yadav",
    designation: "Assistant Professor",
    qualification: "M.Tech (CSE)",
    joiningDate: "26-June-2024",
    email: "anita.yadav@tgpcet.com",
    specialization: ["Computer Science", "Database Systems"],
    image: "https://picsum.photos/id/6/300/300?grayscale",
    experience: 4,
    subjects: ["Database Management Systems", "SQL", "Big Data Analytics"],
    researchInterests: ["Data Mining", "NoSQL Databases"],
    publications: 3,
    bio: "Prof. Anita Yadav focuses on data engineering and database management. She is passionate about big data technologies and data warehousing."
  },
  {
    id: "fac-6",
    name: "Prof. Sayara Bano Sheikh",
    designation: "Assistant Professor",
    qualification: "M.E (Wireless)",
    joiningDate: "18-December-2023",
    email: "sayara.sheikh@tgpcet.com",
    specialization: ["Wireless Networks", "Mobile Computing"],
    image: "https://picsum.photos/id/7/300/300?grayscale",
    experience: 6,
    subjects: ["Mobile Computing", "Wireless Sensor Networks"],
    researchInterests: ["5G Technology", "Ad-hoc Networks"],
    publications: 4,
    bio: "Prof. Sayara Bano Sheikh specializes in next-generation wireless communication networks."
  },
  {
    id: "fac-7",
    name: "Prof. Ruchita Tajne",
    designation: "Assistant Professor",
    qualification: "M.Tech (CSE)",
    joiningDate: "02-June-2025",
    email: "ruchita.tajne@tgpcet.com",
    specialization: ["Information Technology", "Software Eng."],
    image: "https://picsum.photos/id/8/300/300?grayscale",
    experience: 3,
    subjects: ["Software Engineering", "Object Oriented Analysis"],
    researchInterests: ["Agile Methodologies", "DevOps"],
    publications: 2,
    bio: "Prof. Ruchita Tajne focuses on modern software development methodologies and quality assurance."
  },
  {
    id: "fac-8",
    name: "Prof. T. P. Raju",
    designation: "Assistant Professor",
    qualification: "Ph.D (Pursuing)",
    joiningDate: "01-August-2013",
    email: "tp.raju@tgpcet.com",
    specialization: ["Software Engineering", "System Design"],
    image: "https://picsum.photos/id/9/300/300?grayscale",
    experience: 12,
    subjects: ["System Programming", "Compiler Design"],
    researchInterests: ["System Architecture"],
    publications: 7,
    bio: "Prof. T. P. Raju is a veteran faculty member with over a decade of experience in teaching system-level programming."
  },
  {
    id: "fac-9",
    name: "Prof. Ashwini Mahajan",
    designation: "Assistant Professor",
    qualification: "M.Tech (CSE)",
    joiningDate: "25-July-2023",
    email: "ashwini.mahajan@tgpcet.com",
    specialization: ["Data Structures", "Programming"],
    image: "https://picsum.photos/id/10/300/300?grayscale",
    experience: 4,
    subjects: ["C Programming", "Data Structures"],
    researchInterests: ["Computer Science Education"],
    publications: 1,
    bio: "Prof. Ashwini Mahajan is dedicated to building strong programming foundations in first and second-year students."
  },
  {
    id: "fac-10",
    name: "Prof. Shweta Hedaoo",
    designation: "Assistant Professor",
    qualification: "M.Tech (CSE)",
    joiningDate: "03-July-2025",
    email: "shweta.hedaoo@tgpcet.com",
    specialization: ["Computer Science"],
    image: "https://picsum.photos/id/11/300/300?grayscale",
    experience: 2,
    subjects: ["Operating Systems"],
    researchInterests: ["OS Kernels"],
    publications: 0,
    bio: "Prof. Shweta Hedaoo is a young academician focusing on core computer science subjects."
  },
  {
    id: "fac-11",
    name: "Prof. Jayesh Fating",
    designation: "Teaching Assistant",
    qualification: "B.E (IT)",
    joiningDate: "15-January-2024",
    email: "jayesh.fating@tgpcet.com",
    specialization: ["Information Technology"],
    image: "https://picsum.photos/id/12/300/300?grayscale",
    experience: 1,
    subjects: ["Lab: Web Technology", "Lab: DBMS"],
    researchInterests: [],
    publications: 0,
    bio: "Prof. Jayesh Fating assists in laboratory sessions and practical implementations."
  },
  {
    id: "fac-12",
    name: "Prof. Swati Thengane",
    designation: "Teaching Assistant",
    qualification: "B.E (CSE)",
    joiningDate: "06-February-2024",
    email: "swati.thengane@tgpcet.com",
    specialization: ["Computer Science"],
    image: "https://picsum.photos/id/13/300/300?grayscale",
    experience: 1,
    subjects: ["Lab: Programming"],
    researchInterests: [],
    publications: 0,
    bio: "Prof. Swati Thengane provides crucial support in programming laboratories."
  }
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Faculty", path: "/faculty" },
  { label: "Academics", path: "/academics" },
  { label: "Contact", path: "/contact" },
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: "ev-1",
    title: "TechHorizon 2024",
    date: "Oct 15, 2024",
    description: "Annual national level technical festival showcasing student innovations.",
    category: "Competition",
    image: "https://picsum.photos/600/400?random=1"
  },
  {
    id: "ev-2",
    title: "AI & Machine Learning Workshop",
    date: "Nov 02, 2024",
    description: "Hands-on workshop on Generative AI tools and frameworks.",
    category: "Workshop",
    image: "https://picsum.photos/600/400?random=2"
  },
  {
    id: "ev-3",
    title: "Industry Visit: Infosys Nagpur",
    date: "Dec 10, 2024",
    description: "Industrial exposure visit for 3rd year students.",
    category: "Industrial Visit",
    image: "https://picsum.photos/600/400?random=3"
  }
];

export const SYSTEM_INSTRUCTION = `You are the intelligent assistant for the Information Technology Department of Tulsiramji Gaikwad-Patil College of Engineering and Technology (TGPCET), Nagpur. 

Your goal is to assist students, faculty, and visitors.
Here is key information about the department:
- HOD: Dr. Anup Gade (Specializes in Network Security).
- Faculty Experts: 
  - AI/ML: Prof. Sushil Bhise.
  - Cloud Computing: Dr. Mukul Pande.
  - Algorithms: Prof. Abhay Rewatkar.
  - Electronics/IoT: Prof. Nilesh Nagrale.
- Vision: To emerge as a center of excellence in Information Technology education and research.
- Programs: B.Tech in IT, M.Tech in AI & ML.

Context for Faculty Queries:
- If asked "Who teaches AI?", refer to Prof. Sushil Bhise.
- If asked about the HOD, provide details about Dr. Anup Gade.

General Info:
- Location: Nagpur, Maharashtra.
If asked about time tables, suggest checking the 'Academics' section.
Be polite, professional, and concise.`;