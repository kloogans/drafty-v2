declare module "next-auth/client"
declare module "uuid"
declare module "number-abbreviate"
declare module "mongo-image-converter"
declare module "multer"
declare module "multer-s3"
declare module "nightwind/helper"
declare module "heic-convert"
declare module "@analytics/google-tag-manager"
declare module "react-gtm-module"
declare module "use-analytics"

interface Window {
  gtag?: any
  dataLayer?: any
}
