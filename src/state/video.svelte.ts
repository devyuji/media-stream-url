interface VideoType {
  loading: boolean;
  videoUrl: string;
  value: string;
  start: boolean;
}

class Video {
  state = $state<VideoType>({
    loading: false,
    videoUrl: "",
    value: "",
    start: false,
  });

  update<T>(value: T) {
    this.state = { ...this.state, ...value };
  }
}

const v = new Video();
export default v;
