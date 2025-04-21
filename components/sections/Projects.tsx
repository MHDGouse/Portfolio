"use client";

import { useState } from 'react';
import { projectData } from '@/data/projectData';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const Projects = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectData.map((project) => (
            <div 
              key={project.id}
              className="project-card flex flex-col h-full"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={`transition-transform duration-500 ${
                    hoveredId === project.id ? 'scale-110' : 'scale-100'
                  }`}
                />
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 flex-1">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-100">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex space-x-4 mt-auto">
                  <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-black transition-colors"
                  >
                    <Github className="h-5 w-5 mr-1" />
                    <span>Code</span>
                  </a>
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-black transition-colors"
                  >
                    <ExternalLink className="h-5 w-5 mr-1" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;