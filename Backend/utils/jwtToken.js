export const generateToken = (user, message, statuscode, res) => {
    const token = user.generateJsonWebToken();
    let cookieName;
    if(user.role === "Doctor"){
        cookieName = "doctorToken";
    }
    if(user.role === "Admin"){
        cookieName = "adminToken";
    }
    if(user.role === "Patient"){
        cookieName = "patientToken";
    }
    res.status(statuscode).cookie(cookieName, token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }).json({
        success: true, 
        message,
        user, 
        token,
    });
}