const express = require('express');
const utilsController = require('../../controllers/utils.controller');

const router = express.Router();

router.get('/countries', utilsController.getAllCountries);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Utils
 *   description: Utilities
 */

/**
 * @swagger
 * /utils/countries
 *   get:
 *     summary: get all countries list
 *     tags: [Utils]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The reset password token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               password: password1
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         description: Password reset failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Password reset failed
 */
