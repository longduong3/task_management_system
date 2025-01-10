import db from '../models/index.js';

const getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
};

const getLoginPage = (req, res) => {
    return res.render('loginPage.ejs');
};

export default { getHomePage, getLoginPage};
