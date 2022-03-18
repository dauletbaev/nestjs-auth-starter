import configuration from 'src/config/configuration';

export const useFactory = async () => {
  const { secret } = configuration().jwt;

  return {
    secret,
    signOptions: { expiresIn: '60s' },
  };
};
