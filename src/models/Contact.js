const { default: axios } = require('axios');
const mongoose = require('mongoose');
const {getDeletedId, getListContact, ShowID} = require('../services/config');

const ContactSchema = new mongoose.Schema({
  Owner: {
    name: {type: String},
    id: {type: String},
    email:{type: String}
  },
  Last_Name: {type: String, required: true},
  Full_Name: {type: String, default: null},
  Email: { type: String, default: null },
  Phone: {type: String, default: null},
  Other_Phone: {type: String, default: null},
  Mailing_State: { type: String, default: null },
  Other_State: { type: String, default: null },
  Other_Country: { type: String, default: null },
  Department: { type: String, default: null },
  Assistant: { type: String, default: null },
  Exchange_Rate: { type: Number, default: null },
  Currency: { type: String, default: null },
  Mailing_Country: { type: String, default: null },
  Data_Processing_Basis_Details: { type: String, default: null },
  Data_Source: { type: String, default: null },
  Reporting_To: {
    name: { type: String, default: null },
    id: {type: String}
  },
  approval: {
    delegate: { type: Boolean, default: false },
    approve: { type: Boolean, default: false },
    reject: { type: Boolean, default: false },
    resubmit: { type: Boolean, default: false },
  },
  Days_Visited: { type: String, default: null },
  Other_City: { type: String, default: null },
  Negative_Touch_Point_Score: { ttype: Number, default: 0 },
  Modified_Time: {type: Date},
  Positive_Touch_Point_Score: { ttype: Number, default: 0 },
  Home_Phone: { type: String, default: null},
  Score: { type: Number, default: 0 },
  Negative_Score: { type: Number, default: 0 },
  Secondary_Email: { type: String, default: null },
  Touch_Point_Score: { type: Number, default: 0 },
  Positive_Score: { type: Number, default: 0 },
  Description: { type: String, default: null },
  Vendor_Name: {
    name: { type: String, default: null },
    id:{type: String}
  },
  Mailing_Zip: { type: String, default: null },
  Number_Of_Chats: { type: String, default: null },
  review_process: {
    approve: { type: Boolean, default: false },
    reject: { type: Boolean, default: false },
    resubmit: { type: Boolean, default: false },
  },
  Twitter: { type: String, default: null },
  Other_Zip: { type: String, default: null },
  Mailing_Street: { type: String, default: null },
  Salutation: { type: String, default: null },
  First_Name: { type: String, default: null },
  Full_Name: { type: String, default: null },
  Asst_Phone: { type: String, default: null },
  Record_Image: { type: String, default: null },
  review: { type: String, default: null },
  Skype_ID: { type: String, default: null },
  Phone: { type: String, default: null },
  Account_Name: {
    name: { type: String, default: null },
    id:{type: String}
  },
  Email_Opt_Out: { type: Boolean, default: true },
  Date_of_Birth: { type: Date },
  Mailing_City: { type: String, default: null },
  Title: { type: String, default: null },
  Other_Street: { type: String, default: null },
  Mobile: { type: String, default: null },
  Territories: { type: Array, default: null },
  Modified_By: {
    name: {type: String},
    id: {type: String},
  },
  Layout: {
    name: { type: String, default: null },
    id: {type: String},
  },
  Referrer: { type: Boolean, default: false },
  Lead_Source: { type: String, default: null },
  Tag: { type: Array, default: [] },
  Fax: { type: String, default: null },
  Created_Time: {type: Date},
  id: {type:  String},
  Created_By: {
    name: {type: String},
    id: {type: String},
  },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

ContactModel.delete = async(id) => {
  if(typeof id !== 'string') return;
    const contact = await ContactModel.findOneAndDelete({id:id});
    return contact;
}

ContactModel.getListMongo = async() => {
    const contacts = await ContactModel.find();
    return contacts;
}

ContactModel.InsertDb = async(FullData) => {
  const contact = await ContactModel.create(FullData);
  return contact;
}

ContactModel.edit = async(id, body) => {
  if(typeof id !== 'string') return;
  const ContactUpdated = await ContactModel.findOneAndUpdate({ id: id }, { $set: body}, {new: true});
  return ContactUpdated;
}

ContactModel.deleteContactMongo = async() => {
  try {
    const idZohoDeleted = await getDeletedId();
    const contacts = await ContactModel.find();
    for (const key in contacts) {
      if(idZohoDeleted[key].id){
        await ContactModel.findOneAndDelete({id:idZohoDeleted[key].id});
      }
    }
  } catch (error) {
    console.log(error);
  }
}

ContactModel.editMongo = async() => {
    try {
      const {data} = await getListContact();

      for (let key in data) {
          const contact = await ContactModel.findOne({id: data[key].id});
          if(data[key].id === contact.id){
              let body = {...data[key]}
              await ContactModel.findOneAndUpdate({ id: contact.id }, { $set: body}, {new: true});
          }
      }
    } catch (error) {
      console.log(error)
    }
}

ContactModel.StoreContactMongo = async() => {

    const {data} = await getListContact();
    const zohoData = data;
    for (const key in zohoData) {
     const idZoho = zohoData[key].id;
     const id = await ContactModel.findOne({id:idZoho})
     try {
      if(id === null){
        const {data} = await axios.get(`https://www.zohoapis.com/crm/v2/Contacts/${idZoho}`);
        await ContactModel.create(data.data);
      }
     } catch (error) {
       console.log(error)
     }
    }

    return zohoData;
}

module.exports = ContactModel;
