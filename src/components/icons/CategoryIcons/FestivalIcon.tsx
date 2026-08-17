import clsx from "clsx";
import type { SVGProps } from "react";

type FestivalIconProps = SVGProps<SVGSVGElement>;

export default function FestivalIcon({ className, ...props }: FestivalIconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-6", className)}
      fill="currentColor"
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      {/* 가운데 장식 줄기 */}
      <path d="M214 248L210 250L208 258L248 482L251 486L258 487L262 484L264 477L303 254L301 250L297 248L290 250L288 253L257 431L255 432L223 253L221 250Z" />

      {/* 왼쪽 장식 줄기 */}
      <path d="M133 296L128 301L128 307L144 418L143 424L94 315L90 312L85 312L81 315L80 322L151 480L155 486L162 487L167 482L167 476L144 307L142 299L138 296Z" />

      {/* 오른쪽 장식 줄기 */}
      <path d="M378 296L371 297L368 301L344 476L344 482L349 487L356 486L360 480L431 322L431 317L428 313L421 312L417 315L368 424L367 418L383 307L383 301Z" />

      {/* 가운데 별 */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M255 24L250 26L224 80L215 96L143 106L137 110L136 116
          L191 172L179 243L179 250L182 254L191 254L256 219
          L320 254L327 255L332 250L332 243L320 172L374 118
          L375 112L371 107L296 96L261 26Z

          M255 50L257 51L278 96L286 109L346 118L351 120
          L304 167L314 227L313 233L257 203L251 204
          L198 233L197 227L207 167L160 120L165 118
          L219 111L225 109L228 106Z
        "
      />

      {/* 왼쪽 별 */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M70 144L66 144L61 148L51 201L2 223L0 227L0 231
          L3 235L48 261L54 316L59 320L65 319L103 283
          L150 294L157 294L161 291L162 285L143 245
          L140 235L166 190L165 183L161 180L154 180
          L108 186L78 151Z

          M73 169L101 201L111 201L138 197L144 198
          L124 232L124 239L140 275L139 276L109 268
          L98 267L68 295L66 292L62 252L25 230
          L29 227L54 217L64 211Z
        "
      />

      {/* 오른쪽 별 */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M441 144L433 151L403 186L357 180L350 180
          L346 183L345 190L371 235L371 238L349 285
          L349 288L352 293L361 294L408 283L446 319
          L452 320L457 316L463 261L508 235L511 231
          L511 227L507 222L460 201L451 151L447 145Z

          M438 169L447 211L486 230L449 252L445 292
          L443 295L413 267L407 267L372 276L371 275
          L387 239L387 232L367 198L373 197L399 201
          L410 201Z
        "
      />
    </svg>
  );
}
