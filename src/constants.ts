export interface File {
  id: string;
  name: string;
  language: string;
  content: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  lastModified: number;
  files: File[];
  tasks: Task[];
  templateId?: string;
  githubRepo?: {
    owner: string;
    repo: string;
    branch: string;
  };
}

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  defaultFiles: Omit<File, 'id'>[];
}

export const TEMPLATES: Template[] = [
  {
    id: 'python-basic',
    name: 'Python Starter',
    description: 'A basic Python script setup.',
    icon: 'py',
    defaultFiles: [
      { name: 'main.py', language: 'python', content: 'print("Hello from Kayan Code Python!")' }
    ]
  },
  {
    id: 'web-basic',
    name: 'Web Starter',
    description: 'HTML/CSS simple project.',
    icon: 'html',
    defaultFiles: [
      { name: 'index.html', language: 'html', content: '<!DOCTYPE html>\n<html>\n<body>\n  <h1>Welcome</h1>\n</body>\n</html>' },
      { name: 'style.css', language: 'css', content: 'body { background: #121212; color: #fff; }' }
    ]
  },
  {
    id: 'js-basic',
    name: 'JavaScript Log',
    description: 'Pure JS logic project.',
    icon: 'js',
    defaultFiles: [
      { name: 'index.js', language: 'javascript', content: 'console.log("Kayan Code running JS...");' }
    ]
  }
];

export const INITIAL_FILES: File[] = [
  {
    id: '1',
    name: 'main.py',
    language: 'python',
    content: 'print("Hello from Kayan Code!")\n\n# Start coding here...',
  },
  {
    id: '2',
    name: 'index.html',
    language: 'html',
    content: '<!DOCTYPE html>\n<html>\n<body>\n  <h1>Kayan Code</h1>\n  <p>Your mobile IDE</p>\n</body>\n</html>',
  },
  {
    id: '3',
    name: 'styles.css',
    language: 'css',
    content: 'body {\n  background-color: #1a1a1a;\n  color: #00ff00;\n  font-family: monospace;\n}',
  },
];
