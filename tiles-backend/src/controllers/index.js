const { Op } = require('sequelize');
const { Tiles } = require('../db/models/index.model');

const searchAndFilterItems = async (req, res, next) => {
    try {
        const { search, material, color, price } = req.query;
        const where = {};

        if (search) {
            where.name = { [Op.iLike]: `%${search}%` };
        }

        if (material || color || price) {
            if (material) {
                where.material = material;
            }
            if (color) {
                where.color = color;
            }
            if (price) {
                where.price = price;
            }
        }

        const items = await Tiles.findAll({ where });

        return res.status(200).json({
            error: false,
            message: "Items fetched successfully",
            results: items
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(404).json({ error: 'Item not found!' });
    }
}

module.exports = { searchAndFilterItems };
