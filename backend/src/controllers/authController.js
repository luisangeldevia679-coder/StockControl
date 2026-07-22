export const authService from '../service/authService.js';

// 1. REGISTRO
const register = async (req, res, next) => {
    try {
        const newUser = await authService.registerUser(req.body);
        return res.status(201).json({ ok: true, data: newUser });
    } catch (error) { next(error); }
};

// 2. LOGIN
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.loginUser({ email, password });
        return res.status(200).json({ ok: true, token, user });
    } catch (error) { next(error); }
};

// 3. RECUPERAR CONTRASEÑA (Envía correo con token)
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        await authService.sendResetPasswordLink(email);
        return res.status(200).json({ 
            ok: true, 
            message: 'Si el correo existe, se ha enviado un enlace de recuperación.' 
        });
    } catch (error) { next(error); }
};

// 4. RESTABLECER CONTRASEÑA (Usa el token del correo)
const resetPassword = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;
        await authService.updatePasswordWithToken({ token, newPassword });
        return res.status(200).json({ 
            ok: true, 
            message: 'Tu contraseña ha sido actualizada correctamente.' 
        });
    } catch (error) { next(error); }
};

// 5. OBTENER USUARIO ACTUAL (Para mantener al usuario conectado en el frontend)
const getMe = async (req, res, next) => {
    try {
        // req.user viene cargado desde un middleware de autenticación previo
        const userId = req.user.id; 
        const user = await authService.getUserProfile(userId);
        return res.status(200).json({ ok: true, data: user });
    } catch (error) { next(error); }
};
