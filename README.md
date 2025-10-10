# E-Learning authoring tool
Open elearning editor

The Open e Learning project what is it?

Free and open source software for easy editing of courses and educational games.
Create engaging multimedia courses, in a matter of minutes

For Moodle, Chamilo LMS and Claroline

https://www.openelearning.org/

# OpenElearning Project - How It Works

## Overview
OpenElearning is a free and open-source e-learning authoring tool built with Electron that allows educators and content creators to easily design and develop interactive educational courses and games. The application provides a desktop-based solution for creating engaging multimedia educational content compatible with popular Learning Management Systems (LMS) like Moodle, Chamilo, and Claroline.

## Technical Architecture

### Technology Stack
- **Framework**: Electron v8.2.5 (Node.js + Chromium)
- **Language**: JavaScript (ES6+)
- **License**: GPL v3
- **Platform**: Cross-platform desktop application (Windows, macOS, Linux)

### Application Structure

#### Main Application (`main.js`)
- Entry point of the Electron application
- Manages application lifecycle and window creation
- Handles single-instance enforcement to prevent multiple app instances
- Sets up IPC (Inter-Process Communication) between main and renderer processes
- Manages application menus and system integration

#### User Interface Components

1. **Launch Interface** (`app/launch.html`)
   - Main dashboard for project management
   - Options to create new projects or open existing ones
   - Recent projects list for quick access
   - Extensions management interface

2. **Editor Interface** (`app/editor.html`)
   - Core authoring environment
   - Visual course/game development workspace
   - Template and component management

3. **Extensions System** (`app/extensions.html`, `app/editextensions.html`)
   - Plugin architecture for extending functionality
   - Extensions marketplace integration
   - Custom extension development tools

4. **Export System** (`app/export.html`)
   - Multi-format export capabilities
   - LMS-specific package generation
   - SCORM compliance support

# Official sponsors

PLOSS-RA

ISARA-LYON Lyon, France
A French Higher Education Institution developing national and international education, research and expertise activities in agricultural, food and environmental science.

UNIV Lyon 2 Colibre

Bâtisseurs Numériques Lyon, France
