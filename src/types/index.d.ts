declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}
declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "uuidv4" {
  export { v4 as default } from "uuid";
}
