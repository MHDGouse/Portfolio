import React from 'react';
import { Safari } from '../ui/safari';
import { projectData } from '../../Public/assets/data/projectData';
import { Code } from 'lucide-react';

const NewProjects = () => {
  return (
    <div className="space-y-16 m-32">
      {projectData.map((project, index) => (
        <div
          key={project.id}
          className={`flex flex-col md:flex-row ${
            index % 2 === 0 ? 'md:flex-row-reverse' : ''
          } items-center md:items-start gap-8 bg-white dark:bg-slate-900 rounded-xl shadow-md dark:shadow-lg p-6`}
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
            <h2 className="text-2xl font-bold text-black dark:text-white">{project.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-sm rounded-md text-gray-800 dark:text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 ">
              <div className='flex items-center bg-slate-900 dark:bg-slate-800 px-3 py-1 rounded-md text-white'>
                <Code className="h-4 w-4 mr-1" />
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  View Code
                </a>
              </div>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-green-500 text-white dark:bg-green-600 dark:text-white hover:bg-green-600 dark:hover:bg-green-700"
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