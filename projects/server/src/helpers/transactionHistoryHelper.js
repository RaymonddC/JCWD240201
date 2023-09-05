const db = require('../models');

const validateDate = (startDate, endDate, todayDate) => {
  const daySpacing = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  if (!startDate && !endDate && !todayDate)
    throw {
      message: 'Please set start_date and end_date or today_date',
      code: 400,
    };

  if (startDate && endDate && todayDate)
    throw {
      message: 'Cant set start_date and end_date if you are using today_date',
      code: 400,
    };

  if (startDate && !endDate && !todayDate)
    throw {
      message: 'Please set end_date',
      code: 400,
    };

  if (!startDate && endDate && !todayDate)
    throw {
      message: 'Please set start_date',
      code: 400,
    };

  if (daySpacing < 1 && startDate && endDate)
    throw { message: 'Please set date range correctly', code: 400 };

  if (daySpacing > 30 && startDate && endDate)
    throw {
      message: 'Date range should not be more than 31 days',
      code: 400,
    };
};

const generateDate = (startDate, endDate, sort_order) => {
  const dates = [];
  if (sort_order === 'ASC') {
    const current = startDate;
    while (current <= endDate) {
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, '0');
      const day = String(current.getDate()).padStart(2, '0');
      dates.push(`${year}-${month}-${day}`);
      current.setDate(current.getDate() + 1);
    }
  }
  if (sort_order === 'DESC') {
    const current = endDate;
    while (current >= startDate) {
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, '0');
      const day = String(current.getDate()).padStart(2, '0');
      dates.push(`${year}-${month}-${day}`);
      current.setDate(current.getDate() - 1);
    }
  }
  return dates;
};

const validateIsValueExist = (parameter) => {
  const { data, generatedDate, sort_type, sort_order, key } = parameter;
  let newData;

  if (sort_type === 'date') {
    newData = generatedDate.map((date) => {
      let isExist = data.find((value) => value.date === date);
      let result = {};
      result['date'] = new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      result[`${key}`] = isExist ? Number(isExist[`${key}`]) : 0;
      return result;
    });
  }

  if (sort_type === key) {
    newData = [...data];
    generatedDate.forEach((date) => {
      let isExist = newData.findIndex((value) => value.date === date);
      if (isExist === -1) {
        let result = {
          date: new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        };
        result[`${key}`] = 0;
        return sort_order === 'DESC'
          ? newData.push(result)
          : newData.unshift(result);
      } else {
        newData[isExist] = {
          ...newData[isExist],
          date: new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        };
      }
    });
  }
  return newData;
};

const getRevenueQuery = (query) => {
  const { startDate, endDate, todayDate, sort_type, sort_order } = query;

  let replacements;

  if (startDate && endDate) {
    replacements = {
      startDate: startDate,
      endDate: endDate,
    };
  } else {
    replacements = {
      startDate: todayDate,
      endDate: todayDate,
    };
  }
  return db.sequelize.query(
    `SELECT DATE(transaction_histories.createdAt) AS 'date', SUM(transactions.total_price - transactions.total_discount) as 'today_revenue' FROM transaction_histories 
    JOIN transactions ON transactions.id = transaction_histories.transaction_id 
    WHERE transaction_histories.is_active = true 
    AND transaction_histories.transaction_status_id = 6 
    AND transaction_histories.is_active = true
    AND (DATE(CONVERT_TZ(transaction_histories.createdAt,'+00:00','+07:00')) BETWEEN DATE(:startDate) AND DATE(:endDate))
    GROUP BY DATE(transaction_histories.createdAt)
    ORDER BY ${sort_type || 'date'} ${sort_order || 'ASC'};`,
    {
      replacements,
      // replacements: [startDate, endDate, sort_type, sort_order],
      type: db.sequelize.QueryTypes.SELECT,
    },
    /**
     * tangaal 1: data
     * tanggal 2: data
     * tanggal 3: ?
     * tanggal 4: data
     */
  );
};

const getTotalTransactionQuery = (query) => {
  const { startDate, endDate, todayDate, sort_type, sort_order } = query;

  let replacements;

  if (startDate && endDate) {
    replacements = {
      startDate: startDate,
      endDate: endDate,
    };
  } else {
    replacements = {
      startDate: todayDate,
      endDate: todayDate,
    };
  }

  return db.sequelize.query(
    `SELECT DATE(transaction_histories.createdAt) AS 'date', COUNT(*) as 'total_transaction' FROM transaction_histories 
    WHERE transaction_histories.is_active = true 
    AND transaction_histories.transaction_status_id = 6 
    AND transaction_histories.is_active = true
    AND (DATE(CONVERT_TZ(transaction_histories.createdAt,'+00:00','+07:00')) BETWEEN DATE(:startDate) AND DATE(:endDate))
    GROUP BY DATE(transaction_histories.createdAt)
    ORDER BY ${sort_type || 'date'} ${sort_order || 'ASC'};`,
    {
      replacements,
      type: db.sequelize.QueryTypes.SELECT,
    },
  );
};

const getUserTransactionQuery = (query) => {
  const { startDate, endDate, todayDate, sort_type, sort_order } = query;

  let replacements;

  if (startDate && endDate) {
    replacements = {
      startDate: startDate,
      endDate: endDate,
    };
  } else {
    replacements = {
      startDate: todayDate,
      endDate: todayDate,
    };
  }
  return db.sequelize.query(
    `SELECT DATE(transaction_histories.createdAt) AS 'date', COUNT(transactions.user_id) as 'total_user' FROM transaction_histories 
    JOIN transactions ON transactions.id = transaction_histories.transaction_id 
    WHERE transaction_histories.is_active = true 
    AND transaction_histories.transaction_status_id = 6 
    AND transaction_histories.is_active = true
    AND (DATE(CONVERT_TZ(transaction_histories.createdAt,'+00:00','+07:00')) BETWEEN DATE(:startDate) AND DATE(:endDate))
    GROUP BY DATE(transaction_histories.createdAt)
    ORDER BY ${sort_type || 'date'} ${sort_order || 'ASC'};`,
    {
      replacements,
      type: db.sequelize.QueryTypes.SELECT,
    },
  );
};

const getTopSaleProductQuery = (start_date, end_date) => {
  return db.sequelize.query(
    `SELECT products.name, SUM(CASE WHEN stock_histories.unit = 0 THEN stock_histories.qty ELSE 0 END) AS 'quantity_closed', SUM(CASE WHEN stock_histories.unit = 1 THEN stock_histories.qty ELSE 0 END) AS 'quantity_opened' FROM transaction_histories 
    JOIN transactions ON transaction_histories.transaction_id = transactions.id
    JOIN stock_histories ON transactions.id = stock_histories.transaction_id
    JOIN products ON stock_histories.product_id = products.id
    WHERE transaction_histories.is_active = true
    AND transaction_histories.transaction_status_id = 6 
    AND stock_histories.stock_history_type_id = 4
    AND (DATE(CONVERT_TZ(transaction_histories.createdAt,'+00:00','+07:00')) BETWEEN :start_date AND :end_date) 
    GROUP BY stock_histories.product_id
    ORDER BY quantity_closed DESC
    LIMIT 5;`,
    {
      replacements: {
        start_date: start_date,
        end_date: end_date,
      },
      type: db.sequelize.QueryTypes.SELECT,
    },
  );
};

module.exports = {
  validateDate,
  getRevenueQuery,
  getTotalTransactionQuery,
  getUserTransactionQuery,
  generateDate,
  getTopSaleProductQuery,
  validateIsValueExist,
};
