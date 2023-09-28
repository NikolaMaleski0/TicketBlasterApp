const Ticket = require('../../../pkg/ecommerce/ecommerceSchema');
const TicketHistory = require('../../../pkg/ecommerce/ecommerceSchemaHistory');

const addTicket = async (req, res) => {
  try {
    const { user, tickets } = req.body;

    console.log(user);

    const loggedUser = await Ticket.findOne({ user });

 
    if (loggedUser) {

      const newTicketEvents = tickets.map((ticket) => ticket.event);

      const filterTicketEvents = loggedUser.tickets.filter((filteredEvents)=> !newTicketEvents.includes(filteredEvents.event));

      filterTicketEvents.push(...tickets);

      loggedUser.tickets = filterTicketEvents;

      await loggedUser.save();


      res.status(201).json({
        status: 'Success',
        data: {
          message: 'Tickets have been updated, added to the new tickets'
        }
      });

    } else {
      const newTicket = await Ticket.create({
        user: user,
        tickets: tickets
      });
 

      res.status(201).json({
        status: 'Success',
        tickets: newTicket
      });
    };

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message
    });
  }
};

const getTicketsForUser = async (req, res) => {
  try {

    const userId = req.params.userId;
    // console.log(userId);

    const ticket = await Ticket.findOne({ user: userId })
      .populate({
        path: 'tickets.event',
        model: 'event',
        select: '-relatedActs'
      });

    res.status(200).json({
      status: 'Success',
      data: {
        ticket
      }
    });

  } catch(err) {
    res.status(500).json({
      status: 'Fail',
      message: err.message
    });
  }
};

const processPaymentAddToHistory = async (req, res) => {
  try {
    const userId = req.body.userId;
    
    let userTicket = await Ticket.findOne({ user: userId });

    const ticketsHistory = await TicketHistory.findOne({ user: userId });

    if (!ticketsHistory) {
      ticketsHistory = await TicketHistory.create({ 
        user: userId,
        historyTickets: [],
      });
    };

    ticketsHistory.historyTickets.push(...userTicket.tickets);

    await ticketsHistory.save();

    userTicket.tickets = [];

    await userTicket.save();

    res.status(200).json({
      status: 'Sucess',
      data: {
        ticketsHistory
      }
    });

  } catch(err) {
    res.status(500).json({
      status: 'Fail',
      message: err.message
    });
  }
};
 
const getLastestTickets = async (req, res) => {
  try { 
    const userId = req.params.userId;

    const latestTickets = await TicketHistory.findOne({ user: userId })
      .populate({
        path: 'historyTickets.event',
        model: 'event',
        select: '-relatedActs'
      });

    if (!latestTickets || !latestTickets.historyTickets.length) {
      return res.status(404).json({
        status: 'Fail',
        message: 'No tickets found for that user'
      });
    };

    latestTickets.historyTickets.sort((a, b) => b.timeStamp - a.timeStamp);

    const mostLatestTickets = latestTickets.historyTickets[0].timeStamp;
    const mostLatestEvents = latestTickets.historyTickets.filter((event) => event.timeStamp === mostLatestTickets);

    res.status(200).json({
      status: 'Success',
      data: {
        mostLatestEvents
      }
    });

  } catch(err) {
    res.status(500).json({
      status: 'Fail',
      message: err.message
    });
  }
};

const getAllTicketsHistoryOfUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    console.log(userId);

    const findAllTickets = await TicketHistory.findOne({ user: userId })
      .populate({
        path: 'historyTickets.event',
        model: 'event',
        select: '-relatedActs'
      });

    if (!findAllTickets) {
      return res.status(404).json({
        status: 'Fail',
        message: 'No ticket history found for this user'
      });
    }

    findAllTickets.historyTickets.sort((a, b) => b.timeStamp - a.timeStamp);

    res.status(200).json({
      status: 'Sucess',
      data: {
        findAllTickets
      }
    });

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message
    });
  }
};


const removeEventfromTicket = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    console.log('ticket ID:', ticketId);
    const eventToRemove = req.params.eventToRemove;
    console.log('event to remove:', eventToRemove);

    const ticket = await Ticket.findById(ticketId);

    if(!ticket) {
      return res.status(404).json({
        status: 'Fail',
        message: 'Ticket not found'
      });
    }

    const eventIndex = ticket.tickets.findIndex((event) => event._id === eventToRemove);

    ticket.tickets.splice(eventIndex, 1);

    await ticket.save();

    res.status(204).json({
      status: 'Success',
      data: null
    });
    
  } catch(err) {
    res.status(500).json({
      status: 'Error',
      message: err.message
    });
  }
};

module.exports = {
  addTicket,
  removeEventfromTicket,
  getTicketsForUser,
  getLastestTickets,
  processPaymentAddToHistory,
  getAllTicketsHistoryOfUser
}