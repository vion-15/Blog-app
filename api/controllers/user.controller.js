import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const test = (req, res) => {
    res.json({ message: 'API bekerja' });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'anda tidak diizikan untuk update'));
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'password harus minimal 6 karakter'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Username harus diantara 7 sampai 20 karakter'));
        }

        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username tidak boleh ada spasi'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username harus huruf kecil'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 'Username hanya mengandung huruf dan angka'));
        }
    }

        try {
            const updateUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            }, { new: true });
            const { password, ...rest } = updateUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error);
        }
};

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'kamu tidak diizinkan untuk menghapus akun ini'));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User sudah dihapus')
    } catch (error) {
        next(error);
    }
};

export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('user telah signout');
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req, res, next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(403, "Kamu tidak Bisa melihat semua akun yang terdaftar"));
    }

    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        const users = await User.find().sort({ createdAt: sortDirection}).skip(startIndex).limit(limit);

        const userWithoutPassword = users.map((user) => {
            const {password, ...rest} = user._doc;
            return rest;
        });

        const totalUsers = await User.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
        );

        const lastMonthUser = await User.countDocuments(
            {createdAt: {$gte: oneMonthAgo}}
        );

        res.status(200).json({
            users: userWithoutPassword,
            totalUsers,
            lastMonthUser
        });
    } catch (error) {
        next(error);
    }
};