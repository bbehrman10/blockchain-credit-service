
const express = require('express');
const router = express.Router();
const director = require('../services/director');;

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await director.user.createUser(username, email, password);
        res.status(200).send(newUser);
    } catch (error) {
        res
            .status(500)
            .send('Error creating user');
    }
});
router.get('/:userId', async (req, res) => {
    res.status(200).send('pardon the dust, still in progress');

});
router.get('/:userId/cards', async (req, res) => {
    const { userId } = req.params;
    try {
        const cards = await director.credit.getCards(userId);
        res.status(200).send(cards);
    } catch (error) {
        res
            .status(500)
            .send('Error fetching cards');
    }
});

router.get('/:userId/cards/:cardId', async (req, res) => {
    const { cardId } = req.params;
    try {
        const card = await director.credit.getCard(cardId);
        res.status(200).send(card);
    } catch (error) {
        res
            .status(500)
            .send('Error fetching card');
    }
});
// router.get('/:userid/activity', async (req, res) => {
//     const { userid } = req.params;
//     try {
//         const userActivity = await director.credit.getUserCreditActivity(userid);
//         res.status(200).send(userActivity);
//     } catch (error) {
//         res
//             .status(500)
//             .send('Error fetching user activity');
//     }
// });

router.get('/card-activity/:cardId', async (req, res) => {
    const { cardId } = req.params;
    try {
        const cardActivity = await director.credit.getCreditActivity(cardId);
        res.status(200).send(cardActivity);
    } catch (error) {
        res
            .status(500)
            .send('Error getting credit activity');
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await director.user.login(email, password);
        res.status(200).send(user);
    } catch (error) {
        res
            .status(500)
            .send('Error checking login');
    }
});
router.post('/new-card', async (req, res) => {
    const { userID } = req.body;
    try {
        const newCard = await director.credit.createCard(userID);
        res.status(200).send(newCard);
    } catch (error) {
        res
            .status(500)
            .send('Error creating card');
    }
});
router.post('/credit-check', async (req, res) => {
    res.status(200).send('pardon the dust, still in progress');

});
router.get('/statements', async (req, res) => {
    res.status(200).send('pardon the dust, still in progress');
});
router.post('/pay-statement', async (req, res) => {
    res.status(200).send('pardon the dust, still in progress');
});

module.exports = router;