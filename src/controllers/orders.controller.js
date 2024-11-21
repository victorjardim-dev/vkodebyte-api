const orderModelQueries = require("../models/orders.model");

const getAllOrders = async (req, res) => {
  try {
    const rows = await orderModelQueries.getOrders();

    if (rows.length == 0) {
      return res.status(204).json();
    }

    return res.status(200).json({
      total_orders: rows.length,
      orders: [
        ...rows
      ]
    });

  } catch(err) {
    return res.status(500).json({ api_message_error: err });
  }
}

module.exports = {
  getAllOrders,
}
