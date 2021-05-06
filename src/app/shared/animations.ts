import {transition, trigger, useAnimation} from "@angular/animations";
import {bounceIn, bounceInDown, fadeIn, slideInUp, slideOutUp} from "ng-animate";

const bounceInDownAnimation = trigger('bounceInDownAnimation', [
  transition('void => *', useAnimation(bounceInDown)),
]);

const bounceInAnimation = trigger('bounceInAnimation', [
  transition('void => *', useAnimation(bounceIn))
]);

const fadeInAnimation = trigger('fadeInAnimation', [
  transition('void => *', useAnimation(fadeIn)),
]);

const slideInUpAnimation = trigger('slideInUpAnimation', [
  transition('void => *', useAnimation(slideInUp, {
    params: {
      timing: .5
    }
  })),
]);

const slideOutUpAnimation = trigger('slideOutUpAnimation', [
  transition('* => void', useAnimation(slideOutUp, {
    params: {
      timing: .5
    }
  })),
]);

export {
  bounceInDownAnimation,
  slideOutUpAnimation,
  slideInUpAnimation,
  bounceInAnimation,
  fadeInAnimation,
};

