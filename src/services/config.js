const axios = require('axios').default;
require('dotenv').config();
const BASE_URL = 'https://www.zohoapis.com/crm/v2/Contacts';
axios.defaults.headers.common['Authorization'] = `Zoho-oauthtoken ${process.env.Zoho}`;

exports.storeContact = async (contact) => {
  try {
    await axios.post(BASE_URL, {
      data: [
        contact,
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editContact = async (id, updatedContact) => {//TO-DO faltando resolver o problema dos ids diferentes para alteração
  try {
    await axios.put(`${BASE_URL}/${id}`, {
      data: [
        updatedContact,
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteContact = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.log(error);
  }
};

exports.getListContact = async () => {
  try {
    const {data} = await axios.get(BASE_URL, {
      responseType: 'json'
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

exports.ShowID = async (id) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/${id}`, {
      responseType: 'json'
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
