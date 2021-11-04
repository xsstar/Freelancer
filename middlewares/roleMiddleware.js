
module.exports = (roles) => {
    return (req, res, next) => {
        const userRole = req.body.role;
    
        if(roles === userRole) {
            next();
        } else {
            return res.status(401).send('YOU CANT DO IT');
        }
    }
}

/* module.exports = (userRole) => {
    return (req, res, next) => {
        const user = req.body.role;
        if(userRole === user){
            next();
        }
        else {
            return res.status(401).json({
                status: "fail",
                description: `Unauthorized: ${user} role must be ${userRole}`
            });
        }
    }
}
 */

