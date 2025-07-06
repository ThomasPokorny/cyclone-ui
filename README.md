# Cyclone AI Review Hub 🌪️ - Frontend & Dashboard

The web dashboard and frontend interface for Cyclone AI, providing repository management, team collaboration, and configuration for AI-powered code reviews.

## ✨ Features

- **🏢 Organization Management**: Create and manage multiple organizations
- **📁 Repository Linking**: Connect GitHub repositories to Cyclone AI reviews
- **🔗 GitHub App Integration**: Seamless authentication and repository access
- **👥 Team Collaboration**: Invite team members and manage access
- **⚙️ Configuration Dashboard**: Set custom review prompts and precision levels
- **📊 Analytics Overview**: Track repository counts and review statistics
- **🎫 Invitation System**: Controlled access via invitation keys
- **📱 Responsive Design**: Beautiful UI that works on all devices

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **Supabase** - Database and authentication
- **GitHub API** - Repository integration
- **Lucide Icons** - Modern icon library

## 🛠️ Setup

### 1. Prerequisites
- **Node.js 18+** and npm installed
- **Supabase account** and project
- **GitHub App** configured for Cyclone AI
- **Environment variables** configured

### 2. Installation
```bash
git clone https://github.com/ThomasPokorny/cyclone-ai-review-hub.git
cd cyclone-ai-review-hub
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the project root:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# GitHub App Configuration
GITHUB_APP_NAME=your_github_app_name
GITHUB_APP_ID=your_github_app_id
GITHUB_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_pkcs8_private_key\n-----END PRIVATE KEY-----"
```

**Required API Keys:**
- **Supabase Keys**: Project Settings → API → Keys
- **GitHub App**: Settings → Developer settings → GitHub Apps

### 4. Database Setup
The dashboard requires these Supabase tables:
- `installation` - GitHub App installations
- `organization` - User organizations
- `repository` - Linked repositories
- `invitation` - Access control via invite keys

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to access the dashboard.

## 🌪️ How It Works

### Authentication Flow
1. **GitHub OAuth** → User signs in with GitHub
2. **Installation Check** → Verify Cyclone AI GitHub App is installed
3. **Organization Setup** → Create or join organizations
4. **Repository Linking** → Connect repositories for AI reviews

### Repository Management
1. **GitHub Integration** → Fetch accessible repositories via GitHub API
2. **Smart Filtering** → Only show repositories Cyclone has access to
3. **Custom Configuration** → Set review precision and custom prompts
4. **Real-time Sync** → Changes reflected immediately in review backend

### Invitation System
1. **Admin Creates Invites** → Generate unique invitation keys
2. **User Receives Link** → `/invite?inviteKey=abc123`
3. **Key Validation** → Check if key exists and is unclaimed
4. **Auto-Claiming** → Mark invitation as used on first access

## 📱 Pages & Features

### 🏠 Dashboard (`/dashboard`)
- **Organization Overview**: View all organizations and repository counts
- **Quick Actions**: Add organizations, link repositories
- **Statistics Cards**: Track total repositories and reviews

### 🏢 Organization Detail (`/organizations/[id]`)
- **Repository List**: View all linked repositories
- **Management Tools**: Add, edit, and remove repositories
- **Team Overview**: Organization members and statistics

### 🎫 Invite Page (`/invite`)
- **Invitation Validation**: Check and claim invite keys
- **GitHub Sign-in**: Streamlined onboarding flow
- **Early Access**: Welcome message for invited users

### ⚙️ Repository Configuration
- **Custom Prompts**: Tailored review instructions
- **Review Precision**: Minor, balanced, or strict reviews
- **GitHub Integration**: Real repository data and selection

## 🎯 Component Structure

```
src/components/
├── ui/                          # shadcn/ui base components
├── Header.tsx                   # Main navigation header
├── HeroSection.tsx             # Landing page hero
├── AddRepositoryModal.tsx      # Repository linking modal
├── EditRepositoryModal.tsx     # Repository configuration modal
└── ...

app/
├── dashboard/
│   ├── page.tsx                # Main dashboard
│   └── components/
│       ├── DashboardWelcome.tsx        # Welcome for new users
│       ├── CreateFirstOrganization.tsx # Onboarding flow
│       └── DashboardOrganizations.tsx  # Organization overview
├── organizations/[id]/
│   └── page.tsx                # Organization detail view
├── invite/
│   └── page.tsx                # Invitation handling
└── actions/                    # Server actions
    ├── github.ts               # GitHub API integration
    ├── organization.ts         # Organization management
    ├── repositories.ts         # Repository operations
    └── invitation.ts           # Invite key validation
```

## 🔧 Development

### Key Server Actions

**GitHub Integration:**
```typescript
// Fetch user's GitHub installation
await getInstallationByUserId()

// Get repositories Cyclone can access
await getAvailableGitHubRepositories(organizationId)
```

**Repository Management:**
```typescript
// Link a new repository
await createRepository(organizationId, repoName, customPrompt)

// Update repository settings
await updateRepository(repoId, name, customPrompt)

// Remove repository link
await deleteRepository(repoId)
```

**Invitation System:**
```typescript
// Validate and claim invite key
await validateAndClaimInvitation(inviteKey)
```

### Authentication Patterns
- **Server Components**: Use `createUserClient()` for auth checks
- **Client Components**: Access user via Supabase auth context
- **Protected Routes**: Redirect to `/` if not authenticated

### Database Queries
- **Row Level Security**: Enabled on all tables
- **User Scoping**: All queries filtered by authenticated user
- **Service Role**: Used for admin operations in server actions

## 🎨 UI/UX Features

- **🌪️ Tornado Branding**: Consistent emoji favicon and logo
- **🎯 Smart Dropdowns**: GitHub repositories loaded dynamically
- **⚡ Loading States**: Spinners and skeleton screens
- **✅ Success Feedback**: Checkmarks and success messages
- **🚫 Error Handling**: User-friendly error messages
- **📱 Responsive Design**: Mobile-first approach

## 🔗 Integration with Backend

This frontend communicates with the [Cyclone AI backend](https://github.com/ThomasPokorny/cyclone-ai) which handles:
- **PR Webhook Processing**: Listens for GitHub PR events
- **AI Code Reviews**: Integrates with Claude AI for analysis
- **Comment Posting**: Posts reviews back to GitHub PRs

The dashboard provides the configuration interface while the backend performs the actual code reviews.

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Project Settings → Environment Variables
```

### Environment Variables for Production
Ensure all `.env.local` variables are configured in your deployment platform.

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## ⚡ Next Steps

- [ ] **Real-time Updates**: WebSocket integration for live review status
- [ ] **Team Management**: Advanced user roles and permissions
- [ ] **Analytics Dashboard**: Detailed review metrics and insights
- [ ] **Custom Themes**: Dark/light mode and branded themes
- [ ] **API Documentation**: Generated docs for public API endpoints
- [ ] **Mobile App**: React Native app for mobile access
- [ ] **Slack Integration**: Review notifications in team channels

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and test thoroughly
4. Ensure TypeScript compiles without errors
5. Test with real GitHub repositories
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Submit a pull request

## 📄 License

This project is part of the Cyclone AI ecosystem. See the main [Cyclone AI repository](https://github.com/ThomasPokorny/cyclone-ai) for license information.

**Built with ❤️ by Thomas Pokorny** 🌪️

---

*Part of the Cyclone AI ecosystem - AI-powered code reviews that make your development workflow feel like a breeze!* 🌪️