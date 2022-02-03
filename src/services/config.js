const axios = require('axios').default;
const {token} = require('./token');
token();
require('dotenv').config();
const BASE_URL = 'https://www.zohoapis.com/crm/v2/Contacts';

//Store the contact in the Contact Module on Zoho
exports.storeContact = async (contact) => {
  try {
    const response = await axios.post(BASE_URL, {
      data: [
        contact,
      ],
    });
    const details = response.data.data[0];
    return details;
  } catch (error) {
    throw new Error(error);
  }
};

//Update the contact in the Contact Module on Zoho
exports.editContact = async (id, updatedContact) => {
  try {
    await axios.put(`${BASE_URL}/${id}`, {
      data: [
        updatedContact,
      ],
    });
  } catch (error) {
    throw new Error(error);
  }
};

//Delete the contact in the Contact Module on Zoho
exports.deleteContact = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};

//Get the list of contacts from Contact Module on Zoho
exports.getListContact = async () => {
  try {
    const {data} = await axios.get(BASE_URL, {
      responseType: 'json'
    });
    return data;

  } catch (error) {
    throw new Error(error);
  }
}

//Get the specified contact by ID from Contact Module on Zoho
exports.ShowID = async (id) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/${id}`, {
      responseType: 'json'
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

//Get all the contacts that was deleted from Contact Module on Zoho
exports.getDeletedId = async () => {
  try {
    const {data} = await axios.get(`${BASE_URL}/deleted?type=all`, {
      responseType: 'json'
    });
    const idZoho = data.data;
    return idZoho;
  } catch (error) {
    throw new Error(error);
  }
}



