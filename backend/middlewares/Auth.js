// middleware/auth.js
import jwt from "jsonwebtoken";

export const ensureAuthenticated = (req, res, next) => {
  let authHeader = req.headers.authorization;
  console.log("🧩 Incoming Authorization Header:", authHeader);

  if (!authHeader) {
    console.log("🚫 No Authorization header found");
    return res.status(401).json({ message: "Unauthorized: Missing token", success: false });
  }

  // ✅ Handle "Bearer <token>" format
  if (authHeader.startsWith("Bearer ")) {
    authHeader = authHeader.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    console.log("✅ Token verified successfully:", decoded);

    req.user = decoded; // contains email, id, role
    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token", success: false });
  }
};


// 🔐 Role-based access control
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden: You don't have permission for this action",
        success: false,
      });
    }
    next();
  };
};
