# CyberShield

This project is a comprehensive cybersecurity platform with a Docker-based pentesting tool orchestration engine in the Backend and a React-based Frontend.
It allows controlled execution of tools like Nmap, Gobuster, Nikto, and SQLMap inside isolated containers.

The Backend is CLI-based, while the Frontend provides a user interface.

---

# Project Structure
```
CyberShield/
│
│
├── Backend/
│   ├── README.md
│   ├── requirements.txt
│   ├── structure.txt
│   ├── scan_engine/
│   └── tools/
│
└── Frontend/
    ├── .gitignore
    ├── bun.lockb
    ├── components.json
    ├── eslint.config.js
    ├── figure1.png
    ├── figure2.png
    ├── figure3.png
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── README.md
    ├── tailwind.config.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── vitest.config.ts
    ├── public/
    │   ├── favicon.ico
    │   ├── placeholder.svg
    │   └── robots.txt
    └── src/
        ├── App.css
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        ├── vite-env.d.ts
        ├── components/
        │   ├── Navbar.tsx
        │   ├── NavLink.tsx
        │   ├── ScannerModal.tsx
        │   ├── StatCard.tsx
        │   ├── ToolCard.tsx
        │   └── ui/
        │       ├── accordion.tsx
        │       ├── alert-dialog.tsx
        │       ├── alert.tsx
        │       ├── aspect-ratio.tsx
        │       ├── avatar.tsx
        │       ├── badge.tsx
        │       ├── breadcrumb.tsx
        │       ├── button.tsx
        │       ├── calendar.tsx
        │       ├── card.tsx
        │       ├── carousel.tsx
        │       ├── chart.tsx
        │       ├── checkbox.tsx
        │       ├── collapsible.tsx
        │       ├── command.tsx
        │       ├── context-menu.tsx
        │       ├── dialog.tsx
        │       ├── drawer.tsx
        │       ├── dropdown-menu.tsx
        │       ├── form.tsx
        │       ├── hover-card.tsx
        │       ├── input-otp.tsx
        │       ├── input.tsx
        │       ├── label.tsx
        │       ├── menubar.tsx
        │       ├── navigation-menu.tsx
        │       ├── pagination.tsx
        │       ├── popover.tsx
        │       ├── progress.tsx
        │       ├── radio-group.tsx
        │       ├── resizable.tsx
        │       ├── scroll-area.tsx
        │       ├── select.tsx
        │       ├── separator.tsx
        │       ├── sheet.tsx
        │       ├── sidebar.tsx
        │       ├── skeleton.tsx
        │       ├── slider.tsx
        │       ├── sonner.tsx
        │       ├── switch.tsx
        │       ├── table.tsx
        │       ├── tabs.tsx
        │       ├── textarea.tsx
        │       ├── toast.tsx
        │       ├── toaster.tsx
        │       ├── toggle-group.tsx
        │       ├── toggle.tsx
        │       ├── tooltip.tsx
        │       └── use-toast.ts
        ├── hooks/
        │   ├── use-mobile.tsx
        │   └── use-toast.ts
        ├── lib/
        │   └── utils.ts
        ├── pages/
        │   ├── Dashboard.tsx
        │   ├── Index.tsx
        │   ├── Login.tsx
        │   ├── NotFound.tsx
        │   ├── Passwords.tsx
        │   └── Tools.tsx
        └── test/
            ├── example.test.ts
            └── setup.ts
```
---

# What Each File Does

## Backend Files

### README.md
This README file providing project overview, structure, and setup instructions.

### requirements.txt
Python dependencies required for the Backend.

### structure.txt
Text file outlining the project structure.

### scan_engine/
Directory containing the scan engine modules.

#### main.py
CLI entrypoint for the scan engine.

Responsibilities:
- Accept tool name and target
- Load tool configuration
- Validate input
- Execute container
- Print job results

Run format: python scan_engine/main.py <tool> <target> [flags]

Example: python scan_engine/main.py nmap scanme.nmap.org -sV -Pn

#### tool_loader.py
Loads tool.yaml configuration for a given tool. Ensures tool exists before execution.

#### validator.py
Validates target format (IP or domain) and flags allowed by tool.yaml. Rejects unsafe flags.

#### runner.py
Core execution engine. Runs Docker container, enforces timeout, captures output, stores in artifacts/.

#### models.py
Defines ScanJob data model: id, tool, status, timestamps, exit code, error.

#### parser_nmap.py
Parses Nmap XML output into structured results for intelligence extraction.

### tools/
Directory containing tool configurations.

#### <tool>/tool.yaml
Defines execution policy for each tool: Docker image, allowed flags, timeout, limits. Prevents command injection.

## Frontend Files

### .gitignore
Git ignore file for the Frontend project.

### bun.lockb
Lock file for Bun package manager.

### components.json
Configuration for shadcn/ui components.

### eslint.config.js
ESLint configuration for code linting.

### figure1.png, figure2.png, figure3.png
Images used in the project (e.g., for documentation or UI).

### index.html
Main HTML entry point for the React application.

### package-lock.json
NPM lock file ensuring consistent dependency versions.

### package.json
NPM package file with project metadata and scripts.

### postcss.config.js
PostCSS configuration for CSS processing.

### README.md
Frontend-specific README.

### tailwind.config.ts
Tailwind CSS configuration.

### tsconfig.app.json, tsconfig.json, tsconfig.node.json
TypeScript configuration files for different environments.

### vite.config.ts
Vite build tool configuration.

### vitest.config.ts
Vitest testing framework configuration.

### public/
Directory for static assets served directly.

#### favicon.ico
Website favicon.

#### placeholder.svg
Placeholder SVG image.

#### robots.txt
File for web crawlers.

### src/
Source code directory.

#### App.css
Main CSS styles for the App component.

#### App.tsx
Main React App component.

#### index.css
Global CSS styles.

#### main.tsx
React application entry point.

#### vite-env.d.ts
TypeScript declarations for Vite environment.

#### components/
React components directory.

##### Navbar.tsx
Navigation bar component.

##### NavLink.tsx
Navigation link component.

##### ScannerModal.tsx
Modal component for scanner functionality.

##### StatCard.tsx
Component for displaying statistics.

##### ToolCard.tsx
Component for displaying tool information.

##### ui/
UI components from shadcn/ui library.

###### accordion.tsx, alert-dialog.tsx, ..., use-toast.ts
Individual UI components (buttons, inputs, dialogs, etc.) for building the interface.

#### hooks/
Custom React hooks.

##### use-mobile.tsx
Hook for detecting mobile devices.

##### use-toast.ts
Hook for managing toast notifications.

#### lib/
Utility functions.

##### utils.ts
General utility functions.

#### pages/
Page components for routing.

##### Dashboard.tsx
Dashboard page component.

##### Index.tsx
Home page component.

##### Login.tsx
Login page component.

##### NotFound.tsx
404 error page component.

##### Passwords.tsx
Passwords management page component.

##### Tools.tsx
Tools page component.

#### test/
Test files.

##### example.test.ts
Example test file.

##### setup.ts
Test setup configuration.

---

# Setup Instructions

## 1. Install Ubuntu Dependencies

sudo apt update
sudo apt install -y python3 python3-pip docker.io

---

## 2. Enable Docker

sudo systemctl enable docker
sudo systemctl start docker

Add current user to docker group:

sudo usermod -aG docker $USER
newgrp docker

Verify:

docker --version

---

## 3. Install Python Requirements

pip install -r requirements.txt

---

## 4. Build Tool Containers

From project root:

docker build -t pentest-nmap tools/nmap
docker build -t pentest-gobuster tools/gobuster
docker build -t pentest-nikto tools/nikto
docker build -t pentest-sqlmap tools/sqlmap

Verify:

docker images | grep pentest

---

## 5. Create Isolated Scan Network

docker network create scan-net

Verify:

docker network inspect scan-net

---

# Running Scans

Basic usage:

python scan_engine/main.py <tool> <target> [flags]

Example Nmap:

python scan_engine/main.py nmap scanme.nmap.org -sV -Pn

Example Gobuster:

python scan_engine/main.py gobuster example.com dir -t 10

Example Nikto:

python scan_engine/main.py nikto example.com -ssl

Example SQLMap:

python scan_engine/main.py sqlmap testphp.vulnweb.com -u https://testphp.vulnweb.com/listproducts.php?cat=1 --batch

---

# Output Handling

All scan results are saved in:

artifacts/<scan_id>/

Each scan directory contains:
- raw output
- execution metadata

---

# Security Features

- Tool allowlist
- Flag allowlist
- Target validation
- Docker network isolation
- Memory limits
- Timeout enforcement
- No shell execution

---

# Testing Failure Cases

Test invalid flag:

python scan_engine/main.py nmap scanme.nmap.org --os-shell

Should return validation error.

Test invalid target:

python scan_engine/main.py nmap localhost

Should return validation error.

---

# Development Workflow

1. Modify tool.yaml
2. Rebuild tool image
3. Test manually with docker run
4. Run via CLI engine
5. Inspect artifacts

---

# End of README
