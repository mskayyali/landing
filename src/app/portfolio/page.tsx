import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PortfolioClient from './PortfolioClient';

interface ProjectMetadata {
  name: string;
  company: string;
  companyLogo: string;
  year: string;
  slug: string;
}

const getProjects = (): ProjectMetadata[] => {
  const portfolioDir = path.join(process.cwd(), 'public', 'portfolio-content');
  
  // Check if directory exists
  if (!fs.existsSync(portfolioDir)) {
    return [];
  }

  const files = fs.readdirSync(portfolioDir);
  const mdFiles = files.filter(file => file.endsWith('.md'));

  const projects = mdFiles.map(filename => {
    const filePath = path.join(portfolioDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      name: data.name || '',
      company: data.company || '',
      companyLogo: data.companyLogo || '',
      year: data.year || '',
      slug: data.slug || filename.replace('.md', ''),
    };
  });

  // Sort by year (newest first)
  return projects.sort((a, b) => parseInt(b.year) - parseInt(a.year));
};

export const metadata = {
  title: 'Portfolio - Saleh Kayyali',
  description: 'Selected projects showcasing product design and user experience work',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortfolioPage() {
  const projects = getProjects();

  return <PortfolioClient projects={projects} />;
}

