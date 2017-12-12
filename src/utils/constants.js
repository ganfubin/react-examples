/**
 * 定义系统中的常量,集中在此管理
 */

const isProduction = process.env.NODE_ENV === 'production';

const env = process.env.NODE_ENV;

const isRequestSuccess = status => status === 201 || status === 200;

export { isProduction, env, isRequestSuccess };
