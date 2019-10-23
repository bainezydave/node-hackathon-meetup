const verify = (req, res) =>
{
    if (req.user)
    {
        console.log('Authorised', req.user);
    } else
    {
        console.log('Not Authorised');
    }
};


const login = (req, res) =>
{
    res.render('auth/login');
};

const loggedIn = (req, res) =>
{
    let back = req.header('Referer') || '/';
    
    res.redirect(back);
};

const logout = (req, res) =>
{
    req.logout();
    res.redirect('/');
};


module.exports = {
    verify,
    login,
    loggedIn,
    logout
};
