import Block, { type BlockOwnProps } from './Block';
import type { objectType } from '../../types/objectType';
import isEqual from '../../utils/isEqual';
import store from '../Store/Store';

type ComponentClass<P extends BlockOwnProps = BlockOwnProps> =
  new (props?: P) => Block<P>;

export function connect<StateProps extends objectType>(
  mapStateToProps: (state: objectType) => StateProps
) {
  return function <P extends StateProps & BlockOwnProps>(
    Component: ComponentClass<P>
  ): ComponentClass<Omit<P, keyof StateProps> & BlockOwnProps> {
    type OuterProps = Omit<P, keyof StateProps> & BlockOwnProps;

    return class extends Component {
      private unsubscribe: (() => void) | null = null;

      constructor(props?: OuterProps) {
        let state = mapStateToProps(store.getState()) as StateProps;

        super({
          ...(props ?? {}),
          ...state,
        } as P);

        this.unsubscribe = store.subscribe(() => {
          const newState = mapStateToProps(store.getState()) as StateProps;

          if (!isEqual(state, newState)) {
            this.setProps(newState as Partial<P>);
          }

          state = newState;
        });
      }

      protected componentWillUnmount(): void {
        this.unsubscribe?.();
        this.unsubscribe = null;

        super.componentWillUnmount();
      }
    } as unknown as ComponentClass<OuterProps>;
  };
}
