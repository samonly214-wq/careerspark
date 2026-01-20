import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedAt: string;
  description: string;
  requirements?: string[];
  benefits?: string[];
  responsibilities?: string[];
  experience?: string;
  applicants?: number;
  views?: number;
  status?: string;
  postedDate?: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: 'pending' | 'reviewing' | 'interview' | 'rejected' | 'accepted';
  appliedDate: string;
  coverLetter?: string;
  resume?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'seeker' | 'provider';
  avatar?: string;
  company?: string;
}

interface AppContextType {
  user: User | null;
  login: (email: string, password: string, type: 'seeker' | 'provider') => Promise<boolean>;
  signup: (name: string, email: string, password: string, type: 'seeker' | 'provider') => Promise<boolean>;
  logout: () => Promise<void>;
  savedJobs: string[];
  toggleSaveJob: (jobId: string) => void;
  applications: Application[];
  applyToJob: (job: Job, coverLetter: string) => void;
  deleteApplication: (applicationId: string) => void;
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'postedAt'>) => void;
  deleteJob: (jobId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    salary: '$120k - $160k',
    type: 'Full-time',
    postedAt: '2 days ago',
    postedDate: 'Jan 16, 2026',
    description: 'We are seeking an experienced Senior Frontend Developer to join our dynamic team. You will be responsible for building and maintaining our web applications using modern technologies.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'Strong CSS skills', 'Experience with state management', 'RESTful APIs knowledge'],
    benefits: ['Health Insurance', '401k Match', 'Remote Work', 'Flexible Hours', 'Professional Development Budget'],
    responsibilities: [
      'Develop and maintain responsive web applications using React and TypeScript',
      'Collaborate with designers and backend developers to implement new features',
      'Write clean, maintainable, and well-documented code',
      'Participate in code reviews and mentor junior developers',
      'Optimize applications for maximum speed and scalability',
    ],
    experience: '5+ years',
    applicants: 24,
    views: 156,
    status: 'Active',
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Digital Solutions Corp',
    location: 'New York, NY',
    salary: '$130k - $180k',
    type: 'Full-time',
    postedAt: '3 days ago',
    postedDate: 'Jan 15, 2026',
    description: 'Seeking a strategic product manager to lead our product roadmap and work with cross-functional teams to deliver exceptional products.',
    requirements: ['3+ years PM experience', 'Agile/Scrum knowledge', 'Technical background', 'Data-driven decision making'],
    benefits: ['Health Insurance', 'Stock Options', 'Unlimited PTO', 'Learning Budget'],
    responsibilities: [
      'Define product vision and strategy',
      'Work with engineering teams to deliver features',
      'Conduct user research and gather feedback',
      'Manage product roadmap and backlog',
      'Analyze metrics and make data-driven decisions',
    ],
    experience: '3-5 years',
    applicants: 18,
    views: 203,
    status: 'Active',
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Creative Studio',
    location: 'Austin, TX',
    salary: '$90k - $120k',
    type: 'Full-time',
    postedAt: '1 week ago',
    postedDate: 'Jan 11, 2026',
    description: 'Join our creative team to design beautiful user experiences for cutting-edge applications.',
    requirements: ['Figma expertise', 'Portfolio required', 'User research experience', 'Design systems knowledge'],
    benefits: ['Health Insurance', 'Creative Budget', 'Hybrid Work', 'Conference Attendance'],
    responsibilities: [
      'Design intuitive user interfaces for web and mobile',
      'Conduct user research and usability testing',
      'Create and maintain design systems',
      'Collaborate with developers and product managers',
      'Present designs to stakeholders',
    ],
    experience: '2-4 years',
    applicants: 31,
    views: 178,
    status: 'Active',
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Boston, MA',
    salary: '$140k - $190k',
    type: 'Full-time',
    postedAt: '4 days ago',
    postedDate: 'Jan 14, 2026',
    description: 'Build machine learning models to drive business insights and decision making.',
    requirements: ['Python/R proficiency', 'ML/AI experience', 'Statistics background', 'SQL expertise'],
    benefits: ['Health Insurance', '401k', 'Learning Budget', 'Remote OK', 'Gym Membership'],
    responsibilities: [
      'Develop predictive models and algorithms',
      'Analyze large datasets to extract insights',
      'Collaborate with business teams on data strategy',
      'Create data visualizations and reports',
      'Deploy models to production',
    ],
    experience: '4+ years',
    applicants: 15,
    views: 189,
    status: 'Active',
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'Cloud Systems Ltd',
    location: 'Seattle, WA',
    salary: '$125k - $165k',
    type: 'Full-time',
    postedAt: '5 days ago',
    postedDate: 'Jan 13, 2026',
    description: 'Manage our cloud infrastructure and deployment pipelines using modern DevOps practices.',
    requirements: ['AWS/Azure experience', 'Docker/Kubernetes', 'CI/CD expertise', 'Infrastructure as Code'],
    benefits: ['Health Insurance', 'Stock Options', 'Remote Work', 'On-call Bonus'],
    responsibilities: [
      'Maintain and improve cloud infrastructure',
      'Implement CI/CD pipelines',
      'Monitor system performance and reliability',
      'Automate deployment processes',
      'Ensure security and compliance',
    ],
    experience: '3-5 years',
    applicants: 19,
    views: 142,
    status: 'Active',
  },
  {
    id: '6',
    title: 'Marketing Manager',
    company: 'Brand Builders',
    location: 'Los Angeles, CA',
    salary: '$100k - $140k',
    type: 'Full-time',
    postedAt: '1 week ago',
    postedDate: 'Jan 11, 2026',
    description: 'Lead our marketing strategy and grow our brand presence across multiple channels.',
    requirements: ['5+ years marketing experience', 'Digital marketing expertise', 'Team leadership', 'Analytics skills'],
    benefits: ['Health Insurance', 'Bonus Structure', 'Flexible Schedule', 'Marketing Budget'],
    responsibilities: [
      'Develop and execute marketing strategies',
      'Manage social media and content marketing',
      'Lead marketing team and campaigns',
      'Analyze campaign performance',
      'Build partnerships and collaborations',
    ],
    experience: '5+ years',
    applicants: 22,
    views: 165,
    status: 'Active',
  },
  {
    id: '7',
    title: 'Full Stack Developer',
    company: 'Startup Ventures',
    location: 'Remote',
    salary: '$110k - $150k',
    type: 'Full-time',
    postedAt: '1 day ago',
    postedDate: 'Jan 17, 2026',
    description: 'Join an early-stage startup to build innovative web applications from the ground up.',
    requirements: ['Node.js & React', 'Database design', 'API development', 'MongoDB/PostgreSQL'],
    benefits: ['Equity', 'Health Insurance', '100% Remote', 'Flexible Hours', 'Startup Culture'],
    responsibilities: [
      'Build full-stack web applications',
      'Design and implement APIs',
      'Work on database architecture',
      'Collaborate with founders on product direction',
      'Ship features quickly',
    ],
    experience: '2-4 years',
    applicants: 28,
    views: 201,
    status: 'Active',
  },
  {
    id: '8',
    title: 'Sales Director',
    company: 'Enterprise Solutions',
    location: 'Chicago, IL',
    salary: '$150k - $200k',
    type: 'Full-time',
    postedAt: '3 days ago',
    postedDate: 'Jan 15, 2026',
    description: 'Drive sales strategy and lead a high-performing team to exceed revenue targets.',
    requirements: ['10+ years sales experience', 'B2B SaaS background', 'Leadership skills', 'Enterprise sales'],
    benefits: ['Commission', 'Health Insurance', 'Car Allowance', 'Stock Options', 'Expense Account'],
    responsibilities: [
      'Lead sales team and set targets',
      'Develop sales strategies and processes',
      'Build relationships with enterprise clients',
      'Manage sales pipeline and forecasting',
      'Collaborate with marketing on lead generation',
    ],
    experience: '10+ years',
    applicants: 12,
    views: 98,
    status: 'Active',
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const auth = useAuth();

  // Keep local `user` in sync with auth context (profile + user)
  useEffect(() => {
    const u = auth.user;
    const p = auth.profile;
    if (u) {
      setUser({
        id: u.id,
        name: p?.full_name ?? u.email?.split('@')[0] ?? '',
        email: u.email ?? p?.email ?? '',
        type: p?.role === 'employer' ? 'provider' : 'seeker',
        avatar: p?.avatar_url ?? undefined,
        company: undefined,
      });
    } else {
      setUser(null);
    }
  }, [auth.user, auth.profile]);

  const login = async (email: string, password: string, type: 'seeker' | 'provider'): Promise<boolean> => {
    const { error } = await auth.signIn(email, password);
    return !error;
  };

  const signup = async (name: string, email: string, password: string, type: 'seeker' | 'provider'): Promise<boolean> => {
    const role = type === 'provider' ? 'employer' : 'seeker';
    const { error } = await auth.signUp(email, password, name, role);
    return !error;
  };

  const logout = async (): Promise<void> => {
    await auth.signOut();
    setUser(null);
    setSavedJobs([]);
    setApplications([]);
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const applyToJob = (job: Job, coverLetter: string) => {
    const newApplication: Application = {
      id: Math.random().toString(36).substr(2, 9),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      status: 'pending',
      appliedDate: new Date().toISOString(),
      coverLetter,
    };
    setApplications((prev) => [...prev, newApplication]);
  };

  const deleteApplication = (applicationId: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== applicationId));
  };

  const addJob = (jobData: Omit<Job, 'id' | 'postedAt'>) => {
    const newJob: Job = {
      ...jobData,
      id: Math.random().toString(36).substr(2, 9),
      postedAt: 'Just now',
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  const deleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        savedJobs,
        toggleSaveJob,
        applications,
        applyToJob,
        deleteApplication,
        jobs,
        addJob,
        deleteJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}