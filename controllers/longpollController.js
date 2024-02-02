let data = "Initial data";
let clients = [];
const updateInterval = 5000;
const cleanupInterval = 30000;

exports.longPollController = async (req, res, next) => {
  try {
    const newClient = {
      id: Math.random().toString(36).slice(2),
      res,
    };
    clients.push(newClient);

    setTimeout(() => {
      data = `Updated data at ${new Date()}`;
      res.json({ data });
      clients = clients.filter((client) => client !== newClient);
    }, updateInterval);
  } catch (error) {
    console.error("Error in longPollController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

setInterval(() => {
  clients.forEach((client) => {
    if (!client.res.finished) {
      client.res.json({ data });
      clients = clients.filter((c) => c !== client);
    }
  });
}, cleanupInterval);
