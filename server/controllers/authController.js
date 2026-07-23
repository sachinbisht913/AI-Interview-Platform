const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {

        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const [rows] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        //hash
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const [result] = await db.query(
            `INSERT INTO users (full_name, email, password)
             VALUES (?, ?, ?)`,
            [fullName, email, hashedPassword]
        );


        return res.status(201).json({
            success:true,
            message: "user created successfully",
            data: {
                id: result.insertId,
                fullName,
                email,
                
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const login = async (req, res)=>{
    try{

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
               success: false,
               message: "Email and password are required",
            })
        }
        const [rows] = await db.query(
            `SELECT * FROM users WHERE email = ?`,

            [email]
        );

        if(rows.length === 0){
            return res.status(404).json({
                success: false,
                message: "user not found",
            })
        }

        const user = rows[0];

       const isPasswordMatch =  bcrypt.compare(
            password,
            user.password
        )

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
        )

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                
            },
        });

        


    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }

}

module.exports ={
    signup,
    login,
};