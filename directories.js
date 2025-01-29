// object to represent file system
const fileSystem = {
    root: {}
};

// helper to split path into parts
function splitPath(path) {
    return path.split('/').filter(part => part.length > 0);
}

// helper to find a dir and its parent
function findDirectory(path) {
    const parts = splitPath(path);
    let current = fileSystem.root;
    
    // for root level dirs
    if (parts.length === 1) {
        return [parts[0], fileSystem.root];
    }
    
    // for nested dirs, traverse to the parent
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!(part in current)) {
            return [null, null];
        }
        current = current[part];
    }
    
    return [parts[parts.length - 1], current];
}

// create a dir
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

// move a dir
function move(source, target) {
    const foundSource = findDirectory(source);
    const sourceName = foundSource[0];
    const sourceParent = foundSource[1];
    
    if (!sourceParent || !(sourceName in sourceParent)) {
        console.log(`Can't move ${source} - path does not exist`);
        return;
    }
    
    // get tgt dir
    let targetParent = fileSystem.root;
    const targetParts = splitPath(target);
    
    // navigate to tgt dir
    for (const part of targetParts) {
        if (!(part in targetParent)) {
            console.log(`Can't move ${source} - target path does not exist`);
            return;
        }
        targetParent = targetParent[part];
    }
    
    // move dir
    targetParent[sourceName] = sourceParent[sourceName];
    delete sourceParent[sourceName];
}

// delete a directory
function deleteDir(path) {
    const found = findDirectory(path);
    const name = found[0];
    const parent = found[1];
    
    if (!parent || !(name in parent)) {
        console.log(`Cannot delete ${path} - ${splitPath(path)[0]} does not exist`);
        return;
    }
    
    delete parent[name];
}

// list directories recursively, sorting alphabetically
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

// process input using readable stream
let inputBuffer = '';

process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
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
