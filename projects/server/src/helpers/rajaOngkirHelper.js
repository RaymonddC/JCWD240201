const axios = require('axios');

// const RAJAONGKIRURL = https://api.rajaongkir.com/starter;
// const RAJAONGKIRURLKEY = 5536a7b3e0879609c3d5693b088c13be;

const getProvinceRajaOngkir = async () => {
  try {
    const response = await axios.get(
      'https://api.rajaongkir.com/starter/province',
      {
        headers: {
          key: '5536a7b3e0879609c3d5693b088c13be',
        },
      },
    );
    return response;
  } catch (error) {
    throw { message: error.response.data.rajaongkir.status.description };
  }
};

const getCityRajaOngkir = async (province_id) => {
  try {
    const response = await axios.get(
      `https://api.rajaongkir.com/starter/city?province=${province_id}`,
      {
        headers: {
          key: '5536a7b3e0879609c3d5693b088c13be',
        },
      },
    );
    return response;
  } catch (error) {
    throw { message: error.response.data.rajaongkir.status.description };
  }
};

const shippmentMethodRajaOngkir = async (data) => {
  try {
    const response = await axios.post(
      'https://api.rajaongkir.com/starter/cost',
      { ...data },
      {
        headers: {
          key: '5536a7b3e0879609c3d5693b088c13be',
        },
      },
    );
    return response;
  } catch (error) {
    throw { message: error.response.data.rajaongkir.status.description };
  }
};

module.exports = {
  getProvinceRajaOngkir,
  getCityRajaOngkir,
  shippmentMethodRajaOngkir,
};
