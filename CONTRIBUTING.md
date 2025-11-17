# Contributing to Krypttrac

Thank you for your interest in contributing to Krypttrac! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Pull Requests](#submitting-pull-requests)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/krypttrac.com.git`
3. Add upstream remote: `git remote add upstream https://github.com/brandonlacoste9-tech/krypttrac.com.git`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites

- Node.js 20 or higher
- npm or yarn package manager
- Git

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

### Using Dev Container (Recommended)

This project includes a dev container configuration for VS Code:

1. Install [VS Code](https://code.visualstudio.com/)
2. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. Open the project in VS Code
4. Click "Reopen in Container" when prompted

## Making Changes

1. Create a new branch from `main`
2. Make your changes
3. Write or update tests as needed
4. Ensure all tests pass: `npm test` (if applicable)
5. Ensure linting passes: `npm run lint`
6. Ensure the build succeeds: `npm run build`
7. Commit your changes with a clear commit message

## Submitting Pull Requests

1. Push your changes to your fork
2. Create a pull request against the `main` branch
3. Fill out the pull request template completely
4. Link any related issues
5. Wait for review and address any feedback

### PR Review Process

- All PRs require at least one approval
- CI checks must pass
- Code must follow project standards
- Documentation must be updated if needed

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Avoid using `any` type when possible
- Define proper interfaces and types

### React

- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use proper prop types

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design patterns
- Ensure responsive design
- Test on multiple screen sizes

### Code Quality

- Write self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Follow DRY (Don't Repeat Yourself) principle

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Changes to build process or auxiliary tools

### Examples

```
feat(dashboard): add real-time price updates

Implemented WebSocket connection for live cryptocurrency prices.
The dashboard now updates automatically without page refresh.

Closes #123
```

```
fix(portfolio): correct calculation error

Fixed bug where portfolio value was incorrectly calculated
when multiple currencies were selected.

Fixes #456
```

## Questions?

If you have questions, please:

1. Check existing documentation
2. Search for existing issues
3. Open a new discussion in GitHub Discussions
4. Ask in pull request comments

Thank you for contributing to Krypttrac! 🚀
