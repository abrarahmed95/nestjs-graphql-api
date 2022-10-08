import { AsyncModelFactory } from '@nestjs/mongoose';
import { User, UserSchema } from './../schemas/user.schmea';
import * as bcrypt from 'bcrypt';

export const UserSchemaProvider: AsyncModelFactory = {
  name: User.name,
  useFactory: () => {
    const schema = UserSchema;

    schema.pre('save', async function (next) {
      const user = this as any;
      try {
        if (!user.isModified('password')) {
          return next();
        }

        const hashed = await bcrypt.hash(user?.password, 10);

        user.password = hashed;
        return next();
      } catch (err) {
        return next(err);
      }
    });

    return schema;
  },
};
