import Block from '../Component/Block';
import {renderPage} from './renderPage';
import isEqual from "../../utils/isEqual";

type BlockConstructable = new () => Block;

type RouteProps = {
  rootQuery: string;
};

export default class Route {
  private _pathname: string;
  private _blockClass: BlockConstructable;
  private _block: Block | null;
  private _props: RouteProps;

  constructor(pathname: string, view: BlockConstructable, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  public leave(): void {
    if (!this._block) {
      return
    }

    const content = this._block.element();
    if (content) {
      content.remove();
    }

    this._block = null;
  }

  public match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  public render(): void {
    if (!this._block) {
      this._block = new this._blockClass();
      renderPage(this._props.rootQuery, this._block);
      return;
    }
  }
}
