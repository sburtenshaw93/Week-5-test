const Sequelize = require("sequelize");
require('dotenv').config()

const {CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    getCountries: (req, res) => {
        sequelize.query(`
        SELECT * FROM countries
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    createCity: (req, res) => {
        const { name, rating, countryId} = req.body;

        sequelize.query(`
        INSERT INTO cities (name, rating, country_id)
        VALUES ('${name}', ${rating}, ${countryId})
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    getCities: (req, res) => {
        sequelize.query(`
        SELECT
            cities.city_id,
            cities.name AS city,
            cities.rating,
            countries.country_id,
            countries.name AS country
        FROM cities
        JOIN countries ON countries.country_id = cities.country_id
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    deleteCity: (req, res) => {
        const { id } = req.params;
        sequelize.query(`
        DELETE FROM cities WHERE city_id = ${id}
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }

}