const jwt = require('jsonwebtoken');
   const bcrypt = require('bcryptjs');
   const User = require('../../models/userModel');

   const authController = {
     async signup(req, res, next) {
       try {
         const { email, password } = req.body;
         if (!email || !password) {
           const error = new Error('Email and password are required');
           error.status = 400;
           throw error;
         }

         const existingUser = await User.findByEmail(email);
         if (existingUser) {
           const error = new Error('User already exists');
           error.status = 400;
           throw error;
         }

         const user = await User.create({ email, password });
         const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
           expiresIn: '1h'
         });

         res.status(201).json({ user: { id: user.id, email: user.email }, token });
       } catch (err) {
         next(err);
       }
     },

     async login(req, res, next) {
       try {
         const { email, password } = req.body;
         if (!email || !password) {
           const error = new Error('Email and password are required');
           error.status = 400;
           throw error;
         }

         const user = await User.findByEmail(email);
         if (!user) {
           const error = new Error('Invalid credentials');
           error.status = 401;
           throw error;
         }

         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
           const error = new Error('Invalid credentials');
           error.status = 401;
           throw error;
         }

         const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
           expiresIn: '1h'
         });

         res.status(200).json({ user: { id: user.id, email: user.email }, token });
       } catch (err) {
         next(err);
       }
     }
   };

   module.exports = authController;