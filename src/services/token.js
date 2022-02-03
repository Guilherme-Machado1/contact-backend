const { default: axios } = require("axios");
require('dotenv').config;
// generates a new access Token every 59 minutes
exports.token = async () => {
  try {
      async function generateToken(){
        const {data} = await axios.post(`https://accounts.zoho.com/oauth/v2/token?refresh_token=${process.env.refresh_token}&client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&grant_type=refresh_token`);
        const access_token = data.access_token;
        axios.defaults.headers.common['Authorization'] = `Zoho-oauthtoken ${access_token}`;
      }
      await generateToken()
      let hora = 3540000;
      setInterval(generateToken, hora);
  } catch (error) {
    throw new Error(error);
  }
}
