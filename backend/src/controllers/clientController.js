import Client from "../models/Client.js";

export const createClient = async (req, res) => {
  try {
     console.log("BODY RECEIVED:");
    console.log(req.body);
    const client = await Client.create(req.body);
console.log("CLIENT SAVED:");
    console.log(client);

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({
      createdAt: -1,
    });

    res.json(clients);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(client);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    await client.deleteOne();

    res.json({
      message: "Client deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};