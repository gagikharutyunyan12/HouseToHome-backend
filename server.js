const app = require('./app');
require('./database/db');
const PORT = process.env.PORT || 4000;
const {cloudinaryConfig} = require('./config/cloudinary.config')

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});


const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});
cloudinaryConfig();