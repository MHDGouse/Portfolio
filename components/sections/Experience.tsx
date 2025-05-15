import { experienceData } from '@/Public/assets/data/experienceData';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-black dark:text-white">Work Experience</h2>
        
        <div className="space-y-12">
          {experienceData.map((job) => (
            <div key={job.id} className="relative pl-10 md:pl-0">
              {/* Timeline indicator for medium and larger screens */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-300 dark:bg-slate-700 top-8">
                <div className="absolute top-0 -mt-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white dark:border-slate-900 bg-black dark:bg-green-600 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
              </div>
              
              {/* Timeline indicator for small screens */}
              <div className="md:hidden absolute left-0 top-0 w-8 h-8 rounded-full border-4 border-white dark:border-slate-900 bg-black dark:bg-green-600 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              
              <div className={`md:w-1/2 ${job.id % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12'}`}>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold mb-1 text-black dark:text-white">{job.title}</h3>
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{job.company}</h4>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{job.period}</div>
                  
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;