import clsx from "clsx";
import type { SVGProps } from "react";

type KidsIconProps = SVGProps<SVGSVGElement>;

export default function KidsIcon({ className, ...props }: KidsIconProps) {
  return (
    <svg
      viewBox="0 0 296 277"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("size-6", className)}
      fill="none"
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      {/* 왼쪽 사람 머리 */}
      <circle cx="76" cy="73" r="30" stroke="currentColor" strokeWidth="7" />

      {/* 오른쪽 사람 머리 */}
      <circle cx="220" cy="73" r="30" stroke="currentColor" strokeWidth="7" />

      {/* 중앙 아이 머리 */}
      <circle cx="148" cy="93" r="27" stroke="currentColor" strokeWidth="7" />

      {/* 가족 전체 외곽 + 하트 형태 */}
      <path
        d="
          M125 109
          C112 104 96 101 78 101
          C51 101 33 122 33 153
          C33 194 68 224 99 240
          C116 249 133 257 148 254

          C163 247 180 239 197 229
          C229 211 263 185 263 153
          C263 122 244 101 218 101
          C200 101 184 104 171 109
        "
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 중앙 아이 몸통 */}
      <path
        d="
          M148 120
          C126 120 108 138 108 160
          V181
          C124 193 143 202 164 204
          C173 203 181 201 188 198
          V160
          C188 138 170 120 148 120
          Z
        "
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 아래에서 가족을 감싸는 팔 / 하트 */}
      <path
        d="
          M101 173
          C95 170 89 173 89 180
          C89 185 93 189 98 194

          C115 210 140 228 163 230
          C184 230 209 216 228 202
          C241 192 249 183 253 176

          C255 173 254 172 252 174

          C233 189 211 198 190 203
          C181 206 172 207 164 207

          C142 204 120 194 101 179

          C98 177 98 175 101 173
          Z
        "
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
