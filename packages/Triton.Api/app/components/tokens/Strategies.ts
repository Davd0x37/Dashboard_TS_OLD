import BaseStrategy from "./BaseStrategy";
import { default as BasicStrategy } from "./BasicStrategy";
import { default as BearerStrategy } from "./BearerStrategy";

export default {
  Basic: new BasicStrategy(),
  Bearer: new BearerStrategy()
} as { [key: string]: BaseStrategy };
