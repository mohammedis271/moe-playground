export const aboutMe = {
  name: 'Moe',
  title: 'Senior Software Engineer',
  role: 'Senior Software Engineer',
  tagline: 'Builder • Tinkerer • Problem Solver',
  bio: `Senior Software Engineer specializing in .NET/C#, React, and cloud-native infrastructure. 
I build systems that solve real problems, experiment with homelab infrastructure, 
and occasionally 3D print things I definitely don't need.`,
  location: 'South Africa',
  email: 'mohammed@cyberninja.co.za',
  github: 'https://github.com/mohammedis271',
  linkedin: 'https://linkedin.com/in/mohammedis',
  skills: [
    'React', 'TypeScript', '.NET/C#', 'Docker', 'CI/CD', 'Cloud Infrastructure', 
    'System Architecture', 'DevOps', 'API Design', '3D Printing'
  ],
  interests: [
    'System architecture and distributed systems',
    'DevOps automation and deployment pipelines',
    'Homelab infrastructure and self-hosting',
    'IoT automation (garage doors that actually work)',
    '3D printing (useful and questionable things)',
    'AI experimentation and agent orchestration'
  ]
}

export function getAboutData() {
  return aboutMe
}
