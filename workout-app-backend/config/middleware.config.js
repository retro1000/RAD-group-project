import dotenv from 'dotenv';

dotenv.config();

const reactApp = process.env.REACT_APP || 'http://localhost:3000';

function requireRoleCheck(roles){
    return (req, res, next) => {
        try{
            console.log(req.user);
            if(req.user) for(const role in req.user.roles) if(roles.includes(role.name)) return next();
            else return res.status(403).json({message: 'Forbidden'});
        }catch(err){
            console.log('Error in middleware config - ', err);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }
}

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) return next();
    return res.status(403).json({message: 'Forbidden'});
}

export const Middleware = {requireRoleCheck, ensureAuthenticated};