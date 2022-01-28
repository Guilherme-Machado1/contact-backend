const ContactModel = require('../models/Contact');

const { storeContact, getListContact, editContact, deleteContact, ShowID } = require('../services/config');

// show all the contacts
exports.show = async (req, res) => {
  try {
    // const contacts = await ContactModel.find();
    const {data} = await getIdFromZoho();
    // let FinalData = Object.assign({}, contacts, data);
    res.status(201).json({message: 'perfect', data});
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.showById = async (req, res) => {
  try {
    const { id } = req.params;
    if (typeof id !== 'string' || !id) return res.status(400).json({ message: 'Invalid ID' });
    const {data} = await ShowID(id);
    // console.log(data)
    res.status(201).json({message: 'perfect', data});
  } catch (error) {
    res.status(500).json({ error });
  }
};

// store contact
exports.store = async (req, res) => {
  try {
    const contact = req.body;
    await ContactModel.create(contact);
    storeContact(contact);
    res.status(201).json({ message: 'Perfect', contact });
  } catch (errors) {
    res.status(500).json({ errors });
  }
};

// update
exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    // const updatedContact = await ContactModel.findByIdAndUpdate({ _id: id }, { $set: req.body});
    const updatedContact = req.body;
    editContact(id, updatedContact);
    res.status(201).json({ message: 'Updated Contact successfully', updatedContact });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// delete all the data of the contact
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    if (typeof id !== 'string' || !id) return res.status(400).json({ message: 'Invalid ID' });
    // const deleted = await ContactModel.findByIdAndDelete(id);
    deleteContact(id);
    res.status(201).json({ message: 'Perfect', id });
  } catch (error) {
    res.status(500).json({ error });
  }
};
