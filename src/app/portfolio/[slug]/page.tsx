import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import ProjectClient from './ProjectClient';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

const getProjectData = (slug: string) => {
  const portfolioDir = path.join(process.cwd(), 'public', 'portfolio-content');
  const files = fs.readdirSync(portfolioDir);
  
  // Find the file with matching slug in frontmatter
  for (const filename of files) {
    if (!filename.endsWith('.md')) continue;
    
    const filePath = path.join(portfolioDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    if (data.slug === slug) {
      return {
        metadata: {
          name: data.name || '',
          company: data.company || '',
          companyLogo: data.companyLogo || '',
          year: data.year || '',
          heroImage: data.heroImage || '',
        },
        content,
      };
    }
  }
  
  return null;
};

export async function generateMetadata({ params }: ProjectPageProps) {
  const projectData = getProjectData(params.slug);
  
  if (!projectData) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${projectData.metadata.name} - Portfolio`,
    description: `${projectData.metadata.name} project at ${projectData.metadata.company}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export async function generateStaticParams() {
  const portfolioDir = path.join(process.cwd(), 'public', 'portfolio-content');
  
  if (!fs.existsSync(portfolioDir)) {
    return [];
  }

  const files = fs.readdirSync(portfolioDir);
  const mdFiles = files.filter(file => file.endsWith('.md'));

  const slugs = mdFiles.map(filename => {
    const filePath = path.join(portfolioDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return { slug: data.slug || filename.replace('.md', '') };
  });

  return slugs;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const projectData = getProjectData(params.slug);

  if (!projectData) {
    notFound();
  }

  return (
    <ProjectClient
      content={projectData.content}
      metadata={projectData.metadata}
    />
  );
}

