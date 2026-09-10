# moe-playground

Moe's Personal Digital Playground — an interactive workshop/command-centre personal site showcasing projects, skills, and experiments.

## 🚀 Features

- **macOS-inspired Desktop Shell**: Full-screen desktop experience with wallpaper, menu bar, dock, and windowed apps
- **Window Manager**: Draggable windows with focus management, z-order, minimize/close, and deep-link support
- **Landing Page**: Hero section with system status panel (mock data clearly labeled)
- **Interactive Terminal**: Retro-style terminal with commands (`help`, `whoami`, `projects`, `skills`, `status`, `contact`, `about`, `clear`)
- **Workshop Dashboard**: Category navigation for Software, Infrastructure, AI, and Hardware
- **Projects Explorer**: Detailed project cards with lightweight architecture diagrams (Release Hub pipeline visualization)
- **Contact Page**: Form with validation using React Hook Form + Zod
- **Desktop Apps**: Terminal, Workshop, Projects, Contact, and About wrapped as windowed applications

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

## 🖥️ Desktop Mode

The portfolio features a macOS-inspired desktop shell for an immersive experience:

1. Navigate to the landing page and click **"ENTER DESKTOP"**
2. Or go directly to `/desktop` or `/desktop/:appId` for deep-linking
3. Use the dock to open apps: Terminal, Workshop, Projects, About
4. Windows are draggable, focusable, and can be minimized or closed
5. URL syncs with focused app (`/desktop/terminal`, `/desktop/projects`, etc.)
6. Mobile fallback: single-app fullscreen mode

### Desktop Features

- **Menu Bar**: Clock, date, and branding (top)
- **Dock**: App launcher with hover effects (bottom)
- **Window Manager**: Centralized state with z-order, focus, minimize/close
- **Keyboard Focus**: Terminal only receives input when its window is focused
- **Route Sync**: Deep links open/focus apps; closing clears URL
- **Mobile Responsive**: Stacked or single-app mode on narrow screens

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── terminal/        # Terminal component
│   └── desktop/         # Desktop shell components
│       ├── Desktop.tsx
│       ├── MenuBar.tsx
│       ├── Dock.tsx
│       ├── Window.tsx
│       └── apps/        # Windowed app wrappers
├── contexts/            # React contexts
│   └── DesktopContext.tsx  # Window manager state
├── pages/               # Route pages
│   ├── Home.tsx
│   ├── DesktopMode.tsx
│   ├── Workshop.tsx
│   ├── Projects.tsx
│   ├── Terminal.tsx
│   └── Contact.tsx
├── data/                # Typed data modules
│   ├── apps.tsx         # Desktop app definitions
│   ├── projects.ts
│   ├── skills.ts
│   ├── system.ts        # Mock system status with 'mock' flag
│   └── about.ts
├── lib/                 # Utilities and commands
│   ├── utils.ts
│   ├── terminal-parser.ts
│   └── commands.ts
├── types/               # TypeScript type definitions
│   ├── index.ts
│   └── desktop.ts       # Window and app types
├── layouts/             # Layout components
├── test/                # Test files
│   ├── terminal-parser.test.ts
│   └── desktop.test.ts
└── App.tsx              # Main app with router

.github/workflows/       # CI/CD pipeline
.octopus/cac/           # Octopus Deploy configuration
```

## 🧪 Testing

Comprehensive test coverage for core features:

**Terminal Parser Tests**:
- Command parsing (help, whoami, projects, skills, status, contact, clear)
- Humorous responses for unknown commands (sudo, rm, hack, etc.)
- Edge cases (empty input, whitespace, special characters)

**Window Manager Tests**:
- Window creation (no duplicates for same app)
- Focus and z-order management (only one focused window)
- Minimize/close operations
- Reopen after close (fresh window state)
- Position and size updates

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
