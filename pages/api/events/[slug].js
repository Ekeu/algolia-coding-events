const { events } = require('./data.json');
export default (req, res) => {
  const singleEvent = events.filter((evt) => evt.slug === req.query.slug);
  if (req.method === 'GET') {
    res.status(200).json(singleEvent);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
