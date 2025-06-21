# Dashboard Components

This directory contains the modularized components for the ResumeSense dashboard.

## Structure

```
app/components/dashboard/
├── index.ts              # Main exports
├── types.ts              # TypeScript interfaces
├── utils.ts              # Utility functions
├── mockData.ts           # Sample data
├── Header.tsx            # Dashboard header component
├── ResumeUpload.tsx      # File upload component
├── TabNavigation.tsx     # Tab navigation component
├── StatsCard.tsx         # Statistics card component
├── OverviewTab.tsx       # Overview tab content
├── AnalysesTab.tsx       # Analyses tab content
├── SuggestionsTab.tsx    # Suggestions tab content
├── JobMatchesTab.tsx     # Job matches tab content
└── README.md             # This file
```

## Components

### Core Components

- **Header**: Dashboard navigation header with logo and user controls
- **ResumeUpload**: File upload interface with drag & drop support
- **TabNavigation**: Tab switching component for different dashboard sections

### Tab Components

- **OverviewTab**: Dashboard overview with statistics and recent analysis
- **AnalysesTab**: List of all resume analyses with search and filtering
- **SuggestionsTab**: Improvement suggestions for each resume
- **JobMatchesTab**: Job role matching results and keywords

### Utility Components

- **StatsCard**: Reusable card component for displaying statistics
- **Types**: TypeScript interfaces for type safety
- **Utils**: Helper functions for score colors and calculations
- **MockData**: Sample data for development and testing

## Usage

```tsx
import {
  Header,
  ResumeUpload,
  TabNavigation,
  OverviewTab,
  AnalysesTab,
  SuggestionsTab,
  JobMatchesTab,
  mockAnalyses
} from '../components/dashboard';

// Use components in your dashboard
<Header />
<ResumeUpload isUploading={false} uploadProgress={0} onFileUpload={handleUpload} />
<TabNavigation activeTab="overview" onTabChange={setActiveTab} />
<OverviewTab analyses={mockAnalyses} />
```

## Benefits of Modularization

1. **Maintainability**: Each component has a single responsibility
2. **Reusability**: Components can be used in other parts of the application
3. **Testability**: Individual components can be tested in isolation
4. **Readability**: Code is easier to understand and navigate
5. **Scalability**: Easy to add new features or modify existing ones
6. **Type Safety**: Strong TypeScript interfaces ensure data consistency

## Adding New Components

1. Create the component file in this directory
2. Add TypeScript interfaces to `types.ts` if needed
3. Export the component from `index.ts`
4. Import and use in the main dashboard

## Data Flow

- Main dashboard manages state (active tab, upload progress)
- Components receive data and callbacks as props
- Mock data is centralized in `mockData.ts`
- Utility functions are shared across components 