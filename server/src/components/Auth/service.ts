import * as Joi from 'joi';
import AuthValidation from './validation';
import UserModel, { IUserModel } from '../User/model';
import { IAuthService } from './interface';

/**
 * @export
 * @implements {IAuthService}
 */
const AuthService: IAuthService = {

    /**
     * @param {IUserModel} body
     * @returns {Promise <IUserModel>}
     * @memberof AuthService
     */
    async createUser(body: IUserModel): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < IUserModel > = AuthValidation.signup(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }
            console.log(body);
            const user: IUserModel = new UserModel({
                fullName: body.fullName,
                username: body.username,
                mobileNumber: body.mobileNumber,
                location: body.location,
                email: body.email,
                password: body.password,
                description: body.description
            });

            const query: IUserModel = await UserModel.findOne({
                mobileNumber: body.mobileNumber
            });

            if (query) {
                throw new Error('This mobile number already exists');
            }

            const saved: IUserModel = await user.save();

            return saved;
        } catch (error) {
            throw new Error(error);
        }
    },
    /**
     * @param {IUserModel} body 
     * @returns {Promise <IUserModel>}
     * @memberof AuthService
     */
    async getUser(body: IUserModel): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < IUserModel > = AuthValidation.login(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IUserModel = await UserModel.findOne({
                username: body.username
            });
        
            const isMatched: boolean = await user.comparePassword(body.password);
 
            if (isMatched) {
                return user;
            }

            throw new Error('Invalid password or email');
            
        } catch (error) {
            throw new Error(error);
        }
    }
};

export default AuthService;
