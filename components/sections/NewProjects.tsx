import React from 'react';
import { Safari } from '../ui/safari';
import { projectData } from '../../Public/assets/data/projectData';

const NewProjects = () => {
  return (
    <div className="space-y-16">
      {projectData.map((project, index) => (
        <div
          key={project.id}
          className={`flex flex-col md:flex-row ${
            index % 2 === 0 ? 'md:flex-row-reverse' : ''
          } items-center md:items-start gap-8`}
        >
          {/* Safari Component */}
          <div className="flex-1">
            <Safari
              className="w-full md:w-[600px] h-96"
              url={project.liveUrl}
              imageSrc={project.imageUrl || ''}
            />
          </div>

          {/* Project Description */}
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-gray-200 text-sm rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View Code
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewProjects;