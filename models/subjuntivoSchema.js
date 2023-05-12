const mongoose = require('mongoose')
const marked = require('marked')
const mangle = require('marked-mangle')
const markedGfmHeadingId = require('marked-gfm-heading-id')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

marked.use(mangle.mangle(), markedGfmHeadingId.gfmHeadingId())

const subjuntivoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    auth: {
        type: String,
        require: true
    },
    markdown: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        require: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        require: true
    }
})

subjuntivoSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    if(this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown), { mangle })
       }

    next()
})

module.exports = mongoose.model('Subjuntivo', subjuntivoSchema)