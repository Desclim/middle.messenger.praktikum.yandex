import type {objectType} from "../../types/objectType";
import merge from "../../utils/merge";
import set from "../../utils/set";

type Listener = () => void;
class Store {
  private state: objectType = {};
  private listeners: Set<Listener> = new Set();

  public getState() {
    return this.state;
  }

  public setState(path: string, value: unknown) {
    this.state = merge(this.state, set({}, path, value));
    this.emit();
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    this.listeners.forEach(listener => listener());
  }
}

export default new Store();
