const {
  shippmentMethodRajaOngkir,
  getProvinceRajaOngkir,
  getCityRajaOngkir,
} = require('../helpers/rajaOngkirHelper');

const getProvince = async (req, res, next) => {
  try {
    const result = await getProvinceRajaOngkir();

    res.status(200).send({
      success: true,
      message: 'Get Province Success',
      data: result.data.rajaongkir.results,
    });
  } catch (error) {
    next(error);
  }
};

const getCity = async (req, res, next) => {
  try {
    const { province_id, city_id } = req.query;
    const result = await getCityRajaOngkir(province_id, city_id);

    res.status(200).send({
      success: true,
      message: 'Get city Success',
      data: result.data.rajaongkir.results,
    });
  } catch (error) {
    next(error);
  }
};

const shippmentMethod = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await shippmentMethodRajaOngkir(data);
    let modifiedData = result.data.rajaongkir;

    modifiedData.results.forEach((result) => {
      result.costs.forEach((cost) => {
        cost.cost.forEach((item) => {
          item.etd = item.etd.replace(' HARI', '');
        });
      });
    });

    res.status(200).send({
      success: true,
      message: 'Get Shipment Service Success',
      data: modifiedData.results,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProvince,
  getCity,
  shippmentMethod,
};
