interface Settings {
  useNativePlayer: boolean;
}

class Setting {
  state = $state<Settings>({
    useNativePlayer: false,
  });

  update<T>(value: T) {
    this.state = { ...this.state, ...value };
  }
}

const s = new Setting();
export default s;
