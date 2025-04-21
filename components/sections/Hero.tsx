import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center pt-16 relative"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="text-center max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Hi, I&apos;m <span className="text-black border-b-4 border-green-400">Gouse</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Fullstack Developer</h2>
        
        <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
          I build beautiful, interactive, and high-performance web applications 
          with modern technologies. Specialized in creating seamless experiences 
          that bridge front-end design with back-end functionality.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button 
            onClick={scrollToProjects}
            className="bg-black text-white hover:bg-gray-800 flex items-center gap-2 px-6 py-3 rounded-md"
          >
            View My Work
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;