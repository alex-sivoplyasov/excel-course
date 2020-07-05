async function start() {
    return await Promise.resolve('test');
}

start().then(console.log)
