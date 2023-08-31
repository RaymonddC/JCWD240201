const { default: axios } = require('axios');

const RAJAONGKIRURL = `${process.env.API_RAJA_ONGKIR}`;
const RAJAONGKIRURLKEY = `${process.env.API_RAJA_ONGKIR_KEY}`;

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
