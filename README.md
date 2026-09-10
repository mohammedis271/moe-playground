# moe-playground

Moe's Personal Digital Playground — an interactive workshop/command-centre personal site showcasing projects, skills, and experiments.

## 🚀 Features

- **Landing Page**: Hero section with system status panel (mock data clearly labeled)
- **Interactive Terminal**: Retro-style terminal with commands (`help`, `whoami`, `projects`, `skills`, `status`, `contact`, `about`, `clear`)
- **Workshop Dashboard**: Category navigation for Software, Infrastructure, AI, and Hardware
- **Projects Explorer**: Detailed project cards with lightweight architecture diagrams (Release Hub pipeline visualization)
- **Contact Page**: Form with validation using React Hook Form + Zod

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS 4** for styling
- **shadcn/ui** components
- **Lucide React** for icons
- **Framer Motion** for animations
- **React Router** for navigation
- **TanStack Query** (configured but unused - ready for API integration)
- **Zod** + **React Hook Form** for form validation
- **Vitest** for testing

## 📦 Installation

```bash
# Install dependencies
npm install
```

## 🏃 Running Locally

```bash
# Development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests in watch mode
npm run test:ui

# Type check
npm run lint
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   └── terminal/        # Terminal component
├── pages/               # Route pages
│   ├── Home.tsx
│   ├── Workshop.tsx
│   ├── Projects.tsx
│   ├── Terminal.tsx
│   └── Contact.tsx
├── data/                # Typed data modules
│   ├── projects.ts
│   ├── skills.ts
│   ├── system.ts        # Mock system status with 'mock' flag
│   └── about.ts
├── lib/                 # Utilities and commands
│   ├── utils.ts
│   ├── terminal-parser.ts
│   └── commands.ts
├── types/               # TypeScript type definitions
├── layouts/             # Layout components
├── test/                # Test files
└── App.tsx              # Main app with router

.github/workflows/       # CI/CD pipeline
.octopus/cac/           # Octopus Deploy configuration
```

## 🧪 Testing

Terminal command parser has full test coverage:
- Command parsing (help, whoami, projects, skills, status, contact, clear)
- Humorous responses for unknown commands (sudo, rm, hack, etc.)
- Edge cases (empty input, whitespace, special characters)

```bash
npm run test:run
```

## 🚢 Deployment

### CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci-cd.yml`):
1. **Test**: Run linting and unit tests
2. **Build**: Create production build and zip artifact
3. **Deploy**: Push to Octopus Deploy and deploy to Dev environment

### Octopus Deploy

Configuration in `.octopus/cac/`:
- **Package**: `moe-playground.<version>.zip`
- **Target Role**: `static-web`
- **Webroots**: 
  - Dev: `/opt/moe-playground/dev/www`
  - Prod: `/opt/moe-playground/prod/www`
- **Hosts**:
  - Dev: `playground.local.cyberninja.co.za`
  - Prod: `playground.cyberninja.co.za`

**Important**: SPA routing requires web server configuration to serve `index.html` for all routes. See `.octopus/cac/README.md` for nginx/Apache examples.

## 🎨 Design Philosophy

- Dark-first engineering dashboard aesthetic
- Subtle glass-morphism and grid backgrounds
- Terminal/monospace fonts for technical metadata
- Color-coded status indicators (cyan/blue/purple/green)
- Mock data clearly labeled to prevent confusion
- Fully responsive (desktop → tablet → mobile)

## 📝 Mock Data Notice

System status metrics are **mock data for demonstration purposes** and clearly labeled with a "MOCK DATA" badge. All data structures are typed with API-ready shapes for future backend integration via TanStack Query.

## 🤝 Contributing

This is a personal project, but feel free to fork and adapt for your own use!

## 📄 License

ISC

## 🙋 Contact

- **Email**: mohammed@cyberninja.co.za
- **GitHub**: https://github.com/mohammedis271
- **LinkedIn**: https://linkedin.com/in/mohammedis

---

Built with React 19, TypeScript, Vite, and Tailwind CSS.
