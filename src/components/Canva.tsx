"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import LoadingScreen from "./LoadingScreen";


export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter()


  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const stage = new createjs.Stage(canvas);

    stage.enableMouseOver(10);

    const loader = new createjs.LoadQueue(false);
    const manifest = [
      { src: "farm.png", id: "background" },
      { src: "fance.png", id: "food_truck" },
      { src: "house.png", id: "sleeping_man" },
      { src: "windmill.png", id: "flame" },
    ];

    const w = 6131;
    const h = 2880;

    const handleComplete = () => {
      setLoaded(true);

      const background = new createjs.Bitmap(loader.getResult("background"));

      const foodTruckspriteSheet = new createjs.SpriteSheet({
        framerate: 30,
        images: [loader.getResult("food_truck")],
        frames: {
          width: 2129,
          height: 1596,
          count: 1,
          regX: 0,
          regY: 0,
        },
        animations: {
          closed: 0,
          open: 4,
          opening: {
            frames: [0, 1, 2, 3, 4],
            next: "open",
          },
          closing: {
            frames: [4, 3, 2, 1, 0],
            next: "closed",
          },
        },
      });

      const foodTruck = new createjs.Sprite(foodTruckspriteSheet, "closed");

      foodTruck.x = 636;
      foodTruck.y = 1254;
      foodTruck.cursor = 'pointer'

      foodTruck.addEventListener("click", () => {
        router.push('/puzzle')
      });

      const sleepingManSpriteSheet = new createjs.SpriteSheet({
        framerate: 30,
        images: [loader.getResult("sleeping_man")],
        // frames: [
        //   [1338, 0, 603, 696],
        //   [0, 0, 735, 783, 0, 3172 - 3084, 1209 - 1122],
        //   [735, 0, 603, 762, 0, 0, 1209 - 1143]
        // ],
        frames: {
          width: 2221,
          height: 2103,
          count: 1,
          regX: 0,
          regY: 0,
        },
        animations: {
          sleeping: 0,
          awake: 1,
          sleep: {
            frames: [2, 0],
            next: false,
            speed: 0.01,
          },
        },
      });

      const sleepingMan = new createjs.Sprite(
        sleepingManSpriteSheet,
        "sleeping"
      );

      sleepingMan.x = 2550;
      sleepingMan.y = 0;

      sleepingMan.addEventListener("mousedown", () => {
        // sleepingMan.gotoAndPlay("awake");
      });

      sleepingMan.addEventListener("click", () => {
        // sleepingMan.gotoAndPlay("sleep");
      });

      const flameSpriteSheet = new createjs.SpriteSheet({
        framerate: 30,
        images: [loader.getResult("flame")],
        // frames: [
        //   [416, 0, 101, 140],
        //   [0, 189, 151, 208, 0, 275 - 256, 999 - 934],
        //   [232, 0, 184, 254, 0, 275 - 248, 999 - 893],
        //   [0, 0, 232, 189, 0, 275 - 203, 999 - 975]
        // ],
        frames: {
          width: 1503,
          height: 2505,
          count: 1,
          regX: 0,
          regY: 0,
        },
        animations: {
          first: 0,
          second: 1,
          third: 2,
          fourth: 3,
        },
      });

      const flame = new createjs.Sprite(flameSpriteSheet, "first");

      flame.x = 4475;
      flame.y = 100;

      flame.addEventListener("click", () => {
        // switch (flame.currentAnimation) {
        //   case "first":
        //     flame.gotoAndPlay("second");
        //     break;
        //   case "second":
        //     flame.gotoAndPlay("third");
        //     break;
        //   case "third":
        //     flame.gotoAndPlay("fourth");
        //     break;
        //   case "fourth":
        //     flame.gotoAndPlay("first");
        //     break;
        // }
      });

      stage.addChild(background, foodTruck, sleepingMan, flame);

      createjs.Ticker.timingMode = createjs.Ticker.RAF;
      createjs.Ticker.addEventListener("tick", tick);
    };

    const tick = (event: Object) => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      const scale = Math.max(canvas.width / w, canvas.height / h);

      stage.scaleX = scale;
      stage.scaleY = scale;
      stage.x = (canvas.width - w * scale) / 2;
      stage.y = (canvas.height - h * scale) / 2;

      stage.update(event);
    };

    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "/");

    return () => {
      window.createjs.Ticker.removeAllEventListeners();
    };
  }, []);

  return (
    <div className="absolute left-0 top-0 h-full w-full">
      <canvas ref={canvasRef} className="absolute left-0 top-0 h-full w-full" />

      {!loaded && <LoadingScreen />}
    </div>
  );
}
