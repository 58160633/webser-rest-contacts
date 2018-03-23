const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /students'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /students'
    });
});

router.get('/:studentId', (req, res, next) => {
    const id = req.params.studentId;
    if (id === '59160001') {
        res.status(200).json({
            message: 'Somchai Rukdee',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:studentId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated student!'
    });
});

router.delete('/:studentId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted student!'
    });
});

module.exports = router;