import template from "./not-found.hbs?raw";
import './not-found.scss'
import Block, {type BlockOwnProps} from "../../core/Block";
export class NotFoundPage extends Block<BlockOwnProps> {
  static componentName = 'NotFoundPage'
  protected template = template
}
