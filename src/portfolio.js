const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: 'https://csking666.github.io/portfolio/',
  title: 'WeSeeYes',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'Chandra Sekhar',
  role: 'Data Engineer & Full Stack Developer',
  picture: 'CS.jpg',

  description:
    'Data Engineer building the platform behind a US real-estate analytics product — Django and PostgreSQL services, high-throughput ETL and scraping pipelines across 5,000+ ZIP codes, and the internal React tools the sales team runs on. Previously a software engineer across billing, CRM and channel-management systems, on a full stack Java foundation. Currently open to new opportunities.',
  resume: 'CS-Resume.pdf',
  social: {
    linkedin: 'https://www.linkedin.com/in/vannem-reddy-chandra-sekhar-337367429/',
    github: 'https://github.com/CSKing666',
  },
}

const projects = [
  // projects can be added an removed
  // if there are no projects, Projects section won't show up
  {
    name: 'Employee Management System',
    description:
      'Built a Basic EMS System using below Tech Stack',
    stack: ['Servlets', 'JSP', 'SpringBoot'],
    sourceCode: 'https://github.com',
    // livePreview: 'https://github.com',
    image: 'https://github.githubassets.com/assets/GitHub-Logo-ee398b662d42.png',
  },
  {
    name: 'Hospital Management System',
    description:
      'Built a Basic HMS and performed CRUD operations through PostMan',
    stack: ['RestAPI', 'SpringBoot','PostMan'],
    sourceCode: 'https://github.com',
    // livePreview: 'https://github.com',
    image: 'https://github.githubassets.com/assets/GitHub-Logo-ee398b662d42.png',
  },
  {
    name: 'Portfolio',
    description:
      'Built a Personal website using below Tech Stack',
    stack: ['React', 'Node', 'SASS'],
    sourceCode: 'https://github.com/CSKing666/portfolio',
    livePreview: 'https://csking666.github.io/portfolio/',
    image: 'Portfolio.png',
  },
]

const skills = [
  // skills can be added or removed
  // if there are no skills, Skills section won't show up
  // Ordered to match the Data Engineer positioning: data and backend first,
  // then the Java/Spring stack, then web and tooling.
  'Python',
  'PostgreSQL',
  'MySQL',
  'Django',
  'ETL Pipelines',
  'Data Analysis',
  'Machine Learning',
  'AWS',
  'Linux',
  'Git',
  'Java',
  'Spring Boot',
  'Spring MVC',
  'Spring Data JPA',
  'Hibernate',
  'Servlets',
  'JSP',
  'JDBC',
  'React',
  'JavaScript',
  'HTML',
  'CSS',
]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'vcsxcsv@gmail.com',
}

export { header, about, projects, skills, contact }
