import * as bcryptjs from 'bcryptjs';
import { UserDocument, UserSchema } from '../schemas/user.schema';

export const useFactory = () => {
  const schema = UserSchema;

  schema.pre<UserDocument>('save', function (next) {
    this.password = bcryptjs.hashSync(this.password, 10);
    next();
  });

  return schema;
};
