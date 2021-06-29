const handleProfile = (req, res, db) => {
    const { id } = req.params;
    let found = false;
    db.select('*').from('users').where({
        id: id
    }).then(user => {
        if (user.length) {
            res.json(user)
        } else {
            res.status(400).json("user Not found")
        }
    }).catch(err => res.status(400).json("error getting user"))
}

module.exports = {
    handleProfile: handleProfile
}