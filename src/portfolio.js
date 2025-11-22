const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: 'https://CSKing666.github.io/portfolio',
  title: 'WeSeeYes',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'Chandra Sekhar',
  role: 'Java Full Stack Developer',
  picture: 'CS.jpg',

  description:
    'Motivated software professional with 1.5 years of experience in software support, skilled in troubleshooting and understanding system workflows. Now transitioning into development roles, equipped with a solid foundation in core programming concepts like DSA, OOPs, and RDBMS.',
  resume: 'CS-Resume.pdf',
  social: {
    linkedin: 'https://www.linkedin.com/in/vannem-reddy-chandra-sekhar-784546188',
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
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    image: 'Portfolio.png',
  },
]

const skills = [
  // skills can be added or removed
  // if there are no skills, Skills section won't show up
  'HTML',
  'CSS',
  'JavaScript',
  'Java',
  'Python',
  'C',
  'Servlets',
  'JSP',
  'Hibernate',
  'SpringCore',
  'SpringMVC',
  'SpringJPA',
  'SpringBoot',
]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'vcsxcsv@gmail.com',
}

export { header, about, projects, skills, contact }
