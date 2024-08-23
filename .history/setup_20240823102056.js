const fs = require('fs');
const path = require('path');

const structure = {
  '.github': {
    'workflows': ['node.js.yml', 'deploy.yml', 'release.yml'],
    'ISSUE_TEMPLATE': ['bug_report.md', 'feature_request.md']
  },
  'docs': ['index.md', 'setup.md', 'usage.md', 'api.md', 'contributing.md', 'faq.md'],
  'src': {
    'components': ['Button.js'],
    'assets': ['logo.png'],
    'utils': ['helpers.js']
  },
  'tests': {
    'unit': ['index.test.js'],
    'e2e': ['demo.spec.js'],
    'integration': ['api.test.js'],
    'performance': ['load.test.js']
  },
  'cypress': {
    'fixtures': [],
    'integration': ['demo.spec.js']
  },
  'scripts': ['setup.sh', 'deploy.sh'],
  'tools': ['build.sh', 'lint.sh'],
  'release': ['release-notes.md', 'versioning.md']
};

function createStructure(basePath, structure) {
  for (const [key, value] of Object.entries(structure)) {
    const currentPath = path.join(basePath, key);

    if (Array.isArray(value)) {
      // Create files
      value.forEach(file => {
        fs.writeFileSync(path.join(currentPath, file), '');
      });
    } else {
      // Create directory and recurse
      if (!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath, { recursive: true });
      }
      createStructure(currentPath, value);
    }
  }
}

// Write initial content to files
function writeInitialContent(basePath) {
  fs.writeFileSync(path.join(basePath, 'README.md'), '# Starter Kit\n\nA top-tier project starter kit.');
  fs.writeFileSync(path.join(basePath, 'package.json'), JSON.stringify({
    "name": "starter-kit",
    "version": "1.0.0",
    "description": "A starter kit for top-tier projects.",
    "main": "src/index.js",
    "scripts": {
      "start": "node src/index.js",
      "build": "echo 'Build script' > build.log",
      "test": "echo 'Test script' > test.log",
      "cypress:open": "echo 'Open Cypress' > cypress-open.log",
      "cypress:run": "echo 'Run Cypress' > cypress-run.log"
    },
    "dependencies": {},
    "devDependencies": {},
    "author": "Your Name",
    "license": "MIT"
  }, null, 2));

  fs.writeFileSync(path.join(basePath, 'Dockerfile'), `# Use Node.js as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 1234

# Start the application
CMD ["npm", "start"]
`);

  fs.writeFileSync(path.join(basePath, 'docker-compose.yml'), `version: '3'
services:
  app:
    build: .
    ports:
      - "1234:1234"
    volumes:
      - .:/app
    environment:
      - NODE_ENV=development
`);

  fs.writeFileSync(path.join(basePath, 'Makefile'), `install:
	npm install

start:
	npm start

build:
	npm run build

test:
	npm test

lint:
	npx eslint src

format:
	npx prettier --write "src/**/*.js"

docker-build:
	docker build -t starter-kit .

docker-up:
	docker-compose up
`);

  fs.writeFileSync(path.join(basePath, '.env'), `NODE_ENV=development
PORT=1234
`);

  fs.writeFileSync(path.join(basePath, '.gitignore'), `node_modules/
dist/
.env
*.log
.DS_Store
`);

  fs.writeFileSync(path.join(basePath, 'LICENSE'), `MIT License

Copyright (c) [2024] [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`);

  fs.writeFileSync(path.join(basePath, 'CHANGELOG.md'), `# Changelog

## [1.0.0] - 2024-08-23
- Initial release of the Starter Kit.
`);

  fs.writeFileSync(path.join(basePath, 'SECURITY.md'), `# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please contact us at [your.email@example.com]. We will review the issue and take appropriate measures.

## Supported Versions

We support the latest release and the previous two major versions. For more information on supported versions, please refer to our [CHANGELOG.md](./CHANGELOG.md).
`);

  fs.writeFileSync(path.join(basePath, 'CODE_OF_CONDUCT.md'), `# Code of Conduct

## Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

## Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

## Scope

This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at [your.email@example.com]. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant](https://www.contributor-covenant.org), version 1.4, available at [https://www.contributor-covenant.org/version/1/4](https://www.contributor-covenant.org/version/1/4).
`);

  fs.writeFileSync(path.join(basePath, 'CONTRIBUTING.md'), `# Contributing to Starter Kit

Thank you for your interest in contributing to the Starter Kit! We welcome contributions and are excited to collaborate with the community.

## How to Contribute

### Reporting Issues

If you encounter any issues or bugs, please open an issue on GitHub. Provide a clear description of the problem and steps to reproduce it.

### Submitting Changes

1. **Fork the Repository**: Create your own fork of the repository on GitHub.
2. **Clone Your Fork**:
   \`\`\`bash
   git clone https://github.com/yourusername/starter-kit.git
   \`\`\`
3. **Create a Branch**: Create a new branch for your changes.
   \`\`\`bash
   git checkout -b feature/your-feature
   \`\`\`
4. **Make Your Changes**: Implement your changes or improvements.
5. **Commit Your Changes**:
   \`\`\`bash
   git add .
   git commit -m "Add your descriptive commit message"
   \`\`\`
6. **Push to Your Fork**:
   \`\`\`bash
   git push origin feature/your-feature
   \`\`\`
7. **Create a Pull Request**: Open a pull request on the original repository with a clear description of your changes.

### Code of Conduct

Please follow our [Code of Conduct](./CODE_OF_CONDUCT.md) when interacting with the community.

### Style Guide

- Use Prettier for code formatting.
- Follow the coding conventions outlined in our `.eslintrc.js` file.

Thank you for contributing!
`);

  fs.writeFileSync(path.join(basePath, 'release/release-notes.md'), `# Release Notes

## [1.0.0] - 2024-08-23
- Initial release of the Starter Kit.
`);

  fs.writeFileSync(path.join(basePath, 'release/versioning.md'), `# Versioning Strategy

We follow semantic versioning for our releases. For more information, visit [https://semver.org](https://semver.org).
`);
}

// Initialize project
const projectDir = path.join(__dirname, 'starter-kit');
if (!fs.existsSync(projectDir)) {
  fs.mkdirSync(projectDir, { recursive: true });
}
createStructure(projectDir, structure);
writeInitialContent(projectDir);

console.log('Starter Kit project structure created successfully!');
