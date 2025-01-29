#!/usr/bin/env node

const fileSystem = {
  root: {},
};

function splitPath(path) {
  return path.split('/').filter((part) => part.length > 0);
}

function findDirectory(path) {
  const parts = splitPath(path);
  let current = fileSystem.root;

  if (parts.length === 1) {
    return [parts[0], fileSystem.root];
  }

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current)) {
      return [null, null];
    }
    current = current[part];
  }

  return [parts[parts.length - 1], current];
}

function create(path) {
  const parts = splitPath(path);
  let current = fileSystem.root;

  for (const part of parts) {
    if (!(part in current)) {
      current[part] = {};
    }
    current = current[part];
  }
}

function move(source, target) {
  const [sourceName, sourceParent] = findDirectory(source);

  if (!sourceParent || !(sourceName in sourceParent)) {
    console.log(`Cannot move ${source} - path does not exist`);
    return;
  }

  let targetParent = fileSystem.root;
  const targetParts = splitPath(target);

  for (const part of targetParts) {
    if (!(part in targetParent)) {
      console.log(`Cannot move ${source} - target path does not exist`);
      return;
    }
    targetParent = targetParent[part];
  }

  targetParent[sourceName] = sourceParent[sourceName];
  delete sourceParent[sourceName];
}

function deleteDir(path) {
  const [name, parent] = findDirectory(path);

  if (!parent || !(name in parent)) {
    console.log(`Cannot delete ${path} - ${splitPath(path)[0]} does not exist`);
    return;
  }

  delete parent[name];
}

function listDirectories(dir = fileSystem.root, indent = '') {
  if (Object.keys(dir).length === 0) {
    return;
  }
  const names = Object.keys(dir).sort();

  for (const name of names) {
    console.log(indent + name);
    listDirectories(dir[name], indent + '  ');
  }
}

let inputBuffer = '';
const { stdin } = process;
stdin.setEncoding('utf8');
stdin.on('data', (chunk) => {
  inputBuffer += chunk;
  const lines = inputBuffer.split('\n');

  while (lines.length > 1) {
    const line = lines.shift().trim();
    if (line) {
      const [command, ...args] = line.split(' ');

      switch (command) {
        case 'CREATE':
          create(args[0]);
          break;
        case 'MOVE':
          move(args[0], args[1]);
          break;
        case 'DELETE':
          deleteDir(args[0]);
          break;
        case 'LIST':
          listDirectories();
          break;
      }
    }
  }

  inputBuffer = lines[0];
});
