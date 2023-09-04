const { default: axios } = require('axios');

const RAJAONGKIRURL = `https://api.rajaongkir.com/starter`;
const RAJAONGKIRURLKEY = `5536a7b3e0879609c3d5693b088c13be`;

const getProvinceRajaOngkir = async () => {
  return axios.get(`${RAJAONGKIRURL}/province`, {
    headers: {
      key: `${RAJAONGKIRURLKEY}`,
    },
  });
};

const getCityRajaOngkir = async (province_id, city_id) => {
  let url = `${RAJAONGKIRURL}/city`;

  if (province_id) {
    url += `?province=${province_id}`;
  }
  if (city_id) {
    url += `?id=${city_id}`;
  }

  return axios.get(url, {
    headers: {
      key: `${RAJAONGKIRURLKEY}`,
    },
  });
};

const shippmentMethodRajaOngkir = async (data) => {
  return axios.post(
    `${RAJAONGKIRURL}/cost`,
    { ...data },
    {
      headers: {
        key: `${RAJAONGKIRURLKEY}`,
      },
    },
  );
};

module.exports = {
  getProvinceRajaOngkir,
  getCityRajaOngkir,
  shippmentMethodRajaOngkir,
};
