import mongoose from 'mongoose';

const MaxTemperatureSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    temperature: { type: Number, required: true }
});

const MaxTemperature = mongoose.model('MaxTemperature', MaxTemperatureSchema);

export default MaxTemperature;
