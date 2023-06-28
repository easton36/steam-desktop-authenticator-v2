# Contributing Guidelines

Thank you for your interest in contributing to SDA v2! We welcome contributions from all developers, regardless of their technical expertise. This guide will help you understand the project structure, provide instructions for setting up the development environment, and explain how to contribute to our i18n translations effectively.

## Table of Contents
1. Project Overview
2. Development Setup
  - Prerequisites
  - Getting Started
3. Contributing to i18n Translations
  - Understanding the Localization Process
  - Adding or Modifying Translations
  - Testing Translations
4. Submitting a Contribution
  - Creating a Pull Request
  - Code Review
5. Code Style and Guidelines

## Project Overview
This application is built using Tauri, React, and Redux. It also supports multiple languages through i18n translations.

## Development Setup
### Prerequisites
Before you start contributing, make sure you have the following prerequisites installed on your machine:

 - Node.js (v14 or later)
 - Git
 - npm (v6 or later)
 - Rust (nightly toolchain)
 - C/C++ Build Tools (for Windows users)

### Getting Started
1. Clone the repository to your local machine:
```
git clone https://github.com/easton36/steam-desktop-authenticator-v2.git
cd steam-desktop-authenticator-v2
```
2. Install the project dependencies:
```
npm install
```
3. Install the Tauri dependencies (this will take a while):
```
npm run tauri deps
```
3. Start the development server:
```
npm run tauri dev
```
This command will start the application in development mode and open it.

Note: If you encounter any issues during the setup process, refer to the [Tauri documentation](https://tauri.app/v1/guides/getting-started/prerequisites) for detailed troubleshooting instructions.

### Development Workflow
Once the development server is running, you can make changes to the React components and Redux state management as needed. The application will automatically reload whenever you save your changes.

When working on the Rust side of the application, the development server will automatically rebuild the Rust code and reload the application when you save your changes.

## Contributing to i18n Translations
### Understanding the Localization Process
This application uses i18n for translations. Translations are stored in JSON files located in the src/translations directory. Each language has its own JSON file named with the respective language code (e.g., en.json for English).

### Adding or Modifying Translations
To add or modify translations:

1. Locate the JSON file for the target language in the src/translations directory.
2. Open the JSON file using a text editor.
3. Add or modify the translations according to the following structure:
```
{
	"key": "value",
}
```
For example:
```
{
	"Setup New Account": "Setup New Account",
	"Setup Encryption": "Setup Encryption"
}
```
4. Save the changes to the JSON file.

### Testing Translations
To test the translations in the application:

1. Start the development server if it's not already running:
```
npm run tauri dev
```
2. Open the application and switch to the target language.
3. Verify that the translations are displayed correctly throughout the application.

## Submitting a Contribution
### Creating a Pull Request
Once you have made your changes, you can submit a pull request to the repository. To do so:

1. Create a new branch from the main branch:
```
git checkout -b my-contribution
```
2. Commit your changes with descriptive commit messages:
```
git commit -m "Add i18n translations for French language"
```
3. Push your changes to the remote repository:
```
git push origin my-contribution
```
4. Open the repository in your web browser and create a new pull request.

### Code Review
Once you have submitted your pull request, it will be reviewed by the project maintainers. If any changes are requested, you can make them by following the same steps outlined above.

### Code Style and Guidelines
 - Follow the existing code style and conventions used in the project.
 - Write clear, concise, and well-documented code.
 - Test your changes thoroughly to ensure they don't introduce any regressions.