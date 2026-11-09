import { Composition } from "remotion";
import { HumsDemo, TOTAL_FRAMES, FPS } from "./HumsDemo";

export const Root = () => (
  <Composition
    id="HumsDemo"
    component={HumsDemo}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
