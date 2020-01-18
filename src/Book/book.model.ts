import { Document, Schema, Model, model } from 'mongoose';

export interface IBook extends Document {
	title: string;
	author: string;
}

// defining all the fields of main book
export const bookSchema: Schema = new Schema({
	title: { type: String, required: true },
	author: { type: String, required: true }
});

// Export the model and return your IBook interface
export const Book: Model<IBook> = model<IBook>('Book', bookSchema);
