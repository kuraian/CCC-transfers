import mongoose from 'mongoose'

export interface Agreements extends mongoose.Document {
  school: string
  label: string
  key: number
  entries: Array<any>
}

const AgreementSchema = new mongoose.Schema<Agreements>({
  school: {
    /* The name of the school */

    type: String,
  },
  label: {
    /* The name of the degree/major */

    type: String,
  },
  key: {
    /* The unique ID of the agreement */

    type: Number,
  },
  entries: {
    /* An array of classes that are equivalent */

    type: [Array],
  },
})

export default mongoose.models.Agreement || mongoose.model<Agreements>('Agreement', AgreementSchema)
