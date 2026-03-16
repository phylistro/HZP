const JOB_DATABASE = [
  // Frontend Developer roles
  { id: 'j1', title: 'Frontend Developer', company: 'TechNova Inc.', location: 'San Francisco, CA', type: 'Full-time', salary: '$110,000 - $140,000', description: 'Build modern web applications using React and TypeScript.', url: 'https://example.com/jobs/j1', requiredSkills: ['javascript', 'react', 'typescript', 'html', 'css'] },
  { id: 'j2', title: 'Senior Frontend Engineer', company: 'Stripe', location: 'Remote', type: 'Full-time', salary: '$150,000 - $190,000', description: 'Lead frontend architecture for payment platform.', url: 'https://example.com/jobs/j2', requiredSkills: ['react', 'typescript', 'graphql', 'css', 'webpack'] },
  { id: 'j3', title: 'Frontend Developer', company: 'Shopify', location: 'Toronto, Canada', type: 'Full-time', salary: '$100,000 - $130,000', description: 'Build e-commerce storefronts using React and Next.js.', url: 'https://example.com/jobs/j3', requiredSkills: ['react', 'next.js', 'javascript', 'css', 'tailwind'] },
  { id: 'j4', title: 'UI Engineer', company: 'Figma', location: 'San Francisco, CA', type: 'Full-time', salary: '$140,000 - $175,000', description: 'Work on Figma\'s design tool in the browser.', url: 'https://example.com/jobs/j4', requiredSkills: ['typescript', 'react', 'css', 'html', 'webgl'] },
  { id: 'j5', title: 'Junior Frontend Developer', company: 'Acme Corp', location: 'New York, NY', type: 'Full-time', salary: '$70,000 - $90,000', description: 'Build responsive web interfaces for internal tools.', url: 'https://example.com/jobs/j5', requiredSkills: ['html', 'css', 'javascript', 'react', 'bootstrap'] },

  // Backend Developer roles
  { id: 'j6', title: 'Backend Developer', company: 'DataFlow Systems', location: 'Austin, TX', type: 'Full-time', salary: '$120,000 - $150,000', description: 'Design and build scalable REST APIs using Node.js.', url: 'https://example.com/jobs/j6', requiredSkills: ['node.js', 'express', 'postgresql', 'rest', 'docker'] },
  { id: 'j7', title: 'Senior Backend Engineer', company: 'Uber', location: 'San Francisco, CA', type: 'Full-time', salary: '$170,000 - $220,000', description: 'Build high-throughput microservices for ride-sharing platform.', url: 'https://example.com/jobs/j7', requiredSkills: ['go', 'microservices', 'kafka', 'docker', 'kubernetes'] },
  { id: 'j8', title: 'Python Backend Developer', company: 'Spotify', location: 'Stockholm, Sweden', type: 'Full-time', salary: '$130,000 - $160,000', description: 'Build music recommendation backend services.', url: 'https://example.com/jobs/j8', requiredSkills: ['python', 'django', 'postgresql', 'redis', 'docker'] },
  { id: 'j9', title: 'Java Backend Developer', company: 'Goldman Sachs', location: 'New York, NY', type: 'Full-time', salary: '$140,000 - $180,000', description: 'Build trading platform backend systems.', url: 'https://example.com/jobs/j9', requiredSkills: ['java', 'spring', 'sql', 'microservices', 'kafka'] },
  { id: 'j10', title: 'Backend Engineer', company: 'Airbnb', location: 'Remote', type: 'Full-time', salary: '$145,000 - $185,000', description: 'Build backend services for booking and payments.', url: 'https://example.com/jobs/j10', requiredSkills: ['ruby', 'rails', 'postgresql', 'redis', 'aws'] },

  // Full Stack roles
  { id: 'j11', title: 'Full Stack Developer', company: 'CloudBase Technologies', location: 'Seattle, WA', type: 'Full-time', salary: '$130,000 - $160,000', description: 'Build end-to-end features for our cloud management platform.', url: 'https://example.com/jobs/j11', requiredSkills: ['react', 'node.js', 'typescript', 'postgresql', 'aws'] },
  { id: 'j12', title: 'Senior Full Stack Engineer', company: 'Meta', location: 'Menlo Park, CA', type: 'Full-time', salary: '$180,000 - $250,000', description: 'Build full-stack features for social media platform.', url: 'https://example.com/jobs/j12', requiredSkills: ['react', 'python', 'graphql', 'mysql', 'docker'] },
  { id: 'j13', title: 'Full Stack Developer', company: 'Atlassian', location: 'Sydney, Australia', type: 'Full-time', salary: '$120,000 - $155,000', description: 'Build collaboration tools used by millions.', url: 'https://example.com/jobs/j13', requiredSkills: ['react', 'java', 'spring', 'postgresql', 'aws'] },
  { id: 'j14', title: 'Full Stack Web Developer', company: 'Vercel', location: 'Remote', type: 'Full-time', salary: '$135,000 - $170,000', description: 'Build Next.js-powered web applications and platform features.', url: 'https://example.com/jobs/j14', requiredSkills: ['next.js', 'react', 'typescript', 'node.js', 'mongodb'] },
  { id: 'j15', title: 'Junior Full Stack Developer', company: 'StartupXYZ', location: 'Denver, CO', type: 'Full-time', salary: '$75,000 - $95,000', description: 'Help build MVP for an early-stage startup.', url: 'https://example.com/jobs/j15', requiredSkills: ['javascript', 'react', 'node.js', 'mongodb', 'git'] },

  // Data Science / ML roles
  { id: 'j16', title: 'Data Scientist', company: 'AI Solutions Corp', location: 'Boston, MA', type: 'Full-time', salary: '$130,000 - $170,000', description: 'Apply ML models to solve complex business problems.', url: 'https://example.com/jobs/j16', requiredSkills: ['python', 'machine learning', 'pandas', 'scikit-learn', 'sql'] },
  { id: 'j17', title: 'Senior Data Scientist', company: 'Netflix', location: 'Los Gatos, CA', type: 'Full-time', salary: '$180,000 - $240,000', description: 'Build recommendation algorithms for content personalization.', url: 'https://example.com/jobs/j17', requiredSkills: ['python', 'deep learning', 'tensorflow', 'spark', 'sql'] },
  { id: 'j18', title: 'ML Engineer', company: 'OpenAI', location: 'San Francisco, CA', type: 'Full-time', salary: '$200,000 - $300,000', description: 'Train and deploy large language models.', url: 'https://example.com/jobs/j18', requiredSkills: ['python', 'pytorch', 'deep learning', 'kubernetes', 'cuda'] },
  { id: 'j19', title: 'Machine Learning Engineer', company: 'Google', location: 'Mountain View, CA', type: 'Full-time', salary: '$170,000 - $250,000', description: 'Build ML infrastructure for Google products.', url: 'https://example.com/jobs/j19', requiredSkills: ['python', 'tensorflow', 'machine learning', 'gcp', 'docker'] },
  { id: 'j20', title: 'Data Analyst', company: 'Salesforce', location: 'San Francisco, CA', type: 'Full-time', salary: '$90,000 - $120,000', description: 'Analyze business metrics and create dashboards.', url: 'https://example.com/jobs/j20', requiredSkills: ['sql', 'python', 'tableau', 'excel', 'pandas'] },

  // DevOps / Infrastructure
  { id: 'j21', title: 'DevOps Engineer', company: 'InfraScale', location: 'Chicago, IL', type: 'Full-time', salary: '$125,000 - $160,000', description: 'Manage CI/CD pipelines and cloud infrastructure.', url: 'https://example.com/jobs/j21', requiredSkills: ['docker', 'kubernetes', 'aws', 'terraform', 'jenkins'] },
  { id: 'j22', title: 'Senior DevOps Engineer', company: 'Amazon', location: 'Seattle, WA', type: 'Full-time', salary: '$160,000 - $210,000', description: 'Scale AWS infrastructure for millions of users.', url: 'https://example.com/jobs/j22', requiredSkills: ['aws', 'terraform', 'kubernetes', 'python', 'linux'] },
  { id: 'j23', title: 'Site Reliability Engineer', company: 'Google', location: 'Remote', type: 'Full-time', salary: '$165,000 - $230,000', description: 'Ensure reliability and performance of production systems.', url: 'https://example.com/jobs/j23', requiredSkills: ['linux', 'python', 'kubernetes', 'docker', 'gcp'] },
  { id: 'j24', title: 'Cloud Infrastructure Engineer', company: 'Microsoft', location: 'Redmond, WA', type: 'Full-time', salary: '$150,000 - $200,000', description: 'Build and manage Azure cloud services.', url: 'https://example.com/jobs/j24', requiredSkills: ['azure', 'terraform', 'docker', 'kubernetes', 'bash'] },
  { id: 'j25', title: 'Platform Engineer', company: 'HashiCorp', location: 'Remote', type: 'Full-time', salary: '$140,000 - $180,000', description: 'Build infrastructure automation tools.', url: 'https://example.com/jobs/j25', requiredSkills: ['go', 'terraform', 'docker', 'kubernetes', 'linux'] },

  // Mobile Development
  { id: 'j26', title: 'iOS Developer', company: 'Apple', location: 'Cupertino, CA', type: 'Full-time', salary: '$160,000 - $220,000', description: 'Build features for iOS applications.', url: 'https://example.com/jobs/j26', requiredSkills: ['swift', 'ios', 'xcode', 'git', 'rest'] },
  { id: 'j27', title: 'Android Developer', company: 'Samsung', location: 'San Jose, CA', type: 'Full-time', salary: '$130,000 - $170,000', description: 'Build Android applications for Samsung devices.', url: 'https://example.com/jobs/j27', requiredSkills: ['kotlin', 'android', 'java', 'git', 'rest'] },
  { id: 'j28', title: 'React Native Developer', company: 'Discord', location: 'San Francisco, CA', type: 'Full-time', salary: '$140,000 - $180,000', description: 'Build cross-platform mobile chat features.', url: 'https://example.com/jobs/j28', requiredSkills: ['react', 'typescript', 'react native', 'javascript', 'redux'] },
  { id: 'j29', title: 'Mobile Engineer', company: 'Uber', location: 'New York, NY', type: 'Full-time', salary: '$155,000 - $200,000', description: 'Build rider and driver mobile experiences.', url: 'https://example.com/jobs/j29', requiredSkills: ['swift', 'kotlin', 'react native', 'rest', 'git'] },
  { id: 'j30', title: 'Flutter Developer', company: 'BMW', location: 'Munich, Germany', type: 'Full-time', salary: '$100,000 - $140,000', description: 'Build connected car mobile applications.', url: 'https://example.com/jobs/j30', requiredSkills: ['flutter', 'dart', 'firebase', 'rest', 'git'] },

  // Security
  { id: 'j31', title: 'Security Engineer', company: 'CrowdStrike', location: 'Austin, TX', type: 'Full-time', salary: '$140,000 - $185,000', description: 'Build security monitoring and threat detection systems.', url: 'https://example.com/jobs/j31', requiredSkills: ['python', 'linux', 'aws', 'docker', 'bash'] },
  { id: 'j32', title: 'Application Security Engineer', company: 'GitHub', location: 'Remote', type: 'Full-time', salary: '$150,000 - $200,000', description: 'Secure the world\'s largest code hosting platform.', url: 'https://example.com/jobs/j32', requiredSkills: ['ruby', 'javascript', 'linux', 'docker', 'git'] },

  // Database / Data Engineering
  { id: 'j33', title: 'Data Engineer', company: 'Snowflake', location: 'San Mateo, CA', type: 'Full-time', salary: '$145,000 - $190,000', description: 'Build data pipelines and ETL processes.', url: 'https://example.com/jobs/j33', requiredSkills: ['python', 'sql', 'spark', 'kafka', 'aws'] },
  { id: 'j34', title: 'Senior Data Engineer', company: 'Databricks', location: 'Remote', type: 'Full-time', salary: '$165,000 - $220,000', description: 'Build data lakehouse architecture.', url: 'https://example.com/jobs/j34', requiredSkills: ['python', 'spark', 'sql', 'aws', 'terraform'] },
  { id: 'j35', title: 'Database Administrator', company: 'Oracle', location: 'Austin, TX', type: 'Full-time', salary: '$110,000 - $150,000', description: 'Manage and optimize enterprise database systems.', url: 'https://example.com/jobs/j35', requiredSkills: ['sql', 'oracle', 'linux', 'python', 'bash'] },

  // QA / Testing
  { id: 'j36', title: 'QA Automation Engineer', company: 'Slack', location: 'San Francisco, CA', type: 'Full-time', salary: '$120,000 - $155,000', description: 'Build automated test suites for messaging platform.', url: 'https://example.com/jobs/j36', requiredSkills: ['javascript', 'selenium', 'cypress', 'jest', 'git'] },
  { id: 'j37', title: 'SDET', company: 'Microsoft', location: 'Redmond, WA', type: 'Full-time', salary: '$130,000 - $170,000', description: 'Design and implement test frameworks.', url: 'https://example.com/jobs/j37', requiredSkills: ['python', 'selenium', 'docker', 'jenkins', 'git'] },

  // Product / Design
  { id: 'j38', title: 'Frontend Developer (Design Systems)', company: 'Twilio', location: 'Remote', type: 'Full-time', salary: '$130,000 - $165,000', description: 'Build and maintain company-wide design system components.', url: 'https://example.com/jobs/j38', requiredSkills: ['react', 'typescript', 'css', 'figma', 'jest'] },

  // Blockchain / Web3
  { id: 'j39', title: 'Blockchain Developer', company: 'Coinbase', location: 'Remote', type: 'Full-time', salary: '$160,000 - $220,000', description: 'Build decentralized finance applications.', url: 'https://example.com/jobs/j39', requiredSkills: ['javascript', 'typescript', 'react', 'node.js', 'mongodb'] },

  // Game Development
  { id: 'j40', title: 'Game Developer', company: 'Epic Games', location: 'Cary, NC', type: 'Full-time', salary: '$120,000 - $160,000', description: 'Build gameplay systems using Unreal Engine.', url: 'https://example.com/jobs/j40', requiredSkills: ['c++', 'python', 'git', 'linux', 'bash'] },

  // More varied roles
  { id: 'j41', title: 'Technical Lead', company: 'Palantir', location: 'New York, NY', type: 'Full-time', salary: '$190,000 - $260,000', description: 'Lead a team building data analytics platforms.', url: 'https://example.com/jobs/j41', requiredSkills: ['java', 'typescript', 'react', 'postgresql', 'docker'] },
  { id: 'j42', title: 'Staff Engineer', company: 'Dropbox', location: 'Remote', type: 'Full-time', salary: '$200,000 - $280,000', description: 'Drive technical strategy for file sync platform.', url: 'https://example.com/jobs/j42', requiredSkills: ['python', 'rust', 'aws', 'linux', 'docker'] },
  { id: 'j43', title: 'NLP Engineer', company: 'Grammarly', location: 'Remote', type: 'Full-time', salary: '$155,000 - $210,000', description: 'Build natural language processing models.', url: 'https://example.com/jobs/j43', requiredSkills: ['python', 'nlp', 'pytorch', 'deep learning', 'docker'] },
  { id: 'j44', title: 'Computer Vision Engineer', company: 'Tesla', location: 'Palo Alto, CA', type: 'Full-time', salary: '$170,000 - $240,000', description: 'Build vision models for autonomous driving.', url: 'https://example.com/jobs/j44', requiredSkills: ['python', 'computer vision', 'pytorch', 'tensorflow', 'c++'] },
  { id: 'j45', title: 'Embedded Systems Engineer', company: 'NVIDIA', location: 'Santa Clara, CA', type: 'Full-time', salary: '$150,000 - $200,000', description: 'Develop firmware for GPU hardware.', url: 'https://example.com/jobs/j45', requiredSkills: ['c++', 'python', 'linux', 'cuda', 'git'] },
  { id: 'j46', title: 'API Developer', company: 'Twitch', location: 'San Francisco, CA', type: 'Full-time', salary: '$130,000 - $170,000', description: 'Build and maintain public APIs for streaming platform.', url: 'https://example.com/jobs/j46', requiredSkills: ['go', 'graphql', 'rest', 'docker', 'aws'] },
  { id: 'j47', title: 'Solutions Architect', company: 'AWS', location: 'Remote', type: 'Full-time', salary: '$155,000 - $210,000', description: 'Help enterprise customers architect cloud solutions.', url: 'https://example.com/jobs/j47', requiredSkills: ['aws', 'terraform', 'python', 'docker', 'kubernetes'] },
  { id: 'j48', title: 'PHP Developer', company: 'Automattic', location: 'Remote', type: 'Full-time', salary: '$100,000 - $140,000', description: 'Build WordPress.com features serving millions of sites.', url: 'https://example.com/jobs/j48', requiredSkills: ['php', 'javascript', 'mysql', 'css', 'html'] },
  { id: 'j49', title: 'Scala Developer', company: 'LinkedIn', location: 'Sunnyvale, CA', type: 'Full-time', salary: '$155,000 - $200,000', description: 'Build data processing pipelines at scale.', url: 'https://example.com/jobs/j49', requiredSkills: ['scala', 'java', 'kafka', 'spark', 'docker'] },
  { id: 'j50', title: 'Vue.js Developer', company: 'GitLab', location: 'Remote', type: 'Full-time', salary: '$120,000 - $160,000', description: 'Build DevOps platform frontend using Vue.js.', url: 'https://example.com/jobs/j50', requiredSkills: ['vue', 'javascript', 'css', 'html', 'git'] },
  { id: 'j51', title: 'Angular Developer', company: 'IBM', location: 'Research Triangle Park, NC', type: 'Full-time', salary: '$110,000 - $145,000', description: 'Build enterprise dashboard applications.', url: 'https://example.com/jobs/j51', requiredSkills: ['angular', 'typescript', 'css', 'html', 'rest'] },
  { id: 'j52', title: 'Rust Developer', company: 'Cloudflare', location: 'Remote', type: 'Full-time', salary: '$160,000 - $210,000', description: 'Build high-performance edge computing systems.', url: 'https://example.com/jobs/j52', requiredSkills: ['rust', 'linux', 'docker', 'javascript', 'git'] },
  { id: 'j53', title: 'ETL Developer', company: 'Deloitte', location: 'Chicago, IL', type: 'Full-time', salary: '$100,000 - $135,000', description: 'Build data integration pipelines for enterprise clients.', url: 'https://example.com/jobs/j53', requiredSkills: ['python', 'sql', 'aws', 'spark', 'bash'] },
  { id: 'j54', title: 'React Native Mobile Developer', company: 'Walmart', location: 'Bentonville, AR', type: 'Full-time', salary: '$115,000 - $150,000', description: 'Build the Walmart shopping mobile app.', url: 'https://example.com/jobs/j54', requiredSkills: ['react', 'react native', 'javascript', 'typescript', 'redux'] },
  { id: 'j55', title: 'AI Engineer', company: 'Anthropic', location: 'San Francisco, CA', type: 'Full-time', salary: '$200,000 - $350,000', description: 'Build safe and beneficial AI systems.', url: 'https://example.com/jobs/j55', requiredSkills: ['python', 'pytorch', 'machine learning', 'deep learning', 'docker'] },
];

function searchJobs(skills = [], title = '') {
  const normalizedSkills = skills.map((s) => s.toLowerCase().trim());
  const normalizedTitle = title.toLowerCase().trim();

  const scored = JOB_DATABASE.map((job) => {
    let matchScore = 0;
    const matchedSkills = [];

    // Skill matching (0-70 points)
    const jobSkills = job.requiredSkills.map((s) => s.toLowerCase());
    for (const skill of normalizedSkills) {
      if (jobSkills.some((js) => js === skill || js.includes(skill) || skill.includes(js))) {
        matchScore += 70 / Math.max(jobSkills.length, 1);
        matchedSkills.push(skill);
      }
    }

    // Title similarity (0-30 points)
    if (normalizedTitle) {
      const jobTitle = job.title.toLowerCase();
      const titleWords = normalizedTitle.split(/\s+/);
      let titleMatches = 0;
      for (const word of titleWords) {
        if (word.length > 2 && jobTitle.includes(word)) {
          titleMatches++;
        }
      }
      matchScore += (titleMatches / Math.max(titleWords.length, 1)) * 30;
    }

    matchScore = Math.round(Math.min(matchScore, 100));

    return {
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description,
      url: job.url,
      matchScore,
      matchedSkills,
    };
  });

  return scored
    .filter((j) => j.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 20);
}

module.exports = { searchJobs };
