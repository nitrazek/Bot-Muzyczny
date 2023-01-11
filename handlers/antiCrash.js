module.exports = client => {
    process.on('unhandledRejection', (reason, p) => {
        console.log('Unhandled Rejection Error');
        console.log(reason, p);
    });
    process.on('uncaughtException', (err, origin) => {
        console.log('Uncaught Exception Error');
        console.log(err, origin);
    });
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log('Uncaught Exception Monitor Error');
        console.log(err, origin);
    });
}