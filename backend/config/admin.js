module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '290b1e25110b8c950bb3278c188ba868'),
  },
});
