export const basePrompt = `<boltArtifact id="project-import" title="Project Files">
<boltAction type="file" filePath="index.html">
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
</boltAction>

<boltAction type="file" filePath="eslint.config.js">
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default {
  ignores: ['dist'],
  extends: [js.configs.recommended],
  files: ['**/*.jsx'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
</boltAction>

<boltAction type="file" filePath="package.json">
{
  "name": "vite-react-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "grapesjs": "^0.21.9",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.4.2"
  }
}
</boltAction>

<boltAction type="file" filePath="src/main.jsx">
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
</boltAction>

<boltAction type="file" filePath="src/App.js">
import React from "react";
import GrapesEditor from "./GrapesEditor";

const files = [
  {
    html: "/index.html",
    css: "/index.css",
  }
];

const App = () => {
  return (
    <div>
      <GrapesEditor files={files} />
    </div>
  );
};

export default App;
</boltAction>

<boltAction type="file" filePath="src/GrapesEditor.jsx">
import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

const GrapesEditor = ({ files = [] }) => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
      height: "100vh",
      width: "auto",
      fromElement: false,
      storageManager: { autoload: false },
    });

    editorInstance.current = editor;

    const loadFiles = async () => {
      let combinedHTML = "";
      let combinedCSS = "";

      for (const file of files) {
        const htmlResponse = await fetch(file.html).then((res) => res.text());
        const cssResponse = await fetch(file.css).then((res) => res.text());

        combinedHTML += htmlResponse;
        combinedCSS += cssResponse;
      }

      editor.setComponents(combinedHTML);
      editor.setStyle(combinedCSS);
    };

    loadFiles();

    return () => editor.destroy();
  }, [files]);

  return <div ref={editorRef} style={{ flex: 1, border: "1px solid #ddd" }}></div>;
};

export default GrapesEditor;
</boltAction>
</boltArtifact>`;
