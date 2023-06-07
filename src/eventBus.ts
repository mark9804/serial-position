// @ts-ignore
import mitt from 'mitt';

export type Events = {
  enterKeyPressed: void;
};
export const eventBus = mitt<Events>();
