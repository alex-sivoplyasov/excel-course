console.log('Module.js');

async function start() {
    return await Promise.resolve('test');
}

start().then(console.log)
