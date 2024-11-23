interface VideoType {
  url: string;
  start: boolean;
}

class Video {
  state = $state<VideoType>({
    url: "",

    start: false,
  });

  update<T>(value: T) {
    this.state = { ...this.state, ...value };
  }
}

const v = new Video();
export default v;
