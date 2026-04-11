import template from "./error.hbs?raw";
import './error.scss'
import Block, {type BlockOwnProps} from "../../core/Block";
export class ErrorPage extends Block<BlockOwnProps> {
  static componentName = 'ErrorPage'
  protected template = template
}
