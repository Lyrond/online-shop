const mongoose = require('mongoose')
const ProdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: [Number],
        required: true
    },
    kind: {
        type: String,
        required: true
    }

});


const ProdMod = mongoose.model('products', ProdSchema);
module.exports = ProdMod;
//module.exports = mongoose.model('product', prodSchema)
