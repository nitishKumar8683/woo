import mongoose from 'mongoose';

let isConnected = false;

export async function connect() {
    if (isConnected) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const connection = mongoose.connection;

        connection.once('connected', () => {
            console.log('MongoDB connected successfully');
            isConnected = true; // Set flag to true once connected
        });

        connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            // Optionally handle the error (e.g., retry connection, alert, etc.)
        });

    } catch (error) {
        console.error('Something went wrong while connecting to MongoDB:', error);
        // Optionally handle the error (e.g., retry connection, alert, etc.)
    }
}
