import { FaCode, FaGraduationCap, FaLaptop } from "react-icons/fa";

const About = () => {
  return (
    <div className="container max-w-7xl mx-auto py-20">
      <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>

      {/* bio section */}
      <section className="mb-16">
        <p className="text-lg text-secondary max-w-3xl mx-auto text-center">
          I&apos;m a passionate Full Stack Developer with expertise in building
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
            <FaCode className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Frontend</h3>
            <ul className="text-secondary space-y-2">
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>HTML5 / CSS3</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
            <FaLaptop className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Backend</h3>
            <ul className="text-secondary space-y-2">
              <li>Node.js</li>
              <li>Express</li>
              <li>PostgresSQL</li>
              <li>MongoDB</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
            <FaGraduationCap className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tools & Others</h3>
            <ul className="text-secondary space-y-2">
              <li>Git / Github</li>
              <li>Jest</li>
              <li>React Hooks</li>
            </ul>
          </div>
        </div>
      </section>

      {/* exprience section */}
      <section className="mb-16">
        <h2 className="section-title">Experience</h2>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Developer</h3>
            <p className="text-primary mb-2">
              Freelance • 2024(October) - 2025(January)
            </p>
            <ul className="text-secondary space-y-2 list-disc list-inside">
              <li>
                Implemented API integrations in the backend to enhance
                functionality and data exchange.
              </li>
              <li>Migrated Laravel-based front-end applications to React.</li>
              <li>
                Shared progress and discussed project updates during regular
                weekly team meetings.
              </li>
            </ul>
          </div>

          {/* <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Developer</h3>
            <p className="text-primary mb-2">
              Freelance • 2024(October) - 2025(January)
            </p>
            <ul className="text-secondary space-y-2 list-disc list-inside">
              <li>
                Implemented API integrations in the backend to enhance
                functionality and data exchange.
              </li>
              <li>Migrated Laravel-based front-end applications to React.</li>
              <li>
                Shared progress and discussed project updates during regular
                weekly team meetings.
              </li>
            </ul>
          </div> */}
        </div>

      </section>

      {/* education section */}
      <section className="mb-16">
        <h2 className="section-title">Education</h2>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">B.tech Computer Science Engineering</h3>
            <p className="text-primary mb-2">
              Siksha O Anusandhan University • 2019 - 2023
            </p>
            {/* <p className="text-secondary">Graduated with honors</p> */}
          </div>

        </div>

      </section>
    </div>
  );
};

export default About;
