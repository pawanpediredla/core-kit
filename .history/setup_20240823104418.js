const fs = require('fs');
const path = require('path');

// Define the project structure
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

// Ensure a directory exists
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Create directories and files
function createStructure(basePath, structure) {
  for (const [key, value] of Object.entries(structure)) {
    const currentPath = path.join(basePath, key);

    if (Array.isArray(value)) {
      // Ensure the parent directory exists
      const parentDir = path.dirname(currentPath);
      ensureDirectoryExists(parentDir);

      value.forEach(file => {
        fs.writeFileSync(path.join(parentDir, file), '');
      });
    } else {
      ensureDirectoryExists(currentPath);
      createStructure(currentPath, value);
    }
  }
}

function writeInitialContent(basePath) {
  fs.writeFileSync(path.join(basePath, 'README.md'), '# Starter Kit\n\nA high-quality starter kit for modern development.');
  fs.writeFileSync(path.join(basePath, 'package.json'), JSON.stringify({
    "name": "starter-kit",
    "version": "1.0.0",
    "description": "A high-quality starter kit for modern development.",
    "main": "src/index.js",
    "scripts": {
      "start": "parcel src/index.html",
      "build": "parcel build src/index.html",
      "test": "jest",
      "cypress:open": "cypress open",
      "cypress:run": "cypress run"
    },
    "dependencies": {
      "parcel-bundler": "^1.12.4"
    },
    "devDependencies": {
      "jest": "^27.4.5",
      "cypress": "^8.7.0"
    },
    "author": "Your Name",
    "license": "MIT"
  }, null, 2));
}

const projectDir = path.join(__dirname, 'starter-kit');
ensureDirectoryExists(projectDir);
createStructure(projectDir, structure);
writeInitialContent(projectDir);

console.log('Starter kit structure created successfully!');
