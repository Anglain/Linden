/**
 * @author Shudra Ihor, Software Engineering-2
 */

exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'Your board'
    });
};