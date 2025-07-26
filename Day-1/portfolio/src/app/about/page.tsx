import { FaCode, FaGraduationCap, FaLaptop } from "react-icons/fa";

const About = () => {
  return (
    <div className="container max-w-7xl mx-auto py-20">
      <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>

      <section className="mb-16">
        <p className="text-lg text-secondary max-w-3xl mx-auto text-center">
          I'm a passionate Full Stack Developer with expertise in building
          modern web applications. With a strong foundation in both frontend and
          backend technologies, I create seamless user experiences and robust
          server-side solutions.
        </p>
      </section>

      {/* skills section */}
      <section className="mb-16">
        <h2 className="section-title">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
                <FaCode className="h-8 w-8 text-primary mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Frontend</h3>
                <ul className="text-secondary space-y-2">
                    <li>React / Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>HTML5 / CSS3</li>
                </ul>
            </div>

            <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
                <FaLaptop className="h-8 w-8 text-primary mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Backend</h3>
                <ul className="text-secondary space-y-2">
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>PostgresSQL</li>
                    <li>MongoDB</li>
                </ul>
            </div>

            <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
                <FaGraduationCap className="h-8 w-8 text-primary mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Tools & Others</h3>
                <ul className="text-secondary space-y-2">
                    <li>Git / Github</li>
                    <li>Jest</li>
                    <li>React Hooks</li>
                </ul>
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;
