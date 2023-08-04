// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
const spotify = require('./spotify')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
router.use('/', spotify)
// Використовуйте інші файли роутів, якщо є

// Експортуємо глобальний роутер
module.exports = router
