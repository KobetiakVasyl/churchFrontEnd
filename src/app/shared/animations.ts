import {transition, trigger, useAnimation} from "@angular/animations";
import {bounceIn, bounceInDown, fadeIn} from "ng-animate";

const bounceInDownAnimation = trigger('bounceInDownAnimation', [
  transition('void => *', useAnimation(bounceInDown)),
]);

const bounceInAnimation = trigger('bounceInAnimation', [
  transition('void => *', useAnimation(bounceIn))
]);

const fadeInAnimation = trigger('fadeInAnimation', [
  transition('void => *', useAnimation(fadeIn)),
]);

export {
  bounceInDownAnimation,
  bounceInAnimation,
  fadeInAnimation
};

