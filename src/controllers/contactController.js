const ContactModel = require('../models/Contact');

const { storeContact, getListContact, editContact, deleteContact, ShowID, token } = require('../services/config');

// show all the contacts
exports.show = async (req, res) => {
  try {
    const dbList = await ContactModel.getListMongo();
    const {data} =  await getListContact();
    res.status(201).json({message: 'All Contacts listed Successfully', dbList, data});
    await ContactModel.StoreContactMongo();
    await ContactModel.deleteContactMongo();
    await ContactModel.editMongo();
  } catch (error) {
    res.status(500).json({ error });
  }
};

// show only the contact that was obtained by ID
exports.showById = async (req, res) => {
  try {
    const { id } = req.params;
    if (typeof id !== 'string' || !id) return res.status(400).json({ message: 'Invalid ID' });
    const {data} = await ShowID(id);
    res.status(201).json({message: 'Contact listed Successfully', data});
  } catch (error) {
    res.status(500).json({ error });
  }
};

// store contact
exports.store = async (req, res) => {
  try {
    const contact = req.body;
    const {details} = await storeContact(contact);
    const FullContact = await ShowID(details.id);
    await ContactModel.InsertDb(FullContact.data);
    res.status(201).json({ message: 'Contact entered successfully', contact, details });
  } catch (errors) {
    res.status(500).json({ errors });
  }
};

// update the contact
exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = req.body;
    const ContactUpdated = await ContactModel.edit(id, updatedContact);
    await editContact(id, updatedContact);
    res.status(201).json({ message: 'Updated Contact successfully', ContactUpdated});
  } catch (error) {
    res.status(500).json({ error });
  }
};

// delete all the data of the contact
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    if (typeof id !== 'string' || !id) return res.status(400).json({ message: 'Invalid ID' });
    const deleted = await ContactModel.delete(id);
    deleteContact(id);
    res.status(201).json({ message: 'Contact Deleted Successfully', deleted});
  } catch (error) {
    res.status(500).json({ error });
  }
};
