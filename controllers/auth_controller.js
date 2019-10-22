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
    res.redirect('/');
};

const logout = (req, res) =>
{
    req.logout();
    res.redirect('/');
};


module.exports = {
    verify,
    login,
    logout
};