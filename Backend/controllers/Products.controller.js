import Product from "../modals/Product.modal.js";


const createProduct = async (req, res) => {
    try {
        const data = req.body;

        const products = Array.isArray(data) ? data : [data];

        const created = await Product.insertMany(products);
        res.status(201).json(
            {
                success: true,
                message: "Product created successfully",
                data: created
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }
}

const getProducts = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const pagNumber = Number(page);
        const limitNumber = Number(limit);

        const skip = (pagNumber - 1) * limitNumber;

        const products = await Product.find().skip(skip).limit(limitNumber);

        const totalProducts = await Product.countDocuments();
        res.status(200).json(
            {
                success: true,
                message: "Products fetched successfully",
                data: products,
                totalProducts
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }
}




export {
    createProduct,
    getProducts
}