import jwt from "jsonwebtoken"

export const  authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(decoded.userId){
          req.userid = decoded.userId;

          next();

      }else{
          return res.status(403).json({message:"canot be decoded prooperly"});

      }

     
  } catch (err) {
      return res.status(403).json({message:"something went wrong"});
  }
  } else {
    res.status(401).json({ message: "Authorization header missing" });
  }
};



