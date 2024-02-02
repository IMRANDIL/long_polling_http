let data = "Initial data";
let clients = [];
let isUpdating = false; // Lock variable
const updateInterval = 5000;
const cleanupInterval = 30000;

exports.longPollController = async (req, res, next) => {
  try {
    const newClient = {
      id: Math.random().toString(36).slice(2),
      res,
    };

    // Acquire the lock
    if (!isUpdating) {
      isUpdating = true;

      clients.push(newClient);

      setTimeout(() => {
        data = `Updated data at ${new Date()}`;
        res.json({ data });
        clients = clients.filter((client) => client !== newClient);

        // Release the lock
        isUpdating = false;
      }, updateInterval);
    } else {
      res.status(503).json({ error: "Service Unavailable" });
    }
  } catch (error) {
    console.error("Error in longPollController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

setInterval(() => {
  // Acquire the lock
  if (!isUpdating) {
    isUpdating = true;

    clients.forEach((client) => {
      if (!client.res.finished) {
        client.res.json({ data });
        clients = clients.filter((c) => c !== client);
      }
    });

    // Release the lock
    isUpdating = false;
  }
}, cleanupInterval);
