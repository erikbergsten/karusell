
export type Direction = 'left' | 'right'

export type SwipeHandler = (dir: Direction) => void

export class TouchListener {
  touchstartX: number;
  touchendX: number;
  onSwipe: SwipeHandler
  constructor(onSwipe: SwipeHandler) {
    this.onSwipe = onSwipe;
    this.touchstartX = 0;
    this.touchendX = 0;
    this.touchstart = this.touchstart.bind(this);
    this.touchend = this.touchend.bind(this);
  }
  touchstart(e: TouchEvent) {
    this.touchstartX = e.changedTouches[0].screenX;
  }
  touchend(e: TouchEvent) {
    this.touchendX = e.changedTouches[0].screenX
    this.checkDirection()
  }
  checkDirection() {
    if (this.touchendX < this.touchstartX) {
      this.onSwipe('left');
    }
    if (this.touchendX > this.touchstartX) {
      this.onSwipe('right');
    }
  }
  add(component: HTMLElement) {
    component.addEventListener('touchstart', this.touchstart);
    component.addEventListener('touchend', this.touchend);
  }
  remove(component: HTMLElement) {
    component.removeEventListener('touchstart', this.touchstart);
    component.removeEventListener('touchend', this.touchend);
  }
}
