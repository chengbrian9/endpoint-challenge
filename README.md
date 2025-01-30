# Endpoint Backend Challenge

Take-home coding challenge for Endpoint Closing - Directory Tree

## Features

- Create directories and nested directories
- Move directories and their contents
- Delete directories
- List the current directory structure

## Requirements

- Node.js (Any recent version)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/chengbrian9/endpoint-challenge.git
   ```

2. Install dependencies (solution runs without dependencies, this is just for production code formatting):

   ```bash
   npm install
   ```

3. Run the script:
   ```bash
   npm start
   ```

## Inputting Commands

Enter commands one per line in the following format:

- `CREATE path/to/directory` - Creates a new directory
- `MOVE source/path target/path` - Moves a directory
- `DELETE path/to/directory` - Deletes a directory
- `LIST` - Shows the current directory structure

## Development

### Code Style and Linting

- Run linting:

  ```bash
  npm run lint
  ```

- Format code:
  ```bash
  npm run format
  ```

### Project Structure

```
endpoint-challenge/
 directories.js    # Main script
 package.json     # Project configuration and dependencies
 .eslintrc.json  # ESLint configuration
 .prettierrc     # Prettier configuration
 .gitignore      # Git ignore rules
  README.md       # Documentation
```

## Areas for Improvement with more Time

- Implement a data structure like Map() with a class based approach for file system: can utilize built-in methods for performance optimization at scale (O(1) look ups/inserts/deletes!), prevent name collisions, and better separation of concerns with all methods under a class
- Expand error handling, unit tests, and prevent edge cases like moving directory into itself & invalid chars in directory names
