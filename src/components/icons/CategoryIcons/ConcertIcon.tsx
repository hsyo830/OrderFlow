import clsx from "clsx";
import type { SVGProps } from "react";

type ConcertIconProps = SVGProps<SVGSVGElement>;

export default function ConcertIcon({ className, ...props }: ConcertIconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-6", className)}
      fill="currentColor"
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M408 32
          C412 33 415 37 415 44
          V348
          C415 366 408 382 395 395
          C382 408 364 415 342 415
          C318 415 298 408 282 395
          C265 382 256 366 256 350
          C256 332 264 317 279 305
          C295 293 315 288 339 288
          C356 288 371 292 384 300

          V148
          L192 203
          V412
          C192 430 184 446 170 459
          C156 472 138 480 113 480
          C89 480 69 473 53 460
          C38 448 32 434 32 418
          C32 399 40 384 55 371
          C71 358 91 352 115 352
          C132 352 147 356 160 364

          V112
          C160 104 164 99 172 96
          L396 32
          C400 31 404 31 408 32

          Z

          M192 123
          V170
          L383 116
          V69
          Z

          M328 319
          C305 319 288 332 288 351
          C288 370 305 384 328 384
          C351 384 368 378 378 367
          C386 359 386 348 380 339
          C372 326 353 319 328 319
          Z

          M104 383
          C81 383 64 396 64 415
          C64 434 81 448 104 448
          C127 448 144 442 154 431
          C162 423 162 412 156 403
          C148 390 129 383 104 383
          Z
        "
      />
    </svg>
  );
}
